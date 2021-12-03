import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const FrontRoutes = [
  {
    path: '/home',
    component: lazy(() => import('../../../views/frontend/Home')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/learning-space',
    component: lazy(() => import('../../../views/frontend/LearnSpace')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/kampus',
    component: lazy(() => import('../../../views/frontend/Campus')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/research-fund',
    component: lazy(() => import('../../../views/frontend/ResearchFund')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/forum',
    component: lazy(() => import('../../../views/frontend/Forum')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/course-detail',
    component: lazy(() => import('../../../views/frontend/CourseDetail')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/material-detail',
    component: lazy(() => import('../../../views/frontend/MaterialDetail')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/article-create',
    component: lazy(() => import('../../../views/frontend/ArticleCreate')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/article-detail/:id',
    component: lazy(() => import('../../../views/frontend/ArticleDetail')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/announcement-detail/:id',
    component: lazy(() => import('../../../views/frontend/AnnouncementDetail')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/course-all',
    component: lazy(() => import('../../../views/frontend/CourseAll')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/material-all',
    component: lazy(() => import('../../../views/frontend/MaterialAll')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/announcement-all',
    component: lazy(() => import('../../../views/frontend/AnnouncementAll')),
    layout: 'FrontendLayout',
    meta: {
      publicRoute: true
    }
  }
]

export default FrontRoutes
