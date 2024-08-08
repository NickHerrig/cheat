import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root.jsx";
import Login, { action as loginAction } from "./routes/login.jsx";
import Account, { loader as accountLoader } from "./routes/account.jsx";
import { action as logoutAction } from "./routes/logout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/logout",
    action: logoutAction,
  },
  {
    path: "/account",
    element: <Account />,
    loader: accountLoader,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
