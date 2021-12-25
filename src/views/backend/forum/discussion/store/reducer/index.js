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

const discussions = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_DISCUSSION':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_DISCUSSION':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_DISCUSSION':
      return { ...state, selected: action.selected }
    case 'ADD_DISCUSSION':
      return { ...state }
    case 'DELETE_DISCUSSION':
      return { ...state }
    case 'RESET_DISCUSSION':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_DISCUSSION':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_DISCUSSION':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_DISCUSSION':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default discussions
