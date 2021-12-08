import axios from 'axios'

// ** Get all Data
export const getAllDataBank = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/m_bank/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_BANK',
          data: data.data,
          params
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataBank = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/m_bank/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_BANK',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_BANK',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get content
export const getBank = bank => {
  return async dispatch => {
    dispatch({
      type: 'GET_BANK',
      selected: bank
    })
  }
}

// ** Add new Bank
export const addBank = bank => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_BANK'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/m_bank/action`, bank)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_BANK',
            bank
          })
          dispatch({
            type: 'SUCCESS_BANK'
          })
        } else {
          dispatch({
            type: 'ERROR_BANK',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_BANK'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_BANK',
          error: err.message
        })
      })
  }
}

// ** Delete content
export const deleteBank = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/m_bank/delete`, { id })
      .then(response => {
        dispatch({
          type: 'DELETE_BANK'
        })
      })
      .then(() => {
        dispatch(getDataBank(getState().banks.params))
      })
      .catch(err => console.log(err))
  }
}
