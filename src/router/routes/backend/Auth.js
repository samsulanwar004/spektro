import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AuthRoutes = [
  {
    path: '/login',
    component: lazy(() => import('../../../views/backend/auth/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  }
]

export default AuthRoutes
