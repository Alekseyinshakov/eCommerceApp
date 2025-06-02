import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { RouterProvider, Navigate, createHashRouter } from 'react-router-dom'

import { ErrorPage } from '@pages/ErrorPage/ErrorPage'
import { SignUpPage } from '@pages/AuthForms/SignUpPage'
import { LoginPage } from '@pages/AuthForms/LoginPage'
import { HomePage } from '@pages/Home/HomePage'
import { ShopPage } from '@pages/Shop/ShopPage'
import { AboutPage } from '@pages/About/AboutPage'
import { PlantCarePage } from '@pages/PlantCare/PlantCarePage'
import { CartPage } from '@pages/Cart/CartPage'
import RedirectIfAuth from '@components/Redirects/RedirectIfAuth'
import { ProfilePage } from '@pages/Profile/ProfilePage'
import RedirectNonAuthToLogin from '@components/Redirects/RedirectNonAuthToLogin.tsx'
import ProductDetail from '@store/ProductDetail'
import ShopLayout from '@pages/Shop/ShopLayout'

const router = createHashRouter([
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
        handle: { breadcrumb: 'Home' },
        element: <HomePage />,
      },
      {
        path: '/shop',
        element: <ShopLayout />,
        handle: { breadcrumb: 'Shop' },
        children: [
          {
            index: true,
            element: <ShopPage />,
          },
          {
            path: 'category/:slugCategory',
            element: <ShopPage />,
            handle: {
              breadcrumb: ({ slugCategory }: { slugCategory: string }) =>
                slugCategory.replace(/-/g, ' '),
            },
          },
          {
            path: 'category/:slugCategory/:slug',
            element: <ProductDetail />,
            handle: {
              breadcrumb: ({
                slugCategory,
                slug,
              }: {
                slugCategory: string
                slug: string
              }) => [
                {
                  name: slugCategory.replace(/-/g, ' '),
                  path: `category/${slugCategory}`,
                },
                { name: slug.replace(/-/g, ' '), path: '' },
              ],
            },
          },
          {
            path: ':slug',
            element: <ProductDetail />,
            handle: {
              breadcrumb: ({ slug }: { slug: string }) => slug,
            },
          },
        ],
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
        element: (
          <RedirectNonAuthToLogin>
            <ProfilePage />
          </RedirectNonAuthToLogin>
        ),
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
