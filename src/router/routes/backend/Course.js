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
  },
  {
    path: '/course/topik/list',
    component: lazy(() => import('../../../views/backend/course/topik/list')),
    meta: {
      action: 'read',
      resource: 'topik'
    }
  },
  {
    path: '/course/topik/save/:id',
    component: lazy(() => import('../../../views/backend/course/topik/save')),
    meta: {
      navLink: '/backend/course/topik/save',
      action: 'read',
      resource: 'topik'
    }
  },
  {
    path: '/course/topik/save',
    component: lazy(() => import('../../../views/backend/course/topik/save')),
    meta: {
      navLink: '/backend/course/topik/save',
      action: 'read',
      resource: 'topik'
    }
  },
  {
    path: '/course/certificate/list',
    component: lazy(() => import('../../../views/backend/course/certificate/list')),
    meta: {
      action: 'read',
      resource: 'certificate'
    }
  },
  {
    path: '/course/certificate/save/:id',
    component: lazy(() => import('../../../views/backend/course/certificate/save')),
    meta: {
      navLink: '/backend/course/certificate/save',
      action: 'read',
      resource: 'certificate'
    }
  },
  {
    path: '/course/certificate/save',
    component: lazy(() => import('../../../views/backend/course/certificate/save')),
    meta: {
      navLink: '/backend/course/certificate/save',
      action: 'read',
      resource: 'certificate'
    }
  },
  {
    path: '/course/trainer/list',
    component: lazy(() => import('../../../views/backend/course/trainer/list')),
    meta: {
      action: 'read',
      resource: 'trainer'
    }
  },
  {
    path: '/course/trainer/save/:id',
    component: lazy(() => import('../../../views/backend/course/trainer/save')),
    meta: {
      navLink: '/backend/course/trainer/save',
      action: 'read',
      resource: 'trainer'
    }
  },
  {
    path: '/course/trainer/save',
    component: lazy(() => import('../../../views/backend/course/trainer/save')),
    meta: {
      navLink: '/backend/course/trainer/save',
      action: 'read',
      resource: 'trainer'
    }
  }
]

export default Course
