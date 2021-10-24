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
    case 'GET_ALL_DATA_UNIVERSITY':
      return { ...state, allData: action.data }
    case 'GET_DATA_UNIVERSITY':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_UNIVERSITY':
      return { ...state, selected: action.selected }
    case 'ADD_UNIVERSITY':
      return { ...state }
    case 'DELETE_UNIVERSITY':
      return { ...state }
    case 'RESET_UNIVERSITY':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_UNIVERSITY':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_UNIVERSITY':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_UNIVERSITY':
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
