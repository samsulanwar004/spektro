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
        id: 'course',
        title: 'Course',
        icon: <Circle size={20} />,
        navLink: '/course/course/list',
        action: 'read',
        resource: 'course'
      }
    ]
  }
]
