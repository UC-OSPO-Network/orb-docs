---
sidebar_position: 2
---

# Repositories API

The repositories API is the core of UC ORB Showcase, providing comprehensive access to repository data with advanced filtering, searching, and sorting capabilities.

## Endpoints Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/repositories` | GET | List repositories with filtering and pagination |
| `/repositories/{owner}/{repo}` | GET | Get specific repository details |

## List Repositories

### Endpoint
```http
GET /repositories
```

### Description
Retrieves a list of repositories with comprehensive filtering, searching, and sorting options. This endpoint supports all the filtering capabilities used by the frontend application.

### Query Parameters

#### Search Parameters
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `q` | string | Search term for repository name or description | `q=machine learning` |

#### Filter Parameters
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `university` | array[string] | Filter by UC campus | `university=UC Berkeley&university=UCLA` |
| `language` | array[string] | Filter by programming language | `language=Python&language=JavaScript` |
| `license` | array[string] | Filter by license type | `license=MIT&license=Apache-2.0` |
| `owner` | array[string] | Filter by repository owner/organization | `owner=uc-berkeley&owner=ucla-cs` |
| `topic_area_ai` | array[string] | Filter by AI-generated topic area | `topic_area_ai=Machine Learning` |

#### Sorting Parameters
| Parameter | Type | Default | Description | Options |
|-----------|------|---------|-------------|---------|
| `sort` | string | `stargazers_count` | Field to sort by | `stargazers_count`, `forks_count`, `created_at` |
| `order` | string | `desc` | Sort order | `asc`, `desc` |

#### Pagination Parameters
| Parameter | Type | Default | Description | Constraints |
|-----------|------|---------|-------------|-------------|
| `limit` | integer | none | Number of results to return | 1-100 |
| `offset` | integer | none | Number of results to skip | ≥ 0 |

### Request Examples

#### Basic Request
```bash
curl "http://localhost:8000/repositories"
```

#### Search Request
```bash
curl "http://localhost:8000/repositories?q=machine%20learning"
```

#### Filtered Request
```bash
curl "http://localhost:8000/repositories?university=UC%20Berkeley&language=Python"
```

#### Complex Request
```bash
curl "http://localhost:8000/repositories?university=UC%20Berkeley&university=UCLA&language=Python&sort=stargazers_count&order=desc&limit=20"
```

#### Pagination Request
```bash
curl "http://localhost:8000/repositories?limit=10&offset=20"
```

### Response Format

#### Success Response (200 OK)
```json
[
  {
    "full_name": "uc-berkeley/example-repo",
    "description": "An example repository for machine learning research",
    "university": "UC Berkeley",
    "license": "MIT",
    "owner": "uc-berkeley",
    "organization": "1",
    "language": "Python",
    "stargazers_count": "150",
    "html_url": "https://github.com/uc-berkeley/example-repo",
    "forks_count": "25",
    "subscribers_count": "10",
    "created_at": "2023-01-15T10:30:00Z",
    "readme": "# Example Repository\n\nThis repository demonstrates...",
    "homepage": "https://example.berkeley.edu",
    "default_branch": "main",
    "topic_area_ai": "Machine Learning",
    "funder1": "NSF",
    "grant_number1_1": "NSF-2023-001",
    "grant_number1_2": null,
    "grant_number1_3": null,
    "funder2": "NIH",
    "grant_number2_1": "NIH-2023-002",
    "grant_number2_2": null,
    "grant_number2_3": null
  }
]
```

#### Error Responses

**400 Bad Request - Invalid Parameters**
```json
{
  "detail": "Invalid sort field: invalid_field. Must be one of: stargazers_count, forks_count, created_at"
}
```

**422 Validation Error - Parameter Validation Failed**
```json
{
  "detail": [
    {
      "loc": ["query", "limit"],
      "msg": "ensure this value is less than or equal to 100",
      "type": "value_error.number.not_le",
      "ctx": {"limit_value": 100}
    }
  ]
}
```

### Implementation Details

#### Database Query
The endpoint uses efficient database queries with proper indexing:

