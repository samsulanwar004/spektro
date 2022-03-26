// ** Routes Imports
import DashboardRoute from './backend/Dashboard'
import AuthRoutes from './backend/Auth'
import ManagementRoutes from './backend/Management'
import MasterRoutes from './backend/Master'
import CourseRoutes from './backend/Course'
import ContentRoutes from './backend/Content'
import AssessmentRoutes from './backend/Assessment'
import KmbiRoutes from './backend/Kmbi'
import ResearchRoutes from './backend/Research'
import ForumRoutes from './backend/Forum'
import ReportRoutes from './backend/Report'

// ** Frontend
import FrontRoutes from './frontend'

// ** Course
import FrontCourseRoutes from './course'

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
...FrontRoutes,
...ContentRoutes,
...AssessmentRoutes,
...FrontCourseRoutes,
...KmbiRoutes,
...ResearchRoutes,
...ForumRoutes,
...ReportRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
