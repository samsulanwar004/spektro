import axios from 'axios'

// ** Get all Data
export const getAllDataWlPeserta = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/wl_peserta/all-data`).then(response => {
      dispatch({
        type: 'GET_ALL_DATA_WL_PESERTA',
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getDataWlPeserta = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/wl_peserta/data`, {params})
      .then(response => {
        const {data} = response
        
        if (data.status) {

          dispatch({
            type: 'GET_DATA_WL_PESERTA',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_WL_PESERTA',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get User
export const getWlPeserta = user => {
  return async dispatch => {
    dispatch({
      type: 'GET_WL_PESERTA',
      selected: user
    })
  }
}

// ** Add new user
export const addWlPeserta = user => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_WL_PESERTA'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/wl_peserta/action`, user)
      .then(response => {

        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_WL_PESERTA',
            user
          })
          dispatch({
            type: 'SUCCESS_WL_PESERTA'
          })
        } else {
          dispatch({
            type: 'ERROR_WL_PESERTA',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_WL_PESERTA'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_WL_PESERTA',
          error: err.message
        })
      })
  }
}

// ** Delete user
export const deleteWlPeserta = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/wl_peserta/delete`, { id })
      .then(response => {
        dispatch({
          type: 'DELETE_WL_PESERTA'
        })
      })
      .then(() => {
        dispatch(getDataWlPeserta(getState().wlpesertas.params))
      })
      .catch(err => console.log(err))
  }
}
