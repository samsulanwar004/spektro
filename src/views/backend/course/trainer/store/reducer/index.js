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

const trainers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_TRAINER':
      return { ...state, allData: action.data }
    case 'GET_DATA_TRAINER':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_TRAINER':
      return { ...state, selected: action.selected }
    case 'ADD_TRAINER':
      return { ...state }
    case 'DELETE_TRAINER':
      return { ...state }
    case 'RESET_TRAINER':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_TRAINER':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_TRAINER':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_TRAINER':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default trainers
