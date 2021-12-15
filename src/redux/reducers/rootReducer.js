// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'

// ** dasboard
import dashboards from '@src/views/backend/dashboard/store/reducer'
import mentors from '@src/views/backend/dashboard/store/reducer/mentor'
import certificatecourses from '@src/views/backend/dashboard/store/reducer/certificate'
// ** research
import adminresearchs from '@src/views/backend/research/store/reducer'
import pesertaresearchs from '@src/views/backend/research/store/reducer/user'
import banlits from '@src/views/backend/research/banlit/store/reducer'
import rgbis from '@src/views/backend/research/rgbi/store/reducer'
// ** profile
import profile from '@src/views/backend/auth/profile/store/reducer'
// ** management
import users from '@src/views/backend/management/user/store/reducer'
import roles from '@src/views/backend/management/role/store/reducer'
import menus from '@src/views/backend/management/menu/store/reducer'
import rolemenus from '@src/views/backend/management/role_menu/store/reducer'
// ** master
import provinces from '@src/views/backend/master/province/store/reducer'
import universitys from '@src/views/backend/master/universitas/store/reducer'
import satkers from '@src/views/backend/master/satker/store/reducer'
import repositorys from '@src/views/backend/master/repository_file/store/reducer'
import globalparams from '@src/views/backend/master/global_param/store/reducer'
import surveys from '@src/views/backend/master/survey/store/reducer'
import quizs from '@src/views/backend/master/quiz/store/reducer'
import contentmessages from '@src/views/backend/master/content_message/store/reducer'
import whitelistdomains from '@src/views/backend/master/whitelist_domain/store/reducer'
import categorys from '@src/views/backend/master/category/store/reducer'
import banks from '@src/views/backend/master/bank/store/reducer'

// ** course
import courses from '@src/views/backend/course/course/store/reducer'
import topiks from '@src/views/backend/course/topik/store/reducer'
import trainers from '@src/views/backend/course/trainer/store/reducer'
import certificates from '@src/views/backend/course/certificate/store/reducer'
import materials from '@src/views/backend/course/material/store/reducer'

// ** content
import banners from '@src/views/backend/content/banner/store/reducer'
import announcements from '@src/views/backend/content/announcement/store/reducer'
import partners from '@src/views/backend/content/partner/store/reducer'
import testimonis from '@src/views/backend/content/testimoni/store/reducer'

// ** assessment course
import assessments from '@src/views/backend/assessment/store/reducer'

// ** kmbi
import pesertas from '@src/views/backend/kmbi/peserta/store/reducer'
import calonpesertas from '@src/views/backend/kmbi/calon_peserta/store/reducer'
import wlpesertas from '@src/views/backend/kmbi/wl_peserta/store/reducer'
import submitpesertas from '@src/views/backend/kmbi/submit_peserta/store/reducer'

// ** frontend
import frontends from '@src/views/frontend/store/reducer'

// ** enrolls
import enrolls from '@src/views/course/store/reducer'

const rootReducer = combineReducers({
  dashboards,
  mentors,
  certificatecourses,
  adminresearchs,
  pesertaresearchs,
  auth,
  profile,
  users,
  navbar,
  layout,
  roles,
  menus,
  rolemenus,
  provinces,
  universitys,
  satkers,
  repositorys,
  globalparams,
  trainers,
  surveys,
  quizs,
  certificates,
  contentmessages,
  topiks,
  courses,
  materials,
  whitelistdomains,
  frontends,
  banners,
  announcements,
  partners,
  testimonis,
  enrolls,
  assessments,
  pesertas,
  calonpesertas,
  wlpesertas,
  submitpesertas,
  categorys,
  banks,
  rgbis,
  banlits
})

export default rootReducer
