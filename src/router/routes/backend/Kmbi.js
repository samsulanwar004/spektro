import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Kmbi = [
  {
    path: '/kmbi/peserta/list',
    component: lazy(() => import('../../../views/backend/kmbi/peserta/list')),
    meta: {
      action: 'read',
      resource: 'peserta'
    }
  },
  {
    path: '/kmbi/peserta/save/:id',
    component: lazy(() => import('../../../views/backend/kmbi/peserta/save')),
    meta: {
      navLink: '/backend/kmbi/peserta/save',
      action: 'read',
      resource: 'peserta'
    }
  },
  {
    path: '/kmbi/peserta/save',
    component: lazy(() => import('../../../views/backend/kmbi/peserta/save')),
    meta: {
      navLink: '/backend/kmbi/peserta/save',
      action: 'read',
      resource: 'peserta'
    }
  },
  {
    path: '/kmbi/calon_peserta/list',
    component: lazy(() => import('../../../views/backend/kmbi/calon_peserta/list')),
    meta: {
      action: 'read',
      resource: 'calon_peserta'
    }
  },
  {
    path: '/kmbi/calon_peserta/save/:id',
    component: lazy(() => import('../../../views/backend/kmbi/calon_peserta/save')),
    meta: {
      navLink: '/backend/kmbi/calon_peserta/save',
      action: 'read',
      resource: 'calon_peserta'
    }
  },
  {
    path: '/kmbi/calon_peserta/save',
    component: lazy(() => import('../../../views/backend/kmbi/calon_peserta/save')),
    meta: {
      navLink: '/backend/kmbi/calon_peserta/save',
      action: 'read',
      resource: 'calon_peserta'
    }
  },
  {
    path: '/kmbi/wl_peserta/list',
    component: lazy(() => import('../../../views/backend/kmbi/wl_peserta/list')),
    meta: {
      action: 'read',
      resource: 'wl_peserta'
    }
  },
  {
    path: '/kmbi/wl_peserta/save/:id',
    component: lazy(() => import('../../../views/backend/kmbi/wl_peserta/save')),
    meta: {
      navLink: '/backend/kmbi/wl_peserta/save',
      action: 'read',
      resource: 'wl_peserta'
    }
  },
  {
    path: '/kmbi/wl_peserta/save',
    component: lazy(() => import('../../../views/backend/kmbi/wl_peserta/save')),
    meta: {
      navLink: '/backend/kmbi/wl_peserta/save',
      action: 'read',
      resource: 'wl_peserta'
    }
  },
  {
    path: '/kmbi/submit_peserta/list',
    component: lazy(() => import('../../../views/backend/kmbi/submit_peserta/list')),
    meta: {
      action: 'read',
      resource: 'submit_peserta'
    }
  },
  {
    path: '/kmbi/submit_peserta/save/:id',
    component: lazy(() => import('../../../views/backend/kmbi/submit_peserta/save')),
    meta: {
      navLink: '/backend/kmbi/submit_peserta/save',
      action: 'read',
      resource: 'submit_peserta'
    }
  },
  {
    path: '/kmbi/submit_peserta/save',
    component: lazy(() => import('../../../views/backend/kmbi/submit_peserta/save')),
    meta: {
      navLink: '/backend/kmbi/submit_peserta/save',
      action: 'read',
      resource: 'submit_peserta'
    }
  }
]

export default Kmbi
