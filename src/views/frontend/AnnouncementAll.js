import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getDataFrontendAnnouncement } from '@src/views/frontend/store/action'

import frontCSS from '@src/assets/frontend/css/styles.css'

import Course from '@src/assets/frontend/img/Course Image.png'
import Spinner from '@src/layouts/components/Spinner'
import logoDefault from '@src/assets/images/avatars/picture-blank.png'

const AnnouncementAll = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch()

    // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(8)
  const [spinner, setSpinner] = useState(true)

  const history = useHistory()

  useEffect(() => {

    dispatch(getDataFrontendAnnouncement({
      page: currentPage,
      perPage: rowsPerPage
    }))

    setTimeout(() => setSpinner(false), 1000)
  }, [dispatch])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getDataFrontendAnnouncement({
        page: page.selected + 1,
        perPage: rowsPerPage,
        q: searchTerm
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getDataFrontendAnnouncement({
        page: currentPage,
        perPage: value,
        q: searchTerm
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getDataFrontendAnnouncement({
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
    <div className='frontend-material-all'>
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
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
      </Helmet>
      {/* Section Pengumuman Terkini */}
      <div className="section">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul py-5" style={{textAlign: 'center'}}>
              <h2>Pengumuman Terkini</h2>
              <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
            </div>
          </div>
          <div className="row gx-5 justify-content-center mb-4">
            {store.dataAnnouncement.map((data, key) => {
              return (
                <div className="col-lg-3 mb-lg-0 mb-4" key={key}>
                  <div className="p-3" style={{backgroundColor: '#EDF8FC', borderRadius: '6px', boxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', WebkitBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', MozBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)'}}>
                    <div className="mb-3">
                      <img style={{borderRadius: 6, width: 300, height: 150}} src={`${process.env.REACT_APP_BASE_URL}${data.path_thumbnail}`} onError={(e) => (e.target.src = logoDefault)} className="img-fluid" alt={data.title} />
                    </div>
                    <h3>{data.title}</h3>
                    <div className="announcement-desc" style={{fontWeight: 300}} dangerouslySetInnerHTML={{ __html: `${data.description}`}}></div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="d-flex justify-content-center">
            <CustomPagination/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementAll
