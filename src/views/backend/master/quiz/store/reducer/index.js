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

const quizs = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_QUIZ':
      return { ...state, allData: action.data }
    case 'GET_DATA_QUIZ':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_QUIZ':
      return { ...state, selected: action.selected }
    case 'ADD_QUIZ':
      return { ...state }
    case 'DELETE_QUIZ':
      return { ...state }
    case 'RESET_QUIZ':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_QUIZ':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_QUIZ':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_QUIZ':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default quizs
