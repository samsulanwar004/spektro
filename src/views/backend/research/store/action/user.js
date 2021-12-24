import axios from 'axios'

// ** Get all Data
export const getAllDataPesertaResearch = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/peserta/banlit_rgbi/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_PESERTA_RESEARCH',
          data: data.data,
          params
        })
      }
    }).catch(err => {
      const {response} = err
      if (response.status === 404) {
        dispatch({
          type: 'GET_ALL_DATA_PESERTA_RESEARCH',
          data: [],
          params
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getDataPesertaResearch = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/peserta/banlit_rgbi/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_PESERTA_RESEARCH',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_PESERTA_RESEARCH',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get PesertaResearch
export const getPesertaResearch = pesertaResearch => {
  return async dispatch => {
    dispatch({
      type: 'GET_PESERTA_RESEARCH',
      selected: pesertaResearch
    })
  }
}

// ** Add new PesertaResearch
export const addPesertaResearch = pesertaResearch => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_PESERTA_RESEARCH'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/peserta/banlit_rgbi/action`, pesertaResearch, {
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          dispatch({
            type: 'PROGRESS_PESERTA_RESEARCH',
            progress
          })
        }
      })
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_PESERTA_RESEARCH',
            data: data.data
          })
          dispatch({
            type: 'SUCCESS_PESERTA_RESEARCH'
          })
        } else {
          dispatch({
            type: 'ERROR_PESERTA_RESEARCH',
            error: data.message
          })
        }

        dispatch({
          type: 'PROGRESS_PESERTA_RESEARCH',
          progress: null
        })

        setTimeout(() => {
          dispatch({
            type: 'RESET_PESERTA_RESEARCH'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_PESERTA_RESEARCH',
          error: err.message
        })

        dispatch({
          type: 'PROGRESS_PESERTA_RESEARCH',
          progress: null
        })

        setTimeout(() => {
          dispatch({
            type: 'RESET_PESERTA_RESEARCH'
          })
        }, 500)
      })
  }
}

// ** Delete PesertaResearch
export const deletePesertaResearch = params => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/peserta/banlit_rgbi/delete`, params)
      .then(response => {
        dispatch({
          type: 'DELETE_PESERTA_RESEARCH'
        })
      })
      .then(() => {
        dispatch(getDataPesertaResearch(getState().pesertaresearchs.params))
      })
      .catch(err => console.log(err))
  }
}

export const getPesertaResearchData = pesertaResearch => {
  return (dispatch, getState) => {

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/peserta/banlit_rgbi/detail`, pesertaResearch)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'GET_PESERTA_RESEARCH_DATA',
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
