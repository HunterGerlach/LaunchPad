from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://0.0.0.0:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Project(BaseModel):
    name: str
    description: str
    success_criteria: str
    
def init_db():
    conn = sqlite3.connect('projects.db')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            success_criteria TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()
    
init_db()

# Database setup (simple for MVP)
# In real application, consider using SQLAlchemy for ORM
def get_db_connection():
    conn = sqlite3.connect('projects.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.post("/projects/")
async def create_project(project: Project):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO projects (name, description, success_criteria) VALUES (?, ?, ?)',
        (project.name, project.description, project.success_criteria)
    )
    conn.commit()
    project_id = cursor.lastrowid  # Fetch the last inserted ID

    # Fetch the newly created project from the database
    created_project = conn.execute(
        'SELECT * FROM projects WHERE id = ?', (project_id,)
    ).fetchone()
    conn.close()

    # Format the response with project details and success message at the same level
    response = {
        "message": "Project created",
        "id": created_project["id"],
        "name": created_project["name"],
        "description": created_project["description"],
        "success_criteria": created_project["success_criteria"]
    }

    return response



# Example curl command to post a project
# curl -X POST -H "Content-Type: application/json" -d '{"name":"test","description":"test","success_criteria":"test"}' http://localhost:8000/projects/

@app.get("/projects/")
async def read_projects():
    conn = get_db_connection()
    projects = conn.execute('SELECT * FROM projects').fetchall()
    conn.close()
    return {"projects": projects}

@app.get("/health/")
async def health_check():
    return {"status": "healthy"}
