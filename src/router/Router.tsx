import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import layoutRoute from "./routes/layout.tsx";
import loginRoute from './routes/login.tsx'
import notfoundRoute from './routes/notfound.tsx'

const routes = [
  layoutRoute,
  loginRoute,
  notfoundRoute, // Keep this route be the last of this array.
]

const router = createBrowserRouter(routes)

const Router: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router
