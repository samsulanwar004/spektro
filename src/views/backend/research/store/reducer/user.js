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
  selectData: null,
  progress: null,
  addData: null
}

const PESERTAresearchs = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_PESERTA_RESEARCH':
      return { ...state, allData: action.data, params: action.params }
    case 'GET_DATA_PESERTA_RESEARCH':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_PESERTA_RESEARCH':
      return { ...state, selected: action.selected }
    case 'GET_PESERTA_RESEARCH_DATA':
      return { ...state, selectData: action.data }
    case 'ADD_PESERTA_RESEARCH':
      return { 
        ...state,
        addData: action.data 
    }
    case 'DELETE_PESERTA_RESEARCH':
      return { ...state }
    case 'RESET_PESERTA_RESEARCH':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_PESERTA_RESEARCH':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_PESERTA_RESEARCH':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_PESERTA_RESEARCH':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'PROGRESS_PESERTA_RESEARCH':
      return {
        ...state,
        progress: action.progress
      }
    default:
      return { ...state }
  }
}
export default PESERTAresearchs
