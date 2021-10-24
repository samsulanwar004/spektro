import axios from 'axios'

// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/appresource/list`).then(response => {
      dispatch({
        type: 'GET_ALL_DATA',
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getData = params => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/appresource/page`, null, {params})
      .then(response => {
        const {data} = response

        if (data.code === 200) {

          const {result} = data

          dispatch({
            type: 'GET_DATA',
            data: result.values,
            totalPages: result.element_total,
            params
          })
        }
      }).catch(err => console.log(err))
  }
}

// ** Get User
export const getUser = user => {
  return async dispatch => {
    dispatch({
      type: 'GET_USER',
      selectedUser: user
    })
  }
}

// ** Add new user
export const addUser = user => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_USER'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/v1/appresource/save`, user)
      .then(response => {

        const {data} = response

        if (data.code === 200) {
          dispatch({
            type: 'ADD_USER',
            user
          })
          dispatch({
            type: 'SUCCESS_USER'
          })
          
          dispatch(getData(getState().users.params))
        } else {
          dispatch({
            type: 'ERROR_USER',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_USER'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_USER',
          error: err.message
        })
      })
  }
}

// ** Delete user
export const deleteUser = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/v1/appresource/delete`, { resource_id: id })
      .then(response => {
        dispatch({
          type: 'DELETE_USER'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
      })
      .catch(err => console.log(err))
  }
}
