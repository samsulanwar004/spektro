import { lazy } from 'react'

const Report = [
  {
    path: '/report/report_user/list',
    component: lazy(() => import('../../../views/backend/report/report_user/list')),
    meta: {
      action: 'read',
      resource: 'report_user'
    }
  },
  {
    path: '/report/report_all/list',
    component: lazy(() => import('../../../views/backend/report/report_all/list')),
    meta: {
      action: 'read',
      resource: 'report_all'
    }
  },
  {
    path: '/report/report_article/list',
    component: lazy(() => import('../../../views/backend/report/report_article/list')),
    meta: {
      action: 'read',
      resource: 'report_article'
    }
  },
  {
    path: '/report/report_discussion/list',
    component: lazy(() => import('../../../views/backend/report/report_discussion/list')),
    meta: {
      action: 'read',
      resource: 'report_discussion'
    }
  },
  {
    path: '/report/report_banlit/list',
    component: lazy(() => import('../../../views/backend/report/report_banlit/list')),
    meta: {
      action: 'read',
      resource: 'report_banlit'
    }
  },
  {
    path: '/report/report_rgbi/list',
    component: lazy(() => import('../../../views/backend/report/report_rgbi/list')),
    meta: {
      action: 'read',
      resource: 'report_rgbi'
    }
  },
  {
    path: '/report/report_material/list',
    component: lazy(() => import('../../../views/backend/report/report_material/list')),
    meta: {
      action: 'read',
      resource: 'report_material'
    }
  }
]

export default Report
