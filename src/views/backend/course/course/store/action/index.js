import axios from 'axios'

// ** Get all Data
export const getAllDataCourse = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/course/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_COURSE',
          data: data.data,
          params
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataCourse = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/course/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_COURSE',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_COURSE',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get global
export const getCourse = course => {
  return async dispatch => {
    dispatch({
      type: 'GET_COURSE',
      selected: course
    })
  }
}

// ** Add new Course
export const addCourse = course => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_COURSE'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/course/action`, course, {
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          dispatch({
            type: 'PROGRESS_COURSE',
            progress
          })
        }
      })
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_COURSE',
            course
          })
          dispatch({
            type: 'SUCCESS_COURSE'
          })
        } else {
          dispatch({
            type: 'ERROR_COURSE',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_COURSE'
          })
        }, 500)

        dispatch({
          type: 'PROGRESS_COURSE',
          progress: null
        })
      })
      .catch(err => {

        const {response} = err

        if (response.status === 404) {
          dispatch({
            type: 'ERROR_COURSE',
            error: response.data.message
          })
        } else if (response.status === 422) {
          dispatch({
            type: 'ERROR_COURSE',
            error: response.data.message.message
          })
        } else if (response.status === 400) {
          dispatch({
            type: 'ERROR_COURSE',
            error: response.data.message
          })
        } else {
          dispatch({
            type: 'ERROR_COURSE',
            error: err.message
          })
        }

        dispatch({
          type: 'PROGRESS_COURSE',
          progress: null
        })
        setTimeout(() => {
          dispatch({
            type: 'RESET_COURSE'
          })
        }, 500)
      })
  }
}

// ** Delete global
export const deleteCourse = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/course/delete`, { id_course: id })
      .then(response => {
        dispatch({
          type: 'DELETE_COURSE'
        })
      })
      .then(() => {
        dispatch(getDataCourse(getState().courses.params))
      })
      .catch(err => console.log(err))
  }
}
