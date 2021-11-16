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

const testimonis = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_TESTIMONI':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_TESTIMONI':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_TESTIMONI':
      return { ...state, selected: action.selected }
    case 'ADD_TESTIMONI':
      return { ...state }
    case 'DELETE_TESTIMONI':
      return { ...state }
    case 'RESET_TESTIMONI':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_TESTIMONI':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_TESTIMONI':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_TESTIMONI':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default testimonis
