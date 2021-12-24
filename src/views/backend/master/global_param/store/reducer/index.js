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
  upload: null,
  progress: null,
  email: null
}

const globalparams = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_GLOBAL_PARAM':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_GLOBAL_PARAM':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_GLOBAL_PARAM':
      return { ...state, selected: action.selected }
    case 'ADD_GLOBAL_PARAM':
      return { ...state }
    case 'DELETE_GLOBAL_PARAM':
      return { ...state }
    case 'RESET_GLOBAL_PARAM':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_GLOBAL_PARAM':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_GLOBAL_PARAM':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_GLOBAL_PARAM':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'UPLOAD_GLOBAL_PARAM':
      return {
        ...state,
        upload: action.upload
      }
    case 'GET_EMAIL_GLOBAL_PARAM':
      return {
        ...state,
        email: action.email
      }
    case 'PROGRESS_GLOBAL_PARAM':
      return {
        ...state,
        progress: action.progress
      }
    default:
      return { ...state }
  }
}
export default globalparams
