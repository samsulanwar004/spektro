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

const whitelistdomains = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_WHITELIST_DOMAIN':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_WHITELIST_DOMAIN':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_WHITELIST_DOMAIN':
      return { ...state, selected: action.selected }
    case 'ADD_WHITELIST_DOMAIN':
      return { ...state }
    case 'DELETE_WHITELIST_DOMAIN':
      return { ...state }
    case 'RESET_WHITELIST_DOMAIN':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_WHITELIST_DOMAIN':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_WHITELIST_DOMAIN':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_WHITELIST_DOMAIN':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'UPLOAD_WHITELIST_DOMAIN':
      return {
        ...state,
        upload: action.upload
      }
    default:
      return { ...state }
  }
}
export default whitelistdomains
