import axios from 'axios'

// ** Get all Data
export const getAllDataPeserta = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/peserta/all-data`).then(response => {
      dispatch({
        type: 'GET_ALL_DATA_PESERTA',
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getDataPeserta = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/peserta/data`, {params})
      .then(response => {
        const {data} = response
        
        if (data.status) {

          dispatch({
            type: 'GET_DATA_PESERTA',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_PESERTA',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get User
export const getPeserta = user => {
  return async dispatch => {
    dispatch({
      type: 'GET_PESERTA',
      selected: user
    })
  }
}

// ** Add new user
export const addPeserta = user => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_PESERTA'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/peserta/action`, user)
      .then(response => {

        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_PESERTA',
            data: data.data
          })
          dispatch({
            type: 'SUCCESS_PESERTA'
          })
        } else {
          dispatch({
            type: 'ERROR_PESERTA',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_PESERTA'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_PESERTA',
          error: err.message
        })
      })
  }
}

// ** Add status
export const addPesertaStatus = user => {
  return (dispatch, getState) => {

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/peserta/status`, user)
      .then(response => {

        const {data} = response

        if (data.status) {
          console.log(data)
        }
      }).catch(err => {
      })
  }
}

// ** Delete user
export const deletePeserta = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/peserta/delete`, { id })
      .then(response => {
        dispatch({
          type: 'DELETE_PESERTA'
        })
      })
      .then(() => {
        dispatch(getDataPeserta(getState().pesertas.params))
      })
      .catch(err => console.log(err))
  }
}
