// ** Initial State
const initialState = {
  selectedEnroll: null,
  selectedQuiz: null,
  selectedAttemp: null,
  selectedSurvey: null,
  selectedSesi: null,
  selectedCourseFinalScore: null,
  selectedQuizFinalScore: null,
  dataPageSesi: [],
  loading: false,
  error: null,
  success: false
}

const enrolls = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FRONTEND_ENROLL':
      return { ...state, selectedEnroll: action.selected, dataPageSesi: action.data }
    case 'GET_FRONTEND_QUIZ':
      return { ...state, selectedQuiz: action.selected }
    case 'GET_FRONTEND_ATTEMP_QUIZ':
      return { ...state, selectedAttemp: action.selected }
    case 'GET_FRONTEND_SURVEY':
      return { ...state, selectedSurvey: action.selected }
    case 'GET_FRONTEND_SESI':
      return { ...state, selectedSesi: action.selected }
    case 'GET_FRONTEND_COURSE_FINAL_SCORE':
      return { ...state, selectedCourseFinalScore: action.selected }
    case 'GET_FRONTEND_QUIZ_FINAL_SCORE':
      return { ...state, selectedQuizFinalScore: action.selected }
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
    case 'UNSELECT_FRONTEND_QUIZ':
      return {
        ...state,
        selectedQuiz: null
      }
    case 'UNSELECT_FRONTEND_SURVEY':
      return {
        ...state,
        selectedSurvey: null
      }
    case 'UNSELECT_FRONTEND_ATTEMP_QUIZ':
      return {
        ...state,
        selectedAttemp: null
      }
    default:
      return { ...state }
  }
}
export default enrolls
