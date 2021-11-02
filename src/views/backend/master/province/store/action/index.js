import axios from 'axios'

// ** Get all Data
export const getAllDataProvince = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/province/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_PROVINCE',
          data: data.data
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataProvince = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/province/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_PROVINCE',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_PROVINCE',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get province
export const getProvince = province => {
  return async dispatch => {
    dispatch({
      type: 'GET_PROVINCE',
      selectedProvince: province
    })
  }
}

// ** Add new province
export const addProvince = province => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_PROVINCE'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/province/action`, province)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_PROVINCE',
            province
          })
          dispatch({
            type: 'SUCCESS_PROVINCE'
          })
        } else {
          dispatch({
            type: 'ERROR_PROVINCE',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_PROVINCE'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_PROVINCE',
          error: err.message
        })
      })
  }
}

// ** Delete user
export const deleteProvince = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/province/delete`, { id_provinsi: id })
      .then(response => {
        dispatch({
          type: 'DELETE_PROVINCE'
        })
      })
      .then(() => {
        dispatch(getDataProvince(getState().provinces.params))
      })
      .catch(err => console.log(err))
  }
}
