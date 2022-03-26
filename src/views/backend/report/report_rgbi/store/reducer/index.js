// ** Initial State
const initialState = {
  allData: [],
  params: null,
  loading: false,
  error: null,
  success: false
}

const reports = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_REPORT_RGBI':
      return { ...state, allData: action.data, params: action.params }
    case 'RESET_REPORT_RGBI':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_REPORT_RGBI':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_REPORT_RGBI':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_REPORT_RGBI':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default reports
