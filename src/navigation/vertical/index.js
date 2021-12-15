// ** Navigation sections imports
import dashboard from './backend/dashboard'
import management from './backend/management'
import master from './backend/master'
import course from './backend/course'
import content from './backend/content'
import assessment from './backend/assessment'
import kmbi from './backend/kmbi'
import research from './backend/research'

// ** Merge & Export
export default [
...dashboard,
...management,
...master,
...course,
...content,
...kmbi,
...research,
...assessment
]
