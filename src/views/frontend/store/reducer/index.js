// ** Initial State
const initialState = {
  allDataWhitelistDomain: [],
  data: [],
  total: 1,
  params: null,
  selected: null,
  loading: false,
  error: null,
  success: false
}

const frontends = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_FRONTEND_WHITELIST_DOMAIN':
      return { ...state, allDataWhitelistDomain: action.data }
    default:
      return { ...state }
  }
}
export default frontends
