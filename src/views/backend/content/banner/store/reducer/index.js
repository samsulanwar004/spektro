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

const banners = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_BANNER':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_BANNER':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_BANNER':
      return { ...state, selected: action.selected }
    case 'ADD_BANNER':
      return { ...state }
    case 'DELETE_BANNER':
      return { ...state }
    case 'RESET_BANNER':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_BANNER':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_BANNER':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_BANNER':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default banners
