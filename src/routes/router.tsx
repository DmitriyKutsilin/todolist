import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import App from '../app/App'
import { Login } from 'features/Login/Login'
import { TodolistsList } from 'features/TodolistsList/TodolistsList'
import { ErrorPage } from 'components/ErrorPage/ErrorPage'
import React from 'react'
import { PrivateRoutes } from './PrivateRoutes'

export const PATH = {
  TODOLISTS: '/todolists',
  LOGIN: '/login',
  ERROR: '*',
}

const privateRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={PATH.TODOLISTS} />,
  },
  {
    path: PATH.TODOLISTS,
    element: <TodolistsList />,
  },
]

const publicRoutes: RouteObject[] = [
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Navigate to={PATH.ERROR} />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
  {
    path: PATH.ERROR,
    element: <ErrorPage />,
  },
])

//---------------------------------------------------
// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App/>,
//         errorElement: <Navigate to={PATH.ERROR}/>,
//         children: [
//             {
//                 index: true,
//                 element: <Navigate to={PATH.TODOLISTS}/>
//             },
//             {
//                 path: PATH.LOGIN,
//                 element: <Login/>,
//             },
//             {
//                 path: PATH.TODOLISTS,
//                 element: <TodolistsList/>,
//             }
//         ]
//     },
//     {
//         path: PATH.ERROR,
//         element: <ErrorPage/>
//     }
// ])
