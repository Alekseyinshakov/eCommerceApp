import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import { ErrorPage } from '@pages/ErrorPage/ErrorPage'
import { SignUpPage } from '@pages/AuthForms/SignUpPage'
import { LoginPage } from '@pages/AuthForms/LoginPage'
import { HomePage } from '@pages/Home/HomePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/log-in',
        element: <LoginPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
