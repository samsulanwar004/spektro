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
        id: 'departemen',
        title: 'Site',
        icon: <Circle size={20} />,
        navLink: '/master/departemen/list',
        action: 'read',
        resource: 'departemen'
      }
    ]
  }
]
