---
sidebar_position: 6
---

# Data Model

Database schema and data structures.

## Repository Table

**Table name:** `showcase_view`

### Core Fields
- `full_name` (string, primary key) - "owner/repo-name" format
- `description` (string, optional) - Repository description
- `short_description` (string, optional) - Brief description
- `html_url` (string, optional) - GitHub repository URL
- `readme` (string, optional) - Repository README content

### Metadata
- `university` (string, optional) - Associated UC campus
- `license` (string, optional) - Repository license
- `language` (string, optional) - Primary programming language
- `owner` (string, optional) - Repository owner username
- `organization` (string, optional) - Whether owner is an organization
- `topic_area_ai` (string, optional) - AI-classified topic area

### Statistics
- `stargazers_count` (string, optional) - GitHub stars
- `forks_count` (string, optional) - GitHub forks
- `subscribers_count` (string, optional) - GitHub watchers
- `created_at` (string, optional) - Repository creation date
- `default_branch` (string, optional) - Main branch name

### Contact & Funding
- `contact_name` (string, optional) - Primary contact name
- `contact_email` (string, optional) - Primary contact email
- `contact_name2` (string, optional) - Secondary contact name
- `homepage` (string, optional) - Project homepage URL

### Status
- `approved` (boolean, optional) - Whether repository is approved for display

## Frontend Types

**TypeScript interface** (`store/repositories.ts`):
```typescript
interface Repository {
  full_name: string;
  description?: string;
  university?: string;
  license?: string;
  language?: string;
  stargazers_count?: number;
  html_url?: string;
  // ... additional fields
}
```