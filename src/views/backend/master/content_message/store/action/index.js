import axios from 'axios'

// ** Get all Data
export const getAllDataContentMessage = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/content-message/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_CONTENT_MESSAGE',
          data: data.data,
          params
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataContentMessage = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/content-message/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_CONTENT_MESSAGE',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_CONTENT_MESSAGE',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get content
export const getContentMessage = contentmessage => {
  return async dispatch => {
    dispatch({
      type: 'GET_CONTENT_MESSAGE',
      selected: contentmessage
    })
  }
}

// ** Add new contentmessage
export const addContentMessage = contentmessage => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_CONTENT_MESSAGE'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/content-message/action`, contentmessage)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_CONTENT_MESSAGE',
            contentmessage
          })
          dispatch({
            type: 'SUCCESS_CONTENT_MESSAGE'
          })
        } else {
          dispatch({
            type: 'ERROR_CONTENT_MESSAGE',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_CONTENT_MESSAGE'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_CONTENT_MESSAGE',
          error: err.message
        })
      })
  }
}

// ** Delete content
export const deleteContentMessage = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/content-message/delete`, { id })
      .then(response => {
        dispatch({
          type: 'DELETE_CONTENT_MESSAGE'
        })
      })
      .then(() => {
        dispatch(getDataContentMessage(getState().contentmessages.params))
      })
      .catch(err => console.log(err))
  }
}
