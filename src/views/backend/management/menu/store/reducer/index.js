// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: null,
  selectedMenu: null,
  loading: false,
  error: null,
  success: false
}

const menus = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_MENU':
      return { ...state, allData: action.data }
    case 'GET_DATA_MENU':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_MENU':
      return { ...state, selectedMenu: action.selectedMenu }
    case 'ADD_MENU':
      return { ...state }
    case 'DELETE_MENU':
      return { ...state }
    case 'RESET_MENU':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_MENU':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_MENU':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_MENU':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default menus
