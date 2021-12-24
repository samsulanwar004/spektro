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

// ** Get data enroll
export const getFrontendEnroll = (id) => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/enroll-course/${id}`).then(response => {

      const {data} = response

      const dataTopik = data.data.topik

      const dataSesi = []
      for (let i = 0; i < dataTopik.length; i++) {
        for (let j = 0; j < dataTopik[i].sesi.length; j++) {
          const sesi = dataTopik[i].sesi[j]
          sesi.topik = `topik-${i}`
          dataSesi.push(sesi)
        }
      }

      if (data.status) {
        dispatch({
          type: 'SELECT_DATA_FRONTEND_ENROLL',
          data: dataSesi
        })

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      }

    }).catch(err => {
      dispatch({
        type: 'REQUEST_CONTENT_LOADING',
        loading: false
      })
    })
  }
}

// ** Get data course
export const getFrontendCourseDetail = (id) => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/course/${id}`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'SELECT_DATA_FRONTEND_COURSE_DETAIL',
          data: data.data[0]
        })

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      }

    }).catch(err => {
      dispatch({
        type: 'REQUEST_CONTENT_LOADING',
        loading: false
      })
    })
  }
}

// ** Get data on page or row change discussion
export const getDataFrontendDiscussion = params => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/discussion/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_FRONTEND_DISCUSSION',
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
            type: 'GET_DATA_FRONTEND_DISCUSSION',
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

// ** Add new discussion
export const addFrontedDiscussion = discussion => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/discussion/action`, discussion, {
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          dispatch({
            type: 'PROGRESS_FRONTEND_DISCUSSION',
            progress
          })
        }
      })
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_FRONTEND_DISCUSSION',
            data: data.data
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })

        dispatch({
          type: 'PROGRESS_FRONTEND_DISCUSSION',
          progress: null
        })
      })
      .catch(err => {
        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
        dispatch({
          type: 'PROGRESS_FRONTEND_DISCUSSION',
          progress: null
        })
      })
  }
}

// ** Get data on page or row change article
export const getDataFrontendArticle = params => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/article/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_FRONTEND_ARTICLE',
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
            type: 'GET_DATA_FRONTEND_ARTICLE',
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

// ** Get data  article
export const getDataFrontendArticleDetail = id => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/article/${id}`)
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_FRONTEND_ARTICLE_DETAIL',
            data: data.data
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
            type: 'GET_DATA_FRONTEND_ARTICLE_DETAIL',
            data: null
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
  }
}

// ** Add new article
export const addArticle = article => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_FRONTEND_ARTICLE'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/article/action`, article, {
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          dispatch({
            type: 'PROGRESS_FRONTEND_ARTICLE',
            progress
          })
        }
      })
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_FRONTEND_ARTICLE',
            data: data.data
          })
          dispatch({
            type: 'SUCCESS_FRONTEND_ARTICLE'
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_FRONTEND_ARTICLE'
          })
        }, 500)

        dispatch({
          type: 'PROGRESS_FRONTEND_ARTICLE',
          progress: null
        })
      })
      .catch(err => {

        const {response} = err

        if (response.status === 400) {
          dispatch({
            type: 'ERROR_FRONTEND_ARTICLE',
            error: response.data.message
          })
        } else {
          dispatch({
            type: 'ERROR_FRONTEND_ARTICLE',
            error: err.message
          })
        }

        dispatch({
          type: 'PROGRESS_FRONTEND_ARTICLE',
          progress: null
        })

        setTimeout(() => {
          dispatch({
            type: 'RESET_FRONTEND_ARTICLE'
          })
        }, 500)
      })
  }
}

// ** Get data on page or row change comment
export const getDataFrontendComment = params => {
  return async dispatch => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/comment/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_FRONTEND_COMMENT',
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
            type: 'GET_DATA_FRONTEND_COMMENT',
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

// ** Add new comment
export const addFrontedComment = comment => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/comment/action`, comment)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_FRONTEND_COMMENT',
            data: data.data
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
      .catch(err => {
        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
  }
}

// ** Add new like article
export const addFrontedLikeArticle = like => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/likes/action`, like)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_FRONTEND_LIKE_ARTICLE',
            data: data.data
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
      .catch(err => {
        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
  }
}

// ** Add new like discussion
export const addFrontedLikeDiscussion = like => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/likes/action`, like)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_FRONTEND_LIKE_DISCUSSION',
            data: data.data
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
      .catch(err => {
        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
  }
}

// ** Add new like comment
export const addFrontedLikeComment = like => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/fe/forum/likes/action`, like)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_FRONTEND_LIKE_COMMENT',
            data: data.data
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
      .catch(err => {
        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })
      })
  }
}

// ** Add email verifikasi
export const verifyEmail = params => {

  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/jwt/verify`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_FRONTEND_VERIFY_EMAIL',
            data: data.message
          })
        }
      }).catch(err => {
        const {response} = err

        if (response.status === 400) {
          dispatch({
            type: 'ADD_FRONTEND_VERIFY_EMAIL',
            data: response.data.message
          })
        } else if (response.status === 422) {
          dispatch({
            type: 'ADD_FRONTEND_VERIFY_EMAIL',
            data: response.data.message
          })
        }
      })
  }
}

// ** check email kmbi
export const checkEmail = email => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_CONTENT_LOADING',
      loading: true
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/check-kmbi`, email)
      .then(response => {
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_FRONTEND_CHECK_EMAIL',
            data
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })

        setTimeout(() => {
          dispatch({
            type: 'ADD_FRONTEND_CHECK_EMAIL',
            data: null
          })
        }, 1000)
      })
      .catch(err => {

        const {response} = err

        if (response.data) {
          dispatch({
            type: 'ADD_FRONTEND_CHECK_EMAIL',
            data: response.data
          })
        }

        dispatch({
          type: 'REQUEST_CONTENT_LOADING',
          loading: false
        })

        setTimeout(() => {
          dispatch({
            type: 'ADD_FRONTEND_CHECK_EMAIL',
            data: null
          })
        }, 1000)
      })
  }
}

// ** enroll email
export const emailEnrollFrontendCourse = email => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/email/enroll-course`, email)
  }
}

// ** post artikel email
export const emailAddArticle = email => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/email/post-article`, email)
  }
}

// ** post diskusi email
export const emailAddDiscussion = email => {
  return async dispatch => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/email/post-discussion`, email)
  }
}
