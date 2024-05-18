import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/Auth/signin.tsx";
import SignUp from "./pages/Auth/signup.tsx";
import App from "./App.tsx";
import HomePage from "./pages/Home/homePage.tsx";
import VerifyEmail from "./pages/Auth/verifyEmail.tsx";
import ForgoutPassword from "./pages/redefinePassword/forgoutPassword.tsx";
import RedefinePassword from "./pages/redefinePassword/redefinePassword.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/auth/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  { path: "/forgout-password", element: <ForgoutPassword /> },
  {
    path: "/redefine-password",
    element: <RedefinePassword />,
  },
  {
    path: "/user/verify-email/:token?",
    element: <VerifyEmail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
