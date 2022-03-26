import axios from 'axios'

// ** Get all Data
export const getReportUser = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/report/user`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_REPORT_USER',
          data: data.data,
          params
        })
      }
    }).catch(err => {
      const {response} = err
      if (response.status === 404) {
        dispatch({
          type: 'GET_REPORT_USER',
          data: [],
          params
        })
      }
    })
  }
}
