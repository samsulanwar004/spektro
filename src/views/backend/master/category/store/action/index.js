import axios from 'axios'

// ** Get all Data
export const getAllDataCategory = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/m_category/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_CATEGORY',
          data: data.data,
          params
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataCategory = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/m_category/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_CATEGORY',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_CATEGORY',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get content
export const getCategory = category => {
  return async dispatch => {
    dispatch({
      type: 'GET_CATEGORY',
      selected: category
    })
  }
}

// ** Add new Category
export const addCategory = category => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_CATEGORY'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/m_category/action`, category)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_CATEGORY',
            category
          })
          dispatch({
            type: 'SUCCESS_CATEGORY'
          })
        } else {
          dispatch({
            type: 'ERROR_CATEGORY',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_CATEGORY'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_CATEGORY',
          error: err.message
        })
      })
  }
}

// ** Delete content
export const deleteCategory = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/m_category/delete`, { id })
      .then(response => {
        dispatch({
          type: 'DELETE_CATEGORY'
        })
      })
      .then(() => {
        dispatch(getDataCategory(getState().categorys.params))
      })
      .catch(err => console.log(err))
  }
}
