// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'

// ** management
import users from '@src/views/backend/management/user/store/reducer'
import roles from '@src/views/backend/management/role/store/reducer'
import menus from '@src/views/backend/management/menu/store/reducer'
import rolemenus from '@src/views/backend/management/role_menu/store/reducer'
// ** master
import provinces from '@src/views/backend/master/province/store/reducer'
import universitys from '@src/views/backend/master/universitas/store/reducer'
import satkers from '@src/views/backend/master/satker/store/reducer'
import repositorys from '@src/views/backend/master/repository_doc/store/reducer'
import globalparams from '@src/views/backend/master/global_param/store/reducer'
import trainers from '@src/views/backend/master/trainer/store/reducer'


const rootReducer = combineReducers({
  auth,
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
  trainers
})

export default rootReducer
