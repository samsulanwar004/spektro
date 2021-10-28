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
  }
]

export default Master
