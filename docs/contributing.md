---
sidebar_position: 8
---

# Contributing Guide

Thank you for your interest in contributing to UC ORB Showcase! This guide provides comprehensive information on how to contribute to the project, from setting up your development environment to submitting your changes.

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js 18+** and npm/yarn
- **Python 3.9+** and pip
- **PostgreSQL 15+**
- **Git** with proper configuration
- **GitHub account** with SSH keys set up

### Development Environment Setup

1. **Fork and Clone the Repository**
```bash
# Fork the repository on GitHub, then clone your fork
git clone git@github.com:YOUR-USERNAME/orb-showcase.git
cd orb-showcase

# Add upstream remote
git remote add upstream git@github.com:UC-OSPO-Network/orb-showcase.git
```

2. **Set Up the Development Environment**
Follow the [Getting Started Guide](./getting-started) for complete setup instructions.

3. **Verify Your Setup**
```bash
# Test backend
cd backend
source .venv/bin/activate
uvicorn main:app --reload

# Test frontend (in another terminal)
cd frontend
npm run dev

# Verify both services are running
curl http://localhost:8000/repositories
# Should return JSON data

# Visit http://localhost:3000
# Should show the UC ORB Showcase homepage
```

## Contribution Workflow

### 1. Choose What to Work On

#### Good First Issues
Look for issues labeled:
- `good first issue` - Perfect for newcomers
- `documentation` - Documentation improvements
- `bug` - Bug fixes
- `enhancement` - New features

#### Areas for Contribution
- **Frontend**: React components, UI/UX improvements, performance optimization
- **Backend**: API endpoints, database optimization, new features
- **Documentation**: Guides, API docs, code comments
- **Testing**: Unit tests, integration tests, end-to-end tests
- **DevOps**: Docker, deployment, CI/CD improvements

### 2. Create a Feature Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Your Changes

#### Code Style Guidelines

**Frontend (TypeScript/React)**
```typescript
// Use TypeScript for all new code
interface ComponentProps {
  title: string;
  description?: string;
  onAction: (id: string) => void;
}

// Use functional components with hooks
export function MyComponent({ title, description, onAction }: ComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = useCallback(() => {
    setIsLoading(true);
    onAction('example-id');
  }, [onAction]);
  
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Click Me'}
      </button>
    </div>
  );
}
```

**Backend (Python/FastAPI)**
```python
# Use type hints for all functions
from typing import List, Optional
from fastapi import FastAPI, Depends, Query, HTTPException
from sqlmodel import Session, select

@app.get("/repositories", response_model=List[RepositoryResponse])
def list_repositories(
    q: Optional[str] = Query(None, description="Search term"),
    university: Optional[List[str]] = Query(None, description="University filter"),
    session: Session = Depends(get_session)
) -> List[RepositoryResponse]:
    """
    List repositories with optional filtering.
    
    Args:
        q: Search term for repository name/description
        university: List of universities to filter by
        session: Database session
        
    Returns:
        List of repositories matching the criteria
        
    Raises:
        HTTPException: If query parameters are invalid
    """
    statement = select(Repository).where(Repository.approved == True)
    
    if q:
        search_term = f"%{q.lower()}%"
        statement = statement.where(
            Repository.full_name.ilike(search_term) |
            Repository.description.ilike(search_term)
        )
    
    if university:
        statement = statement.where(Repository.university.in_(university))
    
    results = session.exec(statement).all()
    return [RepositoryResponse.from_orm(repo) for repo in results]
```

#### Commit Message Format

Use conventional commits for clear history:

```bash
# Format: type(scope): description
git commit -m "feat(api): add repository search endpoint"
git commit -m "fix(ui): resolve pagination issue on mobile"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(api): add unit tests for repository filtering"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 4. Test Your Changes

#### Frontend Testing
```bash
cd frontend

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Build test
npm run build

# Manual testing
npm run dev
```

#### Backend Testing
```bash
cd backend

# Type checking
mypy main.py models.py

# Code formatting
black .
isort .

# Run tests (if available)
pytest

# Manual testing
uvicorn main:app --reload
```

#### Integration Testing
```bash
# Test API endpoints
curl http://localhost:8000/repositories
curl http://localhost:8000/universities

# Test frontend integration
# Visit http://localhost:3000 and test:
# - Repository browsing
# - Search functionality
# - Filtering
# - Repository detail pages
```

### 5. Update Documentation

#### Code Documentation
```typescript
/**
 * Filters repositories based on search criteria
 * @param repositories - Array of repositories to filter
 * @param filters - Filter criteria object
 * @returns Filtered array of repositories
 */
function filterRepositories(
  repositories: Repository[],
  filters: FilterCriteria
): Repository[] {
  // Implementation
}
```

```python
def get_repository_by_name(full_name: str, session: Session) -> Optional[Repository]:
    """
    Retrieve a repository by its full name.
    
    Args:
        full_name: Repository full name in format "owner/repo"
        session: Database session
        
    Returns:
        Repository if found, None otherwise
        
    Example:
        >>> repo = get_repository_by_name("uc-berkeley/example", session)
        >>> print(repo.full_name)
        "uc-berkeley/example"
    """
    return session.exec(
        select(Repository).where(Repository.full_name == full_name)
    ).first()
