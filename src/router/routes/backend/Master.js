import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Master = [
  {
    path: '/master/departemen/list',
    component: lazy(() => import('../../../views/backend/master/departemen/list')),
    meta: {
      action: 'read',
      resource: 'departemen'
    }
  },
  {
    path: '/master/departemen/save/:id',
    component: lazy(() => import('../../../views/backend/master/departemen/save')),
    meta: {
      navLink: '/backend/master/departemen/save',
      action: 'read',
      resource: 'departemen'
    }
  },
  {
    path: '/master/departemen/save',
    component: lazy(() => import('../../../views/backend/master/departemen/save')),
    meta: {
      navLink: '/backend/master/departemen/save',
      action: 'read',
      resource: 'departemen'
    }
  }
]

export default Master
