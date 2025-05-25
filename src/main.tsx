import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import { ErrorPage } from '@pages/ErrorPage/ErrorPage'
import { SignUpPage } from '@pages/AuthForms/SignUpPage'
import { LoginPage } from '@pages/AuthForms/LoginPage'
import { HomePage } from '@pages/Home/HomePage'
import { ShopPage } from '@pages/Shop/ShopPage'
import { AboutPage } from '@pages/About/AboutPage'
import { PlantCarePage } from '@pages/PlantCare/PlantCarePage'
import { CartPage } from '@pages/Cart/CartPage'
import RedirectIfAuth from '@components/RedirectIfAuth/RedirectIfAuth'
import { ProfilePage } from '@pages/Profile/ProfilePage'

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
        element: (
          <RedirectIfAuth>
            <SignUpPage />
          </RedirectIfAuth>
        ),
      },
      {
        path: '/log-in',
        element: (
          <RedirectIfAuth>
            <LoginPage />
          </RedirectIfAuth>
        ),
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/shop',
        element: <ShopPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/plant-care',
        element: <PlantCarePage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
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
