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

const partners = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_PARTNER':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_PARTNER':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_PARTNER':
      return { ...state, selected: action.selected }
    case 'ADD_PARTNER':
      return { ...state }
    case 'DELETE_PARTNER':
      return { ...state }
    case 'RESET_PARTNER':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_PARTNER':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_PARTNER':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_PARTNER':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default partners
