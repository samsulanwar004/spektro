import { Circle, Server } from 'react-feather'

export default [
  {
    id: 'master',
    title: 'Master',
    icon: <Server size={20} />,
    action: 'read',
    resource: 'master',
    children: [
      {
        id: 'region',
        title: 'Region',
        icon: <Circle size={20} />,
        navLink: '/master/province/list',
        action: 'read',
        resource: 'province'
      },
      {
        id: 'university',
        title: 'University',
        icon: <Circle size={20} />,
        navLink: '/master/universitas/list',
        action: 'read',
        resource: 'universitas'
      },
      {
        id: 'satker',
        title: 'Satker',
        icon: <Circle size={20} />,
        navLink: '/master/satker/list',
        action: 'read',
        resource: 'satker'
      },
      {
        id: 'repository_doc',
        title: 'Repository Doc',
        icon: <Circle size={20} />,
        navLink: '/master/repository_doc/list',
        action: 'read',
        resource: 'repository_doc'
      }
    ]
  }
]
