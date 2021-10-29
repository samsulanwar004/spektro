// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addUniversity } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataProvince } from '@src/views/backend/master/province/store/action'

// ** Third Party Components
import { User, Info, Share2, MapPin, Check, X } from 'react-feather'
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

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'

const UniversitySave = () => {
  // ** States & Vars
  const store = useSelector(state => state.universitys),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl(),
    provinces = useSelector(state => state.provinces)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  // ** State
  const [data, setData] = useState(null)
  const [selectedProvince, setSelectedProvince] = useState({value: '', label: 'Select...'})
  const [logo, setLogo] = useState({file: null, link: null})

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount
  useEffect(() => {

    if (store.selected !== null && store.selected !== undefined) {
      const selectProvince = {
        value: store.selected.id_provinsi,
        label: store.selected.provinsi
      }

      const linkLogo = `${process.env.REACT_APP_BASE_URL}${store.selected.img_logo}`
      setLogo({...logo, link: linkLogo})
      setSelectedProvince(selectProvince)
    } 

    dispatch(getAllDataProvince())
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/master/universitas/list")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
  }, [store.loading])

  const onChangeLogo = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      setLogo({file: files[0], link: reader.result})
    }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)
      const datas = new FormData()
      
      if (id) {
        datas.append('id_universitas', id)
      }

      datas.append('img_logo', logo.file)
      datas.append('universitas', data.universitas)
      datas.append('kota', data.kota)
      datas.append('short_desc', data.short_desc)
      datas.append('description', data.description)
      datas.append('address', data.address)
      datas.append('noted', data.noted)
      datas.append('id_provinsi', data.id_provinsi.value)

      dispatch(addUniversity(datas))
    }
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
                    <span className='align-middle'>Edit Universitas</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Generic placeholder image' height='100' width='100' />
                    </Media>
                    <Media className='mt-75 ml-1' body>
                      <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                        Upload
                        <Input type='file' onChange={onChangeLogo} hidden accept='image/*' />
                      </Button.Ripple>
                      <Button.Ripple style={{marginBottom: '4px'}} color='secondary' size='sm' outline onClick={() => setLogo({file: null, link: null})}>
                        Reset
                      </Button.Ripple>
                      <p>Allowed JPG or PNG. Max size of 1MB</p>
                    </Media>
                  </Media>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='universitas'><FormattedMessage id='Name'/></Label>
                    <Input
                      id='universitas'
                      name='universitas'
                      defaultValue={store.selected.universitas}
                      placeholder={intl.formatMessage({id: 'Name'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.universitas
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='id_provinsi'><FormattedMessage id='Region'/></Label>
                    <Controller
                      name='id_provinsi'
                      id='id_provinsi'
                      control={control}
                      invalid={data !== null && (data.id_provinsi === undefined || data.id_provinsi === null)}
                      defaultValue={{value: store.selected.id_provinsi, label: store.selected.provinsi}}
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
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='kota'>Kota</Label>
                    <Input
                      id='kota'
                      name='kota'
                      defaultValue={store.selected.kota}
                      placeholder='Kota'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.kota
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='short_desc'>Short desc</Label>
                    <Input
                      id='short_desc'
                      name='short_desc'
                      defaultValue={store.selected.short_desc}
                      placeholder='Short desc'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.short_desc
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='description'>Description</Label>
                    <Input
                      id='description'
                      name='description'
                      defaultValue={store.selected.description}
                      placeholder='Short desc'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.description
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='address'>Address</Label>
                    <Input
                      id='address'
                      name='address'
                      defaultValue={store.selected.address}
                      placeholder='Address'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.address
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='noted'>Noted</Label>
                    <Input
                      id='noted'
                      name='noted'
                      defaultValue={store.selected.noted}
                      placeholder='Noted'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.noted
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
                  <Link to='/master/universitas/list'>
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
                    <span className='align-middle'><FormattedMessage id='Add'/> Universitas</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Generic placeholder image' height='100' width='100' />
                    </Media>
                    <Media className='mt-75 ml-1' body>
                      <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                        Upload
                        <Input type='file' onChange={onChangeLogo} hidden accept='image/*' />
                      </Button.Ripple>
                      <Button.Ripple style={{marginBottom: '4px'}} color='secondary' size='sm' outline onClick={() => setLogo({file: null, link: null})}>
                        Reset
                      </Button.Ripple>
                      <p>Allowed JPG or PNG. Max size of 1MB</p>
                    </Media>
                  </Media>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='universitas'><FormattedMessage id='Name'/></Label>
                    <Input
                      id='universitas'
                      name='universitas'
                      placeholder={intl.formatMessage({id: 'Name'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.universitas
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='id_provinsi'><FormattedMessage id='Region'/></Label>
                    <Controller
                      name='id_provinsi'
                      id='id_provinsi'
                      control={control}
                      invalid={data !== null && (data.id_provinsi === undefined || data.id_provinsi === null)}
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
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='kota'>Kota</Label>
                    <Input
                      id='kota'
                      name='kota'
                      placeholder='Kota'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.kota
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='short_desc'>Short desc</Label>
                    <Input
                      id='short_desc'
                      name='short_desc'
                      placeholder='Short desc'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.short_desc
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='description'>Description</Label>
                    <Input
                      id='description'
                      name='description'
                      placeholder='Short desc'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.description
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='address'>Address</Label>
                    <Input
                      id='address'
                      name='address'
                      placeholder='Address'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.address
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='noted'>Noted</Label>
                    <Input
                      id='noted'
                      name='noted'
                      placeholder='Noted'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.noted
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
                  <Link to='/master/universitas/list'>
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
export default UniversitySave
