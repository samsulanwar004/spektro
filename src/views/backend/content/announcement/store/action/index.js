import axios from 'axios'

// ** Get all Data
export const getAllDataAnnouncement = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/content/announcement/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_ANNOUNCEMENT',
          data: data.data,
          params
        })
      }
    }).catch(err => {
      const {response} = err
      if (response.status === 404) {
        dispatch({
          type: 'GET_ALL_DATA_ANNOUNCEMENT',
          data: [],
          params
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getDataAnnouncement = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/content/announcement/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_ANNOUNCEMENT',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_ANNOUNCEMENT',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get announcement
export const getAnnouncement = announcement => {
  return async dispatch => {
    dispatch({
      type: 'GET_ANNOUNCEMENT',
      selected: announcement
    })
  }
}

// ** Add new announcement
export const addAnnouncement = announcement => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_ANNOUNCEMENT'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/content/announcement/action`, announcement)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_ANNOUNCEMENT',
            announcement
          })
          dispatch({
            type: 'SUCCESS_ANNOUNCEMENT'
          })
        } else {
          dispatch({
            type: 'ERROR_ANNOUNCEMENT',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_ANNOUNCEMENT'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_ANNOUNCEMENT',
          error: err.message
        })
      })
  }
}

// ** Delete announcement
export const deleteAnnouncement = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/content/announcement/delete`, { id_announcement: id })
      .then(response => {
        dispatch({
          type: 'DELETE_ANNOUNCEMENT'
        })
      })
      .then(() => {
        dispatch(getDataAnnouncement(getState().announcements.params))
      })
      .catch(err => console.log(err))
  }
}
