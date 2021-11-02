import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Course = [
  {
    path: '/course/course/list',
    component: lazy(() => import('../../../views/backend/course/course/list')),
    meta: {
      action: 'read',
      resource: 'course'
    }
  },
  {
    path: '/course/course/save/:id',
    component: lazy(() => import('../../../views/backend/course/course/save')),
    meta: {
      navLink: '/backend/course/course/save',
      action: 'read',
      resource: 'course'
    }
  },
  {
    path: '/course/course/save',
    component: lazy(() => import('../../../views/backend/course/course/save')),
    meta: {
      navLink: '/backend/course/course/save',
      action: 'read',
      resource: 'course'
    }
  }
]

export default Course
