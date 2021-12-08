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

const categorys = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_CATEGORY':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_CATEGORY':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_CATEGORY':
      return { ...state, selected: action.selected }
    case 'ADD_CATEGORY':
      return { ...state }
    case 'DELETE_CATEGORY':
      return { ...state }
    case 'RESET_CATEGORY':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_CATEGORY':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_CATEGORY':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_CATEGORY':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default categorys
