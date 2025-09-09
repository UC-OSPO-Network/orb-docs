---
sidebar_position: 5
---

# API Endpoints

FastAPI backend endpoints for repository data.

## Base URL
- Development: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

## Endpoints

### GET /repositories
Get repositories with optional filtering and sorting.

**Query Parameters:**
- `q` - Search term for repository name or description
- `university` - List of universities to filter by
- `language` - List of programming languages to filter by
- `license` - List of licenses to filter by
- `owner` - List of owners to filter by
- `topic_area_ai` - List of AI-classified topic areas to filter by
- `sort` - Sort field: `stargazers_count`, `forks_count`, `created_at` (default: `stargazers_count`)
- `order` - Sort order: `asc` or `desc` (default: `desc`)
- `limit` - Number of results (1-100)
- `offset` - Number of results to skip

**Response:** Array of RepositoryResponse objects

### GET /languages
Get list of available programming languages.

**Response:** Array of strings (sorted)

### GET /universities
Get list of available universities.

**Response:** Array of strings (sorted)

### GET /licenses
Get list of available licenses.

**Response:** Array of strings (sorted)

### GET /topics
Get list of available AI-classified topic areas.

**Response:** Array of strings (sorted)

## Repository Response Model

```json
{
  "full_name": "owner/repo-name",
  "description": "Repository description",
  "university": "UC Berkeley",
  "license": "MIT",
  "owner": "username", 
  "organization": "1",
  "language": "Python",
  "stargazers_count": "150",
  "html_url": "https://github.com/owner/repo",
  "forks_count": "25",
  "subscribers_count": "10",
  "created_at": "2023-01-01T00:00:00Z",
  "readme": "# Repo README content",
  "homepage": "https://project-site.com",
  "default_branch": "main",
  "topic_area_ai": "Machine Learning",
  "contact_name": "John Doe",
  "contact_email": "john@example.com",
  "contact_name2": "Jane Smith",
  "contact_email2": "jane@example.com",
  "contact_name3": "Bob Wilson", 
  "contact_email3": "bob@example.com",
  "funder1": "NSF",
  "grant_number1_1": "NSF-123456",
  "grant_number1_2": "NSF-789012",
  "grant_number1_3": "NSF-345678",
  "funder2": "NIH",
  "grant_number2_1": "NIH-111222",
  "grant_number2_2": "NIH-333444",
  "grant_number2_3": "NIH-555666"
}
```

## Error Responses

- **422 Validation Error:** Invalid query parameters
- **500 Internal Server Error:** Database or server issues

## Notes

- All endpoints only return approved repositories (`approved = true`)
- String fields may be null/empty
- Counts are returned as strings, not numbers
- Multiple contacts and funders supported per repository