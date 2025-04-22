# MERN Fullstack App

This is a fullstack JavaScript application built using:

- **Frontend:** React (via Create React App)
- **Backend:** Node.js with Express (via Express Generator)
- **Database:** MongoDB

---

## 🚀 Getting Started

### 1. Install Dependencies

From the root directory:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Development Mode

To run both the backend and frontend together:

```bash
npm run dev
```

This uses concurrently to start:

React dev server on http://localhost:3000

Express backend on http://localhost:3001

### 🌐 Proxy Setup

To allow your React frontend to make API requests to the backend without CORS issues, a proxy is set in frontend/package.json:

```bash
"proxy": "http://localhost:3001"
```

This lets you use relative paths like /api/users instead of the full URL.

### 🛠 Available Scripts

**From the root:**

- npm run dev — run frontend and backend together

- npm run server — run only the backend

- npm run client — run only the frontend

These are defined in the root package.json:

```
"scripts": {
  "dev": "concurrently \"npm run server\" \"npm run client\"",
  "server": "cd backend && nodemon ./bin/www",
  "client": "cd frontend && npm start"
}
```