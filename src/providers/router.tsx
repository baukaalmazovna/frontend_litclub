// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { AdminLogin } from "../components/auth/AdminLogin";
import { Main } from "../components/main/Main";
import { MainDashboard } from "../components/dashboard/MainDashboard";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { BooksList } from "../components/admin/books/list/BooksList";
import { ProtectedRoute } from "../components/protected/ProtectedRoute";
import { Profile } from "../components/user/Profile";
import { Layout } from "../components/layout/Layout";

export const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/login", element: <Login /> },
  { path: "/admin_login", element: <AdminLogin /> },

  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={['reader', 'author']}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <MainDashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/admin_dashboard",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/books_list",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <BooksList />
      </ProtectedRoute>
    ),
  },
]);