import axios from 'axios'

// ** Get all Data
export const getAllDataFrontendWhitelistDomain = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/whitelist-domain/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_FRONTEND_WHITELIST_DOMAIN',
          data: data.data
        })
      }
      
    })
  }
}

// ** Get data on page or row change course
export const getDataFrontendCourse = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/course/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_FRONTEND_COURSE',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_FRONTEND_COURSE',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get data on page or row change material
export const getDataFrontendMaterial = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/material/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_FRONTEND_MATERIAL',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_FRONTEND_MATERIAL',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}
