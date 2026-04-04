// src/components/protected/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth, type Role } from '../../context/AuthContext';
import type { JSX } from 'react';

type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles?: Role[];
};

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // или страница "нет доступа"
  }

  return children;
};