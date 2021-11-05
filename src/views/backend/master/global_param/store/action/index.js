import axios from 'axios'

// ** Get all Data
export const getAllDataGlobalParam = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/app/param-global/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_GLOBAL_PARAM',
          data: data.data,
          params
        })
      }
    }).catch(err => {
      const {response} = err
      if (response.status === 404) {
        dispatch({
          type: 'GET_ALL_DATA_GLOBAL_PARAM',
          data: [],
          params
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getDataGlobalParam = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/app/param-global/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_GLOBAL_PARAM',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_GLOBAL_PARAM',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get global
export const getGlobalParam = globalparam => {
  return async dispatch => {
    dispatch({
      type: 'GET_GLOBAL_PARAM',
      selected: globalparam
    })
  }
}

// ** Add new globalparam
export const addGlobalParam = globalparam => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_GLOBAL_PARAM'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/app/param-global/action`, globalparam)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_GLOBAL_PARAM',
            globalparam
          })
          dispatch({
            type: 'SUCCESS_GLOBAL_PARAM'
          })
        } else {
          dispatch({
            type: 'ERROR_GLOBAL_PARAM',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_GLOBAL_PARAM'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_GLOBAL_PARAM',
          error: err.message
        })
      })
  }
}

// ** Delete global
export const deleteGlobalParam = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/app/param-global/delete`, { id })
      .then(response => {
        dispatch({
          type: 'DELETE_GLOBAL_PARAM'
        })
      })
      .then(() => {
        dispatch(getDataGlobalParam(getState().globalparams.params))
      })
      .catch(err => console.log(err))
  }
}

// ** Upload image
export const uploadImage = upload => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/app/param-global/upload`, upload)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'UPLOAD_GLOBAL_PARAM',
            upload: data.data
          })
        }
      })
      .then(() => {
        dispatch({
          type: 'UPLOAD_GLOBAL_PARAM',
          upload: null
        })
      })
      .catch(err => console.log(err))
  }
}
