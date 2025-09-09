---
sidebar_position: 2
---

# Repository Components

- RepositoryCard: Card showing repository preview
- RepositoryPage: Full repository detail view
- RepositoryFilters: Filter controls
- RepositoryGrid: Grid layout for repository cards

### Props Interface
```typescript
interface RepositoryGridProps {
  repositories: Repository[];
}
```

### Features
- **Responsive Grid**: 1 column on mobile, 2 on tablet, 3 on desktop
- **Consistent Spacing**: Proper gap and padding for all screen sizes
- **Performance**: Efficiently renders large lists of repositories

### Usage
```typescript
import { RepositoryGrid } from '@/components/RepositoryGrid/RepositoryGrid';

function RepositoriesPage() {
  const { data: repositories } = useQuery(['repositories'], fetchRepositories);
  
  return <RepositoryGrid repositories={repositories || []} />;
}
```

## RepositoryFilters

Comprehensive filtering sidebar with search and multiple filter options.

### Props Interface
```typescript
interface RepositoryFiltersProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  universitiesSelected: string[];
  setUniversitiesSelected: (v: string[]) => void;
  languagesSelected: string[];
  setLanguagesSelected: (v: string[]) => void;
  licensesSelected: string[];
  setLicensesSelected: (v: string[]) => void;
  ownersSelected: string[];
  setOwnersSelected: (v: string[]) => void;
  topicsSelected: string[];
  setTopicsSelected: (v: string[]) => void;
  universities: string[];
  languages: string[];
  licenses: string[];
  organizations: string[];
  topics: string[];
  onApplyFilters: () => void;
  onResetFilters: () => void;
}
```

### Features
- **Search Input**: Full-text search across repository names and descriptions
- **Multi-Select Filters**: Universities, languages, licenses, owners, topics
- **Filter Options**: Dynamically loaded from API
- **Reset Functionality**: Clear all filters with one click
- **University Display Names**: Human-readable university names

### Filter Components
Each filter uses the `MultiSelectCombobox` component:

```typescript
<MultiSelectCombobox
  options={universities}
  selected={universitiesSelected}
  setSelected={setUniversitiesSelected}
  placeholder="All Universities"
  label="Universities"
  getLabel={getUniversityDisplayName}
  allLabel="All Universities"
/>
```

## RepositoryPage

Detailed view component for individual repositories.

### Props Interface
```typescript
interface RepositoryPageProps {
  repo: Repository;
  contributors?: string[];
}
```

### Features
- **Repository Metadata**: Title, description, stats, and badges
- **Funding Information**: Grant details and funder information
- **Tabbed Content**: README and LICENSE tabs
- **Contributors List**: Scrollable list of GitHub contributors
- **Contact Information**: Primary contact with fallback logic
- **External Links**: GitHub repository and project homepage

### Sections

#### Header Section
- Repository title and description
- Topic area badge
- Star, fork, and view counts
- Funding and grants information (if available)

#### Tabbed Content
```typescript
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="readme">README</TabsTrigger>
    {showLicenseTab && (
      <TabsTrigger value="license">LICENSE</TabsTrigger>
    )}
  </TabsList>
  
  <TabsContent value="readme">
    <ReadmeViewer 
      source={repo.readme} 
      repoOwner={repo.owner || ""} 
      repoName={repo.full_name?.split("/").pop() || ""} 
      branch={branch} 
    />
  </TabsContent>
  
  {showLicenseTab && (
    <TabsContent value="license">
      <LicenseViewer 
        repoOwner={repo.owner || ""} 
        repoName={repo.full_name?.split("/").pop() || ""} 
        branch={branch} 
      />
    </TabsContent>
  )}
</Tabs>
```

#### Sidebar Information
- Repository info card with metadata
- Contributors list with GitHub links
- Contact information
- External links

## ReadmeViewer

Component for displaying repository README content with proper formatting.

### Props Interface
```typescript
interface ReadmeViewerProps {
  source?: string | null;
  repoOwner: string;
  repoName: string;
  branch?: string;
}
```

