import axios from 'axios'

// ** Get data on page or row change
export const getDataSubmitPeserta = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/submit_peserta/data`, {params})
      .then(response => {
        const {data} = response
        
        if (data.status) {

          dispatch({
            type: 'GET_DATA_SUBMIT_PESERTA',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_SUBMIT_PESERTA',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get User
export const getSubmitPeserta = user => {
  return async dispatch => {
    dispatch({
      type: 'GET_SUBMIT_PESERTA',
      selected: user
    })
  }
}

// ** Add new user
export const addSubmitPeserta = user => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_SUBMIT_PESERTA'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/submit_peserta/action`, user)
      .then(response => {

        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_SUBMIT_PESERTA',
            user
          })
          dispatch({
            type: 'SUCCESS_SUBMIT_PESERTA'
          })
        } else {
          dispatch({
            type: 'ERROR_SUBMIT_PESERTA',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_SUBMIT_PESERTA'
          })
        }, 500)
      })
      .catch(err => {

        const {response} = err 

        if (response.status === 400) {
          dispatch({
            type: 'ERROR_SUBMIT_PESERTA',
            error: response.data.message
          })
        } else {
          dispatch({
            type: 'ERROR_SUBMIT_PESERTA',
            error: err.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_SUBMIT_PESERTA'
          })
        }, 500)
      })
  }
}

