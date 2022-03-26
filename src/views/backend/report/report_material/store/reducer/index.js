// ** Initial State
const initialState = {
  allData: [],
  params: null,
  loading: false,
  error: null,
  success: false
}

const reportmaterials = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_REPORT_MATERIAL':
      return { ...state, allData: action.data, params: action.params }
    case 'RESET_REPORT':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_REPORT_MATERIAL':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_REPORT_MATERIAL':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_REPORT_MATERIAL':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default reportmaterials
