# Byte Code Backend

A robust backend API for the Byte Code coding practice platform. This service powers user authentication, problem management, code execution, submissions, playlists, and more, supporting a seamless coding experience for the frontend application.

## Features

- **User Authentication:** Secure registration, login, JWT-based sessions, and email verification.
- **Problem Management:** CRUD operations for coding problems, including test cases, constraints, and solutions.
- **Code Execution:** Integrates with Judge0 API for real-time code compilation and execution in multiple languages.
- **Submissions & Evaluation:** Handles user submissions, test case evaluation, and result tracking.
- **Playlists:** Create and manage custom playlists of coding problems.
- **Progress Tracking:** Track solved problems and user statistics.
- **Admin Tools:** Admin endpoints for problem creation and management.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma (PostgreSQL)
- **Authentication:** JWT, bcryptjs
- **Email:** Nodemailer, Mailgen
- **Code Execution:** Judge0 API
- **Validation:** Zod
- **Utilities:** dotenv, morgan, express-rate-limit, cors

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL database

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```
PORT=3000
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
FRONTEND_URLS=http://localhost:5173
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USERNAME=your_mailtrap_username
MAILTRAP_PASSWORD=your_mailtrap_password
JUDGE0_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_judge0_api_key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### Database Setup

1. **Run Migrations:**
   ```bash
   npx prisma migrate dev
   ```
2. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```
3. **Seed the Database (optional):**
   ```bash
   npm run seed
   ```

### Running the Server

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Structure

- `POST   /api/v1/auth/*` — Authentication (register, login, verify, etc.)
- `GET    /api/v1/problems` — List all problems
- `POST   /api/v1/problems` — Create a new problem (admin)
- `GET    /api/v1/problems/:id` — Get problem details
- `POST   /api/v1/code/execute` — Execute code via Judge0
- `POST   /api/v1/submissions` — Submit a solution
- `GET    /api/v1/playlists` — Manage playlists
- `GET    /api/v1/health-check` — Health check endpoint

> For detailed request/response formats, see the route and controller files in `src/routes/` and `src/controllers/`.

## Project Structure

- `src/controllers/` — Business logic for each API module
- `src/routes/` — Express route definitions
- `src/middlewares/` — Authentication, validation, and error handling
- `src/utils/` — Utility functions (API responses, password hashing, etc.)
- `src/config/` — Configuration for DB, email, Judge0, etc.
- `prisma/` — Prisma schema, migrations, and seed scripts
- `data/` — Static or seed data

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.
