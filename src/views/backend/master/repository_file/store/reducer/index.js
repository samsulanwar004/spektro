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
  progress: null,
  addData: null
}

const repositorys = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_REPOSITORY':
      return { ...state, allData: action.data }
    case 'GET_DATA_REPOSITORY':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_REPOSITORY':
      return { ...state, selected: action.selected }
    case 'ADD_REPOSITORY':
      return { 
        ...state, 
        addData: action.data
      }
    case 'DELETE_REPOSITORY':
      return { ...state }
    case 'RESET_REPOSITORY':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_REPOSITORY':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_REPOSITORY':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_REPOSITORY':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'PROGRESS_REPOSITORY':
      return {
        ...state,
        progress: action.progress
      }
    default:
      return { ...state }
  }
}
export default repositorys
