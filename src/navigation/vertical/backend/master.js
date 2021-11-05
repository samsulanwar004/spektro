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
        id: 'repository_file',
        title: 'Repository File',
        icon: <Circle size={20} />,
        navLink: '/master/repository_file/list',
        action: 'read',
        resource: 'repository_file'
      },
      {
        id: 'survey',
        title: 'Survey',
        icon: <Circle size={20} />,
        navLink: '/master/survey/list',
        action: 'read',
        resource: 'survey'
      },
      {
        id: 'quiz',
        title: 'Quiz',
        icon: <Circle size={20} />,
        navLink: '/master/quiz/list',
        action: 'read',
        resource: 'quiz'
      },
      {
        id: 'content_message',
        title: 'Content Message',
        icon: <Circle size={20} />,
        navLink: '/master/content_message/list',
        action: 'read',
        resource: 'content_message'
      },
      {
        id: 'global_param',
        title: 'Global Param',
        icon: <Circle size={20} />,
        navLink: '/master/global_param/list',
        action: 'read',
        resource: 'global_param'
      }
    ]
  }
]
