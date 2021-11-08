import axios from 'axios'

// ** Get all Data
export const getAllDataWhitelistDomain = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/whitelist-domain/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_WHITELIST_DOMAIN',
          data: data.data,
          params
        })
      }
    }).catch(err => {
      const {response} = err
      if (response.status === 404) {
        dispatch({
          type: 'GET_ALL_DATA_WHITELIST_DOMAIN',
          data: [],
          params
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getDataWhitelistDomain = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ref/whitelist-domain/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_WHITELIST_DOMAIN',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_WHITELIST_DOMAIN',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get global
export const getWhitelistDomain = whitelistdomain => {
  return async dispatch => {
    dispatch({
      type: 'GET_WHITELIST_DOMAIN',
      selected: whitelistdomain
    })
  }
}

// ** Add new WhitelistDomain
export const addWhitelistDomain = whitelistdomain => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_WHITELIST_DOMAIN'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/whitelist-domain/action`, whitelistdomain)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_WHITELIST_DOMAIN',
            whitelistdomain
          })
          dispatch({
            type: 'SUCCESS_WHITELIST_DOMAIN'
          })
        } else {
          dispatch({
            type: 'ERROR_WHITELIST_DOMAIN',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_WHITELIST_DOMAIN'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_WHITELIST_DOMAIN',
          error: err.message
        })
      })
  }
}

// ** Delete global
export const deleteWhitelistDomain = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/ref/whitelist-domain/delete`, { wl_id: id })
      .then(response => {
        dispatch({
          type: 'DELETE_WHITELIST_DOMAIN'
        })
      })
      .then(() => {
        dispatch(getDataWhitelistDomain(getState().whitelistdomains.params))
      })
      .catch(err => console.log(err))
  }
}
