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

const contentmessages = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_CONTENT_MESSAGE':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_CONTENT_MESSAGE':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_CONTENT_MESSAGE':
      return { ...state, selected: action.selected }
    case 'ADD_CONTENT_MESSAGE':
      return { ...state }
    case 'DELETE_CONTENT_MESSAGE':
      return { ...state }
    case 'RESET_CONTENT_MESSAGE':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_CONTENT_MESSAGE':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_CONTENT_MESSAGE':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_CONTENT_MESSAGE':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default contentmessages
