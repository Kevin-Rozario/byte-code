# Byte Code

Byte Code is a full-stack coding practice platform designed to help users improve their programming skills through interactive problem solving, real-time code execution, and personalized learning tools. The project features a modern web interface, robust backend API, and seamless integration for a complete coding experience.

## Project Overview

- **Solve Coding Problems:** Practice with a comprehensive library of coding challenges across various topics and difficulty levels.
- **Real-Time Code Execution:** Instantly run and test code in multiple languages using an integrated code execution engine.
- **User Progress Tracking:** Visualize your progress, track solved problems, and review submission history.
- **Custom Playlists:** Organize problems into playlists for focused study or interview preparation.
- **Community & Sharing:** Explore community solutions and share your own.

## Architecture

- **Frontend:**
  - Built with React, TypeScript, Vite, Tailwind CSS
  - Features a responsive UI, code editor, and user dashboards
  - See [frontend/README.md](./frontend/README.md) for details

- **Backend:**
  - Node.js, Express.js, Prisma ORM (PostgreSQL)
  - Handles authentication, problem management, code execution (Judge0), submissions, and playlists
  - See [backend/README.md](./backend/README.md) for details

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Zustand, Monaco Editor, TanStack Router
- **Backend:** Node.js, Express.js, Prisma, PostgreSQL, JWT, Judge0 API, Nodemailer

## Getting Started

Each part of the project (frontend and backend) has its own README with setup instructions. In general:

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd byte-code
   ```
2. **Set up the backend:**
   - See [backend/README.md](./backend/README.md)
3. **Set up the frontend:**
   - See [frontend/README.md](./frontend/README.md)

## License

This project is licensed under the MIT License.
