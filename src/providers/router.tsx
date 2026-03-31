import { createBrowserRouter } from "react-router-dom";
import { Login } from "../components/auth/Login";
import App from "../App";
import { Main } from "../components/main/Main";

const isAuth = () => localStorage.getItem("auth") === "true";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Main />,
  },
]);
