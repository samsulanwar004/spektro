import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media, Button } from 'reactstrap'
import { Helmet } from 'react-helmet'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay
} from 'swiper'
import ReactPlayer from 'react-player'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { enrollFrontendCourse } from '@src/views/frontend/store/action'

import frontCSS from '@src/assets/frontend/css/styles.css'

import BgCourse from '@src/assets/frontend/img/bg_course.png'
import Instruktur from '@src/assets/frontend/img/Instructor.png'
import LogoWhite from '@src/assets/frontend/img/Logo (White).png'
import Course from '@src/assets/frontend/img/Course Image.png'

const configTrainer = {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    clickable: true
  },
  navigation: true,
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

import '@styles/react/libs/swiper/swiper.scss'

SwiperCore.use([Navigation, Pagination, Autoplay])

const CourseDetail = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch()

  useEffect(() => {
    if (!store.selectCourse) {
      window.location = `/home`

      return null
    }
  }, [dispatch])

  useEffect(() => {
    if (store.enrollCourse) {
      if (store.enrollCourse.status) {
        $("#modal-success-enroll").modal("show")
      } else {
        if (store.enrollCourse.message === 'Data enroll course already exists') {
          $("#modal-success-enroll").modal("show")
        } else {
          $("#modal-error-enroll").modal("show")
        }
      }
    }
  }, [store.enrollCourse])

  const handleEnroll = () => {
    dispatch(enrollFrontendCourse({
      id_course: store.selectCourse.id_course
    }))
  }

  function renderPreview() {

    if (store.selectCourse?.content_preview_video) {
      return (
        <ReactPlayer
          url={store.selectCourse?.content_preview_video}
          className='react-player-video'
          width='100%'
          controls={true}
        />
      )
    } else {
      return (
        <img className="img-fluid" src={store.selectCourse?.content_preview_image ? `${process.env.REACT_APP_BASE_URL}${store.selectCourse?.content_preview_image}` : Course} style={{width: '100%'}} alt="logo spektro" />
      )
    }
    
  }

  return (
    <div className='frontend-course'>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Course Detail</title>
        <noscript>{`
            <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
      </Helmet>
      <div className="section">
        <div style={{backgroundImage: `url(${BgCourse})`, minHeight: '450px', position: 'relative'}}>
          <div className="container px-5">
            <div className="d-md-flex pt-5">
              <div>
                <h3 className="mb-0">{store.selectCourse?.category}</h3>
                <h1 style={{fontWeight: 700}} dangerouslySetInnerHTML={{ __html: `${store.selectCourse?.course}`}}></h1>
              </div>
              <div style={{marginLeft: 'auto'}}>
                <button onClick={() => handleEnroll()} className="px-5 py-2" style={{backgroundColor: '#0A558C', borderRadius: '30px', color: 'white'}}>Ikuti Kursus</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="col-lg-3 text-center title-course-tab py-3">
              <div style={{position: 'absolute', bottom: 49, width: '94%'}}>
                {renderPreview()}
              </div>
              <div>
                <span>Preview Course</span>
              </div>
            </div>
            <div className="col-lg-3 text-center title-course-tab py-3">
              <div><span>Tentang Kursus</span></div>
            </div>
            <div className="col-lg-3 text-center title-course-tab py-3">
              <div><span>Topik Kursus</span></div>
            </div>
            <div className="col-lg-3 text-center title-course-tab py-3">
              <div><span>Instruktur</span></div>
            </div>
          </div>
          <hr className="my-0" />
          <div className="row gx-5">
            <div className="col-lg-4 pt-3 text-center title-course-tab">
              <div>
                <span>Institusi</span><br />
                <h5>BI Institute</h5>
              </div>
            </div>
            <div className="col-lg-4 pt-3 text-center title-course-tab">
              <div>
                <span>Kode Kursus</span><br />
                <h5>{store.selectCourse?.code_course}</h5>
              </div>
            </div>
            <div className="col-lg-4 pt-3 text-center title-course-tab">
              <div>
                <span>Estimasi Durasi</span><br />
                <h5>{store.selectCourse?.duration}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section pt-4">
        <div className="container px-5">
          <div className="row gx-5 mb-5">
            <div className="pt-5">
              <h2>Tentang Kursus</h2>
              <p style={{fontWeight: 300}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper nisl eget magna malesuada facilisis. Integer luctus neque eget nibh lobortis, sed egestas est sagittis. Nulla vitae nisi efficitur elit dictum convallis at non odio. Nulla quis ex lacus. Duis lobortis sed dui sed imperdiet. Vivamus a nisi sit amet erat dapibus condimentum. Vestibulum interdum, metus sollicitudin efficitur lobortis, quam odio consectetur turpis, eget pellentesque libero risus mollis felis. Nulla convallis quam id arcu vehicula, in lacinia dolor tincidunt. Pellentesque sagittis sem at mattis finibus. Proin quis lectus ac mauris ornare sollicitudin vel vitae eros.</p>
            </div>
            <div className="pt-5">
              <h2>Alasan Mengikuti Kursus Ini</h2>
              <p style={{fontWeight: 300}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper nisl eget magna malesuada facilisis. Integer luctus neque eget nibh lobortis, sed egestas est sagittis. Nulla vitae nisi efficitur elit dictum convallis at non odio. Nulla quis ex lacus. Duis lobortis sed dui sed imperdiet. Vivamus a nisi sit amet erat dapibus condimentum. Vestibulum interdum, metus sollicitudin efficitur lobortis, quam odio consectetur turpis, eget pellentesque libero risus mollis felis. Nulla convallis quam id arcu vehicula, in lacinia dolor tincidunt. Pellentesque sagittis sem at mattis finibus. Proin quis lectus ac mauris ornare sollicitudin vel vitae eros.</p>
            </div>
            <div className="pt-5">
              <h2>Jadwal Kursus</h2>
              <p style={{fontWeight: 300}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper nisl eget magna malesuada facilisis. Integer luctus neque eget nibh lobortis, sed egestas est sagittis. Nulla vitae nisi efficitur elit dictum convallis at non odio. Nulla quis ex lacus. Duis lobortis sed dui sed imperdiet. Vivamus a nisi sit amet erat dapibus condimentum. Vestibulum interdum, metus sollicitudin efficitur lobortis, quam odio consectetur turpis, eget pellentesque libero risus mollis felis. Nulla convallis quam id arcu vehicula, in lacinia dolor tincidunt. Pellentesque sagittis sem at mattis finibus. Proin quis lectus ac mauris ornare sollicitudin vel vitae eros.</p>
            </div>
            <div className="py-5">
              <h2>Tentang Institusi</h2>
              <p style={{fontWeight: 300}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper nisl eget magna malesuada facilisis. Integer luctus neque eget nibh lobortis, sed egestas est sagittis. Nulla vitae nisi efficitur elit dictum convallis at non odio. Nulla quis ex lacus. Duis lobortis sed dui sed imperdiet. Vivamus a nisi sit amet erat dapibus condimentum. Vestibulum interdum, metus sollicitudin efficitur lobortis, quam odio consectetur turpis, eget pellentesque libero risus mollis felis. Nulla convallis quam id arcu vehicula, in lacinia dolor tincidunt. Pellentesque sagittis sem at mattis finibus. Proin quis lectus ac mauris ornare sollicitudin vel vitae eros.</p>
            </div>
            {store.selectCourse?.topik.length > 3 ? (
              <Swiper {...configTrainer}>
                {store.selectCourse?.topik.map((data, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <div className="p-4 text-center" style={{backgroundColor: '#E6C00E', borderRadius: '8px'}}>
                        <div>
                          <img src={data.trainer.image_profile ? `${process.env.REACT_APP_BASE_URL}${data.trainer.image_profile}` : Instruktur} style={{borderRadius: 100, width: '100px', height: '100px', objectFit: 'cover'}} alt="Spektro instruktur" />
                          <h3 className="my-4">{`${data.trainer.fullname}, ${data.trainer.gelar}`}</h3>
                          <p style={{fontWeight: 300}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper nisl eget magna malesuada facilisis. Integer luctus neque eget nibh lobortis, sed egestas est sagittis. Nulla vitae nisi efficitur elit dictum convallis at non odio. Nulla quis ex lacus. Duis lobortis sed dui sed imperdiet.</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>) : (
                <Row className="d-flex justify-content-center ">
                  {store.selectCourse?.topik.map((data, key) => {
                    return (
                      <Col lg="4" key={key} className="p-4 text-center mr-2" style={{backgroundColor: '#E6C00E', borderRadius: '8px'}}>
                        <div>
                          <img src={data.trainer.image_profile ? `${process.env.REACT_APP_BASE_URL}${data.trainer.image_profile}` : Instruktur} style={{borderRadius: 100, width: '100px', height: '100px', objectFit: 'cover'}} alt="Spektro instruktur" />
                          <h3 className="my-4">{`${data.trainer.fullname}, ${data.trainer.gelar}`}</h3>
                          <p style={{fontWeight: 300}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper nisl eget magna malesuada facilisis. Integer luctus neque eget nibh lobortis, sed egestas est sagittis. Nulla vitae nisi efficitur elit dictum convallis at non odio. Nulla quis ex lacus. Duis lobortis sed dui sed imperdiet.</p>
                        </div>
                      </Col>
                    )
                  })}
                </Row>
              )
            }
            
          </div>
        </div>
      </div>
      <div className="modal fade" id="modal-success-enroll" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="row gx-0">
                <div className="col-lg-12 p-5 pb-3">
                  <p style={{fontWeight: '400', fontSize: 12, textAlign: 'center', color: '#FFFFFF' }}>
                    Terima kasih telah mendaftar kursus ini <br/>Tekan tombol di bawah ini untuk menuju halaman kursus
                  </p>
                  <div className="d-flex justify-content-center" style={{width: '100%'}}>
                    <Button color='putih' style={{borderRadius: 20}} onClick={() => {
                      window.location = `/course-home/${store.selectCourse?.id_course}`

                      return null
                    }}>
                      <span style={{color: '#0A558C'}}>Ke Halaman Kursus</span>
                    </Button>
                  </div>
                  <hr style={{borderTop: '2px solid #FFFFFF'}}/>
                  <div className="text-center">
                    <img className="img-fluid" src={LogoWhite} width="100" alt="logo spektro" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modal-error-enroll" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="row gx-0">
                <div className="col-lg-12 p-5 pb-3">
                  <p style={{fontWeight: '400', fontSize: 12, textAlign: 'center', color: '#FFFFFF' }}>
                    Mohon sign in terlebih dahulu untuk mengikuti kursus ini <br/>Terima kasih
                  </p>
                  <hr style={{borderTop: '2px solid #FFFFFF'}}/>
                  <div className="text-center">
                    <img className="img-fluid" src={LogoWhite} width="100" alt="logo spektro" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
