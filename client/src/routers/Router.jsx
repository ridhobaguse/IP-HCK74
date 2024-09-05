import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Specification from "../pages/Specification";
import Weapon from "../pages/Weapon";
import Agent from "../pages/Agent";
import Map from "../pages/Map";
// import AgentDetail from "../pages/AgentDetail";
import { isAuthenticated } from "../helpers/auth";
import Navbar from "../components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Footer from "../components/Footer";

const router = createBrowserRouter([
  {
    element: (
      <GoogleOAuthProvider clientId="258777838958-qrjv6a436fvpb9pjk618gdpunhqdq1ns.apps.googleusercontent.com">
        <Outlet />
      </GoogleOAuthProvider>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  //   loader: () => {
  //     if (isAuthenticated()) {
  //       return redirect("/");
  //     }
  //     return null;
  //   },
  // },
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
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/login");
      }
      return null;
    },
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer />
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
      {
        path: "/agent",
        element: <Agent />,
      },
      // {
      //   path: "/agent/id",
      //   element: <AgentDetail />,
      // },
      {
        path: "/specification",
        element: <Specification />,
      },
      {
        path: "/map",
        element: <Map />,
      },
      {
        path: "/weapon",
        element: <Weapon />,
      },
    ],
  },
]);

export default router;
