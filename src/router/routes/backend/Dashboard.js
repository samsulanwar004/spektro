import { lazy } from 'react'

const Dashboard = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../../views/backend/dashboard')),
    meta: {
      action: 'read',
      resource: 'dashboard'
    }
  },
  {
    path: '/peserta/detail/:id',
    component: lazy(() => import('../../../views/backend/dashboard/DashboardDetail')),
    meta: {
      navLink: '/backend/dashboard/peserta/detail',
      action: 'read',
      resource: 'dashboard'
    }
  },
  {
    path: '/research',
    component: lazy(() => import('../../../views/backend/research')),
    meta: {
      action: 'read',
      resource: 'research'
    }
  },
  {
    path: '/rgbi/save/:id',
    component: lazy(() => import('../../../views/backend/research/save/rgbi')),
    meta: {
      navLink: '/backend/research/rgbi/save',
      action: 'read',
      resource: 'research'
    }
  },
  {
    path: '/rgbi/save',
    component: lazy(() => import('../../../views/backend/research/save/rgbi')),
    meta: {
      navLink: '/backend/research/rgbi/save',
      action: 'read',
      resource: 'research'
    }
  },
  {
    path: '/banlit/save/:id',
    component: lazy(() => import('../../../views/backend/research/save/banlit')),
    meta: {
      navLink: '/backend/research/banlit/save',
      action: 'read',
      resource: 'research'
    }
  },
  {
    path: '/banlit/save',
    component: lazy(() => import('../../../views/backend/research/save/banlit')),
    meta: {
      navLink: '/backend/research/banlit/save',
      action: 'read',
      resource: 'research'
    }
  },
  {
    path: '/research_submission',
    component: lazy(() => import('../../../views/backend/research/user')),
    meta: {
      action: 'read',
      resource: 'research_submission'
    }
  },
  {
    path: '/rgbi_submission/save/:id',
    component: lazy(() => import('../../../views/backend/research/save/rgbipeserta')),
    meta: {
      navLink: '/backend/research/rgbi_submission/save',
      action: 'read',
      resource: 'research_submission'
    }
  },
  {
    path: '/rgbi_submission/save',
    component: lazy(() => import('../../../views/backend/research/save/rgbipeserta')),
    meta: {
      navLink: '/backend/research/rgbi_submission/save',
      action: 'read',
      resource: 'research_submission'
    }
  },
  {
    path: '/banlit_submission/save/:id',
    component: lazy(() => import('../../../views/backend/research/save/banlitpeserta')),
    meta: {
      navLink: '/backend/research/banlit_submission/save',
      action: 'read',
      resource: 'research_submission'
    }
  },
  {
    path: '/banlit_submission/save',
    component: lazy(() => import('../../../views/backend/research/save/banlitpeserta')),
    meta: {
      navLink: '/backend/research/banlit_submission/save',
      action: 'read',
      resource: 'research_submission'
    }
  }
]

export default Dashboard
