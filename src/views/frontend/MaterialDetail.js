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

import frontCSS from '@src/assets/frontend/css/styles.css'

import BgCourse from '@src/assets/frontend/img/banner/bg_course.png'
import Course from '@src/assets/frontend/img/Course Image.png'

import '@styles/react/libs/swiper/swiper.scss'

SwiperCore.use([Navigation, Pagination, Autoplay])

const MaterialDetail = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch()

  useEffect(() => {
    if (!store.selectMaterial) {
      window.location = `/home`

      return null
    }
  }, [dispatch])

  const handleDownload = () => {
    $('.download-material')[0].click()

    return null
  }

  function renderPreview() {

    return (
      <img className="img-fluid" src={store.selectMaterial?.image_banner ? `${process.env.REACT_APP_BASE_URL}${store.selectMaterial?.image_banner}` : Course} style={{width: '100%'}} alt="logo spektro" />
    )
  }

  return (
    <div className='frontend-course'>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Material Detail</title>
        <noscript>{`
            <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Helmet>
      <div className="section">
        <div style={{backgroundImage: `url(${BgCourse})`, minHeight: '450px', position: 'relative', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}}>
          <div className="container px-5">
            <div className="d-md-flex pt-5">
              <div>
                <h3 className="mb-0">{store.selectMaterial?.category}</h3>
                <h1 style={{fontWeight: 700}} dangerouslySetInnerHTML={{ __html: `${store.selectMaterial?.title}`}}></h1>
              </div>
              <div style={{marginLeft: 'auto'}}>
                <button onClick={() => handleDownload()} className="px-5 py-2" style={{backgroundColor: '#0A558C', borderRadius: '30px', color: 'white'}}>Download</button>
                <a href={`${process.env.REACT_APP_BASE_URL}${store.selectMaterial?.attach_file}`} className="d-none download-material" />
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
                <span>Preview Material</span>
              </div>
            </div>
            <div className="col-lg-3 text-center title-course-tab py-3">
              <div><span></span></div>
            </div>
          </div>
          <hr className="my-0" />
          <div className="row gx-5">
            <div className="col-lg-4 pt-3 text-center title-course-tab">
              <div>
                <span>Institusi</span><br />
                <h5>{store.selectMaterial?.institusi}</h5>
              </div>
            </div>
            <div className="col-lg-4 pt-3 text-center title-course-tab">
              <div>
                <span>Hashtag</span><br />
                <h5>{store.selectMaterial?.hashtag}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section pt-4">
        <div className="container px-5">
          <div className="row gx-5 mb-5">
            <div className="py-5" dangerouslySetInnerHTML={{ __html: `${store.selectMaterial?.desc}`}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaterialDetail
