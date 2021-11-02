import axios from 'axios'

// ** Get all Data
export const getAllDataSatker = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/satker/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_SATKER',
          data: data.data
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataSatker = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/satker/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_SATKER',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_SATKER',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get Satker
export const getSatker = satker => {
  return async dispatch => {
    dispatch({
      type: 'GET_SATKER',
      selected: satker
    })
  }
}

// ** Add new Satker
export const addSatker = satker => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_SATKER'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/satker/action`, satker)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_SATKER',
            satker
          })
          dispatch({
            type: 'SUCCESS_SATKER'
          })
        } else {
          dispatch({
            type: 'ERROR_SATKER',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_SATKER'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_SATKER',
          error: err.message
        })
      })
  }
}

// ** Delete user
export const deleteSatker = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/satker/delete`, { id_satker: id })
      .then(response => {
        dispatch({
          type: 'DELETE_SATKER'
        })
      })
      .then(() => {
        dispatch(getDataSatker(getState().satkers.params))
      })
      .catch(err => console.log(err))
  }
}
