---
sidebar_position: 3
---

# UI Components

Basic UI components used throughout the application:

- Button
- Card
- Input
- Badge
- Skeleton
- `ghost`: Transparent button
- `link`: Link-styled button

### Card

Container component for grouping related content.

```typescript
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Repository Info</CardTitle>
    <CardDescription>Detailed information about this repository</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Repository content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button>View on GitHub</Button>
  </CardFooter>
</Card>
```

### Input

Form input component with consistent styling.

```typescript
import { Input } from "@/components/ui/input";

// Basic input
<Input placeholder="Search repositories..." />

// Controlled input
<Input 
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Enter search term"
/>

// With label
<div>
  <Label htmlFor="search">Search</Label>
  <Input id="search" placeholder="Search repositories..." />
</div>
```

### Badge

Small status indicators and labels.

```typescript
import { Badge } from "@/components/ui/badge";

// Basic badge
<Badge>Python</Badge>

// With variants
<Badge variant="secondary">MIT License</Badge>
<Badge variant="outline">UC Berkeley</Badge>
<Badge variant="destructive">Deprecated</Badge>

// Custom styling
<Badge className="bg-purple-100 text-purple-800">Machine Learning</Badge>
```

### Tabs

Tabbed interface for organizing content.

```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="readme">README</TabsTrigger>
    <TabsTrigger value="license">LICENSE</TabsTrigger>
  </TabsList>
  
  <TabsContent value="readme">
    <ReadmeViewer content={readmeContent} />
  </TabsContent>
  
  <TabsContent value="license">
    <LicenseViewer content={licenseContent} />
  </TabsContent>
</Tabs>
```

### ScrollArea

Custom scrollable area with styled scrollbars.

```typescript
import { ScrollArea } from "@/components/ui/scroll-area";

<ScrollArea className="h-[200px] w-full">
  <div className="p-4">
    {contributors.map(contributor => (
      <div key={contributor.id} className="py-2">
        {contributor.name}
      </div>
    ))}
  </div>
</ScrollArea>
```

### Skeleton

Loading placeholder components.

```typescript
import { Skeleton } from "@/components/ui/skeleton";

// Basic skeleton
<Skeleton className="h-4 w-full" />

// Multiple skeletons
<div className="space-y-2">
  <Skeleton className="h-6 w-3/4" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-2/3" />
</div>

// Circular skeleton
<Skeleton className="h-12 w-12 rounded-full" />
```

## Advanced UI Components

### MultiSelectCombobox

Custom multi-select dropdown component used throughout the application.

```typescript
import { MultiSelectCombobox } from "@/components/ui/MultiSelectCombobox";

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

**Props:**
- `options`: Array of available options
- `selected`: Array of currently selected values
- `setSelected`: Function to update selected values
- `placeholder`: Placeholder text
- `label`: Label for the component
- `getLabel`: Function to transform option display names
- `allLabel`: Text shown when no options are selected

**Features:**
- **Multi-selection**: Select multiple options with checkmarks
- **Search**: Filter options by typing
- **Keyboard Navigation**: Full keyboard accessibility
- **Custom Labels**: Transform option display names
- **Responsive**: Works on all screen sizes

### Pagination Components

```typescript
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious 
        href="#"
        onClick={() => setPage(page - 1)}
        aria-disabled={page === 1}
      />
    </PaginationItem>
    
    {pageNumbers.map((pageNum, idx) =>
      pageNum === 'ellipsis' ? (
        <PaginationItem key={idx}>
          <PaginationEllipsis />
        </PaginationItem>
      ) : (
        <PaginationItem key={pageNum}>
          <PaginationLink
            href="#"
            isActive={pageNum === page}
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </PaginationLink>
        </PaginationItem>
      )
    )}
    
    <PaginationItem>
      <PaginationNext 
        href="#"
        onClick={() => setPage(page + 1)}
        aria-disabled={page === totalPages}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Form Components

### Label

Accessible form labels.

```typescript
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>
```

### Select

Dropdown select component.

