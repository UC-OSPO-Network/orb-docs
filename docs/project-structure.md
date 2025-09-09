---
sidebar_position: 8
---

# Project Structure

Directory layout and key files.

## Root Directory
```
orb-showcase/
├── frontend/           # Next.js application
├── backend/            # FastAPI application  
├── data/              # Repository data files
├── docker-compose.yml # Docker setup
└── README.md          # Setup instructions
```

## Frontend (`frontend/`)
```
frontend/
├── app/               # Next.js App Router pages
│   ├── page.tsx      # Homepage
│   ├── layout.tsx    # Root layout
│   ├── repositories/ # Repository pages
│   ├── about/        # About page
│   └── connect/      # Contact page
├── components/        # React components
│   ├── RepositoryCard.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ui/           # shadcn/ui components
├── store/            # Zustand state management
│   └── repositories.ts
├── lib/              # Utility functions
├── package.json      # Dependencies
└── tailwind.config.ts # Tailwind CSS config
```

## Backend (`backend/`)
```
backend/
├── main.py           # FastAPI app and routes
├── models.py         # Database models
├── database.py       # Database connection
├── keys.py           # Environment config
├── requirements.txt  # Python dependencies
└── Dockerfile        # Docker build config
```

## Key Files

### Frontend
- **`app/page.tsx`** - Homepage component
- **`components/RepositoryCard.tsx`** - Repository display component
- **`store/repositories.ts`** - Application state management
- **`package.json`** - Dependencies including Next.js, React, Tailwind

### Backend  
- **`main.py`** - API endpoints and FastAPI configuration
- **`models.py`** - Repository data model using SQLModel
- **`database.py`** - PostgreSQL connection setup
- **`requirements.txt`** - Python packages (FastAPI, SQLModel, etc.)

### Configuration
- **`docker-compose.yml`** - Multi-service Docker setup
- **`frontend/.env`** - Frontend environment variables
- **`backend/.env`** - Backend database connection