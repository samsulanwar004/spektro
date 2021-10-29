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
        id: 'trainer',
        title: 'Trainer',
        icon: <Circle size={20} />,
        navLink: '/master/trainer/list',
        action: 'read',
        resource: 'trainer'
      },
      {
        id: 'repository_doc',
        title: 'Repository Doc',
        icon: <Circle size={20} />,
        navLink: '/master/repository_doc/list',
        action: 'read',
        resource: 'repository_doc'
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
        id: 'certificate',
        title: 'Certificate',
        icon: <Circle size={20} />,
        navLink: '/master/certificate/list',
        action: 'read',
        resource: 'certificate'
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
