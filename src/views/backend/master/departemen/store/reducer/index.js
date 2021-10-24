// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: null,
  selectedDepartemen: null,
  loading: false,
  error: null,
  success: false
}

const departemens = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_DEPARTEMEN':
      return { ...state, allData: action.data }
    case 'GET_DATA_DEPARTEMEN':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_DEPARTEMEN':
      return { ...state, selectedDepartemen: action.selectedDepartemen }
    case 'ADD_DEPARTEMEN':
      return { ...state }
    case 'DELETE_DEPARTEMEN':
      return { ...state }
    case 'RESET_DEPARTEMEN':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_DEPARTEMEN':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_DEPARTEMEN':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_DEPARTEMEN':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default departemens
