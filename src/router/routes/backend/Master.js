import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Master = [
  {
    path: '/master/province/list',
    component: lazy(() => import('../../../views/backend/master/province/list')),
    meta: {
      action: 'read',
      resource: 'province'
    }
  },
  {
    path: '/master/province/save/:id',
    component: lazy(() => import('../../../views/backend/master/province/save')),
    meta: {
      navLink: '/backend/master/province/save',
      action: 'read',
      resource: 'province'
    }
  },
  {
    path: '/master/province/save',
    component: lazy(() => import('../../../views/backend/master/province/save')),
    meta: {
      navLink: '/backend/master/province/save',
      action: 'read',
      resource: 'province'
    }
  },
  {
    path: '/master/universitas/list',
    component: lazy(() => import('../../../views/backend/master/universitas/list')),
    meta: {
      action: 'read',
      resource: 'universitas'
    }
  },
  {
    path: '/master/universitas/save/:id',
    component: lazy(() => import('../../../views/backend/master/universitas/save')),
    meta: {
      navLink: '/backend/master/universitas/save',
      action: 'read',
      resource: 'universitas'
    }
  },
  {
    path: '/master/universitas/save',
    component: lazy(() => import('../../../views/backend/master/universitas/save')),
    meta: {
      navLink: '/backend/master/universitas/save',
      action: 'read',
      resource: 'universitas'
    }
  },
  {
    path: '/master/satker/list',
    component: lazy(() => import('../../../views/backend/master/satker/list')),
    meta: {
      action: 'read',
      resource: 'satker'
    }
  },
  {
    path: '/master/satker/save/:id',
    component: lazy(() => import('../../../views/backend/master/satker/save')),
    meta: {
      navLink: '/backend/master/satker/save',
      action: 'read',
      resource: 'satker'
    }
  },
  {
    path: '/master/satker/save',
    component: lazy(() => import('../../../views/backend/master/satker/save')),
    meta: {
      navLink: '/backend/master/satker/save',
      action: 'read',
      resource: 'satker'
    }
  },
  {
    path: '/master/repository_file/list',
    component: lazy(() => import('../../../views/backend/master/repository_file/list')),
    meta: {
      action: 'read',
      resource: 'repository_file'
    }
  },
  {
    path: '/master/repository_file/save/:id',
    component: lazy(() => import('../../../views/backend/master/repository_file/save')),
    meta: {
      navLink: '/backend/master/repository_file/save',
      action: 'read',
      resource: 'repository_file'
    }
  },
  {
    path: '/master/repository_file/save',
    component: lazy(() => import('../../../views/backend/master/repository_file/save')),
    meta: {
      navLink: '/backend/master/repository_file/save',
      action: 'read',
      resource: 'repository_file'
    }
  },
  {
    path: '/master/global_param/list',
    component: lazy(() => import('../../../views/backend/master/global_param/list')),
    meta: {
      action: 'read',
      resource: 'global_param'
    }
  },
  {
    path: '/master/global_param/save/:id',
    component: lazy(() => import('../../../views/backend/master/global_param/save')),
    meta: {
      navLink: '/backend/master/global_param/save',
      action: 'read',
      resource: 'global_param'
    }
  },
  {
    path: '/master/global_param/save',
    component: lazy(() => import('../../../views/backend/master/global_param/save')),
    meta: {
      navLink: '/backend/master/global_param/save',
      action: 'read',
      resource: 'global_param'
    }
  },
  {
    path: '/master/survey/list',
    component: lazy(() => import('../../../views/backend/master/survey/list')),
    meta: {
      action: 'read',
      resource: 'survey'
    }
  },
  {
    path: '/master/survey/save/:id',
    component: lazy(() => import('../../../views/backend/master/survey/save')),
    meta: {
      navLink: '/backend/master/survey/save',
      action: 'read',
      resource: 'survey'
    }
  },
  {
    path: '/master/survey/save',
    component: lazy(() => import('../../../views/backend/master/survey/save')),
    meta: {
      navLink: '/backend/master/survey/save',
      action: 'read',
      resource: 'survey'
    }
  },
  {
    path: '/master/quiz/list',
    component: lazy(() => import('../../../views/backend/master/quiz/list')),
    meta: {
      action: 'read',
      resource: 'quiz'
    }
  },
  {
    path: '/master/quiz/save/:id',
    component: lazy(() => import('../../../views/backend/master/quiz/save')),
    meta: {
      navLink: '/backend/master/quiz/save',
      action: 'read',
      resource: 'quiz'
    }
  },
  {
    path: '/master/quiz/save',
    component: lazy(() => import('../../../views/backend/master/quiz/save')),
    meta: {
      navLink: '/backend/master/quiz/save',
      action: 'read',
      resource: 'quiz'
    }
  },
  {
    path: '/master/content_message/list',
    component: lazy(() => import('../../../views/backend/master/content_message/list')),
    meta: {
      action: 'read',
      resource: 'content_message'
    }
  },
  {
    path: '/master/content_message/save/:id',
    component: lazy(() => import('../../../views/backend/master/content_message/save')),
    meta: {
      navLink: '/backend/master/content_message/save',
      action: 'read',
      resource: 'content_message'
    }
  },
  {
    path: '/master/content_message/save',
    component: lazy(() => import('../../../views/backend/master/content_message/save')),
    meta: {
      navLink: '/backend/master/content_message/save',
      action: 'read',
      resource: 'content_message'
    }
  },
  {
    path: '/master/whitelist_domain/list',
    component: lazy(() => import('../../../views/backend/master/whitelist_domain/list')),
    meta: {
      action: 'read',
      resource: 'whitelist_domain'
    }
  },
  {
    path: '/master/whitelist_domain/save/:id',
    component: lazy(() => import('../../../views/backend/master/whitelist_domain/save')),
    meta: {
      navLink: '/backend/master/whitelist_domain/save',
      action: 'read',
      resource: 'whitelist_domain'
    }
  },
  {
    path: '/master/whitelist_domain/save',
    component: lazy(() => import('../../../views/backend/master/whitelist_domain/save')),
    meta: {
      navLink: '/backend/master/whitelist_domain/save',
      action: 'read',
      resource: 'whitelist_domain'
    }
  }
]

export default Master
