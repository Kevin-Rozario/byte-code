# Byte Code Frontend

A modern, feature-rich frontend for the Byte Code coding practice platform. This application enables users to solve coding challenges, manage custom playlists, track progress, and more—all with a beautiful, responsive UI.

## Features

- **Interactive Code Editor:** Write, run, and test code directly in the browser using Monaco Editor.
- **Comprehensive Problem Library:** Browse and filter a wide range of coding problems by difficulty and topic.
- **Real-time Feedback:** Instantly see results and detailed feedback for code submissions.
- **Progress Tracking:** Visualize your problem-solving journey and submission history.
- **Custom Playlists:** Create, manage, and share playlists of coding problems for focused practice or interview prep.
- **User Authentication:** Secure sign-up, sign-in, and profile management.
- **Community Solutions:** Explore and learn from solutions shared by other users.

## Tech Stack

- **Framework:** React 19, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** TanStack Router
- **UI Components:** Radix UI, Lucide React, custom components
- **Code Editor:** Monaco Editor
- **Form Validation:** React Hook Form, Zod
- **HTTP Client:** Axios
- **Animations & UX:** Framer Motion, React Hot Toast

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
cd frontend
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
# or
yarn build
```

### Linting & Formatting

```bash
npm run lint
npm run prettier
```

## Project Structure

- `src/pages/` — Main application pages (Home, Problems, Playlists, Profile, etc.)
- `src/components/` — Reusable UI components and feature modules
- `src/blocks/` — Landing page and marketing sections
- `src/stores/` — Zustand state management stores
- `src/lib/` — Utilities, API config, and validation schemas

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.
