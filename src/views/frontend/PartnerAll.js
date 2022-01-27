import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getDataFrontendPartner } from '@src/views/frontend/store/action'

import frontCSS from '@src/assets/frontend/css/styles.css'

import Course from '@src/assets/frontend/img/Course Image.png'
import Spinner from '@src/layouts/components/Spinner'

// ** Utils
import { isUserLoggedIn, removeTags } from '@utils'

const PartnerAll = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    auth = useSelector(state => state.auth),
    dispatch = useDispatch()

    // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(12)
  const [spinner, setSpinner] = useState(true)

  const history = useHistory()

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000)

    dispatch(getDataFrontendPartner({
        page: currentPage,
        perPage: rowsPerPage
    }))
  }, [])

  useEffect(() => {
    let user = null
    if (isUserLoggedIn() !== null) {
      user = JSON.parse(localStorage.getItem('userData'))
    }
  }, [auth.userData])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getDataFrontendPartner({
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
      getDataFrontendPartner({
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
      getDataFrontendPartner({
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
    <div className='frontend-partner-all'>
      {spinner && <Spinner/>}
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Semua Mitra</title>
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
              <h2>Mitra Kami</h2>
              <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
            </div>
          </div>
          <div id="carouselCourse" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row gx-5" style={{margin: '10px'}}>
                  {store.dataPartner.map((data, key) => {
                    return (
                        <div className="col-lg-2 mb-4" key={key}>
                            <img src={`${process.env.REACT_APP_BASE_URL}${data.path_image}`} className="img-fluid" alt={data.title} />
                        </div>
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

export default PartnerAll
