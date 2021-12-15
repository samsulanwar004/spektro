import axios from 'axios'

// ** Get data on page or row change
export const getDataMentor = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/resource/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_MENTOR',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_MENTOR',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get
export const getMentor = mentor => {
  return async dispatch => {
    dispatch({
      type: 'GET_MENTOR',
      selected: mentor
    })
  }
}

// ** Get data on page or row change
export const getDataMentorDetail = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/evaluation/detail`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_MENTOR_DETAIL',
            data: data.data
          })
        }
      }).catch(err => {
        const {response} = err
      })
  }
}

// ** Add new evaluation
export const addMentorEvaluation = mentor => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_MENTOR'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/evaluation/action`, mentor)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_MENTOR',
            mentor
          })
          dispatch({
            type: 'SUCCESS_MENTOR'
          })
        } else {
          dispatch({
            type: 'ERROR_MENTOR',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_MENTOR'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_MENTOR',
          error: err.message
        })

        setTimeout(() => {
          dispatch({
            type: 'RESET_MENTOR'
          })
        }, 500)
      })
  }
}
