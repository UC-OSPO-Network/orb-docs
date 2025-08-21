---
sidebar_position: 3
---

# Getting Started

This guide will help you set up UC ORB Showcase for local development, understand the codebase structure, and make your first contribution.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Node.js 18+** and npm/yarn
- **Python 3.9+** and pip
- **PostgreSQL 15+**
- **Git**
- **Docker** (optional, for containerized development)

### Recommended Tools

- **VS Code** with extensions:
  - TypeScript and JavaScript Language Features
  - Python
  - PostgreSQL
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/UC-OSPO-Network/orb-showcase.git
cd orb-showcase
```

### 2. Set Up the Database

#### Option A: Docker (Recommended)

```bash
# Start PostgreSQL container
docker run -d \
  --name orb-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=orb \
  -e POSTGRES_DB=sample \
  -p 5432:5432 \
  postgres:15

# Load sample data (if available)
cat db/sample.sql | docker exec -i orb-db psql -U postgres -d sample
```

#### Option B: Local PostgreSQL

```bash
# Create database
createdb sample

# Load sample data
psql -d sample -f db/sample.sql
```

### 3. Set Up the Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database connection string
```

**Edit `backend/.env`:**
```bash
POSTGRES_DB_URL=postgresql://postgres:orb@localhost:5432/sample
```

### 4. Set Up the Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API URL
```

**Edit `frontend/.env.local`:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 5. Start Development Servers

#### Terminal 1: Backend
```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Project Structure Overview

```
orb-showcase/
├── frontend/                    # Next.js frontend application
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # React components
│   ├── store/                  # Zustand state management
│   ├── lib/                    # Utility functions
│   └── styles/                 # Global styles
├── backend/                     # FastAPI backend service
│   ├── main.py                 # API routes and application
│   ├── models.py               # Database and API models
│   ├── database.py             # Database connection
│   └── requirements.txt        # Python dependencies
├── db/                         # Database scripts and migrations
├── doc/                        # Documentation (Docusaurus)
└── docker-compose.yml          # Docker development setup
```

## Understanding the Codebase

### Frontend Architecture

The frontend is built with Next.js 15 and follows these key patterns:

#### 1. App Router Structure
```
frontend/app/
├── layout.tsx                  # Root layout with providers
├── page.tsx                    # Home page
├── repositories/               # Repository browsing
│   ├── page.tsx               # Server component wrapper
│   ├── RepositoriesPageClient.tsx  # Client component with state
│   └── [owner]/[repo]/        # Dynamic repository detail
└── Providers.tsx              # React Query and other providers
```

#### 2. Component Organization
```
frontend/components/
├── ui/                        # Shadcn/ui components
├── RepositoryCard.tsx         # Individual repository card
├── RepositoryGrid/            # Grid layout component
├── RepositoryFilters/         # Search and filter sidebar
├── RepositoryPage.tsx         # Repository detail view
└── Navbar.tsx                 # Global navigation
```

#### 3. State Management
```typescript
// Zustand store for global state
export const useRepositoriesStore = create<RepositoriesState>((set) => ({
  repositories: [],
  searchTerm: "",
  universitiesSelected: [],
  languagesSelected: [],
  // ... other state
}));

// TanStack Query for server state
const { data: repositories } = useQuery({
  queryKey: ["repositories"],
  queryFn: () => fetch(`${API_URL}/repositories`).then(res => res.json()),
});
```

### Backend Architecture

The backend uses FastAPI with a clean, simple structure:

#### 1. API Routes
```python
# main.py - All API endpoints
@app.get("/repositories", response_model=List[RepositoryResponse])
def list_repositories(
    q: str = Query(None),
    university: List[str] = Query(None),
    language: List[str] = Query(None),
    # ... other filters
):
    # Implementation
```

#### 2. Data Models
```python
# models.py - Database and API models
class Repository(SQLModel, table=True):
    __tablename__ = "showcase_view"
    full_name: str = Field(primary_key=True)
    description: str | None
    university: str | None
    # ... other fields

class RepositoryResponse(BaseModel):
    full_name: str
    description: str | None
    # ... response fields
```

