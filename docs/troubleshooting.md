---
sidebar_position: 9
---

# Troubleshooting Guide

This guide helps you resolve common issues when developing, deploying, or using UC ORB Showcase. Issues are organized by category with step-by-step solutions.

## Development Environment Issues

### Database Connection Problems

#### Issue: "Connection refused" or "Database does not exist"

**Symptoms:**
```bash
sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) connection to server at "localhost", port 5432 failed: Connection refused
```

**Solutions:**

1. **Check PostgreSQL is Running**
```bash
# For Docker setup
docker ps | grep postgres
# Should show running postgres container

# If not running, start it
docker run -d \
  --name orb-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=orb \
  -e POSTGRES_DB=sample \
  -p 5432:5432 \
  postgres:15
```

2. **Verify Connection String**
```bash
# Check your .env file
cat backend/.env

# Should contain:
POSTGRES_DB_URL=postgresql://postgres:orb@localhost:5432/sample
```

3. **Test Connection Manually**
```bash
# Test with psql
psql postgresql://postgres:orb@localhost:5432/sample

# If successful, you should see:
# sample=#
```

4. **Check Port Conflicts**
```bash
# Check if port 5432 is in use
lsof -i :5432
netstat -an | grep 5432

# If another service is using port 5432, change Docker port:
docker run -d \
  --name orb-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=orb \
  -e POSTGRES_DB=sample \
  -p 5433:5432 \
  postgres:15

# Update connection string:
POSTGRES_DB_URL=postgresql://postgres:orb@localhost:5433/sample
```

#### Issue: "Table 'showcase_view' doesn't exist"

**Symptoms:**
```bash
sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedTable) relation "showcase_view" does not exist
```

**Solutions:**

1. **Load Sample Data**
```bash
# If you have sample data
cat db/sample.sql | docker exec -i orb-db psql -U postgres -d sample
```

2. **Create Minimal View for Development**
```sql
-- Connect to database
psql postgresql://postgres:orb@localhost:5432/sample

-- Create minimal table and view
CREATE TABLE IF NOT EXISTS repositories (
    full_name VARCHAR PRIMARY KEY,
    description TEXT,
    university VARCHAR,
    license VARCHAR,
    owner VARCHAR,
    organization VARCHAR,
    language VARCHAR,
    stargazers_count VARCHAR,
    html_url VARCHAR,
    forks_count VARCHAR,
    subscribers_count VARCHAR,
    created_at TIMESTAMP,
    readme TEXT,
    homepage VARCHAR,
    default_branch VARCHAR,
    approved BOOLEAN DEFAULT true,
    topic_area_ai VARCHAR
);

CREATE VIEW showcase_view AS SELECT * FROM repositories;

-- Insert sample data
INSERT INTO repositories (full_name, description, university, language, approved) VALUES
('uc-berkeley/example-repo', 'Example repository for testing', 'UC Berkeley', 'Python', true),
('ucla/sample-project', 'Sample project from UCLA', 'UCLA', 'JavaScript', true);
```

### Frontend Issues

#### Issue: "Module not found" or Import Errors

**Symptoms:**
```bash
Module not found: Can't resolve '@/components/RepositoryCard'
```

**Solutions:**

1. **Check TypeScript Configuration**
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

2. **Verify File Exists**
```bash
# Check if the file exists
ls -la components/RepositoryCard.tsx

# Check the import path
# Should be: import { RepositoryCard } from '@/components/RepositoryCard';
```

3. **Clear Next.js Cache**
```bash
rm -rf .next
rm -rf node_modules/.cache
npm run dev
```

#### Issue: "Hydration Mismatch" Errors

**Symptoms:**
```bash
Warning: Text content did not match. Server: "0" Client: "150"
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

**Solutions:**

1. **Use Client Components for Dynamic Content**
```typescript
// Mark component as client-side
"use client";

export function RepositoryStats({ repo }: { repo: Repository }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div>Loading...</div>;
  }
  
  return <div>{repo.stargazers_count} stars</div>;
}
```

2. **Use Suspense for Loading States**
```typescript
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RepositoriesPageClient />
    </Suspense>
  );
}
```

#### Issue: API Calls Failing (CORS or Network Errors)

**Symptoms:**
```bash
Access to fetch at 'http://localhost:8000/repositories' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**

1. **Check Backend CORS Configuration**
```python
# main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

2. **Verify API URL Environment Variable**
```bash
# Check .env.local
cat frontend/.env.local

# Should contain:
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. **Test API Directly**
```bash
# Test backend is running
curl http://localhost:8000/repositories

# Should return JSON data
```

### Backend Issues

#### Issue: "ModuleNotFoundError" for Python Packages

**Symptoms:**
```bash
ModuleNotFoundError: No module named 'fastapi'
```

**Solutions:**

1. **Activate Virtual Environment**
```bash
cd backend
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Verify activation (should show .venv in prompt)
which python
# Should show: /path/to/orb-showcase/backend/.venv/bin/python
```

