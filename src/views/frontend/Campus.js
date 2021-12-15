import { useContext, useEffect, useState, Fragment } from 'react'
import { 
  Row, 
  Col, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardBody, 
  Media, 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Alert, 
  UncontrolledTooltip 
} from 'reactstrap'
import { Helmet } from 'react-helmet'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay
} from 'swiper'
import { useHistory, Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import { User, Plus, X, Check, Users, MapPin, Book, File, HelpCircle } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import Select from 'react-select'
import ReactSummernote from 'react-summernote'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { addSubmitPeserta } from '@src/views/backend/kmbi/submit_peserta/store/action'
import { getDataFrontendTestimoni, getDataFrontendAnnouncement, checkEmail} from '@src/views/frontend/store/action'
import { getAllDataGlobalParam, uploadImage } from '@src/views/backend/master/global_param/store/action'
import { getAllDataUniversity } from '@src/views/backend/master/universitas/store/action'
import { getAllDataProvince } from '@src/views/backend/master/province/store/action'

import frontCSS from '@src/assets/frontend/css/styles.css'

import BgCampus from '@src/assets/frontend/img/banner/Kampus Merdeka.png'
import Explore1 from '@src/assets/frontend/img/book 1.png'
import Explore2 from '@src/assets/frontend/img/project.png'
import Explore3 from '@src/assets/frontend/img/increase.png'
import Spinner from '@src/layouts/components/Spinner'
import logoDefault from '@src/assets/images/avatars/picture-blank.png'
import Logo1 from '@src/assets/course/img/logo1.png'

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
      slidesPerView: 2,
      spaceBetween: 5
    },
    640: {
      slidesPerView: 1
    },
    320: {
      slidesPerView: 1
    }
  }
}

// ** Utils
import { isUserLoggedIn, selectThemeColors, isObjEmpty, ipks } from '@utils'

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-id-ID'
import '@styles/react/libs/swiper/swiper.scss'

SwiperCore.use([Navigation, Pagination, Autoplay])

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

const stratas = [
  {
    label: 'D3',
    value: 'D3'
  },
  {
    label: 'S1',
    value: 'S1'
  },
  {
    label: 'S2',
    value: 'S2'
  }
]

const semesters = [
  {
    label: '5',
    value: '5'
  },
  {
    label: '6',
    value: '6'
  },
  {
    label: '7',
    value: '7'
  },
  {
    label: '8',
    value: '8'
  }
]

const durationSemesters = [
  {
    label: '1 Semester',
    value: '1 Semester'
  },
  {
    label: '2 Semester',
    value: '2 Semester'
  }
]

const categoryPage = 'kampus merdeka'

