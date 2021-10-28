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
      }).catch(err => console.log(err))
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
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/repository-doc/action`, repository)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_REPOSITORY',
            repository
          })
          dispatch({
            type: 'SUCCESS_REPOSITORY'
          })
          
          dispatch(getDataRepository(getState().repositorys.params))
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
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_REPOSITORY',
          error: err.message
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