2. **Install Dependencies**
```bash
pip install -r requirements.txt

# Verify installation
pip list | grep fastapi
```

3. **Recreate Virtual Environment**
```bash
rm -rf .venv
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

#### Issue: "Pydantic ValidationError"

**Symptoms:**
```bash
pydantic.error_wrappers.ValidationError: 1 validation error for Repository
full_name
  field required (type=value_error.missing)
```

**Solutions:**

1. **Check Data Model Consistency**
```python
# Ensure SQLModel and Pydantic models match
class Repository(SQLModel, table=True):
    full_name: str = Field(primary_key=True)  # Required field
    description: Optional[str] = None         # Optional field

class RepositoryResponse(BaseModel):
    full_name: str          # Must match SQLModel
    description: Optional[str] = None
```

2. **Validate Database Data**
```sql
-- Check for NULL values in required fields
SELECT COUNT(*) FROM showcase_view WHERE full_name IS NULL;
-- Should return 0

-- Check data types
\d showcase_view
```

3. **Add Data Validation**
```python
@app.get("/repositories/{owner}/{repo}")
def get_repository(owner: str, repo: str, session: Session = Depends(get_session)):
    full_name = f"{owner}/{repo}"
    
    if not owner or not repo:
        raise HTTPException(status_code=400, detail="Owner and repo are required")
    
    repository = session.exec(
        select(Repository).where(Repository.full_name == full_name)
    ).first()
    
    if not repository:
        raise HTTPException(status_code=404, detail="Repository not found")
    
    return repository
```

## Production Deployment Issues

### Vercel Deployment Problems

#### Issue: Build Failures

**Symptoms:**
```bash
Error: Command "npm run build" exited with 1
```

**Solutions:**

1. **Check Build Locally**
```bash
cd frontend
npm run build

# Fix any TypeScript errors or warnings
npx tsc --noEmit
```

2. **Update Vercel Configuration**
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/next",
      "config": {
        "distDir": ".next"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ],
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/.next"
}
```

3. **Check Environment Variables**
```bash
# In Vercel dashboard, add environment variables:
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

#### Issue: API Connection Failures in Production

**Symptoms:**
```bash
TypeError: Failed to fetch
```

**Solutions:**

1. **Update CORS for Production**
```python
# main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-frontend-domain.vercel.app",
        "https://uc-orb-showcase.org"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

2. **Use HTTPS for API Calls**
```typescript
// Ensure API URL uses HTTPS in production
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.uc-orb-showcase.org';
```

### Database Performance Issues

#### Issue: Slow Query Performance

**Symptoms:**
- API responses taking > 2 seconds
- Database CPU usage high
- Timeout errors

**Solutions:**

1. **Add Database Indexes**
```sql
-- Add indexes for commonly filtered fields
CREATE INDEX IF NOT EXISTS idx_showcase_view_university ON showcase_view(university);
CREATE INDEX IF NOT EXISTS idx_showcase_view_language ON showcase_view(language);
CREATE INDEX IF NOT EXISTS idx_showcase_view_approved ON showcase_view(approved);
CREATE INDEX IF NOT EXISTS idx_showcase_view_owner ON showcase_view(owner);

-- Composite index for common filter combinations
CREATE INDEX IF NOT EXISTS idx_showcase_view_filters 
ON showcase_view(approved, university, language);
```

2. **Optimize Queries**
```python
# Use database-level filtering instead of Python filtering
def list_repositories(
    university: List[str] = None,
    language: List[str] = None,
    session: Session = Depends(get_session)
):
    statement = select(Repository).where(Repository.approved == True)
    
    # Apply filters at database level
    if university:
        statement = statement.where(Repository.university.in_(university))
    if language:
        statement = statement.where(Repository.language.in_(language))
    
    # Limit results to prevent large responses
    statement = statement.limit(1000)
    
    return session.exec(statement).all()
```

3. **Monitor Query Performance**
```sql
-- Enable query logging (PostgreSQL)
ALTER SYSTEM SET log_statement = 'all';
ALTER SYSTEM SET log_min_duration_statement = 1000; -- Log queries > 1 second

-- Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;
```

## Common User Issues

### Search and Filtering Problems

#### Issue: Search Returns No Results

**Symptoms:**
- User searches for known repositories but gets no results
- Filters don't seem to work

**Solutions:**

1. **Check Search Implementation**
```typescript
// Ensure fuzzy search is working correctly
const filteredRepositories = useMemo(() => {
  if (!repositories) return [];
  
  let result = repositories;
  
  if (searchTerm.trim()) {
    const fuzzy = fuzzysort.go(
      searchTerm,
      result,
      { 
        keys: ["full_name", "description"], 
        threshold: -10000,  // Lower threshold for more matches
        limit: 100          // Increase limit
      }
    );
    result = fuzzy.map(r => r.obj);
  }
  
  return result;
}, [repositories, searchTerm]);
```

