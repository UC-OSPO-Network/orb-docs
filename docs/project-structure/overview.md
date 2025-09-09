---
sidebar_position: 1
---

# Project Structure

```
orb-showcase/
├── frontend/            # Next.js frontend
├── backend/             # FastAPI backend
└── data/                # Repository data
```

## Key Files

- `backend/main.py`: API endpoints
- `backend/models.py`: Database models
- `frontend/app`: Next.js pages
- `frontend/components`: React components
│   ├── RepositoryFilters/     # Search and filter components
│   ├── RepositoryGrid/        # Grid layout components
│   ├── RepositoryPagination/  # Pagination components
│   ├── RepositoryEmptyState/  # Empty state components
│   ├── RepositoryErrorState/  # Error state components

├── keys.py                     # Environment configuration
├── requirements.txt            # Python dependencies
├── Dockerfile                  # Docker container configuration
├── .env                       # Environment variables (local)
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
└── README.md                  # Backend documentation
```

### Key Backend Files

#### `main.py` - FastAPI Application
- **API Routes**: All REST endpoints
- **CORS Configuration**: Cross-origin request handling
- **Error Handling**: Global error handling middleware
- **API Documentation**: Auto-generated OpenAPI/Swagger docs

#### `models.py` - Data Models
- **SQLModel Classes**: Database table definitions
- **Pydantic Models**: API request/response models
- **Type Definitions**: Python type hints and validation

#### `database.py` - Database Integration
- **Connection Management**: PostgreSQL connection setup
- **Session Handling**: Database session lifecycle
- **ORM Configuration**: SQLModel ORM setup

#### `keys.py` - Configuration
- **Environment Variables**: Configuration from environment
- **Settings Management**: Application settings and secrets

## Database Structure (`db/`)

Database-related files and scripts:

```
db/
├── sample.sql                  # Sample data and schema
├── migrations/                 # Database migration scripts (if any)
└── README.md                  # Database documentation
```

### Database Components

#### Schema Design
- **showcase_view**: Main view aggregating repository data
- **Normalized Tables**: Underlying normalized data structure
- **Indexes**: Performance optimization indexes

#### Data Sources
- **GitHub API**: Repository metadata and statistics
- **Manual Curation**: UC-specific information and classifications
- **Funding Data**: Grant and funding information

## Documentation Structure (`doc/`)

Comprehensive documentation using Docusaurus:

```
doc/
├── docs/                       # Documentation content
│   ├── intro.md               # Introduction and overview
│   ├── architecture.md        # System architecture
│   ├── getting-started.md     # Setup and development guide
│   ├── project-structure/     # Project organization docs
│   ├── development/           # Development workflow docs
│   ├── api/                   # API reference documentation
│   ├── components/            # Component documentation
│   ├── contributing.md        # Contributing guidelines
│   └── troubleshooting.md     # Common issues and solutions
├── blog/                       # Blog posts (if any)
├── src/                        # Docusaurus customizations
├── static/                     # Static assets for docs
├── docusaurus.config.ts       # Docusaurus configuration
├── sidebars.ts                # Documentation navigation
└── package.json               # Documentation dependencies
```

## Configuration Files

### Root Level Configuration

#### `docker-compose.yml`
```yaml
# Development environment setup
services:
  frontend:
    # Next.js development server
  backend:
    # FastAPI development server
  database:
    # PostgreSQL database
```

#### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

### Frontend Configuration

#### `next.config.mjs`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

#### `tailwind.config.ts`
```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

### Backend Configuration

#### `requirements.txt`
```
fastapi
uvicorn
pydantic-settings
python-dotenv
sqlmodel
psycopg2-binary
httpx
```

## File Naming Conventions

### Frontend
- **Components**: PascalCase (e.g., `RepositoryCard.tsx`)
- **Pages**: lowercase with hyphens (e.g., `page.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Types**: PascalCase interfaces (e.g., `Repository`)

### Backend
- **Files**: snake_case (e.g., `main.py`, `models.py`)
- **Classes**: PascalCase (e.g., `Repository`, `RepositoryResponse`)
- **Functions**: snake_case (e.g., `get_repositories`)
- **Variables**: snake_case (e.g., `full_name`)

## Import Patterns

### Frontend Imports
```typescript
// External libraries
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Internal components
import { RepositoryCard } from '@/components/RepositoryCard';
import { useRepositoriesStore } from '@/store/repositories';

// Types
import type { Repository } from '@/store/repositories';
```

### Backend Imports
```python
# Standard library
from typing import List

# External libraries
from fastapi import FastAPI, Depends, Query
from sqlmodel import Session, select

# Internal modules
from models import Repository, RepositoryResponse
from database import get_session
```

## Development Patterns

### Frontend Patterns
- **Server Components**: For initial data loading and SEO
- **Client Components**: For interactivity and state management
- **Custom Hooks**: For reusable stateful logic
- **Compound Components**: For complex UI patterns

### Backend Patterns
- **Dependency Injection**: For database sessions and configuration
- **Pydantic Models**: For request/response validation
- **SQLModel ORM**: For type-safe database operations
- **FastAPI Features**: Auto-generated documentation and validation

This structure provides a solid foundation for development, maintenance, and scaling of the UC ORB Showcase application.