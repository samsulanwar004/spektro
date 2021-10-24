import axios from 'axios'

// ** Get all Data
export const getAllDataDepartemen = () => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/globaldepartemen/list`).then(response => {

      const {data} = response

      if (data.code === 200) {
        dispatch({
          type: 'GET_ALL_DATA_DEPARTEMEN',
          data: data.result
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataDepartemen = params => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/globaldepartemen/page`, null, {params})
      .then(response => {
        const {data} = response

        if (data.code === 200) {

          const {result} = data

          dispatch({
            type: 'GET_DATA_DEPARTEMEN',
            data: result.values,
            totalPages: result.element_total,
            params
          })
        }
      }).catch(err => console.log(err))
  }
}

// ** Get Departemen
export const getDepartemen = departemen => {
  return async dispatch => {
    dispatch({
      type: 'GET_DEPARTEMEN',
      selectedDepartemen: departemen
    })
  }
}

// ** Add new Departemen
export const addDepartemen = departemen => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_DEPARTEMEN'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/v1/globaldepartemen/save`, departemen)
      .then(response => {
        const {data} = response

        if (data.code === 200) {
          dispatch({
            type: 'ADD_DEPARTEMEN',
            departemen
          })
          dispatch({
            type: 'SUCCESS_DEPARTEMEN'
          })
          
          dispatch(getDataDepartemen(getState().departemens.params))
        } else {
          dispatch({
            type: 'ERROR_DEPARTEMEN',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_DEPARTEMEN'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_DEPARTEMEN',
          error: err.message
        })
      })
  }
}

// ** Delete user
export const deleteDepartemen = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/v1/globaldepartemen/delete`, { dep_id: id })
      .then(response => {
        dispatch({
          type: 'DELETE_DEPARTEMEN'
        })
      })
      .then(() => {
        dispatch(getDataDepartemen(getState().departemens.params))
      })
      .catch(err => console.log(err))
  }
}
