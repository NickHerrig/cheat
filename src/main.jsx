import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root, {loader as rootLoader} from "./routes/root.jsx";
import ErrorPage from "./routes/error-page.jsx";
import Index from "./routes/index.jsx";
import Login, { action as loginAction } from "./routes/login.jsx";
import Account, { loader as accountLoader } from "./routes/account.jsx";
import { action as logoutAction } from "./routes/logout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Index />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/logout",
        action: logoutAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/account",
        element: <Account />,
        loader: accountLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