2. **Debug Search Data**
```typescript
// Add debugging to see what's being searched
console.log('Search term:', searchTerm);
console.log('Repositories to search:', repositories.length);
console.log('Search results:', filteredRepositories.length);
```

3. **Check Data Quality**
```sql
-- Verify repository data exists
SELECT COUNT(*) FROM showcase_view WHERE approved = true;

-- Check for empty descriptions
SELECT COUNT(*) FROM showcase_view 
WHERE approved = true AND (description IS NULL OR description = '');
```

#### Issue: Filters Not Working

**Solutions:**

1. **Verify Filter Data**
```typescript
// Check if filter options are loaded
const { data: universities, isLoading, error } = useQuery({
  queryKey: ["universities"],
  queryFn: () => fetch(`${API_URL}/universities`).then(res => res.json()),
});

console.log('Universities:', universities);
console.log('Loading:', isLoading);
console.log('Error:', error);
```

2. **Check Filter Logic**
```typescript
// Ensure filters are applied correctly
const filteredRepositories = useMemo(() => {
  let result = repositories;
  
  console.log('Before filtering:', result.length);
  
  if (universitiesSelected.length > 0) {
    result = result.filter(r => {
      const matches = r.university && universitiesSelected.includes(r.university);
      console.log(`${r.full_name}: university=${r.university}, matches=${matches}`);
      return matches;
    });
    console.log('After university filter:', result.length);
  }
  
  return result;
}, [repositories, universitiesSelected]);
```

### Performance Issues

#### Issue: Slow Page Loading

**Solutions:**

1. **Optimize Data Loading**
```typescript
// Use React.memo for expensive components
const RepositoryCard = React.memo(({ repository }: { repository: Repository }) => {
  return (
    <div>
      <h3>{repository.full_name}</h3>
      <p>{repository.description}</p>
    </div>
  );
});

// Memoize expensive computations
const filteredRepositories = useMemo(() => {
  // Expensive filtering logic
}, [repositories, filters]);
```

2. **Implement Virtual Scrolling**
```typescript
// For large lists, consider virtual scrolling
import { FixedSizeList as List } from 'react-window';

function RepositoryList({ repositories }: { repositories: Repository[] }) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <RepositoryCard repository={repositories[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={repositories.length}
      itemSize={200}
    >
      {Row}
    </List>
  );
}
```

3. **Optimize Images and Assets**
```typescript
// Use Next.js Image component
import Image from 'next/image';

function RepositoryCard({ repository }: { repository: Repository }) {
  return (
    <div>
      <Image
        src={`https://github.com/${repository.owner}.png`}
        alt={`${repository.owner} avatar`}
        width={40}
        height={40}
        loading="lazy"
      />
    </div>
  );
}
```

## Debugging Tools and Techniques

### Frontend Debugging

1. **React Developer Tools**
```bash
# Install browser extension
# Chrome: React Developer Tools
# Firefox: React Developer Tools

# Use to inspect:
# - Component props and state
# - Performance profiling
# - Component tree
```

2. **Network Debugging**
```javascript
// Monitor API calls in browser dev tools
// Network tab -> Filter by XHR/Fetch

// Add request logging
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('Fetch request:', args);
  return originalFetch.apply(this, args)
    .then(response => {
      console.log('Fetch response:', response);
      return response;
    });
};
```

3. **State Debugging**
```typescript
// Debug Zustand store
import { subscribeWithSelector } from 'zustand/middleware';

export const useRepositoriesStore = create(
  subscribeWithSelector<RepositoriesState>((set, get) => ({
    // ... store implementation
  }))
);

// Subscribe to state changes
useRepositoriesStore.subscribe(
  (state) => state.searchTerm,
  (searchTerm) => console.log('Search term changed:', searchTerm)
);
```

### Backend Debugging

1. **FastAPI Debug Mode**
```python
# Enable debug mode
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="debug"
    )
```

2. **Database Query Logging**
```python
# Enable SQLModel query logging
engine = create_engine(
    DATABASE_URL, 
    echo=True  # This logs all SQL queries
)
```

3. **Request/Response Logging**
```python
import logging
from fastapi import Request

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response: {response.status_code}")
    return response
```

## Getting Additional Help

### When to Seek Help

1. **After trying the solutions above**
2. **When you have a clear error message**
3. **When you can reproduce the issue consistently**

### How to Report Issues

1. **Create a GitHub Issue** with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Error messages and logs

2. **Include Context**:
   - What were you trying to do?
   - What changed recently?
   - Does it work in a different environment?

3. **Provide Minimal Reproduction**:
   - Simplest code that demonstrates the issue
   - Remove unrelated code and dependencies

### Community Resources

- **GitHub Discussions**: For questions and general help
- **GitHub Issues**: For bug reports and feature requests
- **Documentation**: This documentation site
- **Code Examples**: Look at existing implementations

Remember: Most issues have been encountered before, so searching existing issues and documentation often provides quick solutions!