import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Forum = [
  {
    path: '/forum/article/list',
    component: lazy(() => import('../../../views/backend/forum/article/list')),
    meta: {
      action: 'read',
      resource: 'article'
    }
  },
  {
    path: '/forum/discussion/list',
    component: lazy(() => import('../../../views/backend/forum/discussion/list')),
    meta: {
      action: 'read',
      resource: 'discussion'
    }
  },
  {
    path: '/forum/discussion/show/:id',
    component: lazy(() => import('../../../views/backend/forum/discussion/save')),
    meta: {
      navLink: '/backend/forum/discussion/save',
      action: 'read',
      resource: 'discussion'
    }
  }
]

export default Forum
