import axios from 'axios'

// ** Get data enroll
export const getFrontendEnroll = (id) => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_ENROLL'
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/enroll-course/${id}`).then(response => {

      const {data} = response

      const dataTopik = data.data.topik

      const dataSesi = []
      for (let i = 0; i < dataTopik.length; i++) {
        for (let j = 0; j < dataTopik[i].sesi.length; j++) {
          const sesi = dataTopik[i].sesi[j]
          sesi.topik = `topik-${i}`
          dataSesi.push(sesi)
        }
      }

      if (data.status) {
        dispatch({
          type: 'GET_FRONTEND_ENROLL',
          selected: data.data,
          data: dataSesi
        })
      }

      setTimeout(() => {
        dispatch({
          type: 'RESET_ENROLL'
        })
      }, 100)
    }).catch(err => {
      const {response} = err
      const {data} = response

      if (response.status === 404) {
        dispatch({
          type: 'ERROR_ENROLL',
          error: data.message
        })
      } else {
        dispatch({
          type: 'ERROR_ENROLL',
          error: 'Something wrong'
        })
      }

      setTimeout(() => {
        dispatch({
          type: 'RESET_ENROLL'
        })
      }, 100)
    })
  }
}

// ** Get quiz
export const getFrontendQuiz = (id) => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_ENROLL'
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/quiz/${id}`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_FRONTEND_QUIZ',
          selected: data.data
        })
      }

      setTimeout(() => {
        dispatch({
          type: 'RESET_ENROLL'
        })
      }, 100)
    }).catch(err => {
      const {response} = err
      const {data} = response

      if (response.status === 404) {
        dispatch({
          type: 'ERROR_ENROLL',
          error: data.message
        })
      } else {
        dispatch({
          type: 'ERROR_ENROLL',
          error: 'Something wrong'
        })
      }

      setTimeout(() => {
        dispatch({
          type: 'RESET_ENROLL'
        })
      }, 100)
    })
  }
}

// ** Get survey
export const getFrontendSurvey = (id) => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_ENROLL'
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/survey/${id}`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_FRONTEND_SURVEY',
          selected: data.data
        })
      }

      setTimeout(() => {
        dispatch({
          type: 'RESET_ENROLL'
        })
      }, 100)
    }).catch(err => {
      const {response} = err
      const {data} = response

      if (response.status === 404) {
        dispatch({
          type: 'ERROR_ENROLL',
          error: data.message
        })
      } else {
        dispatch({
          type: 'ERROR_ENROLL',
          error: 'Something wrong'
        })
      }

      setTimeout(() => {
        dispatch({
          type: 'RESET_ENROLL'
        })
      }, 100)
    })
  }
}

// ** Post attemp quiz answer
export const attempFrontendQuiz = answer => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_ENROLL'
    })

    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/fe/answer-quiz-attemp`, answer).then(response => {

      const {data} = response

      dispatch({
        type: 'GET_FRONTEND_ATTEMP_QUIZ',
        selected: data.data
      })

      setTimeout(() => {
        dispatch({
          type: 'RESET_ENROLL'
        })
      }, 100)
    }).catch(err => {
      const {response} = err
      const {data} = response

      if (response.status === 404) {
        dispatch({
          type: 'ERROR_ENROLL',
          error: data.message
        })
      } else {
        dispatch({
          type: 'ERROR_ENROLL',
          error: 'Something wrong'
        })
      }

      setTimeout(() => {
        dispatch({
          type: 'RESET_ENROLL'
        })
      }, 100)
    })
  }
}

// ** Post quiz answer
export const addFrontendQuizAnswer = answer => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_ENROLL'
    })

    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/fe/answer-quiz`, answer).then(response => {

      const {data} = response

      setTimeout(() => {
        dispatch({
          type: 'RESET_ENROLL'
        })
      }, 100)
    }).catch(err => {
      const {response} = err
      const {data} = response

      if (response.status === 404) {
        dispatch({
          type: 'ERROR_ENROLL',
          error: data.message
        })
      } else {
        dispatch({
          type: 'ERROR_ENROLL',
          error: 'Something wrong'
        })
      }

      setTimeout(() => {
        dispatch({
          type: 'RESET_ENROLL'
        })
      }, 100)
    })
  }
}