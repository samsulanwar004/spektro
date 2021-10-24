import { Circle, User } from 'react-feather'

export default [
  {
    id: 'user_management',
    title: 'User Management',
    icon: <User size={20} />,
    action: 'read',
    resource: 'user_management',
    children: [
      {
        id: 'app_resource',
        title: 'User Access',
        icon: <Circle size={20} />,
        navLink: '/management/user/list',
        action: 'read',
        resource: 'user_access'
      },
      {
        id: 'app_role',
        title: 'User Role',
        icon: <Circle size={20} />,
        navLink: '/management/role/list',
        action: 'read',
        resource: 'user_role'
      },
      {
        id: 'app_menu',
        title: 'Menu',
        icon: <Circle size={20} />,
        navLink: '/management/menu/list',
        action: 'read',
        resource: 'menu'
      },
      {
        id: 'app_role_menu',
        title: 'Role Menu',
        icon: <Circle size={20} />,
        navLink: '/management/role_menu/list',
        action: 'read',
        resource: 'role_menu'
      }
    ]
  }
]
