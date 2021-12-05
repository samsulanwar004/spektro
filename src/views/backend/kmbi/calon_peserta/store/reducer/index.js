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
  dataSave: null,
  dataStatus: null
}

const calonpesertas = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_CALON_PESERTA':
      return { ...state, allData: action.data }
    case 'GET_DATA_CALON_PESERTA':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_CALON_PESERTA':
      return { ...state, selected: action.selected }
    case 'ADD_CALON_PESERTA':
      return { 
        ...state,
        dataSave: action.data
      }
    case 'DELETE_CALON_PESERTA':
      return { ...state }
    case 'RESET_CALON_PESERTA':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_CALON_PESERTA':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_CALON_PESERTA':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_CALON_PESERTA':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'STATUS_CALON_PESERTA':
      return { 
        ...state,
        dataStatus: action.data
      }
    default:
      return { ...state }
  }
}
export default calonpesertas
