import axios from 'axios'

// ** Get all Data
export const getAllDataTrainer = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/trainer/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_TRAINER',
          data: data.data
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataTrainer = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/trainer/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_TRAINER',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_TRAINER',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get trainer
export const getTrainer = trainer => {
  return async dispatch => {
    dispatch({
      type: 'GET_TRAINER',
      selected: trainer
    })
  }
}

// ** Add new trainer
export const addTrainer = trainer => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_TRAINER'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/trainer/action`, trainer)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_TRAINER',
            trainer
          })
          dispatch({
            type: 'SUCCESS_TRAINER'
          })
        } else {
          dispatch({
            type: 'ERROR_TRAINER',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_TRAINER'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_TRAINER',
          error: err.message
        })
      })
  }
}

// ** Delete user
export const deleteTrainer = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/trainer/delete`, { id_trainer: id })
      .then(response => {
        dispatch({
          type: 'DELETE_TRAINER'
        })
      })
      .then(() => {
        dispatch(getDataTrainer(getState().trainers.params))
      })
      .catch(err => console.log(err))
  }
}
