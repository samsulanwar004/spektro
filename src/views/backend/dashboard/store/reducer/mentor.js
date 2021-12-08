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

const mentors = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_MENTOR':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_MENTOR':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_MENTOR':
      return { ...state, selected: action.selected }
    case 'ADD_MENTOR':
      return { ...state }
    case 'DELETE_MENTOR':
      return { ...state }
    case 'RESET_MENTOR':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_MENTOR':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_MENTOR':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_MENTOR':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default mentors
