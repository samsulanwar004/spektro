import { Home, Search } from 'react-feather'

export default [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/dashboard',
    action: 'read',
    resource: 'dashboard'
  },
  {
    id: 'research_submission',
    title: 'Research',
    icon: <Search size={20} />,
    navLink: '/research_submission',
    action: 'read',
    resource: 'research_submission'
  }
]
