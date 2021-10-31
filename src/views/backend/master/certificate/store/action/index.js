import axios from 'axios'

// ** Get all Data
export const getAllDataCertificate = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/certificate/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_CERTIFICATE',
          data: data.data
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataCertificate = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/certificate/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_CERTIFICATE',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_CERTIFICATE',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get certificate
export const getCertificate = certificate => {
  return async dispatch => {
    dispatch({
      type: 'GET_CERTIFICATE',
      selected: certificate
    })
  }
}

// ** Add new certificate
export const addCertificate = certificate => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_CERTIFICATE'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/certificate/action`, certificate)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_CERTIFICATE',
            certificate
          })
          dispatch({
            type: 'SUCCESS_CERTIFICATE'
          })
          
          dispatch(getDataCertificate(getState().certificates.params))
        } else {
          dispatch({
            type: 'ERROR_CERTIFICATE',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_CERTIFICATE'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_CERTIFICATE',
          error: err.message
        })
      })
  }
}

// ** Delete certificate
export const deleteCertificate = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/certificate/delete`, { id_certificate: id })
      .then(response => {
        dispatch({
          type: 'DELETE_CERTIFICATE'
        })
      })
      .then(() => {
        dispatch(getDataCertificate(getState().certificates.params))
      })
      .catch(err => console.log(err))
  }
}
