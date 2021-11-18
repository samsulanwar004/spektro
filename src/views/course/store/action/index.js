import axios from 'axios'

// ** Get all Data
export const getFrontendEnroll = (id) => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_ENROLL'
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/enroll-course/${id}`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_FRONTEND_ENROLL',
          selected: data.data
        })

        dispatch({
          type: 'SUCCESS_ENROLL'
        })
      }

      setTimeout(() => {
        dispatch({
          type: 'RESET_ENROLL'
        })
      }, 100)
    }).then(res => {
      
    }).catch(err => {
      const {response} = err
      const {data} = response

      if (response.status === 404) {
        dispatch({
          type: 'ERROR_ENROLL',
          error: data.message
        })
      } else {
        dispatch({
          type: 'ERROR_ENROLL',
          error: 'Something wrong'
        })
      }

      setTimeout(() => {
        dispatch({
          type: 'RESET_ENROLL'
        })
      }, 100)
    })
  }
}