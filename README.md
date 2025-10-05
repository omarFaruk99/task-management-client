# Task Manager — Full Stack React Assessment

A professional, production-oriented Task Management web client built with Next.js, React and Axios. This repository demonstrates modern practices for building a maintainable, testable and secure single-page application that consumes a REST API backend.

Key points

- Clean component structure and context-based auth
- Axios service layer with interceptors for auth and error handling
- Tailwind CSS for responsive UI
- Focus on developer experience and clarity

## Features

- Authentication: login and registration flows with token persistence
- Dashboard: create, filter, edit and delete tasks
- User profile: view and update user details
- Role-based access to protected routes
- Responsive design with Tailwind CSS
- Organized API layer and React contexts for state management

## Technologies

- Next.js (App Router)
- React
- Axios
- Tailwind CSS
- ESLint

## Backend

The server is a separate Node/Express repository:
https://github.com/omarFaruk99/task-management-server

## Quick start

1. Clone and install
   ```bash
   git clone https://github.com/your-username/task-management-client.git
   cd task-management-client
   npm install
   ```
2. Configure environment
   - Create `.env.local` and set:
     ```
     NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
     ```
3. Run development server
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Routes (Frontend)

Below are the primary frontend routes, the files that implement them and short notes about behavior and protection.

- `/` — Home / Landing  
  File: app/page.js  
  Public landing page with links to authentication and dashboard.

- `/auth/login` — Login  
  File: app/auth/login/page.js  
  Authentication form; on success stores token via AuthContext.

- `/auth/register` — Register  
  File: app/auth/register/page.js  
  Registration form that creates a new account and signs in.

- `/dashboard` — Dashboard (protected)  
  File: app/dashboard/page.js  
  Protected route (requires authentication). Renders task list and management UI (TaskList, TaskForm).

- `/profile` — Profile (protected)  
  File: app/profile/page.js  
  Protected user profile page that displays and allows editing of profile data.

- `/users` — Users list (protected)  
  File: app/users/page.jsx  
  Protected admin-style view listing users.

Notes:

- Route protection is implemented with components/auth/ProtectedRoute.jsx and AuthContext (contexts/AuthContext.jsx).
- API calls and auth header handling live in services/api.js (Axios instance and interceptors).
- UI components are in components/, pages/layouts in app/.

## Project structure

- app/ — Next.js routes and layouts
- components/ — Reusable UI and feature components
- services/ — API layer (services/api.js)
- contexts/ — React contexts (AuthProvider)
- public/ — Static assets

## Environment

- NEXT_PUBLIC_API_BASE_URL — base URL for the backend API

## Contribution & Customization

- Edit UI routes in app/, components in components/.
- Extend API calls in services/api.js.
- Authentication state is managed by contexts/AuthContext.jsx and provided in app/layout.js.

## License

For assessment and demonstration purposes.
