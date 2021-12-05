import axios from 'axios'

// ** Get all Data
export const getAllDataCalonPeserta = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/calon_peserta/all-data`).then(response => {
      dispatch({
        type: 'GET_ALL_DATA_CALON_PESERTA',
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getDataCalonPeserta = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/calon_peserta/data`, {params})
      .then(response => {
        const {data} = response
        
        if (data.status) {

          dispatch({
            type: 'GET_DATA_CALON_PESERTA',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_CALON_PESERTA',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get User
export const getCalonPeserta = user => {
  return async dispatch => {
    dispatch({
      type: 'GET_CALON_PESERTA',
      selected: user
    })
  }
}

// ** Add new user
export const addCalonPeserta = user => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_CALON_PESERTA'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/calon_peserta/action`, user)
      .then(response => {

        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_CALON_PESERTA',
            data: data.data
          })
          dispatch({
            type: 'SUCCESS_CALON_PESERTA'
          })
        } else {
          dispatch({
            type: 'ERROR_CALON_PESERTA',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_CALON_PESERTA'
          })
        }, 500)
      })
      .catch(err => {

        const {response} = err 

        if (response.status === 400) {
          dispatch({
            type: 'ERROR_CALON_PESERTA',
            error: response.data.message
          })
        } else {
          dispatch({
            type: 'ERROR_CALON_PESERTA',
            error: err.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_CALON_PESERTA'
          })
        }, 500)
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
          dispatch({
            type: 'STATUS_CALON_PESERTA',
            data: data.data
          })
        }
      }).catch(err => {
      })
  }
}

// ** Delete user
export const deleteCalonPeserta = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/calon_peserta/delete`, { id })
      .then(response => {
        dispatch({
          type: 'DELETE_CALON_PESERTA'
        })
      })
      .then(() => {
        dispatch(getDataCalonPeserta(getState().calonpesertas.params))
      })
      .catch(err => console.log(err))
  }
}
