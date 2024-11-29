import { createBrowserRouter } from 'react-router-dom'
import App from 'app/App'
import { Login } from 'features/Login/Login'
import React from 'react'
import { Page404 } from 'common/components/Page404/Page404'
import { Main } from 'app/Main'

export const PATH = {
  LOGIN: '/login',
} as const

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: PATH.LOGIN,
        element: <Login />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
])

//   {
//     index: true,
//     element: <Navigate to={PATH.TODOLISTS} />,
// }
