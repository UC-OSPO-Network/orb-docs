---
sidebar_position: 7
---

# State Management

How the frontend manages application state.

## Zustand Store

**File:** `store/repositories.ts`

### State Structure
```typescript
interface RepositoriesState {
  repositories: Repository[];
  searchTerm: string;
  universitiesSelected: string[];
  languagesSelected: string[];
  licensesSelected: string[];
  ownersSelected: string[];
  topicsSelected: string[];
}
```

### Usage Example
```typescript
import { useRepositoriesStore } from '@/store/repositories';

function SearchComponent() {
  const { searchTerm, setSearchTerm } = useRepositoriesStore();
  
  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```

## Data Fetching

Uses TanStack React Query for API calls and caching.

### Key Features
- Automatic background refetching
- Loading and error states
- Request deduplication
- Cache invalidation

### Example Usage
```typescript
import { useQuery } from '@tanstack/react-query';

function useRepositories() {
  return useQuery({
    queryKey: ['repositories'],
    queryFn: () => fetch('/api/repositories').then(r => r.json())
  });
}
```