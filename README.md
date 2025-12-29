# System Design Learning Platform

A full-stack learning platform for system design with video tutorials, reading content, assignments, and quizzes.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Python (FastAPI) with async/await
- **Database**: MongoDB (Motor async driver)

## Project Structure
```
Platform/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── config.py           # Configuration settings
│   ├── requirements.txt    # Python dependencies
│   ├── seed_data.py        # Sample data seeder
│   ├── models/             # MongoDB models
│   └── routes/             # API endpoints
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/            # API client
    │   ├── components/     # React components
    │   └── pages/          # Page components
    └── package.json
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB (running locally or MongoDB Atlas)

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example)
copy .env.example .env

# Seed the database with sample data
python seed_data.py

# Run the backend server
python app.py
# Or use uvicorn directly:
uvicorn app:app --reload --port 5000
```
Backend runs at: http://localhost:5000
API docs at: http://localhost:5000/docs

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm start
```
Frontend runs at: http://localhost:3000

## API Endpoints

### Tutorials
- `GET /api/tutorials` - Get all tutorials
- `GET /api/tutorials/:id` - Get tutorial by ID
- `POST /api/tutorials` - Create tutorial
- `PUT /api/tutorials/:id` - Update tutorial
- `DELETE /api/tutorials/:id` - Delete tutorial

### Content
- `GET /api/content` - Get all content
- `GET /api/content/:id` - Get content by ID
- `GET /api/content/search?q=query` - Search content
- `POST /api/content` - Create content

### Assignments
- `GET /api/assignments` - Get all assignments
- `GET /api/assignments/:id` - Get assignment by ID
- `POST /api/assignments/:id/submit` - Submit assignment

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz by ID
- `POST /api/quizzes/:id/submit` - Submit quiz answers

## Features
- Video tutorial watching with filtering by difficulty
- Reading content with search functionality
- Assignment submissions with requirements checklist
- Interactive quizzes with immediate feedback and scoring