#### 3. Database Integration
```python
# database.py - Database connection
engine = create_engine(keys.POSTGRES_DB_URL, echo=True)

def get_session():
    with Session(autocommit=False, autoflush=False, bind=engine) as session:
        yield session
```

## Development Workflow

### 1. Making Changes

#### Frontend Changes
```bash
# Start development server
cd frontend
npm run dev

# The server will automatically reload on file changes
# TypeScript errors will be shown in the terminal
```

#### Backend Changes
```bash
# Start development server with auto-reload
cd backend
uvicorn main:app --reload

# The server will automatically reload on file changes
# Check http://localhost:8000/docs for API documentation
```

### 2. Code Quality

#### Frontend Linting and Formatting
```bash
cd frontend
npm run lint          # Check for linting errors
npm run lint:fix      # Fix auto-fixable linting errors
```

#### Type Checking
```bash
cd frontend
npx tsc --noEmit      # Check TypeScript types
```

### 3. Testing

#### Frontend Testing
```bash
cd frontend
npm run test          # Run unit tests (if configured)
npm run test:e2e      # Run end-to-end tests (if configured)
```

#### Backend Testing
```bash
cd backend
python -m pytest     # Run backend tests (if configured)
```

## Common Development Tasks

### Adding a New API Endpoint

1. **Define the endpoint in `backend/main.py`:**
```python
@app.get("/new-endpoint", response_model=List[str])
def get_new_data(session: Session = Depends(get_session)):
    # Implementation
    return ["data"]
```

2. **Update the frontend to use the new endpoint:**
```typescript
const { data } = useQuery({
  queryKey: ["new-data"],
  queryFn: () => fetch(`${API_URL}/new-endpoint`).then(res => res.json()),
});
```

### Adding a New React Component

1. **Create the component file:**
```typescript
// components/NewComponent.tsx
interface NewComponentProps {
  title: string;
  description?: string;
}

export function NewComponent({ title, description }: NewComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
```

2. **Use the component:**
```typescript
import { NewComponent } from '@/components/NewComponent';

export default function Page() {
  return <NewComponent title="Hello" description="World" />;
}
```

### Adding a New Filter

1. **Update the Zustand store:**
```typescript
interface RepositoriesState {
  // ... existing state
  newFilterSelected: string[];
  setNewFilterSelected: (v: string[]) => void;
}
```

2. **Add the filter to the API:**
```python
def list_repositories(
    # ... existing parameters
    new_filter: List[str] = Query(None, description="New filter"),
):
    # ... existing logic
    if new_filter:
        statement = statement.where(Repository.new_field.in_(new_filter))
```

3. **Update the frontend filtering logic:**
```typescript
const filteredRepositories = useMemo(() => {
  let result = repositories;
  // ... existing filters
  if (newFilterSelected.length > 0) {
    result = result.filter(r => r.newField && newFilterSelected.includes(r.newField));
  }
  return result;
}, [repositories, newFilterSelected, /* other dependencies */]);
```

## Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps  # Should show orb-db container

# Check connection string
echo $POSTGRES_DB_URL

# Test connection
psql postgresql://postgres:orb@localhost:5432/sample
```

#### Frontend Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Backend Import Issues
```bash
# Ensure virtual environment is activated
source .venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Getting Help

- **Documentation**: Check this documentation site
- **GitHub Issues**: [Report bugs or ask questions](https://github.com/UC-OSPO-Network/orb-showcase/issues)
- **Code Review**: Submit a pull request for feedback

## Next Steps

Now that you have the development environment set up:

1. **Explore the codebase**: Browse through the components and understand the data flow
2. **Read the architecture docs**: Understand the system design decisions
3. **Check open issues**: Find something to work on
4. **Make your first contribution**: Start with documentation or small bug fixes

Continue to the [Project Structure](./project-structure/overview) guide to dive deeper into the codebase organization.