const Campus = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    submitpesertas = useSelector(state => state.submitpesertas),
    globalparams = useSelector(state => state.globalparams),
    universitys = useSelector(state => state.universitys),
    provinces = useSelector(state => state.provinces),
    dispatch = useDispatch(),
    auth = useSelector(state => state.auth),
    intl = useIntl()

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm({
    defaultValues: { gender: 'gender-female', dob: null }
  })

  const [spinner, setSpinner] = useState(true)
  const [userData, setUserData] = useState(null)
  const [checkModal, setCheckModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)
  const [errorResponse, setErrorRespone] = useState(null)

  // ** Form KMBI
  const [data, setData] = useState(null)
  const [selectedUniversity, setSelectedUniversity] = useState({label: 'Select...', value: ''})
  const [selectedExplore, setSelectedExplore] = useState({label: 'Select...', value: ''})
  const [selectedMajor, setSelectedMajor] = useState({label: 'Select...', value: ''})
  const [selectedSkill, setSelectedSkill] = useState({label: 'Select...', value: ''})
  const [selectedStrata, setSelectedStrata] = useState({label: 'Select...', value: ''})
  const [selectedSemester, setSelectedSemester] = useState({label: 'Select...', value: ''})
  const [selectedDurationInterest, setSelectedDurationInterest] = useState({label: 'Select...', value: ''})
  const [selectedProvince, setSelectedProvince] = useState({label: 'Select...', value: ''})
  const [selectedIpk, setSelectedIpk] = useState({label: 'Select...', value: ''})
  const [shortDesc, setShortDesc] = useState('')
  const [dataExplores, setDataExplores] = useState([])
  const [majors, setMajors] = useState([])
  const [dataSkills, setDataSkills] = useState([])
  const [explores, setExplores] = useState([''])
  const [skills, setSkills] = useState([''])
  const [riset, setRiset] = useState('')
  const [project, setProject] = useState('')
  const [software, setSoftware] = useState('')
  const [akademik, setAkademik] = useState('')
  const [nonAkademik, setNonAkademik] = useState('')
  const [motivasi, setMotivasi] = useState('')
  const [cv, setCv] = useState({file: null, link: null})
  const [photo, setPhoto] = useState({file: null, link: null})
  const [lectures, setLectures] = useState([{supporting_lecturer: '', email_lecturer: ''}])

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [auth.userData])

  useEffect(() => {

    dispatch(getDataFrontendAnnouncement({
      page: 1,
      perPage: 3
    }))

    dispatch(getDataFrontendTestimoni({
      page: 1,
      perPage: 1000,
      category_page: categoryPage
    }))

    setTimeout(() => setSpinner(false), 1000)
  }, [dispatch])

  useEffect(() => {
    if (registerModal) {
      dispatch(getAllDataUniversity())
      dispatch(getAllDataGlobalParam({key: 'AREA_EXPLORE'}))
      dispatch(getAllDataGlobalParam({key: 'MAJORS'}))
      dispatch(getAllDataGlobalParam({key: 'KEAHLIAN'}))
      dispatch(getAllDataProvince())
    }
    
  }, [dispatch, registerModal])

  useEffect(() => {

    if (submitpesertas.success) {

    } else if (submitpesertas.error) {
      toast.error(
        <ToastContent text={submitpesertas.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }

    if (globalparams.params?.key === 'AREA_EXPLORE') {
      setDataExplores(globalparams.allData)
    }

    if (globalparams.params?.key === 'MAJORS') {
      setMajors(globalparams.allData)
    }

    if (globalparams.params?.key === 'KEAHLIAN') {
      setDataSkills(globalparams.allData)
    }
  }, [submitpesertas.loading, globalparams.allData])

  useEffect(() => {
    if (store.checkEmail) {
      if (store.checkEmail.status) {
        setCheckModal(false)
        setRegisterModal(true)
      } else {
        setErrorRespone(store.checkEmail.message?.message ? store.checkEmail.message?.message : store.checkEmail.message)
      }
    }
  }, [store.checkEmail])

  const onCheck = data => {

    if (isObjEmpty(errors)) {

      setData(data)
      
      dispatch(checkEmail({
        email: data.email
      }))
    }
  }

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)
      
      const datas = new FormData()

      datas.append('university_id', selectedUniversity.value)
      datas.append('fullname', data.fullname)
      datas.append('majoring', selectedMajor.value)
      datas.append('strata', selectedStrata.value)
      datas.append('semester', selectedSemester.value)
      datas.append('gpa', selectedIpk.value)
      datas.append('supporting_lecturer', data.supporting_lecturer.join(','))
      datas.append('email_lecturer', data.email_lecturer.join(','))
      datas.append('skills', skills.map(r => {
        return r.value
      }).join(','))
      datas.append('exploration_interest', explores.map(r => {
        return r.value
      }).join(','))
      datas.append('total_current_study_credit', data.total_current_study_credit)
      datas.append('total_current_course', data.total_current_course)
      datas.append('kmbi_duration_interest', selectedDurationInterest.value)
      datas.append('email', data.email)
      datas.append('phone', data.phone)
      datas.append('province_id', selectedProvince.value)
      datas.append('city', data.city)
      datas.append('research_experience', riset)
      datas.append('project_experience', project)
      datas.append('software_experience', software)
      datas.append('academic_achievement', akademik)
      datas.append('non_academic_achievement', nonAkademik)
      datas.append('motivation_in_kmbi', motivasi)
      datas.append('attachment', cv.file)
      datas.append('attachment_images', photo.file)

      dispatch(addSubmitPeserta(datas))
    }
  }

  const handleSelectExplore = (key, value) => {
    let oldExplore = explores
    oldExplore = oldExplore.map((d, k) => {
      if (k === key) {
        d = value
      }
      return d
    })

    setExplores(oldExplore)
  }

  const handleAddExplore = () => {
    let oldExplore = explores

    oldExplore = oldExplore.concat('')

    setExplores(oldExplore)
  }

  const handleSelectSkill = (key, value) => {
    let oldSkill = skills
    oldSkill = oldSkill.map((d, k) => {
      if (k === key) {
        d = value
      }
      return d
    })

    setSkills(oldSkill)
  }

  const handleAddSkill = () => {
    let oldSkill = skills

    oldSkill = oldSkill.concat('')

    setSkills(oldSkill)
  }

  const handleAddDosen = () => {
    let oldLectures = lectures

    oldLectures = oldLectures.concat({
      email_lecturer: '',
      supporting_lecturer: ''
    })

    setLectures(oldLectures)
  }

  const onChangeCv = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setCv({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
  }

  const onChangePhoto = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setPhoto({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
  }

  return (
    <div className="frontend-campus">
      {spinner && <Spinner/>}
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Kampus Merdeka</title>
        <noscript>{`
            <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Helmet>
      <div className="section">
        <div style={{backgroundImage: `url("${BgCampus}")`, minHeight: '285px', position: 'relative', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}}>
          <div className="container px-5">
            <div style={{position: 'absolute', bottom: '1rem', color: 'white'}}>
              <h2 style={{textShadow: '2px 0px #c4c4c4', color: '#FFFFFF'}}>Kampus Merdeka</h2>
              <h1 style={{textShadow: '2px 0px #c4c4c4', color: '#FFFFFF', fontSize: 50}}>Bank Indonesia</h1>
            </div>
          </div>
        </div>
      </div>
      {/* Section Tentang */}
      <div className="section pt-5" style={{backgroundColor: '#EDF8FC'}}>            
        <div className="container px-5">
          <div className="row gx-5">
            <div className="col-lg-3">
              <div className="judul pb-5" style={{textAlign: 'right'}}>
                <h2>Merdeka Belajar Bersama Bank Indonesia</h2>
                <hr className="float-lg-end float-start" style={{height: '5px', opacity: 1, width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C'}} />
              </div>
            </div>
            <div className="col-lg-9">
              <div>
                <p style={{fontSize: '0.9rem', fontWeight: 300}}>"Bank Indonesia mengundang Putra/Putri terbaik bangsa, Mahasiswa Program S1 atau S2 dari Perguruan Tinggi Negeri/Swasta di Indonesia, untuk bergabung ke dalam Program Kampus Merdeka  di Bank Indonesia. Melalui program ini, Bank Indonesia mengintegrasikan kegiatan pembelajaran berupa learning, project/research, dan working experience sehingga peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Explore */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2>Eksplor Potensimu Bersama Kami</h2>
              <hr style={{height: '5px', opacity: 1, width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C'}} />
            </div>
          </div>
          <div className="row gx-5 pt-4">
            <div className="col-lg-4">
              <div className="text-center">
                <div><img className="img-fluid" src={Explore1} alt="Spektro Explore" /></div>
                <div className="my-4">
                  <h3>Learning</h3>
                </div>
                <div style={{fontSize: '0.9rem', fontWeight: 300}}>
                  <p>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center">
                <div><img className="img-fluid" src={Explore2} alt="Spektro Explore" /></div>
                <div className="my-4">
                  <h3>Project/Research</h3>
                </div>
                <div style={{fontSize: '0.9rem', fontWeight: 300}}>
                  <p>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center">
                <div><img className="img-fluid" src={Explore3} alt="Spektro Explore" /></div>
                <div className="my-4">
                  <h3>Working Experience</h3>
                </div>
                <div style={{fontSize: '0.9rem', fontWeight: 300}}>
                  <p>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Linimasa */}
      <div className="section pt-5">
        <div className="container px-5 pt-5">
          <div className="row gx-5">
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2>Linimasa Pendaftaran</h2>
              <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
            </div>
          </div>
        </div>
        <div className="row gx-0 px-3 py-4" style={{backgroundColor: '#EDF8FC'}}>
          <div className="px-3 col-lg text-center">
            <h3 style={{color: '#0A558C'}}>Sosialisasi</h3>
            <p style={{fontSize: '0.9rem', fontWeight: 300}}>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
          </div>
          <div className="px-3 col-lg text-center" style={{borderLeft: '1px solid #c4c4c4'}}>
            <h3 style={{color: '#0A558C'}}>Pendaftaran</h3>
            <p style={{fontSize: '0.9rem', fontWeight: 300}}>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
          </div>
          <div className="px-3 col-lg text-center" style={{borderLeft: '1px solid #c4c4c4'}}>
            <h3 style={{color: '#0A558C'}}>Seleksi</h3>
            <p style={{fontSize: '0.9rem', fontWeight: 300}}>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
          </div>
          <div className="px-3 col-lg-3 text-center" style={{borderLeft: '1px solid #c4c4c4'}}>
            <h3 style={{color: '#0A558C'}}>Pengumuman</h3>
            <p style={{fontSize: '0.9rem', fontWeight: 300}}>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
          </div>
          <div className="col-lg">
            <div style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
              <div className="mb-3 text-center">
                <button onClick={() => {
                  if (userData) {
                    window.location = '/kmbi/submit_peserta/list'

                    return null
                  } else {
                    $('#modal-not-login')[0].click()
                  }
                }} className="py-3" style={{minWidth: '150px', backgroundColor: '#0A558C', borderRadius: '6px'}}>
                  <span style={{color: 'white', fontWeight: 'bold'}}>Lihat Program</span>
                </button>
              </div>
              <div className="text-center">
                <button onClick={() => {
                  setCheckModal(true)
                }} className="py-3" style={{minWidth: '150px', backgroundColor: '#0A558C', borderRadius: '6px'}}>
                  <span style={{color: 'white', fontWeight: 'bold'}}>Daftar Program</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Pengumuman Terkini */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul py-5" style={{textAlign: 'center'}}>
              <h2>Pengumuman Terkini</h2>
              <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
            </div>
          </div>
          <div className="row gx-5 justify-content-center">
            {store.dataAnnouncement.map((data, key) => {
              return (
                <Link to={`/announcement-detail/${data.id_announcement}`} onClick={() => {
                  dispatch({
                    type: 'SELECT_DATA_FRONTEND_ANNOUNCEMENT',
                    data
                  })
                }} style={{textDecorationLine: 'none', color: 'black'}} className="col-lg-3 mb-lg-0 mb-4" key={key}>
                  <div className="p-3" style={{backgroundColor: '#EDF8FC', borderRadius: '6px', boxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', WebkitBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', MozBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)'}}>
                    <div className="mb-3">
                      <img style={{borderRadius: 6, width: 300, height: 150}} src={`${process.env.REACT_APP_BASE_URL}${data.path_thumbnail}`} onError={(e) => (e.target.src = logoDefault)} className="img-fluid" alt={data.title} />
                    </div>
                    <h3>{data.title}</h3>
                    <div className="announcement-description" style={{fontWeight: 300}} dangerouslySetInnerHTML={{ __html: `${data.description}`}}></div>
                  </div>
                </Link>
              )
            })}
            <div className="col-12 text-center pt-4">
              <div><button className="p-3" style={{minWidth: '150px', backgroundColor: '#0A558C', borderRadius: '6px'}}><Link to="/announcement-all" style={{color: 'white', fontWeight: 'bold', textDecorationLine: 'none'}}>Pengumuman Lain</Link></button></div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Testimoni */}
      <div className="section pt-5">
        <div className="py-5">
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
                        <div><img style={{borderRadius: 100, objectFit: 'cover', width: 150, height: 150}} src={`${process.env.REACT_APP_BASE_URL}${data.path_image}`} alt="Spektro Testimoni" /></div>
                        <div className="my-3">
                          <h5 className="mb-0">{data.nama}</h5>
                          <span>{data.posisi}</span>
                        </div>
                        <div>
                          <p style={{fontWeight: 300, textAlign: 'justify'}} dangerouslySetInnerHTML={{ __html: `${data.testimoni}`}}></p>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
            <div style={{border: '1px solid #0A558C', width: '50%', margin: '0 auto 7rem', filter: 'blur(5px)', WebkitFilter: 'blur(5px)'}} />
          </div>
        </div>
      </div>
      <Modal
        scrollable
        isOpen={checkModal}
        toggle={() => setCheckModal(!checkModal)}
        className={'modal-dialog-centered'}
      >
        <ModalHeader style={{paddingRight: 35}} toggle={() => setCheckModal(!checkModal)}>
          <div className="d-flex align-items-center ">
            <img src={Logo1} className="img-fluid" alt="spektro logo" style={{maxWidth: '15%', marginRight: 10}} />
            <h4>KMBI Submission</h4>
          </div>
        </ModalHeader>
        <ModalBody>
          <Row className='app-user-edit'>
            <Col sm='12'>
              <Card>
                <CardBody className='pt-2'>
                  {errorResponse && 
                    <Alert color='primary'>
                      <div className='alert-body font-small-2'>
                        <p>
                          <small className='mr-50'>
                            <span className='font-weight-bold'>{errorResponse}</span>
                          </small>
                        </p>
                      </div>
                      <HelpCircle
                        id='login-tip'
                        className='position-absolute'
                        size={18}
                        style={{ top: '10px', right: '10px' }}
                      />
                      <UncontrolledTooltip target='login-tip' placement='left'>
                        Error response
                      </UncontrolledTooltip>
                    </Alert>
                  }
                  <Form
                    onSubmit={handleSubmit(onCheck)}
                  >
                    <Row>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='email'></Label>
                          <Input
                            id='email'
                            name='email'
                            placeholder='Email'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.email
                            })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='d-flex flex-sm-row flex-column mt-2'>
                        <Button type='submit' color='primary' className='d-none btn-check'>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' disabled={store.loading} onClick={() => $('.btn-check').click()}>
            Check
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        scrollable
        isOpen={registerModal}
        toggle={() => setRegisterModal(!registerModal)}
        className={'modal-dialog-centered modal-fullscreen'}
      >
        <ModalHeader style={{paddingRight: 35}} toggle={() => setRegisterModal(!registerModal)}>
          <div className="d-flex align-items-center ">
            <img src={Logo1} className="img-fluid" alt="spektro logo" style={{maxWidth: '15%', marginRight: 10}} />
            <h4>KMBI Submission</h4>
          </div>
        </ModalHeader>
        <ModalBody>
          <Row className='app-user-edit'>
            <Col sm='12'>
              <Card>
                <CardBody className='pt-2'>
                  <Form
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Row className='mt-1'>
                      <Col sm='12'>
                        <h4 className='mb-1'>
                          <User size={20} className='mr-50' />
                          <span className='align-middle'>Data Diri</span>
                        </h4>
                      </Col>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='fullname'>Nama Mahasiswa</Label>
                          <Input
                            id='fullname'
                            name='fullname'
                            placeholder='Nama Mahasiswa'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.fullname
                            })}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12' md='3'>
                        <FormGroup>
                          <Label for='university_id'>Perguruan Tinggi</Label>
                          <Controller
                            name='university_id'
                            id='university_id'
                            control={control}
                            invalid={data !== null && (data.university_id === undefined || data.university_id === null)}
                            defaultValue={selectedUniversity}
                            render={({value, onChange}) => {

                              return (
                                <Select
                                  isClearable={false}
                                  theme={selectThemeColors}
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={universitys.allData.map(r => {
                                    return {
                                      value: r.id_universitas,
                                      label: r.universitas
                                    }
                                  })}
                                  value={selectedUniversity}
                                  onChange={data => {
                                    onChange(data)
                                    setSelectedUniversity(data)
                                  }}
                                />
                              )
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12' md='3'>
                        <FormGroup>
                          <Label for='majoring'>Program Studi</Label>
                          <Controller
                            name='majoring'
                            id='majoring'
                            control={control}
                            invalid={data !== null && (data.majoring === undefined || data.majoring === null)}
                            defaultValue={selectedMajor}
                            render={({value, onChange}) => {

                              return (
                                <Select
                                  isClearable={false}
                                  theme={selectThemeColors}
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={majors.map(r => {
                                    return {
                                      value: r.param_value,
                                      label: r.param_value
                                    }
                                  })}
                                  value={selectedMajor}
                                  onChange={data => {
                                    onChange(data)
                                    setSelectedMajor(data)
                                  }}
                                />
                              )
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12' md='2'>
                        <FormGroup>
                          <Label for='strata'>Strata</Label>
                          <Controller
                            name='strata'
                            id='strata'
                            control={control}
                            invalid={data !== null && (data.strata === undefined || data.strata === null)}
                            defaultValue={selectedStrata}
                            render={({value, onChange}) => {

                              return (
                                <Select
                                  isClearable={false}
                                  theme={selectThemeColors}
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={stratas}
                                  value={selectedStrata}
                                  onChange={data => {
                                    onChange(data)
                                    setSelectedStrata(data)
                                  }}
                                />
                              )
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12' md='2'>
                        <FormGroup>
                          <Label for='semester'>Semester</Label>
                          <Controller
                            name='semester'
                            id='semester'
                            control={control}
                            invalid={data !== null && (data.semester === undefined || data.semester === null)}
                            defaultValue={selectedSemester}
                            render={({value, onChange}) => {

                              return (
                                <Select
                                  isClearable={false}
                                  theme={selectThemeColors}
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={semesters}
                                  value={selectedSemester}
                                  onChange={data => {
                                    onChange(data)
                                    setSelectedSemester(data)
                                  }}
                                />
                              )
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12' md='2'>
                        <FormGroup>
                          <Label for='gpa'>IPK</Label>
                          <Controller
                            name='gpa'
                            id='gpa'
                            control={control}
                            invalid={data !== null && (data.gpa === undefined || data.gpa === null)}
                            defaultValue={selectedIpk}
                            render={({value, onChange}) => {

                              return (
                                <Select
                                  isClearable={false}
                                  theme={selectThemeColors}
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={ipks()}
                                  value={selectedIpk}
                                  onChange={data => {
                                    onChange(data)
                                    setSelectedIpk(data)
                                  }}
                                />
                              )
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12' md='6'>
                        <Row>
                          <Col sm='12'>
                            <FormGroup>
                              <Label for='exploration_interest'>Minat Area Explorasi</Label>
                              {explores.map((data, key) => {
                                return (
                                  <Select
                                    key={key}
                                    id={`explore-${key}`}
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    className='react-select mb-1'
                                    classNamePrefix='select'
                                    options={dataExplores.map(r => {
                                      return {
                                        label: r.param_value,
                                        value: r.param_value
                                      }
                                    })}
                                    value={data}
                                    onChange={value => {
                                      handleSelectExplore(key, value)
                                    }}
                                  />
                                )
                              })}
                            </FormGroup>
                          </Col>
                          <Col sm='12'>
                            <Button.Ripple className='btn-icon' color='success' onClick={() => handleAddExplore()}>
                              <Plus size={14} />
                              <span className='align-middle ml-25'>Explore</span>
                            </Button.Ripple>
                          </Col>
                        </Row>
                      </Col>
                      <Col sm='12' md='6'>
                        <Row>
                          <Col sm='12'>
                            <FormGroup>
                              <Label for='skills'>Keahlian yang dimiliki</Label>
                              {skills.map((data, key) => {
                                return (
                                  <Select
                                    key={key}
                                    id={`skill-${key}`}
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    className='react-select mb-1'
                                    classNamePrefix='select'
                                    options={dataSkills.map(r => {
                                      return {
                                        label: r.param_value,
                                        value: r.param_value
                                      }
                                    })}
                                    value={data}
                                    onChange={value => {
                                      handleSelectSkill(key, value)
                                    }}
                                  />
                                )
                              })}
                            </FormGroup>
                          </Col>
                          <Col sm='12'>
                            <Button.Ripple className='btn-icon' color='success' onClick={() => handleAddSkill()}>
                              <Plus size={14} />
                              <span className='align-middle ml-25'>Skill</span>
                            </Button.Ripple>
                          </Col>
                        </Row>
                      </Col>
                      <Col sm='12' md='3'>
                        <FormGroup>
                          <Label for='total_current_course'>Jumlah Matakuliah</Label>
                          <Input
                            id='total_current_course'
                            name='total_current_course'
                            type='number'
                            placeholder='Jumlah Matakuliah'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.total_current_course
                            })}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12' md='3'>
                        <FormGroup>
                          <Label for='total_current_study_credit'>Jumlah SKS</Label>
                          <Input
                            id='total_current_study_credit'
                            name='total_current_study_credit'
                            type='number'
                            placeholder='Jumlah SKS'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.total_current_study_credit
                            })}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12' md='3'>
                        <FormGroup>
                          <Label for='phone'>No. HP Mahasiswa</Label>
                          <Input
                            id='phone'
                            name='phone'
                            placeholder='No. HP Mahasiswa'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.phone
                            })}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12' md='3'>
                        <FormGroup>
                          <Label for='email'>E-Mail Mahasiswa</Label>
                          <Input
                            id='email'
                            name='email'
                            placeholder='E-Mail Mahasiswa'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.email
                            })}
                            defaultValue={data?.email}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12' md='3'>
                        <FormGroup>
                          <Label for='kmbi_duration_interest'>Minat Durasi KMBI</Label>
                          <Controller
                            name='kmbi_duration_interest'
                            id='kmbi_duration_interest'
                            control={control}
                            invalid={data !== null && (data.kmbi_duration_interest === undefined || data.kmbi_duration_interest === null)}
                            defaultValue={selectedDurationInterest}
                            render={({value, onChange}) => {

                              return (
                                <Select
                                  isClearable={false}
                                  theme={selectThemeColors}
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={durationSemesters}
                                  value={selectedDurationInterest}
                                  onChange={data => {
                                    onChange(data)
                                    setSelectedDurationInterest(data)
                                  }}
                                />
                              )
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12'>
                        <h4 className='mb-1'>
                          <Users size={20} className='mr-50' />
                          <span className='align-middle'>Dosen Pembimbing KMBI (jika belum ada, diisi dengan Nama PIC PT)</span>
                        </h4>
                      </Col>
                      {lectures.map((data, key) => {
                        return (
                          <Fragment key={key}>
                            <Col sm='12' md='6'>
                              <FormGroup>
                                <Label for='supporting_lecturer'>Dosen Pembimbing {`${key + 1}`}</Label>
                                <Input
                                  id='supporting_lecturer'
                                  name={`supporting_lecturer[${key}]`}
                                  placeholder='Nama Dosen'
                                  innerRef={register({ required: true })}
                                  className={classnames({
                                    'is-invalid': errors.supporting_lecturer
                                  })}
                                />
                              </FormGroup>
                            </Col>
                            <Col md='6'>
                              <FormGroup>
                                <Label for='email_lecturer'>Email Dosen Pembimbing {`${key + 1}`}</Label>
                                <Input
                                  id='email_lecturer'
                                  name={`email_lecturer[${key}]`}
                                  placeholder='Email Dosen'
                                  innerRef={register({ required: true })}
                                  className={classnames({
                                    'is-invalid': errors.email_lecturer
                                  })}
                                />
                              </FormGroup>
                            </Col>
                          </Fragment>
                        )
                      })}
                      <Col sm='12'>
                        <Button.Ripple className='btn-icon mb-1' color='success' onClick={() => handleAddDosen()}>
                          <Plus size={14} />
                          <span className='align-middle ml-25'>Dosen</span>
                        </Button.Ripple>
                      </Col>
                      <Col sm='12'>
                        <h4 className='mb-1'>
                          <MapPin size={20} className='mr-50' />
                          <span className='align-middle'>Domisili</span>
                        </h4>
                      </Col>
                      <Col sm='12' md='6'>
                        <FormGroup>
                          <Label for='province_id'>Provinsi</Label>
                          <Controller
                            name='province_id'
                            id='province_id'
                            control={control}
                            invalid={data !== null && (data.province_id === undefined || data.province_id === null)}
                            defaultValue={selectedProvince}
                            render={({value, onChange}) => {

                              return (
                                <Select
                                  isClearable={false}
                                  theme={selectThemeColors}
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={provinces.allData.map(r => {
                                    return {
                                      value: r.id_provinsi,
                                      label: r.provinsi
                                    }
                                  })}
                                  value={selectedProvince}
                                  onChange={data => {
                                    onChange(data)
                                    setSelectedProvince(data)
                                  }}
                                />
                              )
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12' md='6'>
                        <FormGroup>
                          <Label for='city'>Kota</Label>
                          <Input
                            id='city'
                            name='city'
                            placeholder='Kota'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.city
                            })}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12'>
                        <h4 className='mb-1'>
                          <Book size={20} className='mr-50' />
                          <span className='align-middle'>Pengalaman</span>
                        </h4>
                      </Col>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='research_experience'>Riset</Label>
                          <ReactSummernote
                            value={riset}
                            options={{
                              lang: 'id-ID',
                              height: 250,
                              dialogsInBody: true,
                              toolbar: [
                                ['font', ['bold', 'underline', 'clear']],
                                ['para', ['ul', 'ol']]
                              ]
                            }}
                            onChange={setRiset}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='project_experience'>Project</Label>
                          <ReactSummernote
                            value={project}
                            options={{
                              lang: 'id-ID',
                              height: 250,
                              dialogsInBody: true,
                              toolbar: [
                                ['font', ['bold', 'underline', 'clear']],
                                ['para', ['ul', 'ol']]
                              ]  
                            }}
                            onChange={setProject}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='software_experience'>Membuat Aplikasi</Label>
                          <ReactSummernote
                            value={software}
                            options={{
                              lang: 'id-ID',
                              height: 250,
                              dialogsInBody: true,
                              toolbar: [
                                ['font', ['bold', 'underline', 'clear']],
                                ['para', ['ul', 'ol']]
                              ]                            
                            }}
                            onChange={setSoftware}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12'>
                        <h4 className='mb-1'>
                          <Book size={20} className='mr-50' />
                          <span className='align-middle'>Prestasi</span>
                        </h4>
                      </Col>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='academic_achievement'>Akademik</Label>
                          <ReactSummernote
                            value={akademik}
                            options={{
                              lang: 'id-ID',
                              height: 250,
                              dialogsInBody: true,
                              toolbar: [
                                ['font', ['bold', 'underline', 'clear']],
                                ['para', ['ul', 'ol']]
                              ]  
                            }}
                            onChange={setAkademik}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='non_academic_achievement'>Non Akademik</Label>
                          <ReactSummernote
                            value={nonAkademik}
                            options={{
                              lang: 'id-ID',
                              height: 250,
                              dialogsInBody: true,
                              toolbar: [
                                ['font', ['bold', 'underline', 'clear']],
                                ['para', ['ul', 'ol']]
                              ]  
                            }}
                            onChange={setNonAkademik}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12'>
                        <h4 className='mb-1'>
                          <Book size={20} className='mr-50' />
                          <span className='align-middle'>Motivasi</span>
                        </h4>
                      </Col>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='motivation_in_kmbi'>Motivasi mengiktui KMBI</Label>
                          <ReactSummernote
                            value={motivasi}
                            options={{
                              lang: 'id-ID',
                              height: 250,
                              dialogsInBody: true,
                              toolbar: [
                                ['font', ['bold', 'underline', 'clear']],
                                ['para', ['ul', 'ol']]
                              ]  
                            }}
                            onChange={setMotivasi}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12'>
                        <h4 className='mb-1'>
                          <File size={20} className='mr-50' />
                          <span className='align-middle'>Lampiran</span>
                        </h4>
                      </Col>
                      <Col sm='12' md='9'>
                        <FormGroup>
                          <Label for='attachment'>CV</Label>
                          <Input
                            id='attachment'
                            name='attachment'
                            type='file'
                            onChange={onChangeCv}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12' md='9'>
                        <FormGroup>
                          <Label for='attachment_images'>Pas Photo</Label>
                          <Input
                            id='attachment_images'
                            name='attachment_images'
                            type='file'
                            onChange={onChangePhoto}
                            accept='image/*' 
                          />
                        </FormGroup>
                        {photo.link && <img className="img-fluid" src={photo.link} width="300"/>}
                      </Col>
                    </Row>
                    <Row>
                      <Col className='d-flex flex-sm-row flex-column mt-2'>
                        <Button type='submit' color='primary' className='d-none btn-submit'>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' disabled={submitpesertas.loading} onClick={() => $('.btn-submit').click()}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Campus
