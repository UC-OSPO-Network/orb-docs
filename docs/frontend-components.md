---
sidebar_position: 4
---

# Frontend Components

Key React components in the application.

## Core Components

### RepositoryCard (`components/RepositoryCard.tsx`)
Displays repository information in a card format.

**Props:** `repo` object with repository data

**Used in:** Repository listings and search results

### RepositoryFilters (`components/RepositoryFilters/`)
Filter controls for repository search.

**Filters available:**
- University
- Programming language  
- License
- Owner
- Topic area

### Navbar (`components/Navbar.tsx`)
Main navigation component.

### Footer (`components/Footer.tsx`)
Site footer with links.

## Page Components

### RepositoryPage (`components/RepositoryPage.tsx`)
Individual repository detail view.

**Features:**
- Repository metadata
- README display
- Contact information
- Funding details

## Loading States

### RepositoryCardSkeleton (`components/RepositoryCardSkeleton.tsx`)
Skeleton loader for repository cards.

### RepositoryPageSkeleton (`components/RepositoryPageSkeleton.tsx`)
Skeleton loader for repository detail pages.

## UI Components

Located in `components/ui/` - shadcn/ui components for consistent styling.