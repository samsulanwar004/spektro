import axios from 'axios'

// ** Get all Data
export const getAllDataArticle = (params) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/article/all-data`, {params}).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_ARTICLE',
          data: data.data,
          params
        })
      }
      
    })
  }
}

// ** Get data on page or row change
export const getDataArticle = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/article/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_ARTICLE',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_ARTICLE',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get content
export const getArticle = article => {
  return async dispatch => {
    dispatch({
      type: 'GET_ARTICLE',
      selected: article
    })
  }
}

// ** Add new Article
export const addArticle = article => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_ARTICLE'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/article/action`, article)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_ARTICLE',
            article
          })
          dispatch({
            type: 'SUCCESS_ARTICLE'
          })
        } else {
          dispatch({
            type: 'ERROR_ARTICLE',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_ARTICLE'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_ARTICLE',
          error: err.message
        })
      })
  }
}

// ** Delete content
export const deleteArticle = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/article/delete`, { id_article: id })
      .then(response => {
        dispatch({
          type: 'DELETE_ARTICLE'
        })
      })
      .then(() => {
        dispatch(getDataArticle(getState().articles.params))
      })
      .catch(err => console.log(err))
  }
}

// ** post delete article email
export const emailDeleteArticle = email => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/email/post-article`, email)
  }
}
