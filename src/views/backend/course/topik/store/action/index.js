import axios from 'axios'

// ** Get all Data
export const getAllDataTopik = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/topik/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_TOPIK',
          data: data.data,
          params
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataTopik = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/topik/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_TOPIK',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_TOPIK',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get global
export const getTopik = topik => {
  return async dispatch => {
    dispatch({
      type: 'GET_TOPIK',
      selected: topik
    })
  }
}

// ** Add new Topik
export const addTopik = topik => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_TOPIK'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/topik/action`, topik)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_TOPIK',
            topik
          })
          dispatch({
            type: 'SUCCESS_TOPIK'
          })
        } else {
          dispatch({
            type: 'ERROR_TOPIK',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_TOPIK'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_TOPIK',
          error: err.message
        })
      })
  }
}

// ** Delete global
export const deleteTopik = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/topik/delete`, { id_topik: id })
      .then(response => {
        dispatch({
          type: 'DELETE_TOPIK'
        })
      })
      .then(() => {
        dispatch(getDataTopik(getState().topiks.params))
      })
      .catch(err => console.log(err))
  }
}
