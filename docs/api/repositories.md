---
sidebar_position: 2
---

# Repositories API

## GET /repositories

List repositories with optional filtering and sorting.

**Query Parameters:**
- `q` - Search term for name/description
- `university` - University filter
- `language` - Programming language filter  
- `license` - License filter
- `owner` - Owner filter
- `topic_area_ai` - Topic area filter
- `sort` - Sort field (stargazers_count, forks_count, created_at)
- `order` - Sort order (asc, desc)
- `limit` - Result limit (1-100)
- `offset` - Result offset

**Returns:** Array of repository objects with metadata, contact info, and funding details.