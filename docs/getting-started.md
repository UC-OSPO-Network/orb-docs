---
sidebar_position: 2
---

# Getting Started

This guide explains how to set up and run UC ORB Showcase locally.

## Prerequisites

- **Docker & Docker Compose** (recommended setup)
- **Git** for cloning the repository
- **PostgreSQL database** (if not using Docker)
- **Node.js 18+** and **Python 3.9+** (for manual setup)

## Docker Setup (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/UC-OSPO-Network/orb-showcase.git
   cd orb-showcase
   ```

2. **Create environment files:**
   
   **Backend environment** (`backend/.env`):
   ```
   POSTGRES_DB_URL=postgresql://postgres:orb@orb-db:5432/sample
   ```
   
   **Frontend environment** (`frontend/.env`):
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Start the application:**
   ```bash
   docker-compose up --build
   ```
   
   For subsequent runs (without code changes):
   ```bash
   docker-compose up
   ```

4. **Access the application:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:8000
   - **API Documentation:** http://localhost:8000/docs

## Manual Setup (Without Docker)

### Database Setup

1. **Install and start PostgreSQL**
2. **Create a database** for the application
3. **Note your database connection details** for the environment file

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create environment file** (`backend/.env`):
   ```
   POSTGRES_DB_URL=postgresql://username:password@localhost:5432/database_name
   ```

5. **Start the backend server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Open new terminal, navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file** (`frontend/.env.local`):
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

## Verifying the Setup

1. **Check backend:** Visit http://localhost:8000/docs to see the API documentation
2. **Check frontend:** Visit http://localhost:3000 to see the application
3. **Test API connection:** The frontend should load repository data from the backend

## Common Issues

**Docker network error:**
- Make sure Docker is running
- Try `docker-compose down && docker-compose up --build`

**Database connection error:**
- Verify your PostgreSQL credentials in the `.env` file
- Ensure the database exists
- Check that PostgreSQL is running

**Frontend not connecting to backend:**
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env`
- Check that backend is running on port 8000
- Look for CORS errors in browser console

**Port already in use:**
- Stop any services running on ports 3000 or 8000
- Or modify the ports in `docker-compose.yml`

## Development Workflow

1. **Backend changes:** The FastAPI server auto-reloads on file changes
2. **Frontend changes:** Next.js hot-reloads automatically
3. **Database changes:** Modify `models.py` and restart the backend
4. **Environment changes:** Restart both services after updating `.env` files

Next: Read [Architecture](./architecture.md) to understand how the system works.