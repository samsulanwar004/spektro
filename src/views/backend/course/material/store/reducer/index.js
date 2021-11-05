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

const universitys = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_MATERIAL':
      return { ...state, allData: action.data }
    case 'GET_DATA_MATERIAL':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_MATERIAL':
      return { ...state, selected: action.selected }
    case 'ADD_MATERIAL':
      return { ...state }
    case 'DELETE_MATERIAL':
      return { ...state }
    case 'RESET_MATERIAL':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_MATERIAL':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_MATERIAL':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_MATERIAL':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'PROGRESS_MATERIAL':
      return {
        ...state,
        progress: action.progress
      }
    default:
      return { ...state }
  }
}
export default universitys
