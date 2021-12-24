import axios from 'axios'

// ** Get all Data
export const getAllDataAdminResearch = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/banlit_rgbi/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_RGBI',
          data: data.data,
          params
        })
      }
    }).catch(err => {
      const {response} = err
      if (response.status === 404) {
        dispatch({
          type: 'GET_ALL_DATA_RGBI',
          data: [],
          params
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getDataAdminResearch = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/banlit_rgbi/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_RGBI',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_RGBI',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get AdminResearch
export const getAdminResearch = adminResearch => {
  return async dispatch => {
    dispatch({
      type: 'GET_RGBI',
      selected: adminResearch
    })
  }
}

// ** Add new AdminResearch
export const addAdminResearch = adminResearch => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_RGBI'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/banlit_rgbi/action`, adminResearch, {
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          dispatch({
            type: 'PROGRESS_RGBI',
            progress
          })
        }
      })
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_RGBI',
            adminResearch
          })
          dispatch({
            type: 'SUCCESS_RGBI'
          })
        } else {
          dispatch({
            type: 'ERROR_RGBI',
            error: data.message
          })
        }

        dispatch({
          type: 'PROGRESS_RGBI',
          progress: null
        })

        setTimeout(() => {
          dispatch({
            type: 'RESET_RGBI'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_RGBI',
          error: err.message
        })

        dispatch({
          type: 'PROGRESS_RGBI',
          progress: null
        })

        setTimeout(() => {
          dispatch({
            type: 'RESET_RGBI'
          })
        }, 500)
      })
  }
}

// ** Delete AdminResearch
export const deleteAdminResearch = params => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/banlit_rgbi/delete`, params)
      .then(response => {
        dispatch({
          type: 'DELETE_RGBI'
        })
      })
      .then(() => {
        dispatch(getDataAdminResearch(getState().adminresearchs.params))
      })
      .catch(err => console.log(err))
  }
}

export const getAdminResearchData = adminResearch => {
  return (dispatch, getState) => {

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/banlit_rgbi/detail`, adminResearch)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'GET_RGBI_DATA',
            data: data.data[0]
          })
        } 
      })
      .catch(err => {
        
      })
  }
}

// ** post banlit-rgbi email
export const emailAddResearch = email => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/email/banlit-rgbi`, email)
  }
}
