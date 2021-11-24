import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { Helmet } from 'react-helmet'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay
} from 'swiper'
import { useHistory } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getDataFrontendCourse, getDataFrontendBanner, getDataFrontendTestimoni, getDataFrontendPartner } from '@src/views/frontend/store/action'

import frontCSS from '@src/assets/frontend/css/styles.css'

import PrevBtn from '@src/assets/frontend/img/Previous Button.png'
import NextBtn from '@src/assets/frontend/img/Next Button.png'
import Course from '@src/assets/frontend/img/Course Image.png'
import Spinner from '@src/layouts/components/Spinner'

const configSwipe = {
  className: 'swiper-banner-container',
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    clickable: true
  },
  navigation: true
}

const configTestimoni = {
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 5
    }
  }
}

const configPartner = {
  className: 'swiper-partner-container',
  slidesPerView: 6,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  navigation: true,
  pagination: {
    clickable: true
  },
  breakpoints: {
    1024: {
      slidesPerView: 6,
      spaceBetween: 30
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 5
    }
  }
}

import '@styles/react/libs/swiper/swiper.scss'

SwiperCore.use([Navigation, Pagination, Autoplay])

const groupCourse = 'Learning Space'
const categoryPage = 'home'

const Home = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch()

    // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(4)
  const [spinner, setSpinner] = useState(true)

  const history = useHistory()

  useEffect(() => {
    dispatch(getDataFrontendBanner({
      page: 1,
      perPage: 1000
    }))

    dispatch(getDataFrontendCourse({
      page: currentPage,
      perPage: rowsPerPage,
      group_course: groupCourse
    }))

    dispatch(getDataFrontendTestimoni({
      page: 1,
      perPage: 1000,
      category_page: categoryPage
    }))

    dispatch(getDataFrontendPartner({
      page: 1,
      perPage: 1000
    }))

    setTimeout(() => setSpinner(false), 1000)
  }, [dispatch])

  const handlePage = (page) => {

    const count = Number(Math.ceil(store.totalCourse / rowsPerPage))

    if (page === 'next') {
      
      if (count === currentPage) return null

      dispatch(getDataFrontendCourse({
        page: currentPage + 1,
        perPage: rowsPerPage,
        group_course: groupCourse
      }))

      setCurrentPage(currentPage + 1)
    } else if (page === 'prev') {

      if ((currentPage - 1) === 0) return null
        
      dispatch(getDataFrontendCourse({
        page: currentPage - 1,
        perPage: rowsPerPage,
        group_course: groupCourse
      }))

      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className='frontend-home'>
      {spinner && <Spinner/>}
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro</title>
        <noscript>{`
            <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
      </Helmet>
      <div className="section">
        <Swiper {...configSwipe}>
          {store.dataBanner.map((data, key) => {
            return (
              <SwiperSlide key={key}>
                <div style={{background: `url(${process.env.REACT_APP_BASE_URL}${data.path_image})`}} className='banner-swiper' />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h1 style={{fontSize: 48}}>Tentang SPEKTRO</h1>
            </div>
          </div>
        </div>
        <div className="py-5" style={{backgroundColor: '#EDF8FC'}}>
          <div className="container px-5">
            <div className="row gx-5">
              <div className="col-lg-4">
                <div>
                  <img className="img-fluid" src="https://via.placeholder.com/434x325" alt="" />
                </div>
              </div>
              <div className="col-lg-8">
                <div>
                  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Inside */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2>Inside Spektro</h2>
              <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
            </div>
          </div>
          <div className="row gx-5 justify-content-center" style={{paddingLeft: '1.5rem'}}>
            <div className="col-lg-4" style={{paddingLeft: 0}}>
              <div className="py-5" style={{backgroundColor: '#C4E8F6', borderRadius: '6px'}}>
                <div style={{margin: 'auto', width: 'fit-content'}}>
                  <h4>Learning Space</h4>
                  <ul className="mb-0" style={{listStyleType: 'circle'}}>
                    <li>Online Course</li>
                    <li>Central Bank Material</li>
                    <li>Central Bank Event</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3" style={{paddingLeft: 0}}>
              <div style={{backgroundColor: '#EDF8FC', borderRadius: '6px', height: '100%'}}>
                <div style={{margin: 'auto', width: 'fit-content', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                  <h4>Forum</h4>
                  <ul className="mb-0" style={{listStyleType: 'circle'}}>
                    <li>Artikel</li>
                    <li>Diskusi</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3" style={{paddingLeft: 0}}>
              <div style={{backgroundColor: '#E2F4FB', borderRadius: '6px', height: '100%'}}>
                <div style={{margin: 'auto', width: 'fit-content', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                  <h4>Riset</h4>
                  <ul className="mb-0" style={{listStyleType: 'circle'}}>
                    <li>BANLIT</li>
                    <li>RGBI</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row gx-5 mt-4 justify-content-center" style={{paddingLeft: '1.5rem'}}>
            <div className="col-lg-4" style={{paddingLeft: 0}}>
              <div className="py-5" style={{backgroundColor: '#E2F4FB', borderRadius: '6px'}}>
                <div style={{margin: 'auto', width: 'fit-content'}}>
                  <h4>Kampus Merdeka</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6" style={{paddingLeft: 0}}>
              <div style={{backgroundColor: '#DCF1FA', borderRadius: '6px', height: '100%'}}>
                <div style={{margin: 'auto', width: 'fit-content', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                  <h4>Event Kebanksentralan</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                      <a className="col-lg-3" key={key} onClick={() => {
                        dispatch({
                          type: 'SELECT_DATA_FRONTEND_COURSE',
                          data
                        })
                        history.push('/course-detail')
                      }}>
                        <div style={{overflow: 'hidden', height: '100%', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px', boxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', WebkitBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', MozBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)'}}>
                          <div><img className="img-fluid" src={data.content_preview_image ? `${process.env.REACT_APP_BASE_URL}${data.content_preview_image}` : Course} alt="Spektro Learn" style={{width: '100%', height: 250}} /></div>
                          <div className="p-4" style={{backgroundColor: '#2F4B7B', color: 'white', height: '100%'}}>
                            <div>
                              <h5 className="title-course" style={{fontWeight: 300, color: '#FFFFFF'}}>{data.code_course}</h5>
                              <h3 className="title-course" style={{color: '#FFFFFF'}} dangerouslySetInnerHTML={{ __html: `${data.course}`}}></h3>
                              <span>BI Institute</span>
                            </div>
                            <div className='mt-3 d-flex justify-content-between'>
                              <span className="title-course">{data.category}</span>
                              <span className='mt-5' style={{fontSize: 12}}>{data.duration}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="mb-5" style={{position: 'relative', top: '3rem', display: 'flex', justifyContent: 'center'}}>
              <button onClick={() => handlePage('prev')} className="carousel-control-prev" type="button" data-bs-target="#carouselCourse" data-bs-slide="prev" style={{position: 'relative', opacity: 1, width: '10%'}}>
                <img src={PrevBtn} alt="Spektro" />
                <span className="visually-hidden">Previous</span>
              </button>
              <a href="#"><button style={{backgroundColor: '#0A558C', height: '100%', borderRadius: '6px', color: 'white'}} className="px-4">Lihat semua</button></a>
              <button onClick={() => handlePage('next')} className="carousel-control-next" type="button" data-bs-target="#carouselCourse" data-bs-slide="next" style={{position: 'relative', opacity: 1, width: '10%'}}>
                <img src={NextBtn} alt="Spektro" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Section Testimoni */}
      <div className="section pt-5">
        <div style={{border: '1px solid #0A558C', width: '50%', margin: '0 auto 5rem', filter: 'blur(5px)', WebkitFilter: 'blur(5px)'}} />
        <div className="py-5" style={{backgroundColor: '#C3DBF6'}}>
          <div className="container px-5">
            <div className="row gx-5">
              <div className="col-12">
                <div className="judul mb-5" style={{textAlign: 'center'}}>
                  <h2>Testimoni</h2>
                  <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
                </div>
              </div>
            </div>
            <div className="row gx-5">
              <Swiper {...configTestimoni}>
                {store.dataTestimoni.map((data, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <div style={{textAlign: 'center'}}>
                        <div><img style={{borderRadius: 100}} src={`${process.env.REACT_APP_BASE_URL}${data.path_image}`} alt="Spektro Testimoni" /></div>
                        <div className="my-3">
                          <h5 className="mb-0">{data.nama}</h5>
                          <span>{data.posisi}</span>
                        </div>
                        <div>
                          <p style={{fontWeight: 300}} dangerouslySetInnerHTML={{ __html: `${data.testimoni}`}}></p>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      {/* Section Mitra Kami */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2>SPEKTRO PARTNER</h2>
              <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
            </div>
          </div>
          <Swiper {...configPartner}>
            {store.dataPartner.map((data, key) => {
              return (
                <SwiperSlide key={key}>
                  <div className="text-center">
                    <img src={`${process.env.REACT_APP_BASE_URL}${data.path_image}`} className="img-fluid" alt={data.title} />
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Home
