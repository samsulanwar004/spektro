import axios from 'axios'

// ** Get all Data
export const getAllDataRoleMenu = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/approlemenu/list`).then(response => {
      dispatch({
        type: 'GET_ALL_DATA_ROLE_MENU',
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getDataRoleMenu = params => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/approlemenu/page`, null, {params})
      .then(response => {
        const {data} = response

        if (data.code === 200) {

          const {result} = data

          dispatch({
            type: 'GET_DATA_ROLE_MENU',
            data: result.values,
            totalPages: result.element_total,
            params
          })
        }
      }).catch(err => console.log(err))
  }
}

// ** Get
export const getRoleMenu = rolemenu => {
  return async dispatch => {
    dispatch({
      type: 'GET_ROLE_MENU',
      selectedRoleMenu: rolemenu
    })
  }
}

// ** Add new rolemenu
export const addRoleMenu = rolemenu => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_ROLE_MENU'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/v1/approlemenu/save`, rolemenu)
      .then(response => {
  
        const {data} = response

        if (data.code === 200) {
          dispatch({
            type: 'ADD_ROLE_MENU',
            rolemenu
          })
          dispatch({
            type: 'SUCCESS_ROLE_MENU'
          })
          
          dispatch(getDataRoleMenu(getState().rolemenus.params))
        } else {
          dispatch({
            type: 'ERROR_ROLE_MENU',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_ROLE_MENU'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_ROLE_MENU',
          error: err.message
        })
      })
  }
}

// ** Delete rolemenu
export const deleteRoleMenu = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/v1/approlemenu/delete`, { role_menu_id: id })
      .then(response => {
        dispatch({
          type: 'DELETE_ROLE_MENU'
        })
      })
      .then(() => {
        dispatch(getDataRoleMenu(getState().rolemenus.params))
      })
      .catch(err => console.log(err))
  }
}
