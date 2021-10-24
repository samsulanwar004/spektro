// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addDepartemen } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import { User, Info, Share2, MapPin, Check, X } from 'react-feather'
import { Card, CardBody, Row, Col, Alert, Button, Label, FormGroup, Input, CustomInput, Form } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

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
import { isObjEmpty } from '@utils'

const DepartemenSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.departemens),
    dispatch = useDispatch(),
    { id } = useParams(),
    regions = useSelector(state => state.regions),
    regencys = useSelector(state => state.regencys),
    districts = useSelector(state => state.districts),
    intl = useIntl()

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm({
    defaultValues: { gender: 'gender-female', dob: null }
  })

  // ** State
  const [data, setData] = useState(null)

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount
  useEffect(() => {

    dispatch({
      type: 'CLEAR_DATA_REGION'
    })

    dispatch({
      type: 'CLEAR_DATA_REGENCY'
    })

    dispatch({
      type: 'CLEAR_DATA_DISTRICT'
    })

    dispatch(getDataRegion({
      page: 1,
      perPage: 1000
    }))

    if (store.selectedDepartemen !== null && store.selectedDepartemen !== undefined)  {
      if (store.selectedDepartemen.dep_provinsi) {
        dispatch(getDataRegency({
          page: 1,
          perPage: 1000,
          regionId: store.selectedDepartemen.dep_provinsi
        }))
      }

      if (store.selectedDepartemen.dep_kota_kab) {
        dispatch(getDataDistrict({
          page: 1,
          perPage: 1000,
          regencyId: store.selectedDepartemen.dep_kota_kab
        }))
      }
    }

  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/master/departemen/list")
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
      
      if (id) {
        data.dep_id = id
      }

      dispatch(addDepartemen(data))
    }
  }

  const onChangeRegion = regionId => {
    dispatch(getDataRegency({
      page: 1,
      perPage: 1000,
      regionId
    }))
  }

  const onChangeRegency = regencyId => {
    dispatch(getDataDistrict({
      page: 1,
      perPage: 1000,
      regencyId
    }))
  }

  return store.selectedDepartemen !== null && store.selectedDepartemen !== undefined ? (
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
                    <span className='align-middle'>Edit Departemen</span>
                  </h4>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_name'><FormattedMessage id='Name'/></Label>
                    <Input
                      id='dep_name'
                      name='dep_name'
                      defaultValue={store.selectedDepartemen.dep_name}
                      placeholder={intl.formatMessage({id: 'Name'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.dep_name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_address'><FormattedMessage id='Address'/></Label>
                    <Input
                      id='dep_address'
                      name='dep_address'
                      defaultValue={store.selectedDepartemen.dep_address}
                      placeholder={intl.formatMessage({id: 'Address'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.dep_address
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_provinsi'><FormattedMessage id='Region'/></Label>
                    <Controller
                      name='dep_provinsi'
                      id='dep_provinsi'
                      control={control}
                      defaultValue={store.selectedDepartemen.dep_provinsi ?? ''}
                      invalid={data !== null && (data.dep_provinsi === undefined || data.dep_provinsi === null)}
                      render={({value, onChange}) => {

                        return regions.data.length > 0 ? (
                          <Input 
                            onChange={(e) => {
                              onChange(e.target.value)
                              onChangeRegion(e.target.value)
                            }}
                            type="select"
                            defaultValue={value}
                          >
                            <option value={''}>Select...</option>
                            { regions.data.map((data, key) => {
                                return (
                                  <option value={data.id} key={key}>{data.name}</option>
                                )
                              })
                            }
                          </Input>
                        ) : <Input type="input" placeholder="Select..." disabled/>
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_kota_kab'><FormattedMessage id='Regency'/></Label>
                    <Controller
                      name='dep_kota_kab'
                      id='dep_kota_kab'
                      control={control}
                      defaultValue={store.selectedDepartemen.dep_kota_kab ?? ''}
                      invalid={data !== null && (data.dep_kota_kab === undefined || data.dep_kota_kab === null)}
                      render={({value, onChange}) => {

                        return regencys.data.length > 0 ? (
                          <Input 
                            onChange={(e) => {
                              onChange(e.target.value)
                              onChangeRegency(e.target.value)
                            }}
                            type="select"
                            defaultValue={value}
                          >
                            <option value={''}>Select...</option>
                            { regencys.data.map((data, key) => {
                                return (
                                  <option value={data.globalRegencies.id} key={key}>{data.globalRegencies.name}</option>
                                )
                              })
                            }
                          </Input> 
                        ) : <Input type="input" placeholder="Select..." disabled/>
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_kecamatan'><FormattedMessage id='District'/></Label>
                    <Controller
                      name='dep_kecamatan'
                      id='dep_kecamatan'
                      control={control}
                      defaultValue={store.selectedDepartemen.dep_kecamatan ?? ''}
                      invalid={data !== null && (data.dep_kecamatan === undefined || data.dep_kecamatan === null)}
                      render={({value, onChange}) => {
                        return districts.data.length > 0 ? (
                          <Input 
                            onChange={(e) => {
                              onChange(e.target.value)
                            }}
                            type="select"
                            defaultValue={value}
                          >
                            <option value={''}>Select...</option>
                            { districts.data.map((data, key) => {
                                return (
                                  <option value={data.globalDistricts.id} key={key}>{data.globalDistricts.name}</option>
                                )
                              })
                            }
                          </Input>
                        ) : <Input type="input" placeholder="Select..." disabled/>
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_notlp'>No. Telp</Label>
                    <Input
                      id='dep_notlp'
                      name='dep_notlp'
                      defaultValue={store.selectedDepartemen.dep_notlp}
                      placeholder='No. Telp'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.dep_notlp
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_email'>Email</Label>
                    <Input
                      id='dep_email'
                      name='dep_email'
                      defaultValue={store.selectedDepartemen.dep_email}
                      placeholder='Email'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.dep_email
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_website'>Website</Label>
                    <Input
                      id='dep_website'
                      name='dep_website'
                      defaultValue={store.selectedDepartemen.dep_website}
                      placeholder='Website'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.dep_website
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_img_logo'>Logo</Label>
                    <Input
                      id='dep_img_logo'
                      name='dep_img_logo'
                      defaultValue={store.selectedDepartemen.dep_img_logo}
                      placeholder='Logo'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.dep_img_logo
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_status'>Status</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='dep_status'
                      id='dep_status'
                      control={control}
                      defaultValue={store.selectedDepartemen.dep_status}
                      invalid={data !== null && (data.dep_status === undefined || data.dep_status === null)}
                    >
                      <option value='A'>Active</option>
                      <option value='D'>Deactive</option>
                    </Controller>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/master/departemen/list'>
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
                    <span className='align-middle'><FormattedMessage id='Add'/> Departemen</span>
                  </h4>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_name'><FormattedMessage id='Name'/></Label>
                    <Input
                      id='dep_name'
                      name='dep_name'
                      placeholder={intl.formatMessage({id: 'Name'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.dep_name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_address'><FormattedMessage id='Address'/></Label>
                    <Input
                      id='dep_address'
                      name='dep_address'
                      placeholder={intl.formatMessage({id: 'Address'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.dep_address
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_provinsi'><FormattedMessage id='Region'/></Label>
                    <Controller
                      name='dep_provinsi'
                      id='dep_provinsi'
                      control={control}
                      defaultValue={''}
                      invalid={data !== null && (data.dep_provinsi === undefined || data.dep_provinsi === null)}
                      render={({value, onChange}) => {
                        return regions.data.length > 0 ? (
                          <Input 
                            onChange={(e) => {
                              onChange(e.target.value)
                              onChangeRegion(e.target.value)
                            }}
                            type="select"
                            defaultValue={value}
                          >
                            <option value={''}>Select...</option>
                            { regions.data.map((data, key) => {
                                return (
                                  <option value={data.id} key={key}>{data.name}</option>
                                )
                              })
                            }
                          </Input>
                        ) : <Input type="input" placeholder="Select..." disabled/>
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_kota_kab'><FormattedMessage id='Regency'/></Label>
                    <Controller
                      name='dep_kota_kab'
                      id='dep_kota_kab'
                      control={control}
                      defaultValue={''}
                      invalid={data !== null && (data.dep_kota_kab === undefined || data.dep_kota_kab === null)}
                      render={({value, onChange}) => {
                        return regencys.data.length > 0 ? (
                          <Input 
                            onChange={(e) => {
                              onChange(e.target.value)
                              onChangeRegency(e.target.value)
                            }}
                            type="select"
                            defaultValue={value}
                          >
                            <option value={''}>Select...</option>
                            { regencys.data.map((data, key) => {
                                return (
                                  <option value={data.globalRegencies.id} key={key}>{data.globalRegencies.name}</option>
                                )
                              })
                            }
                          </Input>
                        ) : <Input type="input" placeholder="Select..." disabled/>
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_kecamatan'><FormattedMessage id='District'/></Label>
                    <Controller
                      name='dep_kecamatan'
                      id='dep_kecamatan'
                      control={control}
                      defaultValue={''}
                      invalid={data !== null && (data.dep_kecamatan === undefined || data.dep_kecamatan === null)}
                      render={({value, onChange}) => {
                        return districts.data.length > 0 ? (
                          <Input 
                            onChange={(e) => {
                              onChange(e.target.value)
                            }}
                            type="select"
                            defaultValue={value}
                          >
                            <option value={null}>Select...</option>
                            { districts.data.map((data, key) => {
                                return (
                                  <option value={data.globalDistricts.id} key={key}>{data.globalDistricts.name}</option>
                                )
                              })
                            }
                          </Input>
                        ) : <Input type="input" placeholder="Select..." disabled/>
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_notlp'>No. Telp</Label>
                    <Input
                      id='dep_notlp'
                      name='dep_notlp'
                      placeholder='No. Telp'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.dep_notlp
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_email'>Email</Label>
                    <Input
                      id='dep_email'
                      name='dep_email'
                      placeholder='Email'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.dep_email
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_website'>Website</Label>
                    <Input
                      id='dep_website'
                      name='dep_website'
                      placeholder='Website'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.dep_website
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_img_logo'>Logo</Label>
                    <Input
                      id='dep_img_logo'
                      name='dep_img_logo'
                      placeholder='Logo'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.dep_img_logo
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='dep_status'>Status</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='dep_status'
                      id='dep_status'
                      control={control}
                      defaultValue="A"
                      invalid={data !== null && (data.dep_status === undefined || data.dep_status === null)}
                    >
                      <option value='A'>Active</option>
                      <option value='D'>Deactive</option>
                    </Controller>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/master/departemen/list'>
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
export default DepartemenSave
