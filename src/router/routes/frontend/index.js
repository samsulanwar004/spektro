import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const FrontRoutes = [
  {
    path: '/home',
    component: lazy(() => import('../../../views/frontend/Home')),
    layout: 'FrontendLayout'
  }
]

export default FrontRoutes
