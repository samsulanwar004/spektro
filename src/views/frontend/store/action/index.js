import axios from 'axios'

// ** Get all Data
export const getAllDataFrontendWhitelistDomain = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/whitelist-domain/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_FRONTEND_WHITELIST_DOMAIN',
          data: data.data
        })
      }
      
    })
  }
}
