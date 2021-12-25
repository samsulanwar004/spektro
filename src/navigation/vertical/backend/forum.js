import { Circle, Users } from 'react-feather'

export default [
  {
    id: 'forum',
    title: 'Forum',
    icon: <Users size={20} />,
    action: 'read',
    resource: 'forum',
    children: [
      {
        id: 'article',
        title: 'Article',
        icon: <Circle size={20} />,
        navLink: '/forum/article/list',
        action: 'read',
        resource: 'article'
      },
      {
        id: 'discussion',
        title: 'Discussion',
        icon: <Circle size={20} />,
        navLink: '/forum/discussion/list',
        action: 'read',
        resource: 'discussion'
      }
    ]
  }
]
