import { Circle, Tool } from 'react-feather'

export default [
  {
    id: 'report',
    title: 'Report',
    icon: <Tool size={20} />,
    action: 'read',
    resource: 'report',
    children: [
      {
        id: 'report_all',
        title: 'Report All',
        icon: <Circle size={20} />,
        navLink: '/report/report_all/list',
        action: 'read',
        resource: 'report_all'
      },
      {
        id: 'report_user',
        title: 'Report User',
        icon: <Circle size={20} />,
        navLink: '/report/report_user/list',
        action: 'read',
        resource: 'report_user'
      },
      {
        id: 'report_material',
        title: 'Report Material',
        icon: <Circle size={20} />,
        navLink: '/report/report_material/list',
        action: 'read',
        resource: 'report_material'
      },
      {
        id: 'report_rgbi',
        title: 'Report RGBI',
        icon: <Circle size={20} />,
        navLink: '/report/report_rgbi/list',
        action: 'read',
        resource: 'report_rgbi'
      },
      {
        id: 'report_banlit',
        title: 'Report BANLIT',
        icon: <Circle size={20} />,
        navLink: '/report/report_banlit/list',
        action: 'read',
        resource: 'report_banlit'
      },
      {
        id: 'report_article',
        title: 'Report Article',
        icon: <Circle size={20} />,
        navLink: '/report/report_article/list',
        action: 'read',
        resource: 'report_article'
      },
      {
        id: 'report_discussion',
        title: 'Report Discussion',
        icon: <Circle size={20} />,
        navLink: '/report/report_discussion/list',
        action: 'read',
        resource: 'report_discussion'
      }
    ]
  }
]
