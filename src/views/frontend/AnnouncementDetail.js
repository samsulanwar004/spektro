import { useContext, useEffect, useState, Fragment } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Button, InputGroup, InputGroupAddon, InputGroupText, Input, Form } from 'reactstrap'
import { Helmet } from 'react-helmet'
import Avatar from '@components/avatar'
import ReactSummernote from 'react-summernote'
import { Camera, X, Check } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import Select from 'react-select'
import { toast, Slide } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay
} from 'swiper'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getDataFrontendArticleDetail, addFrontedLikeArticle, getDataFrontendComment, addFrontedComment, getDataFrontendArticle, addFrontedLikeComment } from '@src/views/frontend/store/action'

//** Utils
import { formatDateFull, isUserLoggedIn } from '@src/utility/Utils'

import frontCSS from '@src/assets/frontend/css/styles.css'
import BgArticle from '@src/assets/frontend/img/BgArticle.png'
import PostImage from '@src/assets/frontend/img/Post Image.png'

const ToastContent = ({ text }) => {
  if (text) {
    return (
      <Fragment>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color='danger' icon={<X size={12} />} />
            <h6 className='toast-title font-weight-bold'>Error</h6>
          </div>
          <div className='toastify-body'>
            <span>{text}</span>
          </div>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
            <h6 className='toast-title font-weight-bold'>Success</h6>
          </div>
        </div>
      </Fragment>
    )
  }
}

const configSwipe = {
  className: 'swiper-centered-slides p-1',
  slidesPerView: 'auto'
}

SwiperCore.use([Navigation, Pagination, Autoplay])

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'

// ** Styles
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-id-ID'
import '@styles/react/libs/swiper/swiper.scss'

const AnnouncementDetail = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch(),
    {id} = useParams()

    // ** States
  const [data, setData] = useState(null)

    // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

    // ** redirect
  const history = useHistory()

  useEffect(() => {
    if (!store.selectAnnouncement) {
      window.location = '/home'

      return null
    }
  }, [])

  return (
    <div className='frontend-article-detail'>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Announcement</title>
        <noscript>{`
          <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Helmet>
      <div className="section">
        <div className="banner-content" style={{backgroundImage: `url(${store.selectAnnouncement?.path_image ? process.env.REACT_APP_BASE_URL + store.selectAnnouncement?.path_image : BgArticle})`}}>
          <div className="container px-5">
          </div>
        </div>
      </div>
      {/* Section Tentang */}
      <div className="section pt-5 pb-5">            
        <div className="container px-md-5 px-lg-5">
          <div className="row gx-5">
            <div className="col">
              <div className="judul pb-5">
                <h1 style={{fontWeight: 'bold', color: 'black'}}>{store.selectAnnouncement?.title}</h1>
                <div className="d-flex">
                  <div className="me-3">
                    <span>By <b>{store.selectAnnouncement?.created_by}</b></span>
                  </div>
                  <div className="mr-2">
                    <span>{formatDateFull(store.selectAnnouncement?.created_date)}</span>
                  </div>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: `${store.selectAnnouncement?.description}`}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementDetail
