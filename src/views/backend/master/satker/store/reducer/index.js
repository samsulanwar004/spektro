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

const satkers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_SATKER':
      return { ...state, allData: action.data }
    case 'GET_DATA_SATKER':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_SATKER':
      return { ...state, selected: action.selected }
    case 'ADD_SATKER':
      return { ...state }
    case 'DELETE_SATKER':
      return { ...state }
    case 'RESET_SATKER':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_SATKER':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_SATKER':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_SATKER':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default satkers