```python
def list_repositories(
    q: str = Query(None, description="Search term for name/description"),
    university: List[str] = Query(None, description="University filter"),
    language: List[str] = Query(None, description="Language filter"),
    license: List[str] = Query(None, description="License filter"),
    owner: List[str] = Query(None, description="Organization/Owner filter"),
    topic_area_ai: List[str] = Query(None, description="Topic Area AI filter"),
    sort: str = Query("stargazers_count", description="Sort by field"),
    order: str = Query("desc", description="Sort order: asc or desc"),
    limit: int = Query(None, ge=1, le=100, description="Number of results"),
    offset: int = Query(None, ge=0, description="Number of results to skip"),
    session: Session = Depends(get_session)
):
    # Base query with approval filter
    statement = select(Repository).where(Repository.approved == True)
    
    # Apply sorting
    sort_map = {
        "stargazers_count": Repository.stargazers_count,
        "forks_count": Repository.forks_count,
        "created_at": Repository.created_at,
    }
    sort_field = sort_map.get(sort, Repository.stargazers_count)
    
    if order == "asc":
        statement = statement.order_by(sort_field.asc())
    else:
        statement = statement.order_by(sort_field.desc())
    
    # Apply search filter
    if q:
        search = f"%{q.lower()}%"
        statement = statement.where(
            (Repository.full_name.ilike(search)) | 
            (Repository.description.ilike(search))
        )
    
    # Apply category filters
    if university:
        statement = statement.where(Repository.university.in_(university))
    if language:
        statement = statement.where(Repository.language.in_(language))
    if license:
        statement = statement.where(Repository.license.in_(license))
    if owner:
        statement = statement.where(Repository.owner.in_(owner))
    if topic_area_ai:
        statement = statement.where(Repository.topic_area_ai.in_(topic_area_ai))
    
    # Apply pagination
    if limit:
        statement = statement.limit(limit)
    if offset:
        statement = statement.offset(offset)
    
    # Execute query and transform results
    results = session.exec(statement).all()
    
    response = []
    for repo in results:
        repo_dict = repo.dict()
        # Use short_description for API response
        repo_dict["description"] = repo_dict.get("short_description")
        repo_dict.pop("short_description", None)
        
        # Convert datetime fields to ISO strings
        for dt_field in ["created_at", "updated_at", "pushed_at"]:
            if dt_field in repo_dict and hasattr(repo_dict[dt_field], "isoformat"):
                repo_dict[dt_field] = repo_dict[dt_field].isoformat()
        
        response.append(RepositoryResponse(**repo_dict))
    
    return response
```

#### Performance Optimizations
- **Database Indexes**: All filterable fields have proper indexes
- **Query Optimization**: Filters applied at database level
- **Result Limiting**: Maximum 100 results per request
- **Efficient Sorting**: Database-level sorting with indexed fields

## Get Repository Details

### Endpoint
```http
GET /repositories/{owner}/{repo}
```

### Description
Retrieves detailed information about a specific repository using the owner and repository name.

### Path Parameters
| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `owner` | string | Yes | Repository owner/organization name | `uc-berkeley` |
| `repo` | string | Yes | Repository name | `example-repo` |

### Request Examples

#### Basic Request
```bash
curl "http://localhost:8000/repositories/uc-berkeley/example-repo"
```

#### URL Encoding for Special Characters
```bash
# Repository names with special characters need URL encoding
curl "http://localhost:8000/repositories/uc-berkeley/my-awesome-project"
```

### Response Format

#### Success Response (200 OK)
```json
{
  "full_name": "uc-berkeley/example-repo",
  "description": "An example repository for machine learning research at UC Berkeley",
  "university": "UC Berkeley",
  "license": "MIT",
  "owner": "uc-berkeley",
  "organization": "1",
  "language": "Python",
  "stargazers_count": "150",
  "html_url": "https://github.com/uc-berkeley/example-repo",
  "forks_count": "25",
  "subscribers_count": "10",
  "created_at": "2023-01-15T10:30:00Z",
  "readme": "# Example Repository\n\nThis repository demonstrates machine learning techniques...\n\n## Installation\n\n```bash\npip install -r requirements.txt\n```\n\n## Usage\n\n```python\nfrom example import Model\nmodel = Model()\nresults = model.train(data)\n```",
  "homepage": "https://example.berkeley.edu",
  "default_branch": "main",
  "topic_area_ai": "Machine Learning",
  "funder1": "National Science Foundation",
  "grant_number1_1": "NSF-2023-001",
  "grant_number1_2": "NSF-2023-002",
  "grant_number1_3": null,
  "funder2": "National Institutes of Health",
  "grant_number2_1": "NIH-2023-003",
  "grant_number2_2": null,
  "grant_number2_3": null
}
```

