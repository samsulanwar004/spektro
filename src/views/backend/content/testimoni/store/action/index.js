import axios from 'axios'

// ** Get all Data
export const getAllDataTestimoni = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/content/testimoni/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_TESTIMONI',
          data: data.data,
          params
        })
      }
    }).catch(err => {
      const {response} = err
      if (response.status === 404) {
        dispatch({
          type: 'GET_ALL_DATA_TESTIMONI',
          data: [],
          params
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getDataTestimoni = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/content/testimoni/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_TESTIMONI',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_TESTIMONI',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get testimoni
export const getTestimoni = testimoni => {
  return async dispatch => {
    dispatch({
      type: 'GET_TESTIMONI',
      selected: testimoni
    })
  }
}

// ** Add new testimoni
export const addTestimoni = testimoni => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_TESTIMONI'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/content/testimoni/action`, testimoni)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_TESTIMONI',
            testimoni
          })
          dispatch({
            type: 'SUCCESS_TESTIMONI'
          })
        } else {
          dispatch({
            type: 'ERROR_TESTIMONI',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_TESTIMONI'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_TESTIMONI',
          error: err.message
        })
      })
  }
}

// ** Delete testimoni
export const deleteTestimoni = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/content/testimoni/delete`, { id_testimoni: id })
      .then(response => {
        dispatch({
          type: 'DELETE_TESTIMONI'
        })
      })
      .then(() => {
        dispatch(getDataTestimoni(getState().testimonis.params))
      })
      .catch(err => console.log(err))
  }
}
