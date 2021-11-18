// ** Initial State
const initialState = {
  selectedEnroll: null,
  selectedQuiz: null,
  loading: false,
  error: null,
  success: false
}

const enrolls = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FRONTEND_ENROLL':
      return { ...state, selectedEnroll: action.selected }
    case 'GET_FRONTEND_QUIZ':
      return { ...state, selectedQuiz: action.selected }
    case 'REQUEST_ENROLL':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_ENROLL':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_ENROLL':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'RESET_ENROLL':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    default:
      return { ...state }
  }
}
export default enrolls
