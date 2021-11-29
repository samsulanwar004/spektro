// ** Initial State
const initialState = {
  allDataWhitelistDomain: [],
  dataCourse: [],
  totalCourse: 1,
  paramsCourse: null,
  dataMaterial: [],
  totalMaterial: 1,
  paramsMaterial: null,
  dataBanner: [],
  totalBanner: 1,
  paramsBanner: null,
  dataTestimoni: [],
  totalTestimoni: 1,
  paramsTestimoni: null,
  dataPartner: [],
  totalPartner: 1,
  paramsPartner: null,
  dataAnnouncement: [],
  totalAnnouncement: 1,
  paramsAnnouncement: null,
  selectCourse: null,
  enrollCourse: null,
  selectMaterial: null,
  selectEnroll: [],
  dataDiscussion: [],
  totalDiscussion: 1,
  paramsDiscussion: null,
  addDiscussion: null,
  dataArticle: [],
  totalArticle: 1,
  paramsArticle: null,
  dataComment: [],
  totalComment: 1,
  paramsComment: null,
  addComment: null,
  addLikeDiscussion: null,
  selected: null,
  loading: false,
  error: null,
  success: false,
  progress: null
}

const frontends = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_FRONTEND_WHITELIST_DOMAIN':
      return { ...state, allDataWhitelistDomain: action.data }
    case 'GET_DATA_FRONTEND_COURSE':
      return {
        ...state,
        dataCourse: action.data,
        totalCourse: action.totalPages,
        paramsCourse: action.params
      }
    case 'GET_DATA_FRONTEND_MATERIAL':
      return {
        ...state,
        dataMaterial: action.data,
        totalMaterial: action.totalPages,
        paramsMaterial: action.params
      }
    case 'GET_DATA_FRONTEND_BANNER':
      return {
        ...state,
        dataBanner: action.data,
        totalBanner: action.totalPages,
        paramsBanner: action.params
      }
    case 'GET_DATA_FRONTEND_TESTIMONI':
      return {
        ...state,
        dataTestimoni: action.data,
        totalTestimoni: action.totalPages,
        paramsTestimoni: action.params
      }
    case 'GET_DATA_FRONTEND_PARTNER':
      return {
        ...state,
        dataPartner: action.data,
        totalPartner: action.totalPages,
        paramsPartner: action.params
      }
    case 'GET_DATA_FRONTEND_ANNOUNCEMENT':
      return {
        ...state,
        dataAnnouncement: action.data,
        totalAnnouncement: action.totalPages,
        paramsAnnouncement: action.params
      }
    case 'GET_DATA_FRONTEND_DISCUSSION':
      return {
        ...state,
        dataDiscussion: action.data,
        totalDiscussion: action.totalPages,
        paramsDiscussion: action.params
      }
    case 'GET_DATA_FRONTEND_ARTICLE':
      return {
        ...state,
        dataArticle: action.data,
        totalArticle: action.totalPages,
        paramsArticle: action.params
      }
    case 'GET_DATA_FRONTEND_COMMENT':
      return {
        ...state,
        dataComment: action.data,
        totalComment: action.totalPages,
        paramsComment: action.params
      }
    case 'ADD_FRONTEND_DISCUSSION':
      return {
        ...state,
        addDiscussion: action.data
      }
    case 'ADD_FRONTEND_COMMENT':
      return {
        ...state,
        addComment: action.data
      }
    case 'ADD_FRONTEND_LIKE_DISCUSSION':
      return {
        ...state,
        addLikeDiscussion: action.data
      }
    case 'REQUEST_CONTENT_LOADING':
      return {
        ...state,
        loading: action.loading
      }
    case 'SELECT_DATA_FRONTEND_COURSE':
      return {
        ...state,
        selectCourse: action.data
      }
    case 'SUCCESS_DATA_FRONTEND_COURSE':
      return {
        ...state,
        enrollCourse: action.data
      }
    case 'SELECT_DATA_FRONTEND_MATERIAL':
      return {
        ...state,
        selectMaterial: action.data
      }
    case 'SELECT_DATA_FRONTEND_ENROLL':
      return {
        ...state,
        selectEnroll: action.data
      }
    case 'RESET_FRONTEND_ARTICLE':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_FRONTEND_ARTICLE':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_FRONTEND_ARTICLE':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_FRONTEND_ARTICLE':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'PROGRESS_FRONTEND_ARTICLE':
      return {
        ...state,
        progress: action.progress
      }
    default:
      return { ...state }
  }
}
export default frontends
