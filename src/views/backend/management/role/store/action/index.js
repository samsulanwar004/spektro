import axios from 'axios'

// ** Get all Data
export const getAllDataRole = () => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/approle/list`).then(response => {
      
      const {data} = response

      if (data.code === 200) {
        dispatch({
          type: 'GET_ALL_DATA_ROLE',
          data: data.result
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getDataRole = params => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/approle/page`, null, {params})
      .then(response => {
        const {data} = response

        if (data.code === 200) {

          const {result} = data

          dispatch({
            type: 'GET_DATA_ROLE',
            data: result.values,
            totalPages: result.element_total,
            params
          })
        }
      }).catch(err => console.log(err))
  }
}

// ** Get Role
export const getRole = role => {
  return async dispatch => {
    dispatch({
      type: 'GET_ROLE',
      selectedRole: role
    })
  }
}

// ** Add new role
export const addRole = role => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_ROLE'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/v1/approle/save`, role)
      .then(response => {
        
        const {data} = response

        if (data.code === 200) {
          dispatch({
            type: 'ADD_ROLE',
            role
          })
          dispatch({
            type: 'SUCCESS_ROLE'
          })
          
          dispatch(getDataRole(getState().roles.params))
        } else {
          dispatch({
            type: 'ERROR_ROLE',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_ROLE'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_ROLE',
          error: err.message
        })
      })
  }
}

// ** Delete role
export const deleteRole = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/v1/approle/delete`, { role_id: id })
      .then(response => {
        dispatch({
          type: 'DELETE_ROLE'
        })
      })
      .then(() => {
        dispatch(getDataRole(getState().roles.params))
      })
      .catch(err => console.log(err))
  }
}
