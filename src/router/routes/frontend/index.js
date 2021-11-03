import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const FrontRoutes = [
  {
    path: '/home',
    component: lazy(() => import('../../../views/frontend/Home')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/learning-space',
    component: lazy(() => import('../../../views/frontend/LearnSpace')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/forum',
    component: lazy(() => import('../../../views/frontend/Forum')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  }
]

export default FrontRoutes
