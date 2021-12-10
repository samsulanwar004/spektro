import axios from 'axios'

// ** Get all Data
export const getAllDataUniversity = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/universitas/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_UNIVERSITY',
          data: data.data
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataUniversity = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/universitas/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_UNIVERSITY',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_UNIVERSITY',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get university
export const getUniversity = university => {
  return async dispatch => {
    dispatch({
      type: 'GET_UNIVERSITY',
      selected: university
    })
  }
}

// ** Add new university
export const addUniversity = university => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_UNIVERSITY'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/universitas/action`, university)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_UNIVERSITY',
            data: data.data
          })
          dispatch({
            type: 'SUCCESS_UNIVERSITY'
          })
        } else {
          dispatch({
            type: 'ERROR_UNIVERSITY',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_UNIVERSITY'
          })

          dispatch({
            type: 'ADD_UNIVERSITY',
            data: null
          })
        }, 500)
      })
      .catch(err => {
        const {response} = err 
        if (response.status === 400) {
          dispatch({
            type: 'ERROR_UNIVERSITY',
            error: response.data.message
          })
        } else {
          dispatch({
            type: 'ERROR_UNIVERSITY',
            error: err.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_UNIVERSITY'
          })
          dispatch({
            type: 'ADD_UNIVERSITY',
            data: null
          })
        }, 500)
      })
  }
}

// ** Delete user
export const deleteUniversity = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/universitas/delete`, { id_universitas: id })
      .then(response => {
        dispatch({
          type: 'DELETE_UNIVERSITY'
        })
      })
      .then(() => {
        dispatch(getDataUniversity(getState().universitys.params))
      })
      .catch(err => console.log(err))
  }
}
