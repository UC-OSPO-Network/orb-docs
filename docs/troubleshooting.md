---
sidebar_position: 10
---

# Troubleshooting

Common issues and solutions.

## Docker Issues

**Error: `Cannot connect to the Docker daemon`**
- Start Docker Desktop
- Check Docker is running: `docker --version`

**Error: `port is already allocated`**
- Stop other services on ports 3000/8000
- Or change ports in `docker-compose.yml`

**Error: `network local-dev-net not found`**
```bash
docker network create local-dev-net
docker-compose up
```

## Database Issues

**Error: `connection to server failed`**
- Check database URL in `backend/.env`
- Verify PostgreSQL is running
- Test connection: `psql [your-connection-string]`

**Error: `relation "showcase_view" does not exist`**
- Database is missing the required table
- Check your database contains the proper schema
- Verify `POSTGRES_DB_URL` points to correct database

## Frontend Issues

**Error: `Failed to fetch`**
- Check backend is running on port 8000
- Verify `NEXT_PUBLIC_API_URL` in `frontend/.env`
- Check browser console for CORS errors

**Error: `Module not found`**
- Run `npm install` in frontend directory
- Delete `node_modules` and reinstall if needed

## Backend Issues

**Error: `ModuleNotFoundError`**
- Activate virtual environment: `source venv/bin/activate`
- Install requirements: `pip install -r requirements.txt`

**Error: `FastAPI validation error`**
- Check request parameters match API expectations
- Use `/docs` endpoint to test API directly

## Environment Issues

**Variables not loaded**
- Check `.env` file exists and has correct format
- Restart services after changing environment files
- No quotes needed around values in `.env` files

**Docker not seeing environment changes**
- Restart containers: `docker-compose restart`
- Rebuild if needed: `docker-compose up --build`

## Performance Issues

**Slow loading**
- Check database query performance
- Monitor network requests in browser dev tools
- Verify API responses are cached properly