```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select value={sortBy} onValueChange={setSortBy}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Sort by" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="stars">Stars</SelectItem>
    <SelectItem value="forks">Forks</SelectItem>
    <SelectItem value="updated">Last Updated</SelectItem>
  </SelectContent>
</Select>
```

### Checkbox

Checkbox input component.

```typescript
import { Checkbox } from "@/components/ui/checkbox";

<div className="flex items-center space-x-2">
  <Checkbox 
    id="terms" 
    checked={acceptedTerms}
    onCheckedChange={setAcceptedTerms}
  />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

## Navigation Components

### Command

Command palette and search interface.

```typescript
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

<Command>
  <CommandInput placeholder="Search repositories..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Repositories">
      {repositories.map(repo => (
        <CommandItem key={repo.full_name} value={repo.full_name}>
          {repo.full_name}
        </CommandItem>
      ))}
    </CommandGroup>
  </CommandList>
</Command>
```

### Popover

Floating content container.

```typescript
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-2">
      <h4 className="font-medium">Repository Details</h4>
      <p className="text-sm text-muted-foreground">
        Additional information about this repository.
      </p>
    </div>
  </PopoverContent>
</Popover>
```

## Feedback Components

### Alert

Status messages and notifications.

```typescript
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Failed to load repositories. Please try again.
  </AlertDescription>
</Alert>

// Variant examples
<Alert variant="destructive">
  <AlertDescription>Something went wrong!</AlertDescription>
</Alert>
```

### Toast

Temporary notification messages.

```typescript
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Success",
          description: "Repository added to favorites!",
        });
      }}
    >
      Add to Favorites
    </Button>
  );
}
```

## Layout Components

### Separator

Visual dividers between content sections.

```typescript
import { Separator } from "@/components/ui/separator";

<div>
  <h2>Repository Information</h2>
  <Separator className="my-4" />
  <p>Repository details...</p>
</div>
```

### AspectRatio

Maintain consistent aspect ratios.

```typescript
import { AspectRatio } from "@/components/ui/aspect-ratio";

<AspectRatio ratio={16 / 9} className="bg-muted">
  <img
    src="/repository-preview.jpg"
    alt="Repository preview"
    className="rounded-md object-cover"
  />
</AspectRatio>
```

## Styling and Customization

### CSS Variables

The UI components use CSS variables for theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}
```

### Custom Component Variants

You can extend components with custom variants:

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Add custom variant
        gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Component Composition

Components are designed for easy composition:

```typescript
function RepositoryInfoCard({ repository }: { repository: Repository }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {repository.full_name}
            <Badge variant="secondary">{repository.language}</Badge>
          </CardTitle>
          <Button variant="outline" size="sm">
            <Star className="h-4 w-4 mr-1" />
            {repository.stargazers_count}
          </Button>
        </div>
        <CardDescription>{repository.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <University className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{repository.university}</span>
          </div>
          <div className="flex items-center gap-2">
            <License className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{repository.license}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full">
          <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
```

## Accessibility Features

All UI components include comprehensive accessibility features:

### Keyboard Navigation
- **Tab Navigation**: All interactive elements are keyboard accessible
- **Arrow Keys**: Navigation within component groups
- **Enter/Space**: Activation of buttons and links
- **Escape**: Close modals and dropdowns

### Screen Reader Support
- **ARIA Labels**: Descriptive labels for all interactive elements
- **ARIA States**: Current state information (selected, expanded, etc.)
- **ARIA Descriptions**: Additional context for complex interactions
- **Semantic HTML**: Proper HTML elements for screen reader navigation

### Focus Management
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Focus Trapping**: Modal dialogs trap focus appropriately
- **Focus Restoration**: Focus returns to trigger elements when closing

### Color and Contrast
- **High Contrast**: All text meets WCAG AA contrast requirements
- **Color Independence**: Information not conveyed by color alone
- **Dark Mode Support**: Full dark mode compatibility

This comprehensive UI component system provides a solid foundation for building accessible, consistent, and beautiful user interfaces in the UC ORB Showcase application.