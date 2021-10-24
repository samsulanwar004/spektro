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
import departemens from '@src/views/backend/master/departemen/store/reducer'


const rootReducer = combineReducers({
  auth,
  users,
  navbar,
  layout,
  roles,
  menus,
  rolemenus,
  departemens
})

export default rootReducer
