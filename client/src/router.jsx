import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { isAuthenticated } from "./helpers/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: () => {
      if (!isAuthenticated()) {
        return redirect("/login");
      }
      return null;
    },
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (isAuthenticated()) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      if (isAuthenticated()) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;
