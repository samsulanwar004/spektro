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

const articles = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_ARTICLE':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_ARTICLE':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_ARTICLE':
      return { ...state, selected: action.selected }
    case 'ADD_ARTICLE':
      return { ...state }
    case 'DELETE_ARTICLE':
      return { ...state }
    case 'RESET_ARTICLE':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_ARTICLE':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_ARTICLE':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_ARTICLE':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default articles
