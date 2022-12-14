// ** React Imports
import { useEffect, useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import {
  Alert,
  Form,
  Input,
  CustomInput,
  Button,
  UncontrolledTooltip
} from 'reactstrap'
import { HelpCircle, Coffee } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Avatar from '@components/avatar'
import ReCAPTCHA from 'react-google-recaptcha'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataFrontendWhitelistDomain } from '@src/views/frontend/store/action'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Utils
import { isUserLoggedIn, isObjEmpty } from '@utils'

import Logo from '@src/assets/frontend/img/Logo.png'
import LogoWhite from '@src/assets/frontend/img/Logo (White).png'
import YoutubeImg from '@src/assets/frontend/img/YT.png'
import WebsiteImg from '@src/assets/frontend/img/Website.png'
import InstagramImg from '@src/assets/frontend/img/IG.png'
import BgModal from '@src/assets/frontend/img/bg-modal.png'
import WebsiteIcon from '@src/assets/frontend/img/website_icon.png'
import InstagramIcon from '@src/assets/frontend/img/instagram_icon.png'
import YoutubeIcon from '@src/assets/frontend/img/youtube_icon.png'

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as an {role} user to Spektro. Now you can start to explore. Enjoy!</span>
    </div>
  </Fragment>
)

const profesi = ['Dosen', 'Mahasiswa', 'Pegawai']

