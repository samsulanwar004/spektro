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

const submitpesertas = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_SUBMIT_PESERTA':
      return { ...state, allData: action.data }
    case 'GET_DATA_SUBMIT_PESERTA':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_SUBMIT_PESERTA':
      return { ...state, selected: action.selected }
    case 'ADD_SUBMIT_PESERTA':
      return { ...state }
    case 'DELETE_SUBMIT_PESERTA':
      return { ...state }
    case 'RESET_SUBMIT_PESERTA':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_SUBMIT_PESERTA':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_SUBMIT_PESERTA':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_SUBMIT_PESERTA':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default submitpesertas
