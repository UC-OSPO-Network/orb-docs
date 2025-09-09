---
sidebar_position: 1
---

# UC ORB Showcase

A web application for discovering University of California open source repositories. This platform catalogs and showcases open source projects from UC campuses, making them searchable and discoverable.

## Purpose

UC ORB Showcase helps researchers, students, and external collaborators find UC open source projects. It increases visibility and recognition of UC contributions to the open source community.

## Technology Stack

**Frontend:**
- Next.js 15.2.4 with App Router
- React 19 with TypeScript
- Tailwind CSS for styling
- Zustand for state management
- TanStack React Query for data fetching
- Radix UI components

**Backend:**
- FastAPI (Python) REST API
- SQLModel for database ORM
- PostgreSQL database
- CORS enabled for frontend integration

**Deployment:**
- Docker and Docker Compose
- Environment-based configuration

## Key Features

- **Repository Search**: Search by name, description, language, university
- **Filtering**: Filter by programming language, license, owner, university
- **Repository Details**: View repository information, README, funding details
- **Contact Information**: Access maintainer contact details
- **Responsive Design**: Works on desktop and mobile

## Getting Started

New developers should start with the [Getting Started](./getting-started.md) guide to set up the development environment.