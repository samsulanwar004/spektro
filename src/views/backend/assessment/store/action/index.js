import axios from 'axios'

// ** Get data on page or row change
export const getDataAssessment = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/trx/course-assessment/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_ASSESSMENT',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_ASSESSMENT',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get data topik enroll
export const getDataTopikAssessment = (id, params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/trx/enroll-course/${id}`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_TOPIK_ASSESSMENT',
            data: data.data.topik
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_TOPIK_ASSESSMENT',
            data: []
          })
        }
      })
  }
}

// ** Get data quiz assessment
export const getDataQuizAssessment = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/trx/quiz`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_QUIZ_ASSESSMENT',
            data: data.data
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_QUIZ_ASSESSMENT',
            data: []
          })
        }
      })
  }
}

// ** Get Assessment
export const getAssessment = assessment => {
  return async dispatch => {
    dispatch({
      type: 'GET_ASSESSMENT',
      selected: assessment
    })
  }
}

// ** Add new Assessment
export const addAssessment = assessment => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_ASSESSMENT'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/trx/answer-quiz/nilai`, assessment)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_ASSESSMENT',
            assessment
          })
          dispatch({
            type: 'SUCCESS_ASSESSMENT'
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_ASSESSMENT'
          })
        }, 500)
      })
      .catch(err => {

        const {response} = err

        if (response.status === 404) {
          dispatch({
            type: 'ERROR_ASSESSMENT',
            error: response.data.message
          })
        } else if (response.status === 422) {
          dispatch({
            type: 'ERROR_ASSESSMENT',
            error: response.data.message.message
          })
        } else if (response.status === 400) {
          dispatch({
            type: 'ERROR_ASSESSMENT',
            error: response.data.message
          })
        } else {
          dispatch({
            type: 'ERROR_ASSESSMENT',
            error: err.message
          })
        }
        setTimeout(() => {
          dispatch({
            type: 'RESET_ASSESSMENT'
          })
        }, 500)
      })
  }
}

// ** enroll
export const enrollAdminCourse = enroll => {
  return async (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_ASSESSMENT'
    })

    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/trx/enroll-course/action`, enroll)
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'SUCCESS_ASSESSMENT'
          })

          dispatch({
            type: 'ADD_NEW_ASSESSMENT',
            data
          })

          setTimeout(() => {
            dispatch({
              type: 'RESET_ASSESSMENT'
            })
          }, 500)
        }
      }).then(() => {
        dispatch(getDataAssessment(getState().assessments.params))
      }).catch(err => {
        const {response} = err

        if (response.status === 404) {
          dispatch({
            type: 'ERROR_ASSESSMENT',
            error: response.data.message
          })
        } else if (response.status === 422) {
          dispatch({
            type: 'ERROR_ASSESSMENT',
            error: response.data.message.message
          })
        } else if (response.status === 400) {
          dispatch({
            type: 'ERROR_ASSESSMENT',
            error: response.data.message
          })
        } else {
          dispatch({
            type: 'ERROR_ASSESSMENT',
            error: err.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_ASSESSMENT'
          })
        }, 500)
      })
  }
}

// ** post banlit-rgbi email
export const emailAddResearch = email => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/email/enroll-course-admin`, email)
  }
}

// ** get final score
export const getCourseFinalScore = params => {
  return async dispatch => {

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/course-final-score`, {params}).then(response => {

      const {data} = response

      dispatch({
        type: 'GET_COURSE_FINAL_SCORE_ASSESSMENT',
        selected: data.data
      })
    })
  }
}