#### Error Responses

**404 Not Found - Repository Not Found**
```json
{
  "detail": "Repository not found"
}
```

**400 Bad Request - Invalid Parameters**
```json
{
  "detail": "Owner and repo parameters are required"
}
```

### Implementation Details

#### Database Query
```python
def get_repository(owner: str, repo: str, session: Session = Depends(get_session)):
    # Construct full name from path parameters
    full_name = f"{owner}/{repo}"
    
    # Validate parameters
    if not owner or not repo:
        raise HTTPException(status_code=400, detail="Owner and repo are required")
    
    # Query database
    statement = select(Repository).where(
        Repository.full_name == full_name,
        Repository.approved == True
    )
    repository = session.exec(statement).first()
    
    # Handle not found
    if not repository:
        raise HTTPException(status_code=404, detail="Repository not found")
    
    # Transform response
    repo_dict = repository.dict()
    repo_dict["description"] = repo_dict.get("short_description")
    repo_dict.pop("short_description", None)
    
    # Convert datetime fields
    for dt_field in ["created_at", "updated_at", "pushed_at"]:
        if dt_field in repo_dict and hasattr(repo_dict[dt_field], "isoformat"):
            repo_dict[dt_field] = repo_dict[dt_field].isoformat()
    
    return RepositoryResponse(**repo_dict)
```

## Data Model

### Repository Response Model

```typescript
interface RepositoryResponse {
  // Core repository information
  full_name: string;                    // "uc-berkeley/example-repo"
  description?: string;                 // Repository description (from short_description)
  university?: string;                  // "UC Berkeley"
  license?: string;                     // "MIT"
  owner?: string;                       // "uc-berkeley"
  organization?: string;                // "1" if organization, null if user
  language?: string;                    // "Python"
  
  // GitHub statistics
  stargazers_count?: string;            // "150"
  html_url?: string;                    // "https://github.com/..."
  forks_count?: string;                 // "25"
  subscribers_count?: string;           // "10"
  created_at?: string;                  // "2023-01-15T10:30:00Z"
  
  // Repository content
  readme?: string;                      // Full README content
  homepage?: string;                    // "https://example.com"
  default_branch?: string;              // "main"
  
  // UC-specific metadata
  topic_area_ai?: string;               // "Machine Learning"
  
  // Funding information
  funder1?: string;                     // "National Science Foundation"
  grant_number1_1?: string;             // "NSF-2023-001"
  grant_number1_2?: string;             // Additional grant number
  grant_number1_3?: string;             // Additional grant number
  funder2?: string;                     // "National Institutes of Health"
  grant_number2_1?: string;             // "NIH-2023-003"
  grant_number2_2?: string;             // Additional grant number
  grant_number2_3?: string;             // Additional grant number
}
```

### Field Descriptions

#### Core Fields
- **full_name**: Repository identifier in "owner/repo" format (primary key)
- **description**: Human-readable repository description (uses short_description from database)
- **university**: Associated UC campus name
- **license**: Open source license type
- **owner**: Repository owner (user or organization name)
- **organization**: Flag indicating if owner is an organization ("1") or user (null)
- **language**: Primary programming language

#### GitHub Fields
- **stargazers_count**: Number of GitHub stars (stored as string)
- **html_url**: Direct link to GitHub repository
- **forks_count**: Number of repository forks (stored as string)
- **subscribers_count**: Number of repository watchers (stored as string)
- **created_at**: Repository creation timestamp (ISO 8601 format)

#### Content Fields
- **readme**: Full README.md content with markdown formatting
- **homepage**: Project website or documentation URL
- **default_branch**: Default branch name (usually "main" or "master")

