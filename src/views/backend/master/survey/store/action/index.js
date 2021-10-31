import axios from 'axios'

// ** Get all Data
export const getAllDataSurvey = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/survey/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_SURVEY',
          data: data.data
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataSurvey = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/survey/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_SURVEY',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_SURVEY',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get survey
export const getSurvey = survey => {
  return async dispatch => {
    dispatch({
      type: 'GET_SURVEY',
      selected: survey
    })
  }
}

// ** Add new survey
export const addSurvey = survey => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_SURVEY'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/survey/action`, survey)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_SURVEY',
            survey
          })
          dispatch({
            type: 'SUCCESS_SURVEY'
          })
          
          dispatch(getDataSurvey(getState().surveys.params))
        } else {
          dispatch({
            type: 'ERROR_SURVEY',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_SURVEY'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_SURVEY',
          error: err.message
        })
      })
  }
}

// ** Delete survey
export const deleteSurvey = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/survey/delete`, { id_survey: id })
      .then(response => {
        dispatch({
          type: 'DELETE_SURVEY'
        })
      })
      .then(() => {
        dispatch(getDataSurvey(getState().surveys.params))
      })
      .catch(err => console.log(err))
  }
}
