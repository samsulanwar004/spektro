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
        id: 'material',
        title: 'Material',
        icon: <Circle size={20} />,
        navLink: '/course/material/list',
        action: 'read',
        resource: 'material'
      },
      {
        id: 'banner',
        title: 'Banner',
        icon: <Circle size={20} />,
        navLink: '/content/banner/list',
        action: 'read',
        resource: 'banner'
      },
      {
        id: 'announcement',
        title: 'Announcement',
        icon: <Circle size={20} />,
        navLink: '/content/announcement/list',
        action: 'read',
        resource: 'announcement'
      },
      {
        id: 'partner',
        title: 'Partner',
        icon: <Circle size={20} />,
        navLink: '/content/partner/list',
        action: 'read',
        resource: 'partner'
      },
      {
        id: 'testimoni',
        title: 'Testimoni',
        icon: <Circle size={20} />,
        navLink: '/content/testimoni/list',
        action: 'read',
        resource: 'testimoni'
      }
    ]
  }
]
