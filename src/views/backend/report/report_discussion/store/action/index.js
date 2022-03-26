import axios from 'axios'

// ** Get all Data
export const getReportDiscussion = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/report/discussion`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_REPORT_DISCUSSION',
          data: data.data,
          params
        })
      }
    }).catch(err => {
      const {response} = err
      if (response.status === 404) {
        dispatch({
          type: 'GET_REPORT_DISCUSSION',
          data: [],
          params
        })
      }
    })
  }
}
