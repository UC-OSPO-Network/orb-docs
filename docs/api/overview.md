---
sidebar_position: 1
---

# API Overview

The UC ORB Showcase backend provides a comprehensive REST API built with FastAPI. The API is read-only and provides access to repository data, filtering options, and search capabilities.

## Base URL

```
Development: http://localhost:8000
Production: https://api.uc-orb-showcase.org
```

## API Characteristics

### RESTful Design
- **Resource-based URLs**: Clear, predictable endpoint structure
- **HTTP Methods**: Primarily GET requests for data retrieval
- **Status Codes**: Standard HTTP status codes for responses
- **Content Type**: JSON for all request and response bodies

### Read-Only API
The current API is designed for data consumption only:
- ✅ **GET** requests for retrieving data
- ❌ **POST/PUT/DELETE** requests not supported
- 🔒 **No authentication** required for public data

### Auto-Generated Documentation
FastAPI automatically generates interactive API documentation:
- **Swagger UI**: Available at `/docs`
- **ReDoc**: Available at `/redoc`
- **OpenAPI Schema**: Available at `/openapi.json`

## Quick Start

### Basic Repository Query
```bash
curl "http://localhost:8000/repositories"
```

### Filtered Query
```bash
curl "http://localhost:8000/repositories?university=UC%20Berkeley&language=Python"
```

### Specific Repository
```bash
curl "http://localhost:8000/repositories/uc-berkeley/example-repo"
```

## API Endpoints Overview

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/repositories` | GET | List all repositories with filtering |
| `/repositories/{owner}/{repo}` | GET | Get specific repository details |
| `/universities` | GET | Get available universities |
| `/languages` | GET | Get available programming languages |
| `/licenses` | GET | Get available licenses |
| `/organizations` | GET | Get available organizations |
| `/topics` | GET | Get available topic areas |

### Filter Endpoints

| Endpoint | Purpose | Returns |
|----------|---------|---------|
| `/universities` | University filter options | `["UC Berkeley", "UCLA", ...]` |
| `/languages` | Programming language options | `["Python", "JavaScript", ...]` |
| `/licenses` | License type options | `["MIT", "Apache-2.0", ...]` |
| `/organizations` | Organization filter options | `["uc-berkeley", "ucla-cs", ...]` |
| `/topics` | Topic area options | `["Machine Learning", "Web Development", ...]` |

## Request/Response Format

### Standard Response Format
All API responses follow a consistent JSON structure:

```json
{
  "data": [...],
  "status": "success",
  "message": "Optional message"
}
```

### Error Response Format
```json
{
  "detail": "Error description",
  "status_code": 400
}
```

## Query Parameters

### Common Parameters

#### Filtering Parameters
- `university`: Filter by UC campus (array)
- `language`: Filter by programming language (array)
- `license`: Filter by license type (array)
- `owner`: Filter by repository owner (array)
- `topic_area_ai`: Filter by AI-generated topic (array)

#### Search Parameters
- `q`: Search term for repository name/description

#### Sorting Parameters
- `sort`: Sort field (`stargazers_count`, `forks_count`, `created_at`)
- `order`: Sort order (`asc`, `desc`)

#### Pagination Parameters
- `limit`: Number of results to return (1-100)
- `offset`: Number of results to skip

### Parameter Examples

#### Multiple Values
```bash
# Multiple universities
?university=UC%20Berkeley&university=UCLA

# Multiple languages
?language=Python&language=JavaScript
```

#### Combined Filters
```bash
# University + Language + Search
?university=UC%20Berkeley&language=Python&q=machine%20learning
```

#### Sorting and Pagination
```bash
# Sort by stars, descending, limit 20
?sort=stargazers_count&order=desc&limit=20
```

## Response Data Models

### Repository Model
```typescript
interface Repository {
  full_name: string;              // "uc-berkeley/example-repo"
  description?: string;           // Repository description
  university?: string;            // "UC Berkeley"
  license?: string;              // "MIT"
  owner?: string;                // "uc-berkeley"
  organization?: string;         // "1" if organization
  language?: string;             // "Python"
  stargazers_count?: string;     // "150"
  html_url?: string;             // GitHub URL
  forks_count?: string;          // "25"
  subscribers_count?: string;    // "10"
  created_at?: string;           // ISO date string
  readme?: string;               // README content
  homepage?: string;             // Project homepage
  default_branch?: string;       // "main"
  topic_area_ai?: string;        // "Machine Learning"
  
