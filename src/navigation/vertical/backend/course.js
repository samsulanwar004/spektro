import { Circle, BookOpen } from 'react-feather'

export default [
  {
    id: 'course',
    title: 'Course',
    icon: <BookOpen size={20} />,
    action: 'read',
    resource: 'course',
    children: [
      {
        id: 'trainer',
        title: 'Trainer',
        icon: <Circle size={20} />,
        navLink: '/course/trainer/list',
        action: 'read',
        resource: 'trainer'
      },
      {
        id: 'topik',
        title: 'Topik',
        icon: <Circle size={20} />,
        navLink: '/course/topik/list',
        action: 'read',
        resource: 'topik'
      },
      {
        id: 'certificate',
        title: 'Certificate',
        icon: <Circle size={20} />,
        navLink: '/course/certificate/list',
        action: 'read',
        resource: 'certificate'
      },
      {
        id: 'course',
        title: 'Course',
        icon: <Circle size={20} />,
        navLink: '/course/course/list',
        action: 'read',
        resource: 'course'
      },
      {
        id: 'material',
        title: 'Material',
        icon: <Circle size={20} />,
        navLink: '/course/material/list',
        action: 'read',
        resource: 'material'
      }
    ]
  }
]
