import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Assessment = [
  {
    path: '/assessment/list',
    component: lazy(() => import('../../../views/backend/assessment/list')),
    meta: {
      action: 'read',
      resource: 'assessment'
    }
  },
  {
    path: '/assessment/save/:id',
    component: lazy(() => import('../../../views/backend/assessment/save')),
    meta: {
      navLink: '/backend/assessment/save',
      action: 'read',
      resource: 'assessment'
    }
  },
  {
    path: '/assessment/save',
    component: lazy(() => import('../../../views/backend/assessment/save')),
    meta: {
      navLink: '/backend/assessment/save',
      action: 'read',
      resource: 'assessment'
    }
  }
]

export default Assessment