  // Funding information
  funder1?: string;              // "NSF"
  grant_number1_1?: string;      // "NSF-2023-001"
  grant_number1_2?: string;      // Additional grant number
  grant_number1_3?: string;      // Additional grant number
  funder2?: string;              // Secondary funder
  grant_number2_1?: string;      // Secondary grant number
  grant_number2_2?: string;      // Additional grant number
  grant_number2_3?: string;      // Additional grant number
}
```

### Filter Options Model
```typescript
// Simple string arrays for filter options
type Universities = string[];    // ["UC Berkeley", "UCLA", ...]
type Languages = string[];       // ["Python", "JavaScript", ...]
type Licenses = string[];        // ["MIT", "Apache-2.0", ...]
type Organizations = string[];   // ["uc-berkeley", "ucla-cs", ...]
type Topics = string[];          // ["Machine Learning", ...]
```

## HTTP Status Codes

### Success Codes
- `200 OK`: Successful request
- `304 Not Modified`: Cached response (if caching implemented)

### Client Error Codes
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Repository or resource not found
- `422 Unprocessable Entity`: Validation error

### Server Error Codes
- `500 Internal Server Error`: Server-side error
- `503 Service Unavailable`: Service temporarily unavailable

## Rate Limiting

### Current Limits
- **No rate limiting**: Currently implemented
- **Future implementation**: Planned for production

### Planned Rate Limits
- **Public API**: 1000 requests per hour per IP
- **Authenticated API**: 5000 requests per hour (future feature)

## CORS Configuration

### Development
```python
allow_origins=["*"]              # All origins allowed
allow_credentials=True
allow_methods=["*"]
allow_headers=["*"]
```

### Production
```python
allow_origins=[
    "https://uc-orb-showcase.org",
    "https://uc-orb-showcase.vercel.app"
]
```

## Performance Considerations

### Database Optimization
- **Indexed Columns**: All filterable fields have database indexes
- **View-Based Queries**: Pre-aggregated data for faster access
- **Connection Pooling**: Efficient database connection management

### Response Optimization
- **Minimal Data Transfer**: Only necessary fields in responses
- **Efficient Queries**: Single query for multiple filters
- **Caching Headers**: Proper HTTP caching (planned)

### Client-Side Optimization
- **Bulk Data Loading**: Frontend loads all repositories once
- **Client-Side Filtering**: Reduces API calls for filtering
- **Caching Strategy**: TanStack Query handles response caching

## API Versioning

### Current Version
- **Version**: v1 (implicit)
- **URL Structure**: No version prefix currently

### Future Versioning
- **Planned Structure**: `/v1/repositories`, `/v2/repositories`
- **Backward Compatibility**: Maintain previous versions
- **Migration Path**: Clear upgrade documentation

## Error Handling

### Error Response Structure
```json
{
  "detail": "Repository not found",
  "status_code": 404,
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/repositories/invalid/repo"
}
```

### Common Error Scenarios

#### Repository Not Found
```json
{
  "detail": "Repository not found",
  "status_code": 404
}
```

#### Invalid Parameters
```json
{
  "detail": "Invalid sort field: invalid_field",
  "status_code": 400
}
```

#### Validation Error
```json
{
  "detail": [
    {
      "loc": ["query", "limit"],
      "msg": "ensure this value is less than or equal to 100",
      "type": "value_error.number.not_le"
    }
  ],
  "status_code": 422
}
```

## Security

### Data Security
- **Public Data Only**: All exposed data is already public on GitHub
- **No Sensitive Information**: No private or personal data exposed
- **Input Validation**: All inputs validated with Pydantic

### API Security
- **SQL Injection Prevention**: SQLModel ORM prevents SQL injection
- **XSS Prevention**: JSON responses prevent XSS attacks
- **CORS Protection**: Proper CORS configuration

## Testing the API

### Interactive Documentation
Visit the auto-generated API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Command Line Testing
```bash
# Test basic endpoint
curl -X GET "http://localhost:8000/repositories" -H "accept: application/json"

# Test with parameters
curl -X GET "http://localhost:8000/repositories?university=UC%20Berkeley&limit=5" -H "accept: application/json"

# Test specific repository
curl -X GET "http://localhost:8000/repositories/uc-berkeley/example-repo" -H "accept: application/json"
```

### JavaScript/TypeScript Testing
```typescript
// Fetch repositories
const response = await fetch('http://localhost:8000/repositories');
const repositories = await response.json();

// Fetch with filters
const filtered = await fetch('http://localhost:8000/repositories?university=UC%20Berkeley');
const ucBerkeleyRepos = await filtered.json();

// Fetch specific repository
const repo = await fetch('http://localhost:8000/repositories/uc-berkeley/example-repo');
const repoData = await repo.json();
```

This API provides a robust foundation for the UC ORB Showcase frontend and can be extended to support additional features and integrations.