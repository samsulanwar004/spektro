import axios from 'axios'

// ** Get all Data
export const getAllDataFrontendWhitelistDomain = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/whitelist-domain/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_FRONTEND_WHITELIST_DOMAIN',
          data: data.data
        })
      }
      
    })
  }
}

// ** Get data on page or row change course
export const getDataFrontendCourse = params => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/course/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_FRONTEND_COURSE',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })

          dispatch({
            type: 'REQUEST_CONTENT_LOADING',
            loading: false
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_FRONTEND_COURSE',
            data: [],
            totalPages: 0,
            params
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
  }
}

// ** Get data on page or row change material
export const getDataFrontendMaterial = params => {

  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/material/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_FRONTEND_MATERIAL',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })

          dispatch({
            type: 'REQUEST_CONTENT_LOADING',
            loading: false
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_FRONTEND_MATERIAL',
            data: [],
            totalPages: 0,
            params
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
  }
}

// ** Get data on page or row change banner
export const getDataFrontendBanner = params => {

  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/banner/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_FRONTEND_BANNER',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })

          dispatch({
            type: 'REQUEST_CONTENT_LOADING',
            loading: false
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_FRONTEND_BANNER',
            data: [],
            totalPages: 0,
            params
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
  }
}

// ** Get data on page or row change banner
export const getDataFrontendTestimoni = params => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/testimoni/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_FRONTEND_TESTIMONI',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })

          dispatch({
            type: 'REQUEST_CONTENT_LOADING',
            loading: false
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_FRONTEND_TESTIMONI',
            data: [],
            totalPages: 0,
            params
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
  }
}

// ** Get data on page or row change partner
export const getDataFrontendPartner = params => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/mitra-partner/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_FRONTEND_PARTNER',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })

          dispatch({
            type: 'REQUEST_CONTENT_LOADING',
            loading: false
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_FRONTEND_PARTNER',
            data: [],
            totalPages: 0,
            params
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
  }
}

// ** Get data on page or row change announcment
export const getDataFrontendAnnouncement = params => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/announcement/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_FRONTEND_ANNOUNCEMENT',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })

          dispatch({
            type: 'REQUEST_CONTENT_LOADING',
            loading: false
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_FRONTEND_ANNOUNCEMENT',
            data: [],
            totalPages: 0,
            params
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
  }
}

// ** enroll
export const enrollFrontendCourse = enroll => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/trx/enroll-course/action`, enroll)
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'SUCCESS_DATA_FRONTEND_COURSE',
            data
          })

          dispatch({
            type: 'REQUEST_CONTENT_LOADING',
            loading: false
          })
        }
      }).catch(err => {
        const {response} = err

        dispatch({
          type: 'SUCCESS_DATA_FRONTEND_COURSE',
          data: response.data
        })

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
  }
}
