// ** Routes Imports
import DashboardRoute from './backend/Dashboard'
import AuthRoutes from './backend/Auth'
import ManagementRoutes from './backend/Management'
import MasterRoutes from './backend/Master'
import CourseRoutes from './backend/Course'

// ** Frontend
import FrontRoutes from './frontend'

// ** Document title
const TemplateTitle = '%s - Admin Dashboard'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
...DashboardRoute,
...AuthRoutes,
...ManagementRoutes,
...MasterRoutes,
...CourseRoutes,
...FrontRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
