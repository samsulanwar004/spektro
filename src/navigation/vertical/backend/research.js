import { Circle, Users } from 'react-feather'

export default [
  {
    id: 'research_fund',
    title: 'Research Fund',
    icon: <Users size={20} />,
    action: 'read',
    resource: 'research_fund',
    children: [
      {
        id: 'rgbi',
        title: 'RGBI',
        icon: <Circle size={20} />,
        navLink: '/research_fund/rgbi/list',
        action: 'read',
        resource: 'rgbi'
      },
      {
        id: 'banlit',
        title: 'BANLIT',
        icon: <Circle size={20} />,
        navLink: '/research_fund/banlit/list',
        action: 'read',
        resource: 'banlit'
      }
    ]
  }
]
