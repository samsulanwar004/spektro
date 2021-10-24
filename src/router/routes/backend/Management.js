import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Management = [
  {
    path: '/management/user/list',
    component: lazy(() => import('../../../views/backend/management/user/list')),
    meta: {
      action: 'read',
      resource: 'user_access'
    }
  },
  {
    path: '/management/user/save/:id',
    component: lazy(() => import('../../../views/backend/management/user/save')),
    meta: {
      navLink: '/backend/management/user/save',
      action: 'read',
      resource: 'user_access'
    }
  },
  {
    path: '/management/user/save',
    component: lazy(() => import('../../../views/backend/management/user/save')),
    meta: {
      navLink: '/backend/management/user/save',
      action: 'read',
      resource: 'user_access'
    }
  },
  {
    path: '/management/role/list',
    component: lazy(() => import('../../../views/backend/management/role/list')),
    meta: {
      action: 'read',
      resource: 'user_role'
    }
  },
  {
    path: '/management/role/save/:id',
    component: lazy(() => import('../../../views/backend/management/role/save')),
    meta: {
      navLink: '/backend/management/role/save',
      action: 'read',
      resource: 'user_role'
    }
  },
  {
    path: '/management/role/save',
    component: lazy(() => import('../../../views/backend/management/role/save')),
    meta: {
      navLink: '/backend/management/role/save',
      action: 'read',
      resource: 'user_role'
    }
  },
  {
    path: '/management/menu/list',
    component: lazy(() => import('../../../views/backend/management/menu/list')),
    meta: {
      action: 'read',
      resource: 'menu'
    }
  },
  {
    path: '/management/menu/save/:id',
    component: lazy(() => import('../../../views/backend/management/menu/save')),
    meta: {
      navLink: '/backend/management/menu/save',
      action: 'read',
      resource: 'menu'
    }
  },
  {
    path: '/management/menu/save',
    component: lazy(() => import('../../../views/backend/management/menu/save')),
    meta: {
      navLink: '/backend/management/menu/save',
      action: 'read',
      resource: 'menu'
    }
  },
  {
    path: '/management/role_menu/list',
    component: lazy(() => import('../../../views/backend/management/role_menu/list')),
    meta: {
      action: 'read',
      resource: 'role_menu'
    }
  },
  {
    path: '/management/role_menu/save/:id',
    component: lazy(() => import('../../../views/backend/management/role_menu/save')),
    meta: {
      navLink: '/backend/management/role_menu/save',
      action: 'read',
      resource: 'role_menu'
    }
  },
  {
    path: '/management/role_menu/save',
    component: lazy(() => import('../../../views/backend/management/role_menu/save')),
    meta: {
      navLink: '/backend/management/role_menu/save',
      action: 'read',
      resource: 'role_menu'
    }
  }
]

export default Management
