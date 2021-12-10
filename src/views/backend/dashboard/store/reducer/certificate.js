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

const certificatecourses = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_CERTIFICATE_COURSE':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_CERTIFICATE_COURSE':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_CERTIFICATE_COURSE':
      return { ...state, selected: action.selected }
    case 'ADD_CERTIFICATE_COURSE':
      return { ...state }
    case 'DELETE_CERTIFICATE_COURSE':
      return { ...state }
    case 'RESET_CERTIFICATE_COURSE':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_CERTIFICATE_COURSE':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_CERTIFICATE_COURSE':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_CERTIFICATE_COURSE':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default certificatecourses
