import axios from 'axios'

// ** Get all Data
export const getAllDataDiscussion = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/discussion/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_DISCUSSION',
          data: data.data,
          params
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataDiscussion = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/discussion/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_DISCUSSION',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_DISCUSSION',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get content
export const getDiscussion = discussion => {
  return async dispatch => {
    dispatch({
      type: 'GET_DISCUSSION',
      selected: discussion
    })
  }
}

// ** Add new Discussion
export const addDiscussion = discussion => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_DISCUSSION'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/discussion/action`, discussion)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_DISCUSSION',
            discussion
          })
          dispatch({
            type: 'SUCCESS_DISCUSSION'
          })
        } else {
          dispatch({
            type: 'ERROR_DISCUSSION',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_DISCUSSION'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_DISCUSSION',
          error: err.message
        })
      })
  }
}

// ** Delete content
export const deleteDiscussion = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/discussion/delete`, { id_discussion: id })
      .then(response => {
        dispatch({
          type: 'DELETE_DISCUSSION'
        })
      })
      .then(() => {
        dispatch(getDataDiscussion(getState().discussions.params))
      })
      .catch(err => console.log(err))
  }
}

// ** post delete discussion email
export const emailDeleteDiscussion = email => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/email/post-discussion`, email)
  }
}
