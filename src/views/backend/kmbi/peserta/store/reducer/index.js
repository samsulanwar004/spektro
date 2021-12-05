// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: null,
  selected: null,
  loading: false,
  error: null,
  success: false,
  dataSave: null
}

const pesertas = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_PESERTA':
      return { ...state, allData: action.data }
    case 'GET_DATA_PESERTA':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_PESERTA':
      return { ...state, selected: action.selected }
    case 'ADD_PESERTA':
      return { 
        ...state,
        dataSave: action.data
      }
    case 'DELETE_PESERTA':
      return { ...state }
    case 'RESET_PESERTA':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_PESERTA':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_PESERTA':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_PESERTA':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default pesertas
