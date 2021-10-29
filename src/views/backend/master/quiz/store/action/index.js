import axios from 'axios'

// ** Get all Data
export const getAllDataQuiz = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/quiz/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_QUIZ',
          data: data.data
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataQuiz = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/quiz/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_QUIZ',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => console.log(err))
  }
}

// ** Get quiz
export const getQuiz = quiz => {
  return async dispatch => {
    dispatch({
      type: 'GET_QUIZ',
      selected: quiz
    })
  }
}

// ** Add new quiz
export const addQuiz = quiz => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_QUIZ'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/quiz/action`, quiz)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_QUIZ',
            quiz
          })
          dispatch({
            type: 'SUCCESS_QUIZ'
          })
          
          dispatch(getDataQuiz(getState().quizs.params))
        } else {
          dispatch({
            type: 'ERROR_QUIZ',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_QUIZ'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_QUIZ',
          error: err.message
        })
      })
  }
}

// ** Delete survey
export const deleteQuiz = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/quiz/delete`, { id_quiz: id })
      .then(response => {
        dispatch({
          type: 'DELETE_QUIZ'
        })
      })
      .then(() => {
        dispatch(getDataQuiz(getState().quizs.params))
      })
      .catch(err => console.log(err))
  }
}
