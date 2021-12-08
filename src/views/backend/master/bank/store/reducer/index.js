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

const banks = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_BANK':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_BANK':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_BANK':
      return { ...state, selected: action.selected }
    case 'ADD_BANK':
      return { ...state }
    case 'DELETE_BANK':
      return { ...state }
    case 'RESET_BANK':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_BANK':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_BANK':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_BANK':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default banks