#### UC-Specific Fields
- **topic_area_ai**: AI-generated topic classification for research area categorization

#### Funding Fields
- **funder1/funder2**: Primary and secondary funding organizations
- **grant_number1_1, grant_number1_2, grant_number1_3**: Multiple grant numbers for primary funder
- **grant_number2_1, grant_number2_2, grant_number2_3**: Multiple grant numbers for secondary funder

## Usage Examples

### Frontend Integration

#### Fetching All Repositories
```typescript
const { data: repositories, isLoading, error } = useQuery({
  queryKey: ['repositories'],
  queryFn: async () => {
    const response = await fetch(`${API_URL}/repositories`);
    if (!response.ok) throw new Error('Failed to fetch repositories');
    return response.json();
  },
});
```

#### Fetching with Filters
```typescript
const fetchFilteredRepositories = async (filters: FilterState) => {
  const params = new URLSearchParams();
  
  if (filters.search) params.append('q', filters.search);
  if (filters.universities.length > 0) {
    filters.universities.forEach(uni => params.append('university', uni));
  }
  if (filters.languages.length > 0) {
    filters.languages.forEach(lang => params.append('language', lang));
  }
  
  const response = await fetch(`${API_URL}/repositories?${params}`);
  return response.json();
};
```

#### Fetching Specific Repository
```typescript
const { data: repository } = useQuery({
  queryKey: ['repository', owner, repo],
  queryFn: async () => {
    const response = await fetch(`${API_URL}/repositories/${owner}/${repo}`);
    if (response.status === 404) {
      throw new Error('Repository not found');
    }
    if (!response.ok) throw new Error('Failed to fetch repository');
    return response.json();
  },
});
```

### JavaScript/Node.js Integration

#### Basic Fetch
```javascript
const axios = require('axios');

async function getRepositories() {
  try {
    const response = await axios.get('http://localhost:8000/repositories');
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    throw error;
  }
}
```

#### Advanced Filtering
```javascript
async function searchRepositories(searchTerm, filters = {}) {
  const params = new URLSearchParams();
  
  if (searchTerm) params.append('q', searchTerm);
  if (filters.university) {
    filters.university.forEach(uni => params.append('university', uni));
  }
  if (filters.language) {
    filters.language.forEach(lang => params.append('language', lang));
  }
  
  const url = `http://localhost:8000/repositories?${params}`;
  const response = await axios.get(url);
  return response.data;
}

// Usage
const results = await searchRepositories('machine learning', {
  university: ['UC Berkeley', 'UCLA'],
  language: ['Python', 'R']
});
```

### Python Integration

#### Using requests
```python
import requests
from typing import List, Optional, Dict, Any

class ORBClient:
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
    
    def get_repositories(
        self,
        search: Optional[str] = None,
        university: Optional[List[str]] = None,
        language: Optional[List[str]] = None,
        limit: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """Fetch repositories with optional filtering."""
        params = {}
        
        if search:
            params['q'] = search
        if university:
            params['university'] = university
        if language:
            params['language'] = language
        if limit:
            params['limit'] = limit
        
        response = requests.get(f"{self.base_url}/repositories", params=params)
        response.raise_for_status()
        return response.json()
    
    def get_repository(self, owner: str, repo: str) -> Dict[str, Any]:
        """Fetch specific repository details."""
        response = requests.get(f"{self.base_url}/repositories/{owner}/{repo}")
        response.raise_for_status()
        return response.json()

# Usage
client = ORBClient()
repositories = client.get_repositories(
    search="machine learning",
    university=["UC Berkeley"],
    language=["Python"],
    limit=10
)
```

## Performance Considerations

### Database Optimization
- All filterable fields have database indexes
- Queries use database-level filtering for efficiency
- Results are limited to prevent large response payloads

### Caching Recommendations
- Cache repository lists for 5-10 minutes
- Cache individual repository details for 15-30 minutes
- Use ETags or Last-Modified headers for conditional requests

### Rate Limiting
- Current implementation has no rate limiting
- Recommended: 1000 requests per hour per IP for production
- Consider implementing API keys for higher limits

This API provides a robust foundation for building applications that showcase and discover UC open source repositories.