import axios from 'axios'

// ** Get all Data
export const getAllDataRepository = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/repository-doc/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_REPOSITORY',
          data: data.data
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataRepository = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/repository-doc/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_REPOSITORY',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_REPOSITORY',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get repository
export const getRepository = repository => {
  return async dispatch => {
    dispatch({
      type: 'GET_REPOSITORY',
      selected: repository
    })
  }
}

// ** Add new repository
export const addRepository = repository => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_REPOSITORY'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/repository-doc/action`, repository, {
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          dispatch({
            type: 'PROGRESS_REPOSITORY',
            progress
          })
        }
      })
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_REPOSITORY',
            data: data.data
          })
          dispatch({
            type: 'SUCCESS_REPOSITORY'
          })
        } else {
          dispatch({
            type: 'ERROR_REPOSITORY',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_REPOSITORY'
          })
        }, 500)

        dispatch({
          type: 'PROGRESS_REPOSITORY',
          progress: null
        })
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_REPOSITORY',
          error: err.message
        })
        dispatch({
          type: 'PROGRESS_REPOSITORY',
          progress: null
        })
      })
  }
}

// ** Delete repository
export const deleteRepository = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/repository-doc/delete`, { id_repository: id })
      .then(response => {
        dispatch({
          type: 'DELETE_REPOSITORY'
        })
      })
      .then(() => {
        dispatch(getDataRepository(getState().repositorys.params))
      })
      .catch(err => console.log(err))
  }
}
