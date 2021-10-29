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
    path: '/master/repository_doc/list',
    component: lazy(() => import('../../../views/backend/master/repository_doc/list')),
    meta: {
      action: 'read',
      resource: 'repository_doc'
    }
  },
  {
    path: '/master/repository_doc/save/:id',
    component: lazy(() => import('../../../views/backend/master/repository_doc/save')),
    meta: {
      navLink: '/backend/master/repository_doc/save',
      action: 'read',
      resource: 'repository_doc'
    }
  },
  {
    path: '/master/repository_doc/save',
    component: lazy(() => import('../../../views/backend/master/repository_doc/save')),
    meta: {
      navLink: '/backend/master/repository_doc/save',
      action: 'read',
      resource: 'repository_doc'
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
    path: '/master/trainer/list',
    component: lazy(() => import('../../../views/backend/master/trainer/list')),
    meta: {
      action: 'read',
      resource: 'trainer'
    }
  },
  {
    path: '/master/trainer/save/:id',
    component: lazy(() => import('../../../views/backend/master/trainer/save')),
    meta: {
      navLink: '/backend/master/trainer/save',
      action: 'read',
      resource: 'trainer'
    }
  },
  {
    path: '/master/trainer/save',
    component: lazy(() => import('../../../views/backend/master/trainer/save')),
    meta: {
      navLink: '/backend/master/trainer/save',
      action: 'read',
      resource: 'trainer'
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
    path: '/master/certificate/list',
    component: lazy(() => import('../../../views/backend/master/certificate/list')),
    meta: {
      action: 'read',
      resource: 'certificate'
    }
  },
  {
    path: '/master/certificate/save/:id',
    component: lazy(() => import('../../../views/backend/master/certificate/save')),
    meta: {
      navLink: '/backend/master/certificate/save',
      action: 'read',
      resource: 'certificate'
    }
  },
  {
    path: '/master/certificate/save',
    component: lazy(() => import('../../../views/backend/master/certificate/save')),
    meta: {
      navLink: '/backend/master/certificate/save',
      action: 'read',
      resource: 'certificate'
    }
  }
]

export default Master
