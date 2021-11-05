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

const universitys = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_CERTIFICATE':
      return { ...state, allData: action.data }
    case 'GET_DATA_CERTIFICATE':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_CERTIFICATE':
      return { ...state, selected: action.selected }
    case 'ADD_CERTIFICATE':
      return { ...state }
    case 'DELETE_CERTIFICATE':
      return { ...state }
    case 'RESET_CERTIFICATE':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_CERTIFICATE':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_CERTIFICATE':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_CERTIFICATE':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default universitys
