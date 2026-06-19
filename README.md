# Task Manager

Task management application built with C# .NET, React, and SQLite.

## Features

- Create, edit, and delete tasks
- Set task priority (High, Medium, Low)
- Mark tasks as complete with automatic timestamp
- Active tasks sorted by priority
- Two column layout separating active and completed tasks

## Tech Stack

**Backend**

- C# .NET 10
- Entity Framework Core
- SQLite

**Frontend**

- React
- JavaScript
- CSS

## Project Structure

**Backend**

- `Models/` — database models
- `DTOs/` — data transfer objects for incoming requests
- `Services/` — business logic and database operations
- `Controllers/` — API endpoints and HTTP responses
- `Data/` — database context and configuration

**Frontend**

- `src/components/` — React components
- `src/services/` — API calls to the backend

## Getting Started

### Prerequisites

- .NET 10 SDK
- Node.js

### Running the Backend

```bash
cd TaskManager.api
dotnet ef database update
dotnet run
```

Backend runs on http://localhost:5130

### Running the Frontend

```bash
cd task-manager-client
npm install
npm start
```

Frontend runs on http://localhost:3000

## API Endpoints

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/task      | Get all tasks  |
| GET    | /api/task/{id} | Get task by id |
| POST   | /api/task      | Create a task  |
| PUT    | /api/task/{id} | Update a task  |
| DELETE | /api/task/{id} | Delete a task  |
