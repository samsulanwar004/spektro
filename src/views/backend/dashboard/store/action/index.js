import axios from 'axios'

// ** Get data on page or row change
export const getDataEnrollCourse = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/course-user`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_ENROLL_COURSE',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_ENROLL_COURSE',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get data on page or row change
export const getDataCertficateCourse = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/certificate/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_CERTIFICATE_COURSE',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_CERTIFICATE_COURSE',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

export const getCertficateCourse = id => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/generate-certificate/${id}`)
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_CERTIFICATE_COURSE',
            selected: data.data
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_CERTIFICATE_COURSE',
            selected: 'invalid'
          })
        }
      })
  }
}