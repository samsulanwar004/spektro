import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const FrontCourseRoutes = [
  {
    path: '/course-home/:courseid',
    component: lazy(() => import('../../../views/course/Home')),
    layout: 'CourseLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/course-video/:courseid',
    component: lazy(() => import('../../../views/course/Video')),
    layout: 'CourseLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/course-link/:courseid',
    component: lazy(() => import('../../../views/course/Link')),
    layout: 'CourseLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/course-material/:courseid',
    component: lazy(() => import('../../../views/course/Material')),
    layout: 'CourseLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/course-quiz/:courseid',
    component: lazy(() => import('../../../views/course/Quiz')),
    layout: 'CourseLayout',
    meta: {
      publicRoute: true
    }
  }
]

export default FrontCourseRoutes
