import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Research = [
  {
    path: '/research_fund/rgbi/list',
    component: lazy(() => import('../../../views/backend/research/rgbi')),
    meta: {
      action: 'read',
      resource: 'rgbi'
    }
  },
  {
    path: '/research_fund/rgbi/save/:id',
    component: lazy(() => import('../../../views/backend/research/rgbi/save')),
    meta: {
      navLink: '/backend/research/rgbi/save',
      action: 'read',
      resource: 'rgbi'
    }
  },
  {
    path: '/research_fund/rgbi/save',
    component: lazy(() => import('../../../views/backend/research/rgbi/save')),
    meta: {
      navLink: '/backend/research/rgbi/save',
      action: 'read',
      resource: 'rgbi'
    }
  },
  {
    path: '/research_fund/banlit/list',
    component: lazy(() => import('../../../views/backend/research/banlit')),
    meta: {
      action: 'read',
      resource: 'banlit'
    }
  },
  {
    path: '/research_fund/banlit/save/:id',
    component: lazy(() => import('../../../views/backend/research/banlit/save')),
    meta: {
      navLink: '/backend/research/banlit/save',
      action: 'read',
      resource: 'banlit'
    }
  },
  {
    path: '/research_fund/banlit/save',
    component: lazy(() => import('../../../views/backend/research/banlit/save')),
    meta: {
      navLink: '/backend/research/banlit/save',
      action: 'read',
      resource: 'banlit'
    }
  }
]

export default Research
