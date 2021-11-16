import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Course = [
  {
    path: '/content/banner/list',
    component: lazy(() => import('../../../views/backend/content/banner/list')),
    meta: {
      action: 'read',
      resource: 'banner'
    }
  },
  {
    path: '/content/banner/save/:id',
    component: lazy(() => import('../../../views/backend/content/banner/save')),
    meta: {
      navLink: '/backend/content/banner/save',
      action: 'read',
      resource: 'banner'
    }
  },
  {
    path: '/content/banner/save',
    component: lazy(() => import('../../../views/backend/content/banner/save')),
    meta: {
      navLink: '/backend/content/banner/save',
      action: 'read',
      resource: 'banner'
    }
  }
]

export default Course
