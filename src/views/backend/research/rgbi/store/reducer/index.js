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
  selectData: null,
  progress: null,
  addData: null
}

const rgbis = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_RGBI':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_RGBI':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_RGBI':
      return { ...state, selected: action.selected }
    case 'GET_RGBI_DATA':
      return { ...state, selectData: action.data }
    case 'ADD_RGBI':
      return { 
        ...state,
        addData: action.data 
      }
    case 'DELETE_RGBI':
      return { ...state }
    case 'RESET_RGBI':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_RGBI':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_RGBI':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_RGBI':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'PROGRESS_RGBI':
      return {
        ...state,
        progress: action.progress
      }
    default:
      return { ...state }
  }
}
export default rgbis
