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
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import Avatar from '@components/avatar'
import ReCAPTCHA from 'react-google-recaptcha'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Utils
import { isUserLoggedIn, isObjEmpty } from '@utils'

import Logo from '@src/assets/frontend/img/Logo.png'
import LogoWhite from '@src/assets/frontend/img/Logo (White).png'
import Youtube from '@src/assets/frontend/img/YT.png'
import Website from '@src/assets/frontend/img/Website.png'
import Instagram from '@src/assets/frontend/img/IG.png'
import BgModal from '@src/assets/frontend/img/bg-modal.png'

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

const FrontendLayout = ({ children, ...rest }) => {
  // ** Hooks
  const [skin, setSkin] = useSkin()
  const { register, errors, handleSubmit, setError } = useForm()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()

  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [isCaptcha, setIsCaptcha] = useState(false)
  const [userData, setUserData] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [errorResponse, setErrorRespone] = useState('')
  
  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    setIsCaptcha(true)
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) {
    return null
  }

  const onSubmit = data => {
    if (isObjEmpty(errors)) {
      setErrorRespone('')
      useJwt
        .login({ email, password, token_captcha: captcha })
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
            history.push('/')
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

  return (
    <div className='fronted'>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm" id="mainNav">
        <div className="container px-5">
          <a href="/" className="navbar-brand fw-bold">
            <img src={Logo} alt="Logo Spektro" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="bi-list" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
              <li className="nav-item"><a className="nav-link me-lg-3" href="/learning-space">Learning Space</a></li>
              <li className="nav-item"><a className="nav-link me-lg-3" href="/kampus">Kampus Merdeka</a></li>
              <li className="nav-item"><a className="nav-link me-lg-3" href="/research-fund">Research Fund</a></li>
              <li className="nav-item"><a className="nav-link me-lg-3" href="/forum">Forum</a></li>
              {isUserLoggedIn() ? (<li className="nav-item">
                  <a className="nav-link me-lg-3" href="/dashboard">Dashboard</a>
                </li>) : (<li className="nav-item"><a className="nav-link me-lg-3" data-bs-toggle="modal" data-bs-target="#modal-login">Sign in</a></li>)
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
              <div className="mb-4"><img src={LogoWhite} alt="" /></div>
              <div className="mb-4" style={{fontWeight: 300}}><p>SPEKTRO merupakan Knowledge Management System berskala nasional sebagai sarana pertukaran pengetahuan interaktif antara Bank Indonesia dan Perguruan Tinggi yang memiliki local wisdom dalam rangka edukasi kebanksentralan serta memberikan masukan terhadap kebijakan Bank Indonesia</p></div>
              <div>
                <ul className="list-group list-group-horizontal" style={{listStyleType: 'none'}}>
                  <li>Tentang</li>
                  <li style={{paddingLeft: '2rem'}}>FAQ</li>
                  <li style={{paddingLeft: '2rem'}}>Kebijakan Privasi</li>
                  <li style={{paddingLeft: '2rem'}}>Kontributor</li>
                  <li style={{paddingLeft: '2rem'}}>Event</li>
                  <li style={{paddingLeft: '2rem'}}>BMEB</li>
                  <li style={{paddingLeft: '2rem'}}>JMIF</li>
                  <li style={{paddingLeft: '2rem'}}>PERPUSBI</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div style={{textAlign: 'center', position: 'relative', top: '10%', transform: 'translateY(-10%)'}}>
                <img className="px-3" src={Youtube} alt="" />
                <img className="px-3" src={Website} alt="" />
                <img className="px-3" src={Instagram} alt="" />
              </div>
              <div style={{position: 'relative', top: '50%', transform: 'translateY(-50%)', color: 'white', fontWeight: 300}}>
                <p style={{fontSize: '0.75rem'}}>Bank Indonesia
                  Building D 10th Floor, Bank Indonesia Institute
                  Learning Innovation and Partnership Team
                  Jl. MH Thamrin no. 2, Central Jakarta
                  No. Telp : +6221 - 29810000 ext.2167
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
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <Input
                          autoFocus
                          type='text'
                          value={email}
                          id='email'
                          name='email'
                          placeholder='Email'
                          onChange={e => setEmail(e.target.value)}
                          className={classnames({ 'is-invalid': errors['email'] })}
                          innerRef={register({ required: true, validate: value => value !== '' })}
                          style={{backgroundColor: '#DCF1FA', fontSize: '14px', minHeight: '46px'}}
                        />
                      </div>
                      <div className="mb-3">
                        <Input
                          type='password'
                          value={password}
                          id='password'
                          name='password'
                          placeholder='Password'
                          onChange={e => setPassword(e.target.value)}
                          className={classnames({ 'is-invalid': errors['password'] })}
                          innerRef={register({ required: true, validate: value => value !== '' })}
                          style={{backgroundColor: '#DCF1FA', fontSize: '14px', minHeight: '46px'}}
                        />
                      </div>
                      <div className="mb-3 form-check" style={{fontSize: '12px'}}>
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember</label>
                        <a href="#" style={{float: 'right'}}>Forgot Password?</a>
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
                      <Button.Ripple type='submit' color='primary' style={{width: '100%', backgroundColor: '#39556A', border: 0}} block>
                        Log in
                      </Button.Ripple>
                    </Form>
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
