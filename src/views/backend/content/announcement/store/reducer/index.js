// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: null,
  selected: null,
  loading: false,
  error: null,
  success: false
}

const announcements = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_ANNOUNCEMENT':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_ANNOUNCEMENT':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_ANNOUNCEMENT':
      return { ...state, selected: action.selected }
    case 'ADD_ANNOUNCEMENT':
      return { ...state }
    case 'DELETE_ANNOUNCEMENT':
      return { ...state }
    case 'RESET_ANNOUNCEMENT':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_ANNOUNCEMENT':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_ANNOUNCEMENT':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_ANNOUNCEMENT':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default announcements
