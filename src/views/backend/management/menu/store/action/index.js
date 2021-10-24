import axios from 'axios'

// ** Get all Data
export const getAllDataMenu = () => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/appmenu/list`).then(response => {

      const {data} = response

      if (data.code === 200) {
        dispatch({
          type: 'GET_ALL_DATA_MENU',
          data: data.result
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getDataMenu = params => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/appmenu/page`, null, {params})
      .then(response => {
        const {data} = response

        if (data.code === 200) {

          const {result} = data

          dispatch({
            type: 'GET_DATA_MENU',
            data: result.values,
            totalPages: result.element_total,
            params
          })
        }
      }).catch(err => console.log(err))
  }
}

// ** Get
export const getMenu = menu => {
  return async dispatch => {
    dispatch({
      type: 'GET_MENU',
      selectedMenu: menu
    })
  }
}

// ** Add new menu
export const addMenu = menu => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_MENU'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/v1/appmenu/save`, menu)
      .then(response => {

        const {data} = response

        if (data.code === 200) {
          dispatch({
            type: 'ADD_MENU',
            menu
          })
          dispatch({
            type: 'SUCCESS_MENU'
          })
          dispatch(getDataMenu(getState().menus.params))
        } else {
          dispatch({
            type: 'ERROR_MENU',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_MENU'
          })
        }, 500)
        
      })
      .catch(err => console.log(err))
  }
}

// ** Delete menu
export const deleteMenu = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/v1/appmenu/delete`, { menu_id: id })
      .then(response => {
        dispatch({
          type: 'DELETE_MENU'
        })
      })
      .then(() => {
        dispatch(getDataMenu(getState().menus.params))
      })
      .catch(err => console.log(err))
  }
}
