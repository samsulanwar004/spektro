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

const topiks = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_TOPIK':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_TOPIK':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_TOPIK':
      return { ...state, selected: action.selected }
    case 'ADD_TOPIK':
      return { ...state }
    case 'DELETE_TOPIK':
      return { ...state }
    case 'RESET_TOPIK':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_TOPIK':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_TOPIK':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_TOPIK':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default topiks
