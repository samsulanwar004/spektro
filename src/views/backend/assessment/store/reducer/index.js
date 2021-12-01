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
  topikAssissment: [],
  quizAssissment: []
}

const assessments = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_ASSESSMENT':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_ASSESSMENT':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_ASSESSMENT':
      return { ...state, selected: action.selected }
    case 'GET_TOPIK_ASSESSMENT':
      return { ...state, topikAssissment: action.data }
    case 'GET_QUIZ_ASSESSMENT':
      return { ...state, quizAssissment: action.data }
    case 'ADD_ASSESSMENT':
      return { ...state }
    case 'DELETE_ASSESSMENT':
      return { ...state }
    case 'RESET_ASSESSMENT':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_ASSESSMENT':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_ASSESSMENT':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_ASSESSMENT':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'PROGRESS_ASSESSMENT':
      return {
        ...state,
        progress: action.progress
      }
    default:
      return { ...state }
  }
}
export default assessments
