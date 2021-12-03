import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getDataFrontendCourse } from '@src/views/frontend/store/action'

import frontCSS from '@src/assets/frontend/css/styles.css'

import Course from '@src/assets/frontend/img/Course Image.png'
import Spinner from '@src/layouts/components/Spinner'

const groupCourse = 'Learning Space'

// ** Utils
import { isUserLoggedIn } from '@utils'

const CourseAll = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    auth = useSelector(state => state.auth),
    dispatch = useDispatch()

    // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(8)
  const [spinner, setSpinner] = useState(true)

  const history = useHistory()

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000)
  }, [])

  useEffect(() => {
    let user = null
    if (isUserLoggedIn() !== null) {
      user = JSON.parse(localStorage.getItem('userData'))
    }

    dispatch(getDataFrontendCourse({
      page: currentPage,
      perPage: rowsPerPage,
      group_course: user?.userdata.role_id.value !== 10 ? groupCourse : ''
    }))
  }, [auth.userData])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getDataFrontendCourse({
        page: page.selected + 1,
        perPage: rowsPerPage
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getDataFrontendCourse({
        page: currentPage,
        perPage: value
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getDataFrontendCourse({
        page: currentPage,
        perPage: rowsPerPage,
        q: val
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.totalCourse / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
      />
    )
  }

  return (
    <div className='frontend-course-all'>
      {spinner && <Spinner/>}
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Semua Course</title>
        <noscript>{`
            <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Helmet>
      {/* Section Course */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2>Courses</h2>
              <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
            </div>
          </div>
          <div id="carouselCourse" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row gx-5" style={{margin: '10px'}}>
                  {store.dataCourse.map((data, key) => {
                    return (
                      <a className="col-lg-3 mb-4" key={key} onClick={() => {
                        dispatch({
                          type: 'SELECT_DATA_FRONTEND_COURSE',
                          data
                        })
                        history.push('/course-detail')
                      }}>
                        <div style={{overflow: 'hidden', height: '100%', borderRadius: '6px', boxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', WebkitBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', MozBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)'}}>
                          <div><img className="img-fluid" src={`${process.env.REACT_APP_BASE_URL}${data.content_preview_image}`} onError={(e) => (e.target.src = Course)} alt="Spektro Learn" style={{width: '100%', height: 150}} /></div>
                          <div className="p-4 pb-2" style={{backgroundColor: '#2F4B7B', color: 'white', height: '100%'}}>
                            <div style={{height: 60}}>
                              <span className="title-course" style={{fontWeight: 300, color: '#FFFFFF'}}>{data.code_course}</span>
                              <h6 className="title-course" style={{color: '#FFFFFF'}} dangerouslySetInnerHTML={{ __html: `${data.course}`}}></h6>
                            </div>
                            <div>
                              <span style={{fontWeight: 300, color: '#FFFFFF'}}>BI Institute</span>
                            </div>
                            <div className='mt-1 d-flex justify-content-between'>
                              <span className="title-course">{data.category}</span>
                              <span className='mt-4' style={{fontSize: 12, fontWeight: 300}}>{data.duration}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <CustomPagination/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseAll
