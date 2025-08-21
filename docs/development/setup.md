---
sidebar_position: 1
---

# Development Setup

This guide provides detailed instructions for setting up a complete development environment for UC ORB Showcase, including all dependencies, tools, and configurations needed for effective development.

## System Requirements

### Hardware Requirements
- **RAM**: Minimum 8GB, recommended 16GB+
- **Storage**: At least 5GB free space for dependencies and data
- **CPU**: Modern multi-core processor (development servers can be resource-intensive)

### Operating System Support
- **macOS**: 10.15+ (Catalina or later)
- **Linux**: Ubuntu 18.04+, CentOS 7+, or equivalent
- **Windows**: Windows 10+ with WSL2 recommended

## Core Dependencies

### 1. Node.js and npm

**Installation:**

**macOS (using Homebrew):**
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js (includes npm)
brew install node@18

# Verify installation
node --version  # Should show v18.x.x or later
npm --version   # Should show 9.x.x or later
```

**Linux (Ubuntu/Debian):**
```bash
# Update package index
sudo apt update

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

**Windows:**
```bash
# Download and install from nodejs.org
# Or use Chocolatey
choco install nodejs

# Or use winget
winget install OpenJS.NodeJS
```

**Alternative: Using Node Version Manager (nvm)**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or source profile
source ~/.bashrc

# Install and use Node.js 18
nvm install 18
nvm use 18
nvm alias default 18
```

### 2. Python 3.9+

**macOS:**
```bash
# Using Homebrew
brew install python@3.11

# Verify installation
python3 --version  # Should show 3.9+ or later
pip3 --version
```

**Linux (Ubuntu/Debian):**
```bash
# Update package index
sudo apt update

# Install Python 3.11
sudo apt install python3.11 python3.11-venv python3.11-pip

# Create symlinks (optional)
sudo ln -sf /usr/bin/python3.11 /usr/bin/python3
sudo ln -sf /usr/bin/pip3 /usr/bin/pip
```

**Windows:**
```bash
# Download from python.org
# Or use Chocolatey
choco install python

# Or use winget
winget install Python.Python.3.11
```

### 3. PostgreSQL 15+

**macOS:**
```bash
# Using Homebrew
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Create database user (optional)
createuser -s postgres
```

**Linux (Ubuntu/Debian):**
```bash
# Add PostgreSQL official repository
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update

# Install PostgreSQL 15
sudo apt install postgresql-15 postgresql-client-15

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Docker Alternative (Recommended for Development):**
```bash
# Install Docker Desktop from docker.com
# Or use package manager

# macOS
brew install --cask docker

# Linux (Ubuntu)
sudo apt install docker.io docker-compose

# Start PostgreSQL container
docker run -d \
  --name orb-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=orb \
  -e POSTGRES_DB=sample \
  -p 5432:5432 \
  postgres:15
```

### 4. Git

**macOS:**
```bash
# Usually pre-installed, or via Xcode Command Line Tools
xcode-select --install

# Or via Homebrew
brew install git
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install git

# CentOS/RHEL
sudo yum install git
```

**Windows:**
```bash
# Download from git-scm.com
# Or use Chocolatey
choco install git

# Or use winget
winget install Git.Git
```

## Development Tools

### 1. Code Editor (VS Code Recommended)

**Installation:**
```bash
# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install code

# Windows
winget install Microsoft.VisualStudioCode
```

**Recommended VS Code Extensions:**
```bash
# Install via VS Code Extensions panel or command line
code --install-extension ms-python.python
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension ms-vscode.vscode-json
code --install-extension ckolkman.vscode-postgres
code --install-extension ms-vscode.vscode-eslint
```

### 2. Database Management Tools

**pgAdmin (GUI):**
```bash
# macOS
brew install --cask pgadmin4

# Linux
sudo apt install pgadmin4

# Windows
winget install PostgreSQL.pgAdmin
```

**psql (Command Line):**
```bash
# Usually installed with PostgreSQL
# Test connection
psql postgresql://postgres:orb@localhost:5432/sample
```

**VS Code PostgreSQL Extension:**
```bash
# Install PostgreSQL extension for VS Code
code --install-extension ckolkman.vscode-postgres
```

## Project Setup

### 1. Clone Repository

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/orb-showcase.git
cd orb-showcase

# Add upstream remote
git remote add upstream https://github.com/UC-OSPO-Network/orb-showcase.git

# Verify remotes
git remote -v
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
# macOS/Linux:
source .venv/bin/activate
# Windows:
.venv\Scripts\activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env file with your settings
nano .env  # or use your preferred editor
```

**Backend Environment Configuration (.env):**
```bash
# Database Configuration
POSTGRES_DB_URL=postgresql://postgres:orb@localhost:5432/sample

# Optional: GitHub API token for enhanced rate limits
GITHUB_TOKEN=your_github_token_here

# Development settings
DEBUG=true
LOG_LEVEL=debug
```

### 3. Database Setup

**Option A: Docker (Recommended)**
```bash
# Start PostgreSQL container
docker run -d \
  --name orb-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=orb \
  -e POSTGRES_DB=sample \
  -p 5432:5432 \
  postgres:15

# Wait for container to start
sleep 10

# Test connection
docker exec orb-db psql -U postgres -d sample -c "SELECT version();"
```

**Option B: Local PostgreSQL**
```bash
# Create database
createdb sample

# Create user (if needed)
createuser -s postgres
```

**Load Sample Data:**
```bash
# If sample data exists
cat db/sample.sql | docker exec -i orb-db psql -U postgres -d sample

# Or create minimal schema for development
docker exec -i orb-db psql -U postgres -d sample << EOF
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

INSERT INTO repositories (full_name, description, university, language, approved) VALUES
('uc-berkeley/example-repo', 'Example repository for testing', 'UC Berkeley', 'Python', true),
('ucla/sample-project', 'Sample project from UCLA', 'UCLA', 'JavaScript', true),
('ucsd/research-tool', 'Research tool from UC San Diego', 'UC San Diego', 'R', true);
EOF
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit environment file
nano .env.local
```

**Frontend Environment Configuration (.env.local):**
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional: Analytics or other services
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## Development Workflow

### 1. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
source .venv/bin/activate  # Activate virtual environment
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Should show:
# INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
# INFO:     Started reloader process
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev

# Should show:
# ▲ Next.js 15.x.x
# - Local:        http://localhost:3000
# - Network:      http://192.168.x.x:3000
```

### 2. Verify Setup

**Test Backend:**
```bash
# Test API endpoints
curl http://localhost:8000/repositories
curl http://localhost:8000/universities
curl http://localhost:8000/languages

# Check API documentation
open http://localhost:8000/docs
```

**Test Frontend:**
```bash
# Visit frontend
open http://localhost:3000

# Test pages:
# - Home page should load
# - Repositories page should show data
# - Search and filtering should work
```

### 3. Development Commands

**Backend Commands:**
```bash
# Start development server
uvicorn main:app --reload

# Run with debug logging
uvicorn main:app --reload --log-level debug

# Check code style
black .
isort .

# Type checking (if mypy is installed)
mypy main.py models.py
```

**Frontend Commands:**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npx tsc --noEmit
```

## IDE Configuration

### VS Code Settings

Create `.vscode/settings.json` in project root:
```json
{
  "python.defaultInterpreterPath": "./backend/.venv/bin/python",
  "python.terminal.activateEnvironment": true,
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### VS Code Tasks

Create `.vscode/tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Backend",
      "type": "shell",
      "command": "cd backend && source .venv/bin/activate && uvicorn main:app --reload",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "label": "Start Frontend",
      "type": "shell",
      "command": "cd frontend && npm run dev",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    }
  ]
}
```

## Environment Validation

### Validation Script

Create a validation script to check your setup:

```bash
# Create validation script
cat > validate-setup.sh << 'EOF'
#!/bin/bash

echo "🔍 Validating UC ORB Showcase Development Setup..."

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js: $NODE_VERSION"
else
    echo "❌ Node.js not found"
    exit 1
fi

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ Python: $PYTHON_VERSION"
else
    echo "❌ Python3 not found"
    exit 1
fi

# Check PostgreSQL (Docker)
if docker ps | grep -q orb-db; then
    echo "✅ PostgreSQL: Running in Docker"
elif command -v psql &> /dev/null; then
    echo "✅ PostgreSQL: Local installation"
else
    echo "❌ PostgreSQL not found"
    exit 1
fi

# Check Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo "✅ Git: $GIT_VERSION"
else
    echo "❌ Git not found"
    exit 1
fi

# Check backend dependencies
if [ -f "backend/.venv/bin/python" ]; then
    echo "✅ Backend: Virtual environment exists"
    if backend/.venv/bin/python -c "import fastapi" 2>/dev/null; then
        echo "✅ Backend: Dependencies installed"
    else
        echo "❌ Backend: Dependencies missing"
        exit 1
    fi
else
    echo "❌ Backend: Virtual environment not found"
    exit 1
fi

# Check frontend dependencies
if [ -d "frontend/node_modules" ]; then
    echo "✅ Frontend: Dependencies installed"
else
    echo "❌ Frontend: Dependencies missing"
    exit 1
fi

# Test database connection
if docker exec orb-db psql -U postgres -d sample -c "SELECT 1;" &> /dev/null; then
    echo "✅ Database: Connection successful"
else
    echo "❌ Database: Connection failed"
    exit 1
fi

echo "🎉 Setup validation complete! You're ready to develop."
EOF

chmod +x validate-setup.sh
./validate-setup.sh
```

## Troubleshooting Setup Issues

### Common Issues

1. **Port Conflicts**
```bash
# Check what's using ports 3000 and 8000
lsof -i :3000
lsof -i :8000

# Kill processes if needed
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:8000)
```

2. **Permission Issues**
```bash
# Fix npm permissions (macOS/Linux)
sudo chown -R $(whoami) ~/.npm

# Fix Python permissions
sudo chown -R $(whoami) backend/.venv
```

3. **Docker Issues**
```bash
# Restart Docker service
sudo systemctl restart docker  # Linux
# Or restart Docker Desktop

# Remove and recreate container
docker rm -f orb-db
docker run -d --name orb-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=orb -e POSTGRES_DB=sample -p 5432:5432 postgres:15
```

### Getting Help

If you encounter issues:
1. Check the [Troubleshooting Guide](../troubleshooting)
2. Search existing GitHub issues
3. Create a new issue with detailed error messages
4. Ask in GitHub Discussions

Your development environment is now ready! Continue to the [Getting Started](../getting-started) guide to learn about the development process.