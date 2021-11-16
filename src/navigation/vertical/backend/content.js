import { Circle, Tool } from 'react-feather'

export default [
  {
    id: 'content',
    title: 'Content',
    icon: <Tool size={20} />,
    action: 'read',
    resource: 'content',
    children: [
      {
        id: 'banner',
        title: 'Banner',
        icon: <Circle size={20} />,
        navLink: '/content/banner/list',
        action: 'read',
        resource: 'banner'
      }
    ]
  }
]
