import { lazy } from 'react'

const Dashboard = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../../views/backend/dashboard')),
    meta: {
      action: 'read',
      resource: 'dashboard'
    }
  }
]

export default Dashboard
