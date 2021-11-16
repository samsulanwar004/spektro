import axios from 'axios'

// ** Get all Data
export const getAllDataPartner = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/content/mitra-partner/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_PARTNER',
          data: data.data,
          params
        })
      }
    }).catch(err => {
      const {response} = err
      if (response.status === 404) {
        dispatch({
          type: 'GET_ALL_DATA_PARTNER',
          data: [],
          params
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getDataPartner = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/content/mitra-partner/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_PARTNER',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_PARTNER',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get partner
export const getPartner = partner => {
  return async dispatch => {
    dispatch({
      type: 'GET_PARTNER',
      selected: partner
    })
  }
}

// ** Add new partner
export const addPartner = partner => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_PARTNER'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/content/mitra-partner/action`, partner)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_PARTNER',
            partner
          })
          dispatch({
            type: 'SUCCESS_PARTNER'
          })
        } else {
          dispatch({
            type: 'ERROR_PARTNER',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_PARTNER'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_PARTNER',
          error: err.message
        })
      })
  }
}

// ** Delete partner
export const deletePartner = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/content/mitra-partner/delete`, { id_mitra: id })
      .then(response => {
        dispatch({
          type: 'DELETE_PARTNER'
        })
      })
      .then(() => {
        dispatch(getDataPartner(getState().partners.params))
      })
      .catch(err => console.log(err))
  }
}
