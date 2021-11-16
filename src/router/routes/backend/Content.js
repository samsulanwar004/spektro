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
  },
  {
    path: '/content/announcement/list',
    component: lazy(() => import('../../../views/backend/content/announcement/list')),
    meta: {
      action: 'read',
      resource: 'announcement'
    }
  },
  {
    path: '/content/announcement/save/:id',
    component: lazy(() => import('../../../views/backend/content/announcement/save')),
    meta: {
      navLink: '/backend/content/announcement/save',
      action: 'read',
      resource: 'announcement'
    }
  },
  {
    path: '/content/announcement/save',
    component: lazy(() => import('../../../views/backend/content/announcement/save')),
    meta: {
      navLink: '/backend/content/announcement/save',
      action: 'read',
      resource: 'announcement'
    }
  },
  {
    path: '/content/partner/list',
    component: lazy(() => import('../../../views/backend/content/partner/list')),
    meta: {
      action: 'read',
      resource: 'partner'
    }
  },
  {
    path: '/content/partner/save/:id',
    component: lazy(() => import('../../../views/backend/content/partner/save')),
    meta: {
      navLink: '/backend/content/partner/save',
      action: 'read',
      resource: 'partner'
    }
  },
  {
    path: '/content/partner/save',
    component: lazy(() => import('../../../views/backend/content/partner/save')),
    meta: {
      navLink: '/backend/content/partner/save',
      action: 'read',
      resource: 'partner'
    }
  },
  {
    path: '/content/testimoni/list',
    component: lazy(() => import('../../../views/backend/content/testimoni/list')),
    meta: {
      action: 'read',
      resource: 'testimoni'
    }
  },
  {
    path: '/content/testimoni/save/:id',
    component: lazy(() => import('../../../views/backend/content/testimoni/save')),
    meta: {
      navLink: '/backend/content/testimoni/save',
      action: 'read',
      resource: 'testimoni'
    }
  },
  {
    path: '/content/testimoni/save',
    component: lazy(() => import('../../../views/backend/content/testimoni/save')),
    meta: {
      navLink: '/backend/content/testimoni/save',
      action: 'read',
      resource: 'testimoni'
    }
  }
]

export default Course
