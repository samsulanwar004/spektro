// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: null,
  selectedProvince: null,
  loading: false,
  error: null,
  success: false
}

const provinces = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_PROVINCE':
      return { ...state, allData: action.data }
    case 'GET_DATA_PROVINCE':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_PROVINCE':
      return { ...state, selectedProvince: action.selectedProvince }
    case 'ADD_PROVINCE':
      return { ...state }
    case 'DELETE_PROVINCE':
      return { ...state }
    case 'RESET_PROVINCE':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_PROVINCE':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_PROVINCE':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_PROVINCE':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default provinces
