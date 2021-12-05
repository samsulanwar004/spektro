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

const wlpesertas = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_WL_PESERTA':
      return { ...state, allData: action.data }
    case 'GET_DATA_WL_PESERTA':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_WL_PESERTA':
      return { ...state, selected: action.selected }
    case 'ADD_WL_PESERTA':
      return { ...state }
    case 'DELETE_WL_PESERTA':
      return { ...state }
    case 'RESET_WL_PESERTA':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_WL_PESERTA':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_WL_PESERTA':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_WL_PESERTA':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default wlpesertas
