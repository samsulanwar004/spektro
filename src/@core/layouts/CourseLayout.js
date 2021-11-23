// ** React Imports
import { useEffect, useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip
} from 'reactstrap'
import { Check, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory, useParams } from 'react-router-dom'
import Avatar from '@components/avatar'
import moment from 'moment'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getFrontendEnroll, touchFrontendSesi} from '@src/views/course/store/action'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Utils
import { isUserLoggedIn, isObjEmpty } from '@utils'

import Logo1 from '@src/assets/course/img/logo1.png'
import Logo2 from '@src/assets/course/img/logo2.png'
import Profile from '@src/assets/course/img/img_profile_dashboard.png'
import MaterialsImg from '@src/assets/course/img/Materials.png'
import QuizImg from '@src/assets/course/img/Quiz.png'
import VideoImg from '@src/assets/course/img/Video.png'
import LinkImg from '@src/assets/course/img/Link.png'

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

const CourseLayout = ({ children, ...rest }) => {
  // ** Hooks
  const [skin, setSkin] = useSkin()
  const { register, errors, handleSubmit, setError, control } = useForm()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory(),
  { courseid } = useParams()

  // ** Store Vars
  const store = useSelector(state => state.enrolls)

  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [userData, setUserData] = useState(null)
  const [btnActive, setBtnActive] = useState('')
  const [checkSesi, setCheckSesi] = useState([])
  
  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)

    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }

    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    dispatch(getFrontendEnroll(courseid))
  }, [dispatch])

  useEffect(() => {
    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )

      if (store.error !== 'Attemp exceed') {
        history.push('/')
      }
    }
  }, [store.loading])

  if (!isMounted || !store.selectedEnroll) {
    return null
  }

  const handleCheck = (index) => {
    let oldCheckSesi = checkSesi
    oldCheckSesi = oldCheckSesi.filter(r => r !== index)
    oldCheckSesi.push(index)
    setCheckSesi(oldCheckSesi)
  }

  function renderMenu() {

    if (store.selectedSesi && (store.selectedSesi.type === 'Quiz' || store.selectedSesi.type === 'Survey') && (store.selectedQuiz || store.selectedSurvey)) {
      const datas = []

      if (store.selectedQuiz) {
        for (let i = 0; i < store.selectedQuiz.length; i++) {
          const child = store.selectedQuiz[i].child

          for (let j = 0; j < child.length; j++) {
            datas.push({
              question: child[j].question,
              id_question: child[j].id_question
            })
          }
        }
      } else if (store.selectedSurvey) {
        for (let i = 0; i < store.selectedSurvey.length; i++) {
          const child = store.selectedSurvey[i].child

          for (let j = 0; j < child.length; j++) {
            datas.push({
              question: child[j].question,
              id_question: child[j].id_question
            })
          }
        }
      }

      return (
        <>
          <Row className="p-3">
            <Row className="p-3">
            {datas.map((data, key) => {
              return (
                <Col lg="2" md="2" sm="12" className="mb-4 mr-2" key={key}>
                  <Button color='putih' onClick={() => {
                    const btnSelect = $('#btn-number-select')
                    btnSelect.val(key)
                    btnSelect.click()
                  }}>
                    <span style={{color: 'black'}}>
                      {`${key + 1}`}
                    </span>
                  </Button>
                </Col>
              )
            })}
            </Row>
            {store.selectedQuiz &&
              <Row className="p-3">
                <Col md="12" lg="10" className="d-flex align-items-center">
                  <div style={{color: 'black'}}>
                    <span>Time Remaining =  </span><span id="rundown-timer"></span>
                  </div>
                </Col>
                <Col md="12" lg="2">
                  <Button color='primary' onClick={() => {
                    const btnSelect = $('#btn-finish')
                    btnSelect.click()
                  }}>
                    Finish
                  </Button>
                </Col>
              </Row>
            }
            {store.selectedSurvey &&
              <Row className="p-3">
                <Col md="12" lg="12">
                  <Button color='primary' onClick={() => {
                    const btnSelect = $('#btn-finish')
                    btnSelect.click()
                  }}>
                    Finish
                  </Button>
                </Col>
              </Row>
            }
          </Row>
        </>
      )
    } else {

      return (
        <>
          <li className="nav-item active">
            <Link className="nav-link" to={`/course-home/${courseid}`} >
              <div className="d-flex flex-column">
                <span style={{fontWeight: '400'}}>{store.selectedEnroll.category}</span>
                <span className="title-course" style={{fontSize: 20, fontWeight: 'bold'}} dangerouslySetInnerHTML={{ __html: `${store.selectedEnroll.course}`}}></span>
              </div>
              <div className="d-none d-lg-block ml-auto text-right">
                <img src={`${process.env.REACT_APP_BASE_URL}${store.selectedEnroll.content_preview_image}`} width="50" className="img-fluid" alt="spektro course" style={{position: 'relative', top: '50%', transform: 'translateY(-50%)', maxWidth: '70%'}} />
              </div>
            </Link>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider" />
          {/* Heading */}
          <div className="sidebar-heading">
            Course Overview
          </div>
          {/* Nav Item - Pages Collapse Menu */}
          {store.selectedEnroll.topik.map((data, key) => {
            return (
              <li className="nav-item" key={key}>
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target={`#topik-${key}`} aria-expanded="true" aria-controls="collapseTwo">
                  <span style={{fontSize: 16}}>{data.topik}</span>
                </a>
                <div id={`topik-${key}`} className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                  <div className="bg-orange py-2 collapse-inner rounded">
                    {data.sesi.map((d, k) => {

                      let iconSrc = MaterialsImg
                      let linkSrc = ''

                      if (d.type === 'Quiz') {
                        iconSrc = QuizImg
                        linkSrc = '/course-quiz'
                      } else if (d.type === 'Materi Topik') {
                        iconSrc = MaterialsImg
                        linkSrc = '/course-material'
                      } else if (d.type === 'Video') {
                        iconSrc = VideoImg
                        linkSrc = '/course-video'
                      } else if (d.type === 'Link Eksternal') {
                        iconSrc = LinkImg
                        linkSrc = '/course-link'
                      } else if (d.type === 'Survey') {
                        iconSrc = QuizImg
                        linkSrc = '/course-survey'
                      }

                      //inject id_topik
                      d.id_topik = data.id_topik

                      return (
                        <Link style={{whiteSpace: 'pre-wrap'}} className={`d-flex justify-content-between collapse-item nav-sesi-${d.id_stage_course} ${btnActive === `${key}${k}` ? 'active' : ''}`} to={`${linkSrc}/${courseid}`} key={k} onClick={() => {
                          setBtnActive(`${key}${k}`)
                          dispatch({
                            type: 'GET_FRONTEND_SESI',
                            selected: d
                          })
                          dispatch(touchFrontendSesi({
                            id_stage_course: d.id_stage_course,
                            start_time: moment().format("YYYY-MM-DD HH:mm:ss")
                          }))
                          handleCheck(`${key}${k}`)
                        }}>
                          <div className="d-flex align-items-center">
                            <img src={iconSrc} width="20"/>
                            <span className="ml-2">
                              {d.sesi}
                            </span>
                          </div>
                          <CustomInput type='checkbox' id={`sesi-${key}${k}`} onChange={(e) => console.log(e)} checked={d.status === 1 || checkSesi.includes(`${key}${k}`)}/>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </li>
            )
          })}
        </>
      )
    }
  }

  return (
    <div className="fronted-course" id="page-top">
      {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" style={{backgroundColor: '#EF5533', backgroundImage: 'none'}}>
          {/* Sidebar - Brand */}
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/" style={{backgroundColor: 'white', minHeight: 70}}>
            <div className="sidebar-brand-icon text-lg-right">
              <img src={Logo1} className="img-fluid" alt="spektro logo" style={{maxWidth: '80%'}} />
            </div>
            <div className="sidebar-brand-text text-left">
              <img src={Logo2} className="img-fluid" alt="spektro logo" style={{maxWidth: '80%'}} />
            </div>
          </a>
          {/* Divider */}
          <hr className="sidebar-divider my-0" />
          {/* Nav Item - Dashboard */}
          {renderMenu()}
          <hr className="sidebar-divider d-none d-md-block" />
        </ul>
        {/* End of Sidebar */}
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Navigation*/}
            <nav className="navbar navbar-expand-lg navbar-light shadow mb-4 py-0" id="mainNav" style={{minHeight: '70px', backgroundColor: 'white'}}>
              <button id="sidebarToggleTop" className="btn btn-link d-md-none d-lg-none rounded-circle mr-3">
                <i className="fa fa-bars" />
              </button>
              <button className="navbar-toggler" style={{minHeight: '70px', border: 'none'}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="bi-list" />
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto me-4 my-3 my-lg-0 text-right px-2">
                  <li className="nav-item"><a className="nav-link me-lg-3" href="/learning-space">Learning Space</a></li>
                  <li className="nav-item"><a className="nav-link me-lg-3" href="/kampus">Kampus Merdeka</a></li>
                  <li className="nav-item"><a className="nav-link me-lg-3" href="/research-fund">Research Fund</a></li>
                  <li className="nav-item"><a className="nav-link me-lg-3" href="/forum">Forum</a></li>
                  <li className="nav-item"><a className="nav-link me-lg-3" href="/dashboard">Dashboard</a></li>
                </ul>
              </div>
            </nav>
            {/* Begin Page Content */}
            {children}
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
          {/* Footer */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright © Spektro 2021</span>
              </div>
            </div>
          </footer>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
      {/* Scroll to Top Button*/}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </div>
  )
}

export default CourseLayout
