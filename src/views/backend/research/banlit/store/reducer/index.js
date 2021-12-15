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
  progress: null
}

const banlits = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_BANLIT':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_BANLIT':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_BANLIT':
      return { ...state, selected: action.selected }
    case 'GET_BANLIT_DATA':
      return { ...state, selectData: action.data }
    case 'ADD_BANLIT':
      return { ...state }
    case 'DELETE_BANLIT':
      return { ...state }
    case 'RESET_BANLIT':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_BANLIT':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_BANLIT':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_BANLIT':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'PROGRESS_BANLIT':
      return {
        ...state,
        progress: action.progress
      }
    default:
      return { ...state }
  }
}
export default banlits
