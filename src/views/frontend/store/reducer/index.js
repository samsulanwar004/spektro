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
  selected: null,
  loading: false,
  error: null,
  success: false
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
    default:
      return { ...state }
  }
}
export default frontends