const FrontendLayout = ({ children, ...rest }) => {
  // ** Hooks
  const [skin, setSkin] = useSkin()
  const { register, errors, handleSubmit, setError, control } = useForm()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  // ** Store Vars
  const store = useSelector(state => state.frontends),
    auth = useSelector(state => state.auth)

  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [isCaptcha, setIsCaptcha] = useState(false)
  const [accept, setAccept] = useState(false)
  const [remember, setRemember] = useState(false)
  const [userData, setUserData] = useState(null)
  const [captcha, setCaptcha] = useState('')
  const [errorResponse, setErrorRespone] = useState('')
  const [segment, setSegment] = useState('login')
  
  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    setIsCaptcha(true)
    
    const s = document.createElement("script")
    s.type = "text/javascript"
    s.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
    $("head").append(s)

    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [auth.userData])

  if (!isMounted) {
    return null
  }

  const handleSwap = (e, s) => {
    e.preventDefault()

    if (s === 'signup') {
      //get domain list
      dispatch(getAllDataFrontendWhitelistDomain())

      setSegment(s)
      setErrorRespone('')
      $("#modal-login").modal("hide")
      $("#modal-register").modal("show")
    } else if (s === 'login') {
      setSegment(s)
      setErrorRespone('')
      $("#modal-register").modal("hide")
      $("#modal-login").modal("show")
    }

    const items = document.querySelectorAll('.modal-backdrop')

    for (let i = 0; i < items.length; i++) {
      if (i < (items.length - 1)) {
        items[i].remove()
      }
    }
  }

  const onSubmit = data => {

    if (isObjEmpty(errors)) {
      setErrorRespone('')

      if (!captcha) {
        setErrorRespone('Captcha not check')
        return null
      }

      useJwt
        .login({ email: data.email, password: data.password, token_captcha: captcha })
        .then(res => {
          const {data} = res

          if (data.status) {

            $("#modal-login").modal("hide")

            const {userdata, accessToken, refreshToken} = data.data

            let menus = []
            if (userdata.resource_id === 0) {
              menus = [
                {
                  action: 'manage',
                  subject: 'all'
                }
              ]
            } else {
              menus = userdata.ability.map(r => {
                return {
                  action: 'read',
                  subject: r.toLowerCase()
                }
              })
            }

            const abilitys = {
              ability: menus
            }

            Object.assign(res.data.data, abilitys)

            const datas = { ...res.data.data, accessToken, refreshToken }

            dispatch(handleLogin(datas))

            ability.update(menus)
            history.push(location.pathname)
            $('.modal-backdrop').remove()
            toast.success(
              <ToastContent name={userdata.full_name || 'Admin'} role={userdata.full_name || 'Admin'} />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          } else {
            setErrorRespone(res.data.message)
          }
        })
        .catch(err => {
          const {response} = err
          if (response?.status === 422) {
            const {data} = response
            setError(data.message.property, {
              message: data.message.message
            })
            setErrorRespone(data.message.message)
          } else if (response?.status === 400) {
            const {data} = response
            setErrorRespone(data.message)
          } else if (response?.status === 404) {
            const {data} = response
            setErrorRespone(data.message)
          }

          setIsCaptcha(false)

          setTimeout(() => {
            setIsCaptcha(true)
          }, 100)
        })
    }
  }

  const onSubmitRegist = data => {

    if (isObjEmpty(errors)) {
      setErrorRespone('')

      if (!captcha) {
        setErrorRespone('Captcha not check')
        return null
      }

      const emailRegist = `${data.email}${data.domain}`

      if (!data.profesi) {

        setError('profesi', {
          message: 'Profesi required'
        })
        setErrorRespone('Profesi required')

        return null
      }

      if (data.password.length < 8) {
        setError('password', {
          message: 'Password min. 8'
        })
        setErrorRespone('Password min. 8')

        return null
      }

      if (data.password !== data.password_confirm) {

        setError('password_confirm', {
          message: 'Password not match'
        })
        setErrorRespone('Password not match')

        return null
      }

      if (!accept) {
        setErrorRespone('Accept not check')
        return null
      }

      useJwt
        .register({ 
          first_name: data.first_name, 
          last_name: data.last_name, 
          email: emailRegist, 
          password: data.password, 
          type: data.profesi,
          token_captcha: captcha 
        })
        .then(res => {
          const {data} = res

          if (data.status) {
            $("#modal-register").modal("hide")
            $("#modal-success").modal("show")
          } else {
            setErrorRespone(res.data.message)
          }
        })
        .catch(err => {
          const {response} = err
          if (response?.status === 422) {
            const {data} = response
            setError(data.message.property, {
              message: data.message.message
            })
            setErrorRespone(data.message.message)
          } else if (response?.status === 400) {
            const {data} = response
            setErrorRespone(data.message)
          } else if (response?.status === 404) {
            const {data} = response
            setErrorRespone(data.message)
          }

          setIsCaptcha(false)

          setTimeout(() => {
            setIsCaptcha(true)
          }, 100)
        })
    }
  }

  return (
    <div className='fronted'>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top" id="mainNav">
        <div className="container">
          <a href="/" className="navbar-brand fw-bold">
            <img src={Logo} alt="Logo Spektro" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="bi-list" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
              <li className="nav-item"><Link className="nav-link me-lg-3" to="/home">Home</Link></li>
              <li className="nav-item"><Link className="nav-link me-lg-3" to="/learning-space">Learning Space</Link></li>
              <li className="nav-item"><Link className="nav-link me-lg-3" to="/kampus">Kampus Merdeka</Link></li>
              <li className="nav-item"><Link className="nav-link me-lg-3" to="/research-fund">Research Fund</Link></li>
              <li className="nav-item">
                { userData ? (
                    <Link className="nav-link me-lg-3" to="/forum">Forum</Link>
                  ) : (
                    <a className="nav-link me-lg-3" data-bs-toggle="modal" data-bs-target="#modal-forum-error" onClick={() => {
                      const items = document.querySelectorAll('.modal-backdrop')

                      for (let i = 0; i < items.length; i++) {
                        if (i < (items.length - 1)) {
                          items[i].remove()
                        }
                      }
                    }}>Forum</a>
                  )
                }
              </li>
              {isUserLoggedIn() ? (<li className="nav-item">
                  <a className="nav-link me-lg-3" href="/dashboard">Dashboard</a>
                </li>) : (<li className="nav-item"><a className="nav-link me-lg-3" data-bs-toggle="modal" data-bs-target="#modal-login" onClick={(e) => handleSwap(e, 'login')}>Sign in</a></li>)
              }
            </ul>
          </div>
        </div>
      </nav>
      {/* Child Component */}
      {children}
      {/* Footer*/}
      <footer className="py-5" style={{backgroundColor: '#0A558C'}}>
        <div className="container px-5">
          <div className="row gx-5">
            <div className="col-lg-9 text-white" style={{borderRight: '1px solid white'}}>
              <div className="mb-4"><img src={LogoWhite} alt="Spektro footer" /></div>
              <div className="mb-4" style={{fontWeight: 300}}><p>SPEKTRO merupakan Knowledge Management System berskala nasional sebagai sarana pertukaran pengetahuan interaktif antara Bank Indonesia dan Perguruan Tinggi yang memiliki local wisdom dalam rangka edukasi kebanksentralan serta memberikan masukan terhadap kebijakan Bank Indonesia</p></div>
              <div>
                <ul className="list-group list-group-horizontal-lg" style={{listStyleType: 'none'}}>
                  <li><a href='/home#about'>Tentang</a></li>
                  <li className="ps-lg-4"><a href='#' target='_blank'>FAQ</a></li>
                  <li className="ps-lg-4"><a href='#' target='_blank'>Kebijakan Privasi</a></li>
                  <li className="ps-lg-4"><a href='#' target='_blank'>Kontributor</a></li>
                  <li className="ps-lg-4"><a href='https://www.bmeb-bi.org/index.php/BEMP' target='_blank'>BMEB</a></li>
                  <li className="ps-lg-4"><a href='https://jimf-bi.org/index.php/JIMF' target='_blank'>JMIF</a></li>
                  <li className="ps-lg-4"><a href='https://perpustakaan-bi.org' target='_blank'>Perpus BI</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div style={{textAlign: 'center', position: 'relative', top: '10%', transform: 'translateY(-10%)'}}>
                <a href='https://www.youtube.com/channel/UCEZcX-XFNogNumkBwWqfU3w' target='_blank'><img className="px-3" src={YoutubeImg} alt="Spektro Youtube" /></a>
                <a href='https://www.bi.go.id/id/bi-institute/Default.aspx' target='_blank'><img className="px-3" src={WebsiteImg} alt="Spektro Website" /></a>
                <a href='https://www.instagram.com/bankindonesiainstitute' target='_blank'><img className="px-3" src={InstagramImg} alt="Spektro Instagram" /></a>
              </div>
              <div style={{position: 'relative', top: '50%', transform: 'translateY(-50%)', color: 'white', fontWeight: 300}}>
                <p style={{fontSize: '0.75rem'}}>
                  Bank Indonesia <br/>
                  Building D 10th Floor, Bank Indonesia Institute <br/>
                  Learning Innovation and Partnership Team <br/>
                  Jl. MH Thamrin no. 2, Central Jakarta <br/><br/>
                  No. Telp : +6221 - 29810000 ext.2167 <br/>
                  E-mail    : kmadmin@bi.go.id</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/*Modal*/}
      <div className="modal fade" id="modal-login" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="row gx-0">
                <div className="col-lg-6">
                  <div className="p-5" style={{backgroundImage: `url("${BgModal}")`, height: '100%', color: 'white', position: 'relative'}}>
                    <div><p style={{fontWeight: 200}}>Selamat Datang di Website <span style={{fontWeight: 600}}>SPEKTRO</span></p></div>
                    <div><p>Situs berbagi pengetahuan kebanksentralan secara online</p></div>
                    <div className="text_bottom_bg_login" style={{paddingRight: '3rem'}}><p style={{fontWeight: 200}}>Silahkan Log in atau Sign up dengan Akun Perguruan Tinggi atau Lembaga Anda untuk bisa mengakses website</p></div>
                  </div>
                </div>
                <div className="col-lg-6 p-5">
                  <div className="text-center"><img className="img-fluid" src={Logo} alt="" /></div>
                  <hr />
                  <h3 className="mb-4" style={{fontWeight: 200}}>Log in</h3>
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
                  <div>
                    {segment === 'login' &&
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                          <Input
                            autoFocus
                            type='text'
                            id='email'
                            name='email'
                            placeholder='Email'
                            className={classnames({ 'is-invalid': errors['email'] })}
                            innerRef={register({ required: true, validate: value => value !== '' })}
                            style={{backgroundColor: '#DCF1FA', fontSize: '14px', minHeight: '46px', color: '#6c757d'}}
                          />
                        </div>
                        <div className="mb-3">
                          <InputPasswordToggle
                            id='password'
                            name='password'
                            placeholder='Password'
                            className={classnames({ 'is-invalid': errors['password'] })}
                            innerRef={register({ required: true, validate: value => value !== '' })}
                            style={{backgroundColor: '#DCF1FA', fontSize: '14px', minHeight: '46px', color: '#6c757d', borderRightWidth: 0}}
                            groupColor="bg-input-login"
                          />
                        </div>
                        <div className="mb-3 form-check d-flex justify-content-between" style={{fontSize: '12px'}}>
                          <div className="d-flex">
                            <CustomInput type='checkbox' id='remember' className='checkbox-login' onChange={() => setRemember(!remember)} checked={remember}/>
                            <label className="form-check-label" htmlFor="remember">Remember</label>
                          </div>
                          <a href="#" style={{float: 'right', textDecorationLine: 'none', color: '#0A558D' }}>Forgot Password?</a>
                        </div>
                        <div className="mb-3">
                          <div className="form-group">
                            {isCaptcha &&
                              <ReCAPTCHA
                                sitekey={`${process.env.REACT_APP_SECRET_CAPTCHA}`}
                                onChange={(e) => setCaptcha(e)}
                              />
                            }
                          </div>
                        </div>
                        <Button.Ripple type='submit' className='btn-login-color' style={{width: '100%', border: 0, height: '43px'}} block>
                          Log in
                        </Button.Ripple>
                      </Form>
                    }
                    <p className='mt-2' style={{fontWeight: '400', fontSize: 12, textAlign: 'center' }}>Don't have any account? <a href='#' onClick={(e) => handleSwap(e, 'signup')} style={{textDecorationLine: 'none', color: '#0A558D'}}>Sign Up</a></p>
                    <p className='text-center' style={{color: '#236698', fontSize: 12}}>Follow Us</p>
                    <p className='text-center m-0'>
                      <a href='https://www.youtube.com/channel/UCEZcX-XFNogNumkBwWqfU3w' target='_blank'><img className="px-3" src={YoutubeIcon} alt="Spektro Youtube" /></a>
                      <a href='https://www.instagram.com/bankindonesiainstitute' target='_blank'><img className="px-3" src={InstagramIcon} alt="Spektro Instagram" /></a>
                      <a href='https://www.bi.go.id/id/bi-institute/Default.aspx' target='_blank'><img className="px-3" src={WebsiteIcon} alt="Spektro Website" /></a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modal-register" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="row gx-0">
                <div className="col-lg-6">
                  <div className="p-5" style={{backgroundImage: `url("${BgModal}")`, height: '100%', color: 'white', position: 'relative'}}>
                    <div><p style={{fontWeight: 200}}>Selamat Datang di Website <span style={{fontWeight: 600}}>SPEKTRO</span></p></div>
                    <div><p>Situs berbagi pengetahuan kebanksentralan secara online</p></div>
                    <div className="text_bottom_bg_login" style={{paddingRight: '3rem'}}><p style={{fontWeight: 200}}>Silahkan Log in atau Sign up dengan Akun Perguruan Tinggi atau Lembaga Anda untuk bisa mengakses website</p></div>
                  </div>
                </div>
                <div className="col-lg-6 p-5">
                  <div className="text-center"><img className="img-fluid" src={Logo} alt="" /></div>
                  <hr />
                  <h3 className="mb-4" style={{fontWeight: 200}}>Sign Up</h3>
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
                  <div className='container-register' style={{overflow: 'scroll', height: '400px' }}>
                    {segment === 'signup' &&
                      <Form onSubmit={handleSubmit(onSubmitRegist)}>
                        <div className="mb-3 d-flex">
                          <div className="d-flex flex-column">
                            <label>Nama Depan</label>
                            <Input
                              autoFocus
                              type='text'
                              id='first_name'
                              name='first_name'
                              placeholder='Nama Depan'
                              className={classnames({ 'is-invalid': errors['first_name'] })}
                              innerRef={register({ required: true, validate: value => value !== '' })}
                              style={{backgroundColor: '#DCF1FA', fontSize: '14px', minHeight: '46px', color: '#6c757d'}}
                            />
                          </div>
                          <div style={{width: '10px'}}/>
                          <div className="d-flex flex-column">
                            <label>Nama Belakang</label>
                            <Input
                              type='text'
                              id='last_name'
                              name='last_name'
                              placeholder='Nama Belakang'
                              className={classnames({ 'is-invalid': errors['last_name'] })}
                              innerRef={register({ required: true, validate: value => value !== '' })}
                              style={{backgroundColor: '#DCF1FA', fontSize: '14px', minHeight: '46px', color: '#6c757d'}}
                            />
                          </div>
                        </div>
                        <div className="mb-3 d-flex">
                          <div className="d-flex flex-column">
                            <label>Username Email</label>
                            <Input
                              type='text'
                              id='email'
                              name='email'
                              placeholder='Username email'
                              className={classnames({ 'is-invalid': errors['email'] })}
                              innerRef={register({ required: true, validate: value => value !== '' })}
                              style={{backgroundColor: '#DCF1FA', fontSize: '14px', minHeight: '46px', color: '#6c757d'}}
                            />
                          </div>
                          <div style={{width: '10px'}}/>
                          <div className="d-flex flex-column">
                            <label>Domain</label>
                            <Controller
                              as={Input}
                              type='select'
                              name='domain'
                              id='domain'
                              control={control}
                              defaultValue=""
                              style={{backgroundColor: '#DCF1FA', fontSize: '14px', minHeight: '46px', width: '150px', color: '#6c757d'}}
                            >
                              <option value=''>Select...</option>
                              {store.allDataWhitelistDomain.map((data, key) => {
                                return (
                                  <option key={key} value={`@${data.domain}`}>{`@${data.domain}`}</option>
                                )
                              })}
                            </Controller>
                          </div>
                        </div>
                        <div className="mb-3 d-flex flex-column">
                          <label>Profesi</label>
                          <Controller
                            as={Input}
                            type='select'
                            name='profesi'
                            id='profesi'
                            control={control}
                            defaultValue=""
                            style={{backgroundColor: '#DCF1FA', fontSize: '14px', minHeight: '46px', color: '#6c757d'}}
                          >
                            <option value=''>Select...</option>
                            {profesi.map((data, key) => {
                              return (
                                <option key={key} value={data}>{data}</option>
                              )
                            })}
                          </Controller>
                        </div>
                        <div className="mb-3 d-flex flex-column">
                          <label>Password</label>
                          <InputPasswordToggle
                            id='password'
                            name='password'
                            placeholder='Min. 8 karakter'
                            className={classnames({ 'is-invalid': errors['password'] })}
                            innerRef={register({ required: true, validate: value => value !== '' })}
                            style={{backgroundColor: '#DCF1FA', fontSize: '14px', minHeight: '46px', color: '#6c757d', borderRightWidth: 0}}
                            groupColor="bg-input-login"
                          />
                        </div>
                        <div className="mb-3 d-flex flex-column">
                          <label>Retype Password</label>
                          <InputPasswordToggle
                            id='password_confirm'
                            name='password_confirm'
                            placeholder='Ketik ulang password Anda'
                            className={classnames({ 'is-invalid': errors['password_confirm'] })}
                            innerRef={register({ required: true, validate: value => value !== '' })}
                            style={{backgroundColor: '#DCF1FA', fontSize: '14px', minHeight: '46px', color: '#6c757d', borderRightWidth: 0}}
                            groupColor="bg-input-login"
                          />
                        </div>
                        <div className="mb-3 form-check d-flex" style={{fontSize: '12px'}}>
                          <CustomInput type='checkbox' id='accept' className='checkbox-login' onChange={() => setAccept(!accept)} checked={accept}/>
                          <label className="form-check-label" htmlFor="checkAccept">Accept All Terms & Conditions</label>
                        </div>
                        <div className="mb-3">
                          <div className="form-group">
                            {isCaptcha &&
                              <ReCAPTCHA
                                sitekey={`${process.env.REACT_APP_SECRET_CAPTCHA}`}
                                onChange={(e) => setCaptcha(e)}
                              />
                            }
                          </div>
                        </div>
                        <Button.Ripple type='submit' className='btn-login-color' style={{width: '100%', border: 0, height: '43px'}} block>
                          Sign Up
                        </Button.Ripple>
                      </Form>
                    }
                    <p className='mt-2' style={{fontWeight: '400', fontSize: 12, textAlign: 'center' }}>Have any account? <a href='#' onClick={(e) => handleSwap(e, 'login')} style={{textDecorationLine: 'none', color: '#0A558D'}}>Log In</a></p>
                    <p className='text-center' style={{color: '#236698', fontSize: 12}}>Follow Us</p>
                    <p className='text-center m-0'>
                      <a href='https://www.youtube.com/channel/UCEZcX-XFNogNumkBwWqfU3w' target='_blank'><img className="px-3" src={YoutubeIcon} alt="Spektro Youtube" /></a>
                      <a href='https://www.instagram.com/bankindonesiainstitute' target='_blank'><img className="px-3" src={InstagramIcon} alt="Spektro Instagram" /></a>
                      <a href='https://www.bi.go.id/id/bi-institute/Default.aspx' target='_blank'><img className="px-3" src={WebsiteIcon} alt="Spektro Website" /></a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="d-none" id="modal-not-login" data-bs-toggle="modal" data-bs-target="#modal-program-error" onClick={() => {
          const items = document.querySelectorAll('.modal-backdrop')

          for (let i = 0; i < items.length; i++) {
            if (i < (items.length - 1)) {
              items[i].remove()
            }
          }
        }}></a>
      <a className="d-none" id="modal-not-login-download" data-bs-toggle="modal" data-bs-target="#modal-download-error" onClick={() => {
          const items = document.querySelectorAll('.modal-backdrop')

          for (let i = 0; i < items.length; i++) {
            if (i < (items.length - 1)) {
              items[i].remove()
            }
          }
        }}></a>
      <div className="modal fade" id="modal-success" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="row gx-0">
                <div className="col-lg-12 p-5">
                  <div className="text-center"><img className="img-fluid" src={Logo} alt="" /></div>
                  <hr />
                  <div>
                    <p className='mt-2' style={{fontWeight: '400', fontSize: 12, textAlign: 'center' }}>Thank you for signing up <br/> Please check your email to verify your account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modal-forum-error" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="row gx-0">
                <div className="col-lg-12 p-5 pb-3">
                  <p style={{fontWeight: '400', fontSize: 12, textAlign: 'center', color: '#FFFFFF' }}>
                    Mohon sign in terlebih dahulu untuk mengikuti forum <br/>Terima kasih
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
      <div className="modal fade" id="modal-program-error" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="row gx-0">
                <div className="col-lg-12 p-5 pb-3">
                  <p style={{fontWeight: '400', fontSize: 12, textAlign: 'center', color: '#FFFFFF' }}>
                    Mohon sign in terlebih dahulu untuk mengikuti program <br/>Terima kasih
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
      <div className="modal fade" id="modal-download-error" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="row gx-0">
                <div className="col-lg-12 p-5 pb-3">
                  <p style={{fontWeight: '400', fontSize: 12, textAlign: 'center', color: '#FFFFFF' }}>
                    Mohon sign in terlebih dahulu untuk mengunduh berkas <br/>Terima kasih
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

export default FrontendLayout
