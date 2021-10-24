// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: null,
  selectedRoleMenu: null,
  loading: false,
  error: null,
  success: false
}

const rolemenus = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_ROLE_MENU':
      return { ...state, allData: action.data }
    case 'GET_DATA_ROLE_MENU':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_ROLE_MENU':
      return { ...state, selectedRoleMenu: action.selectedRoleMenu }
    case 'ADD_ROLE_MENU':
      return { ...state }
    case 'DELETE_ROLE_MENU':
      return { ...state }
    case 'RESET_ROLE_MENU':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_ROLE_MENU':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_ROLE_MENU':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_ROLE_MENU':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default rolemenus