### Features
- **Markdown Rendering**: Uses ReactMarkdown with GitHub Flavored Markdown
- **Image URL Fixing**: Converts relative URLs to absolute GitHub URLs
- **Syntax Highlighting**: Code blocks with proper highlighting
- **Fallback Loading**: Fetches README from GitHub if not provided

### Image URL Processing
```typescript
function fixImageUrls(markdown: string, repoOwner: string, repoName: string, branch?: string) {
  const safeBranch = branch || "main";
  
  // Replace markdown image syntax ![alt](relative.png)
  let result = markdown.replace(/!\[([^\]]*)\]\(((?!https?:\/\/)[^\)]+)\)/g, (match, alt, relPath) => {
    const cleanPath = relPath.replace(/^\.?\//, "");
    const url = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/refs/heads/${safeBranch}/${cleanPath}`;
    return `![${alt}](${url})`;
  });
  
  // Additional HTML img tag processing...
  return result;
}
```

## LicenseViewer

Component for displaying repository license content.

### Props Interface
```typescript
interface LicenseViewerProps {
  repoOwner: string;
  repoName: string;
  branch?: string;
}
```

### Features
- **License Fetching**: Retrieves license from GitHub API
- **Content Display**: Formatted license text in monospace font
- **Error Handling**: Graceful handling of missing licenses
- **Loading States**: Skeleton loading while fetching

## ContributorsScrollArea

Scrollable list of repository contributors with GitHub links.

### Props Interface
```typescript
interface ContributorsScrollAreaProps {
  contributors: string[];
}
```

### Features
- **Scrollable Area**: Fixed height with scroll for long contributor lists
- **GitHub Links**: Direct links to contributor profiles
- **GitHub Icons**: Consistent GitHub branding
- **Empty State**: Message when no contributors found

### Implementation
```typescript
export function ContributorsScrollArea({ contributors }: ContributorsScrollAreaProps) {
  return (
    <ScrollArea className="h-[13.8rem] w-full max-w-xs bg-white border-t border-gray-100 shadow-sm rounded-lg">
      <div>
        {contributors.length === 0 && (
          <div className="text-sm text-gray-500 pt-2 text-center">
            No contributors found.
          </div>
        )}
        {contributors.map((name, idx) => (
          <React.Fragment key={name + idx}>
            <a
              href={`https://github.com/${name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full px-2 py-2 text-sm font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-700 rounded transition"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <GitHubIcon />
              </span>
              <span className="truncate">{name}</span>
            </a>
            {idx < contributors.length - 1 && <Separator className="my-1" />}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
```

## RepositoryPagination

Pagination component for repository lists.

### Props Interface
```typescript
interface RepositoryPaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}
```

### Features
- **Smart Page Numbers**: Shows relevant page numbers with ellipsis
- **Previous/Next Navigation**: Arrow navigation with disabled states
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Responsive**: Works well on all screen sizes

### Page Number Logic
```typescript
function getPageNumbers(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  
  const arr = [];
  arr.push(1);
  
  if (current <= 3) {
    arr.push(2, 3);
    if (current < 3) arr.push('ellipsis-next');
  } else if (current >= total - 2) {
    arr.push('ellipsis-prev');
    for (let i = total - 4; i <= total - 1; i++) arr.push(i);
  } else {
    arr.push('ellipsis-prev');
    arr.push(current - 1, current, current + 1);
    arr.push('ellipsis-next');
  }
  
  arr.push(total);
  return arr.filter((v, i, a) => a.indexOf(v) === i);
}
```

## Loading and Error States

### RepositoryLoadingGrid
Skeleton loading state for repository grids.

```typescript
export const RepositoryLoadingGrid: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <RepositoryCardSkeleton key={i} />
    ))}
  </div>
);
```

### RepositoryCardSkeleton
Skeleton placeholder for individual repository cards.

```typescript
export function RepositoryCardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg h-full p-6 flex flex-col">
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-2/3 mb-2" />
        </div>
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-3" />
      </div>
      <div className="mt-auto">
        <div className="flex items-center gap-2 flex-wrap">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-5 w-20 rounded ml-2" />
          <Skeleton className="h-5 w-16 rounded ml-2" />
          <div className="flex items-center space-x-3 text-gray-600 text-sm ml-2">
            <Skeleton className="h-4 w-8 rounded" />
            <Skeleton className="h-4 w-8 rounded" />
            <Skeleton className="h-4 w-8 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### RepositoryErrorState
Error display component with retry functionality.

```typescript
export interface RepositoryErrorStateProps {
  error: any;
  onRetry?: () => void;
  children?: React.ReactNode;
}

export const RepositoryErrorState: React.FC<RepositoryErrorStateProps> = ({ 
  error, 
  onRetry, 
  children 
}) => (
  <div className="bg-red-50 p-4 rounded-md text-center">
    <p className="text-red-800 mb-2">
      {typeof error === "string" ? error : error?.message ?? String(error)}
    </p>
    {onRetry && (
      <button className="text-sky-700 underline mb-2" onClick={() => onRetry()}>
        Retry
      </button>
    )}
    {children}
  </div>
);
```

### RepositoryEmptyState
Empty state when no repositories match filters.

```typescript
export const RepositoryEmptyState: React.FC = () => (
  <div className="text-center py-12 bg-gray-50 rounded-lg">
    <p className="text-gray-600">
      No repositories found. Try adjusting your filters.
    </p>
  </div>
);
```

### RepositoryPageSkeleton
Loading skeleton for repository detail pages.

```typescript
export function RepositoryPageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-10">
        <div className="container max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            {/* Left (main) section */}
            <div className="space-y-6">
              <div>
                <Skeleton className="h-8 w-2/3 mb-2" />
                <Skeleton className="h-5 w-1/2 mb-4" />
                <div className="flex flex-wrap gap-2 mb-6">
                  <Skeleton className="h-6 w-16 rounded" />
                  <Skeleton className="h-6 w-16 rounded" />
                  <Skeleton className="h-6 w-16 rounded" />
                </div>
                <div className="flex gap-4 mb-8">
                  <Skeleton className="h-5 w-16 rounded" />
                  <Skeleton className="h-5 w-16 rounded" />
                  <Skeleton className="h-5 w-16 rounded" />
                </div>
              </div>
              <div>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-20 w-full rounded" />
              </div>
            </div>
            {/* Right (sidebar) section */}
            <div className="space-y-6">
              <div>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-16 w-full rounded" />
              </div>
              <div>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-8 w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```

## Component Integration Patterns

### State Management Integration
All repository components integrate with the Zustand store for consistent state management:

```typescript
// In RepositoriesPageClient
const repositories = useRepositoriesStore((state) => state.repositories);
const setRepositories = useRepositoriesStore((state) => state.setRepositories);
const searchTerm = useRepositoriesStore((state) => state.searchTerm);
const setSearchTerm = useRepositoriesStore((state) => state.setSearchTerm);
```

### Data Fetching Integration
Components use TanStack Query for efficient data fetching and caching:

```typescript
// Fetch repositories
const { data: repositories, isLoading, error } = useQuery({
  queryKey: ["repositories"],
  queryFn: () => fetch(`${API_URL}/repositories`).then(res => res.json()),
});

// Fetch filter options
const { data: universities = [] } = useQuery({
  queryKey: ["universities"],
  queryFn: () => fetch(`${API_URL}/universities`).then(res => res.json()),
});
```

### Client-Side Filtering
The application implements efficient client-side filtering for instant results:

```typescript
const filteredRepositories = React.useMemo(() => {
  if (!repositories) return [];
  let result = repositories;
  
  // Apply filters
  if (universitiesSelected.length > 0) {
    result = result.filter(r => r.university && universitiesSelected.includes(r.university));
  }
  if (languagesSelected.length > 0) {
    result = result.filter(r => r.language && languagesSelected.includes(r.language));
  }
  
  // Apply search with fuzzy matching
  if (searchTerm.trim()) {
    const fuzzy = fuzzysort.go(
      searchTerm,
      result,
      { keys: ["full_name", "description"], threshold: -10000, limit: 50 }
    );
    result = fuzzy.map(r => r.obj);
  }
  
  return result;
}, [repositories, universitiesSelected, languagesSelected, searchTerm]);
```

This comprehensive component system provides a robust foundation for displaying and interacting with UC repository data in a user-friendly and performant manner.