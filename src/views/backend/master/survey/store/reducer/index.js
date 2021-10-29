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

const surveys = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_SURVEY':
      return { ...state, allData: action.data }
    case 'GET_DATA_SURVEY':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_SURVEY':
      return { ...state, selected: action.selected }
    case 'ADD_SURVEY':
      return { ...state }
    case 'DELETE_SURVEY':
      return { ...state }
    case 'RESET_SURVEY':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_SURVEY':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_SURVEY':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_SURVEY':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default surveys
