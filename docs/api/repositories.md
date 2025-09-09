---
sidebar_position: 2
---

# Repositories API

## List Repositories
GET /repositories
- Query: q, university, language, license, owner, limit, offset
- Returns: Array of repositories

## Get Repository Details
GET /repositories/{owner}/{repo}
- Returns: Single repository object