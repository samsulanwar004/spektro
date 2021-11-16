import axios from 'axios'

// ** Get all Data
export const getAllDataBanner = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/content/banner/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_BANNER',
          data: data.data,
          params
        })
      }
    }).catch(err => {
      const {response} = err
      if (response.status === 404) {
        dispatch({
          type: 'GET_ALL_DATA_BANNER',
          data: [],
          params
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getDataBanner = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/content/banner/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_BANNER',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_BANNER',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get global
export const getBanner = banner => {
  return async dispatch => {
    dispatch({
      type: 'GET_BANNER',
      selected: banner
    })
  }
}

// ** Add new Banner
export const addBanner = banner => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_BANNER'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/content/banner/action`, banner)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_BANNER',
            banner
          })
          dispatch({
            type: 'SUCCESS_BANNER'
          })
        } else {
          dispatch({
            type: 'ERROR_BANNER',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_BANNER'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_BANNER',
          error: err.message
        })
      })
  }
}

// ** Delete banner
export const deleteBanner = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/content/banner/delete`, { id_banner: id })
      .then(response => {
        dispatch({
          type: 'DELETE_BANNER'
        })
      })
      .then(() => {
        dispatch(getDataBanner(getState().banners.params))
      })
      .catch(err => console.log(err))
  }
}
