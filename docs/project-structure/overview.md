---
sidebar_position: 1
---

# Project Structure Overview

UC ORB Showcase follows a monorepo structure with clear separation between frontend, backend, database, and documentation components. This document provides a comprehensive overview of the project organization and file structure.

## Repository Structure

```
orb-showcase/
├── frontend/                    # Next.js 15 frontend application
├── backend/                     # FastAPI backend service
├── db/                         # Database scripts and migrations
├── doc/                        # Documentation (Docusaurus)
├── docker-compose.yml          # Docker development setup
├── vercel.json                 # Vercel deployment configuration
├── README.md                   # Project overview
├── SETUP.md                    # Setup instructions
├── IMPLEMENTATION_SUMMARY.md   # Implementation details
└── TESTING.md                  # Testing guide
```

## Frontend Structure (`frontend/`)

The frontend is a Next.js 15 application using the App Router with TypeScript and modern React patterns:

```
frontend/
├── app/                        # Next.js App Router
│   ├── globals.css            # Global styles and Tailwind CSS
│   ├── layout.tsx             # Root layout with providers
│   ├── page.tsx               # Home page
│   ├── Providers.tsx          # React Query and other providers
│   ├── repositories/          # Repository browsing pages
│   │   ├── page.tsx          # Repository list (server component)
│   │   ├── RepositoriesPageClient.tsx  # Client component with state
│   │   └── [owner]/[repo]/   # Dynamic repository detail pages
│   │       ├── layout.tsx    # Repository detail layout
│   │       └── page.tsx      # Repository detail page
│   ├── about/                 # About page
│   │   └── page.tsx
│   └── connect/               # Contact/submission page
│       └── page.tsx
├── components/                 # Reusable React components
│   ├── ui/                    # Shadcn/ui base components
│   ├── RepositoryCard.tsx     # Individual repository card
│   ├── RepositoryPage.tsx     # Repository detail view
│   ├── RepositoryPageSkeleton.tsx  # Loading skeleton
│   ├── RepositoryFilters/     # Search and filter components
│   ├── RepositoryGrid/        # Grid layout components
│   ├── RepositoryPagination/  # Pagination components
│   ├── RepositoryEmptyState/  # Empty state components
│   ├── RepositoryErrorState/  # Error state components
│   ├── RepositoryLoadingGrid/ # Loading state components
│   ├── ContributorsScrollArea.tsx  # Contributors display
│   ├── Navbar.tsx             # Global navigation
│   ├── Footer.tsx             # Global footer
│   └── theme-provider.tsx     # Theme context provider
├── store/                      # Zustand state management
│   └── repositories.ts        # Repository state store
├── lib/                        # Utility functions and configurations
│   ├── utils.ts               # General utilities
│   ├── universities.ts        # University name mappings
│   └── validation.ts          # Zod validation schemas
├── hooks/                      # Custom React hooks
├── styles/                     # Additional styles
├── public/                     # Static assets
├── components.json             # Shadcn/ui configuration
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── .env.local                 # Environment variables (local)
```

### Key Frontend Directories

#### `app/` - Next.js App Router
- **Server Components**: Handle initial data loading and SEO
- **Client Components**: Manage interactivity and state
- **Layouts**: Provide consistent page structure
- **Dynamic Routes**: Handle parameterized URLs

#### `components/` - React Components
- **UI Components**: Reusable interface elements
- **Feature Components**: Business logic components
- **Layout Components**: Page structure components
- **State Components**: Components with complex state logic

#### `store/` - State Management
- **Zustand Stores**: Global application state
- **Type Definitions**: TypeScript interfaces for state

#### `lib/` - Utilities and Configuration
- **Utility Functions**: Helper functions and utilities
- **Validation Schemas**: Zod schemas for form validation
- **Configuration**: Application configuration and constants

## Backend Structure (`backend/`)

The backend is a FastAPI application with a simple, focused structure:

```
backend/
├── main.py                     # FastAPI application and routes
├── models.py                   # SQLModel and Pydantic models
├── database.py                 # Database connection and session management
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