import axios from 'axios'

// ** Get data on page or row change
export const getDataMentor = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/app/resource/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_MENTOR',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_MENTOR',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get
export const getMentor = mentor => {
  return async dispatch => {
    dispatch({
      type: 'GET_MENTOR',
      selected: mentor
    })
  }
}
