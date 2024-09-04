import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import { isAuthenticated } from "../helpers/auth";
import Navbar from "../components/Navbar";

const router = createBrowserRouter([
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
        return redirect("/login");
      }
      return null;
    },
  },
  {
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
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
    ],
  },
]);

export default router;
