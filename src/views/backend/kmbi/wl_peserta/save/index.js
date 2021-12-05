// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addWlPeserta } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import { User, Info, Share2, MapPin, Check, X, Plus } from 'react-feather'
import { Card, CardBody, Row, Col, Alert, Button, Label, FormGroup, Input, CustomInput, Form, Media } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import Select from 'react-select'
import logoDefault from '@src/assets/images/avatars/avatar-blank.png'

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'

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

const UserSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.wlpesertas),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl()

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm({
    defaultValues: { gender: 'gender-female', dob: null }
  })

  // ** State
  const [data, setData] = useState(null)
  const [peserta, setPeserta] = useState([
    {
      name: '',
      email: ''
    }
  ])

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/kmbi/wl_peserta/list")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
  }, [store.loading])

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)
      
      const datas = []

      if (id) {
        datas.push({
          name: data.fullname,
          email: data.email,
          id
        })
      } else {
        for (let i = 0; i < data.fullname.length; i++) {
          datas.push({
            name: data.fullname[i],
            email: data.email[i]
          })
        }
      }

      dispatch(addWlPeserta(datas))
    }
  }

  const handleAdd = () => {
    let oldPeserta = peserta

    oldPeserta = oldPeserta.concat({
      fullname: '',
      email: ''
    })

    setPeserta(oldPeserta)
  }

  const handleDelete = (key) => {
    let oldPeserta = peserta
    oldPeserta = oldPeserta.filter((d, k) => k !== key)
    setPeserta(oldPeserta)
  }

  return store.selected !== null && store.selected !== undefined ? (
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
                    <span className='align-middle'>Edit Peserta</span>
                  </h4>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='fullname'>Nama</Label>
                    <Input
                      id='fullname'
                      name='fullname'
                      defaultValue={store.selected.fullname}
                      placeholder='Nama'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.fullname
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='email'>Email</Label>
                    <Input
                      id='email'
                      name='email'
                      defaultValue={store.selected.email}
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
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/kmbi/wl_peserta/list'>
                    <Button color='secondary' outline>
                      <FormattedMessage id='Back'/>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : (
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
                    <span className='align-middle'><FormattedMessage id='Add'/> Peserta</span>
                  </h4>
                </Col>
                {peserta.map((data, key) => {
                  return (
                    <>
                      <Col lg='4' md='6' key={key}>
                        <FormGroup>
                          <Label for='fullname'>Nama</Label>
                          <Input
                            id='fullname'
                            name={`fullname[${key}]`}
                            placeholder='Nama'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.fullname ? errors.fullname[key] : ''
                            })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg='4' md='6'>
                        <FormGroup>
                          <Label for='email'>Email</Label>
                          <Input
                            id='email'
                            name={`email[${key}]`}
                            placeholder='Email'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.email ? errors.email[key] : ''
                            })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg='4' md='6'>
                        <Button.Ripple color='danger' className='text-nowrap px-1' style={{marginTop: '22px'}} onClick={() => handleDelete(key)} outline>
                          <X size={14} className='mr-50' />
                          <span>{intl.formatMessage({id: 'Delete'})}</span>
                        </Button.Ripple>
                      </Col>
                    </>
                  )
                })}
                <Col md='12'>
                  <Button.Ripple className='btn-icon' color='success' onClick={() => handleAdd()}>
                    <Plus size={14} />
                    <span className='align-middle ml-25'>Peserta</span>
                  </Button.Ripple>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/kmbi/wl_peserta/list'>
                    <Button color='secondary' outline>
                      <FormattedMessage id='Back'/>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default UserSave
