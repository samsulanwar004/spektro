// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: null,
  selected: null,
  loading: false,
  error: null,
  success: false,
  progress: null
}

const courses = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_COURSE':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_COURSE':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_COURSE':
      return { ...state, selected: action.selected }
    case 'ADD_COURSE':
      return { ...state }
    case 'DELETE_COURSE':
      return { ...state }
    case 'RESET_COURSE':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_COURSE':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_COURSE':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_COURSE':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'PROGRESS_COURSE':
      return {
        ...state,
        progress: action.progress
      }
    default:
      return { ...state }
  }
}
export default courses
