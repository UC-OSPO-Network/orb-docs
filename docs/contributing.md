---
sidebar_position: 9
---

# Contributing

How to contribute to UC ORB Showcase.

## Development Setup

1. Fork the repository
2. Follow the [Getting Started](./getting-started.md) guide
3. Create a feature branch: `git checkout -b feature/your-feature`

## Making Changes

### Frontend Changes
- Components in `frontend/components/`
- Pages in `frontend/app/`
- State management in `frontend/store/`
- Run `npm run dev` to test locally

### Backend Changes  
- API endpoints in `backend/main.py`
- Database models in `backend/models.py`
- Run `uvicorn main:app --reload` to test locally

### Database Changes
- Modify `models.py` 
- Update documentation if schema changes
- Test with sample data

## Testing

- **Frontend:** Manual testing in browser
- **Backend:** Use `/docs` endpoint to test API
- **Integration:** Test full workflow from frontend to database

## Pull Request Process

1. **Test your changes** locally with Docker Compose
2. **Update documentation** if needed
3. **Create pull request** with clear description
4. **Address review feedback** if any

## Code Style

- **Frontend:** Use TypeScript, follow existing patterns
- **Backend:** Use Python type hints, follow FastAPI conventions
- **General:** Keep code simple and readable

## Documentation

Update relevant documentation files in the `orb-docs` repository:
- API changes → update `api.md`
- New components → update `frontend-components.md`
- Database changes → update `data-model.md`