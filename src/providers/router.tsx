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
import { Catalog } from "../pages/Catalog";
import { Events } from "../pages/Events";
import { ReadingClub } from "../pages/ReadingClubs"; 
import { BookDetails } from "../pages/BookDetails";
import { Exchange } from "../pages/Exchange";


export const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/login", element: <Login /> },
  { path: "/admin_login", element: <AdminLogin /> },
  { path: "/catalog", element: <Catalog /> },
  { path: "/events", element: <Events /> },
  { path: "/club", element: <ReadingClub /> }, 
  { path: "/book/:id", element: <BookDetails /> },
  { path: "/exchange", element: <Exchange /> },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <MainDashboard /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "books", element: <Profile /> },
    ],
  },
]);