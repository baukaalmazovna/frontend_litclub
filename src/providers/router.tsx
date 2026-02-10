import { createBrowserRouter } from "react-router-dom";
import { Login } from "../components/auth/Login";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
]);