import axios from 'axios'

// ** Get all Data
export const getAllDataMaterial = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/material/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_MATERIAL',
          data: data.data
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataMaterial = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/material/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_MATERIAL',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_MATERIAL',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get material
export const getMaterial = material => {
  return async dispatch => {
    dispatch({
      type: 'GET_MATERIAL',
      selected: material
    })
  }
}

// ** Add new material
export const addMaterial = material => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_MATERIAL'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/material/action`, material, {
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
            type: 'ADD_MATERIAL',
            material
          })
          dispatch({
            type: 'SUCCESS_MATERIAL'
          })
        } else {
          dispatch({
            type: 'ERROR_MATERIAL',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_MATERIAL'
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
            type: 'ERROR_MATERIAL',
            error: response.data.message
          })
        } else if (response.status === 422) {
          dispatch({
            type: 'ERROR_MATERIAL',
            error: response.data.message.message
          })
        } else if (response.status === 400) {
          dispatch({
            type: 'ERROR_MATERIAL',
            error: response.data.message
          })
        } else {
          dispatch({
            type: 'ERROR_MATERIAL',
            error: err.message
          })
        }

        dispatch({
          type: 'PROGRESS_MATERIAL',
          progress: null
        })
        setTimeout(() => {
          dispatch({
            type: 'RESET_MATERIAL'
          })
        }, 500)
      })
  }
}

// ** Delete material
export const deleteMaterial = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/material/delete`, { id_materials: id })
      .then(response => {
        dispatch({
          type: 'DELETE_MATERIAL'
        })
      })
      .then(() => {
        dispatch(getDataMaterial(getState().materials.params))
      })
      .catch(err => console.log(err))
  }
}