```

#### Update Documentation Files
If your changes affect:
- **API**: Update `doc/docs/api/` files
- **Components**: Update `doc/docs/components/` files
- **Setup**: Update `doc/docs/getting-started.md`
- **Architecture**: Update `doc/docs/architecture.md`

### 6. Submit Your Changes

#### Create Pull Request
```bash
# Push your branch
git push origin feature/your-feature-name

# Create pull request on GitHub
# Include:
# - Clear title and description
# - Reference to related issues
# - Screenshots for UI changes
# - Testing instructions
```

#### Pull Request Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
Fixes #123
Related to #456

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes (or breaking changes documented)
```

## Code Review Process

### What Reviewers Look For

#### Code Quality
- **Type Safety**: Proper TypeScript/Python type annotations
- **Error Handling**: Graceful error handling and user feedback
- **Performance**: Efficient algorithms and database queries
- **Security**: Input validation and secure coding practices

#### Architecture
- **Separation of Concerns**: Clear component/module boundaries
- **Reusability**: Components and functions that can be reused
- **Maintainability**: Code that is easy to understand and modify
- **Consistency**: Follows established patterns and conventions

#### User Experience
- **Accessibility**: Proper ARIA labels, keyboard navigation
- **Responsiveness**: Works on all device sizes
- **Performance**: Fast loading and smooth interactions
- **Error States**: Clear error messages and recovery options

### Responding to Feedback

#### Making Changes
```bash
# Make requested changes
git add .
git commit -m "address review feedback: improve error handling"

# Push updates
git push origin feature/your-feature-name
```

#### Discussion
- **Be Open**: Welcome feedback and suggestions
- **Ask Questions**: If feedback is unclear, ask for clarification
- **Explain Decisions**: If you disagree, explain your reasoning
- **Learn**: Use feedback as a learning opportunity

## Specific Contribution Areas

### Frontend Contributions

#### Adding New Components
1. **Create Component File**
```typescript
// components/NewComponent/NewComponent.tsx
interface NewComponentProps {
  data: SomeData[];
  onAction: (item: SomeData) => void;
}

export function NewComponent({ data, onAction }: NewComponentProps) {
  return (
    <div className="space-y-4">
      {data.map(item => (
        <div key={item.id} onClick={() => onAction(item)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

2. **Add to Index File**
```typescript
// components/index.ts
export { NewComponent } from './NewComponent/NewComponent';
```

3. **Update Documentation**
```markdown
## NewComponent

Description of the component and its purpose.

### Props
- `data`: Array of data items to display
- `onAction`: Callback function when item is clicked

### Usage
```typescript
<NewComponent 
  data={items} 
  onAction={(item) => console.log(item)} 
/>
```

#### Adding New Pages
1. **Create Page File**
```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
      <p>Page content</p>
    </div>
  );
}
```

2. **Add Navigation**
```typescript
// components/Navbar.tsx
<Link href="/new-page">New Page</Link>
```

### Backend Contributions

#### Adding New Endpoints
1. **Define Endpoint**
```python
@app.get("/new-endpoint", response_model=List[NewResponse])
def get_new_data(
    param: Optional[str] = Query(None),
    session: Session = Depends(get_session)
) -> List[NewResponse]:
    """Endpoint description."""
    # Implementation
    return results
```

2. **Add Response Model**
```python
class NewResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
```

3. **Update Documentation**
Update `doc/docs/api/` with new endpoint documentation.

### Database Contributions

#### Schema Changes
1. **Create Migration Script**
```sql
-- migrations/001_add_new_field.sql
ALTER TABLE repositories ADD COLUMN new_field VARCHAR(255);
CREATE INDEX idx_repositories_new_field ON repositories(new_field);
```

2. **Update Models**
```python
class Repository(SQLModel, table=True):
    # ... existing fields
    new_field: Optional[str] = None
```

3. **Update API Response**
```python
class RepositoryResponse(BaseModel):
    # ... existing fields
    new_field: Optional[str] = None
```

## Community Guidelines

### Code of Conduct
- **Be Respectful**: Treat all contributors with respect and kindness
- **Be Inclusive**: Welcome contributors from all backgrounds
- **Be Constructive**: Provide helpful feedback and suggestions
- **Be Patient**: Help newcomers learn and grow

### Communication
- **GitHub Issues**: For bug reports and feature requests
- **Pull Requests**: For code discussions and reviews
- **Discussions**: For general questions and ideas

### Recognition
Contributors are recognized through:
- **GitHub Contributors**: Listed in repository contributors
- **Release Notes**: Mentioned in release announcements
- **Documentation**: Credited in documentation updates

## Getting Help

### Resources
- **Documentation**: This documentation site
- **GitHub Issues**: Search existing issues and discussions
- **Code Examples**: Look at existing components and patterns

### Asking for Help
When asking for help:
1. **Search First**: Check if your question has been answered
2. **Provide Context**: Include relevant code and error messages
3. **Be Specific**: Clearly describe what you're trying to achieve
4. **Share Progress**: Show what you've already tried

### Mentorship
New contributors can request mentorship by:
- Commenting on issues asking for guidance
- Joining community discussions
- Reaching out to maintainers

Thank you for contributing to UC ORB Showcase! Your contributions help make open source discovery better for the entire UC community.