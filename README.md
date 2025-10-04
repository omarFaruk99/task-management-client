# Task Manager – Full Stack React Assessment

This is a **Task Management** web application built with [Next.js](https://nextjs.org), React, and Axios. It is designed as a full stack developer assessment project, focusing on modern best practices for building scalable, maintainable, and user-friendly task management solutions.

## Features

- **Authentication**: Secure login and registration flows.
- **Dashboard**: Overview of tasks, quick actions, and user stats.
- **Task Management**: Create, update, delete, and filter tasks.
- **User Profiles**: View and edit user information.
- **Role-based Access**: Protected routes for authenticated users.
- **Responsive UI**: Built with Tailwind CSS for mobile and desktop.
- **API Integration**: Axios-based service layer for RESTful backend communication.

## Technologies Used

- [Next.js](https://nextjs.org) (App Router, SSR/CSR)
- [React](https://react.dev)
- [Axios](https://axios-http.com)
- [Tailwind CSS](https://tailwindcss.com)
- [ESLint](https://eslint.org) for code quality

## Setup Procedure

To set up the project after cloning from GitHub:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/task-management-client.git
   cd task-management-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Configure environment variables:**

   - Create a `.env.local` file in the project root.
   - Add your API base URL:
     ```
     NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
     ```
   - For production, set this variable to your production API endpoint.

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Access the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` – Next.js pages and layouts
- `components/` – Reusable UI and logic components
- `services/` – API service layer ([services/api.js](services/api.js))
- `contexts/` – React context providers
- `public/` – Static assets

## Environment Variables

The API base URL is managed via environment variables for flexibility across development and production environments.  
Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` for local development, and configure it in your deployment platform for production.

## Customization

You can start editing the main page by modifying [`app/page.js`](app/page.js). The app supports hot-reloading for rapid development.

## License

This project is intended for assessment and demonstration purposes.

---
