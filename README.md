# Launch Pad - Project Starter Tool MVP

> NOTE: This is NOT intended for production use. This is a personal project to test out a few technologies and build a simple MVP.

This MVP is a simple web application designed to help solo entrepreneurs start new side projects. It allows users to define their project, set success criteria, and track their progress.

## Features

- [ ] Add new projects with descriptions and success criteria.
- [ ] View and track the progress of projects.

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS
- Backend: Python FastAPI
- Database: SQLite
- Getting Started
- Prerequisites

Ensure you have the following installed:

- Node.js and npm (for React)
- Python 3.x (for FastAPI)

## Backend Setup

Clone the repository:

```bash
git clone [repository-url]
cd [repository-name]
```

Install Python dependencies:

```bash
pip install fastapi[all]
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

## Frontend Setup

### Pre-requisites

Initial steps to create the Next.js app:

```bash
npx create-next-app@latest
```

### Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install npm packages:

```bash
npm install
```

Start the React app:

```bash
npm start
```

## Usage

1. Open the web application:

- The React app will be running at http://localhost:3000.
- The FastAPI server will be accessible at http://localhost:8000.

2. Add a New Project:

- Use the form on the webpage to enter the project name, description, and success criteria.
- Submit the form to save the project.

3. View and Track Projects:

- View the list of projects and their details on the main page.
- Track your progress by updating the project details as needed.

## Contributing

Feedback and contributions are welcome. Please open an issue or submit a pull request for any enhancements.
