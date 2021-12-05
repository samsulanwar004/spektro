import { Circle, Users } from 'react-feather'

export default [
  {
    id: 'kmbi',
    title: 'KMBI',
    icon: <Users size={20} />,
    action: 'read',
    resource: 'kmbi',
    children: [
      {
        id: 'wl_peserta',
        title: 'Whitelist Peserta',
        icon: <Circle size={20} />,
        navLink: '/kmbi/wl_peserta/list',
        action: 'read',
        resource: 'wl_peserta'
      },
      {
        id: 'calon_peserta',
        title: 'Calon Peserta',
        icon: <Circle size={20} />,
        navLink: '/kmbi/calon_peserta/list',
        action: 'read',
        resource: 'calon_peserta'
      },
      {
        id: 'peserta',
        title: 'Peserta',
        icon: <Circle size={20} />,
        navLink: '/kmbi/peserta/list',
        action: 'read',
        resource: 'peserta'
      },
      {
        id: 'submit_peserta',
        title: 'Submission KMBI',
        icon: <Circle size={20} />,
        navLink: '/kmbi/submit_peserta/list',
        action: 'read',
        resource: 'submit_peserta'
      }
    ]
  }
]
