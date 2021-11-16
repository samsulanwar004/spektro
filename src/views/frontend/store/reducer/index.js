// ** Initial State
const initialState = {
  allDataWhitelistDomain: [],
  dataCourse: [],
  totalCourse: 1,
  paramsCourse: null,
  dataMaterial: [],
  totalMaterial: 1,
  paramsMaterial: null,
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
    default:
      return { ...state }
  }
}
export default frontends
