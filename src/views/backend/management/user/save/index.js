// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addUser } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataRole } from '@src/views/backend/management/role/store/action'
import { getAllDataUniversity } from '@src/views/backend/master/universitas/store/action'
import { getAllDataSatker } from '@src/views/backend/master/satker/store/action'

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
import Select from 'react-select'

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
  const store = useSelector(state => state.users),
    dispatch = useDispatch(),
    { id } = useParams(),
    roles = useSelector(state => state.roles),
    satkers = useSelector(state => state.satkers),
    universitys = useSelector(state => state.universitys),
    intl = useIntl()

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm({
    defaultValues: { gender: 'gender-female', dob: null }
  })

  // ** State
  const [data, setData] = useState(null)
  const [selectedRole, setSelectedRole] = useState({value: '', label: 'Select...'})
  const [selectedUniversity, setSelectedUniversity] = useState({value: '', label: 'Select...'})
  const [selectedSatker, setSelectedSatker] = useState({value: '', label: 'Select...'})

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount

  useEffect(() => {

    if (store.selectedUser !== null && store.selectedUser !== undefined) {

      const selectRole = {
        value: store.selectedUser.role_id,
        label: store.selectedUser.role_name
      }

      const selectUniversity = {
        value: store.selectedUser.id_universitas,
        label: store.selectedUser.universitas
      }

      const selectSatker = {
        value: store.selectedUser.id_satker,
        label: store.selectedUser.satker
      }

      setSelectedRole(selectRole)
      setSelectedUniversity(selectUniversity)
      setSelectedSatker(selectSatker)
    }

    dispatch(getAllDataRole())
    dispatch(getAllDataUniversity())
    dispatch(getAllDataSatker())
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/management/user/list")
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
        data.resource_id = id

        if (data.password === '') {
          delete data.password
        }
      }

      data.id_universitas = data.id_universitas.value
      data.role_id = data.role_id.value
      data.id_satker = data.id_satker.value

      dispatch(addUser(data))
    }
  }

  return store.selectedUser !== null && store.selectedUser !== undefined ? (
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
                    <span className='align-middle'>Edit User</span>
                  </h4>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='name'>Name</Label>
                    <Input
                      id='name'
                      name='name'
                      defaultValue={store.selectedUser.full_name}
                      placeholder='Name'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input
                      id='username'
                      name='username'
                      defaultValue={store.selectedUser.username}
                      placeholder='Username'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.username
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
                      defaultValue={store.selectedUser.email}
                      placeholder='Email'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.email
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input
                      id='password'
                      name='password'
                      type='password'
                      placeholder='Password'
                      innerRef={register({ required: !id })}
                      className={classnames({
                        'is-invalid': errors.password
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='telepon'>Telepon</Label>
                    <Input
                      id='telepon'
                      name='telepon'
                      defaultValue={store.selectedUser.telepon}
                      placeholder='Telepon'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.telepon
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='type'><FormattedMessage id='Type'/></Label>
                    <Input
                      id='type'
                      name='type'
                      defaultValue={store.selectedUser.type}
                      placeholder={intl.formatMessage({id: 'Type'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.type
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='role_id'>Role</Label>
                    <Controller
                      name='role_id'
                      id='role_id'
                      control={control}
                      invalid={data !== null && (data.role_id === undefined || data.role_id === null)}
                      defaultValue={{value: store.selectedUser?.role_id, label: store.selectedUser?.role_name}}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={roles.allData.map(r => {
                              return {
                                value: r.role_id,
                                label: r.role_name
                              }
                            })}
                            value={selectedRole}
                            onChange={data => {
                              onChange(data)
                              setSelectedRole(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='id_universitas'>Universitas</Label>
                    <Controller
                      name='id_universitas'
                      id='id_universitas'
                      control={control}
                      invalid={data !== null && (data.id_universitas === undefined || data.id_universitas === null)}
                      defaultValue={{value: store.selectedUser?.id_universitas, label: store.selectedUser?.universitas}}
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
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='id_satker'>Satker</Label>
                    <Controller
                      name='id_satker'
                      id='id_satker'
                      control={control}
                      invalid={data !== null && (data.id_satker === undefined || data.id_satker === null)}
                      defaultValue={{value: store.selectedUser?.id_satker, label: store.selectedUser?.satker}}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={satkers.allData.map(r => {
                              return {
                                value: r.id_satker,
                                label: r.satker
                              }
                            })}
                            value={selectedSatker}
                            onChange={data => {
                              onChange(data)
                              setSelectedSatker(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='default_language'>Default Language</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='default_language'
                      id='default_language'
                      control={control}
                      defaultValue={store.selectedUser.default_language}
                      invalid={data !== null && (data.default_language === undefined || data.default_language === null)}
                    >
                      <option value={''}>Select...</option>
                      <option value='ID'>Indonesia</option>
                      <option value='EN'>English</option>
                    </Controller>
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='status'>Status</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='status'
                      id='status'
                      control={control}
                      defaultValue={store.selectedUser.status}
                      invalid={data !== null && (data.status === undefined || data.status === null)}
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
                  <Link to='/management/user/list'>
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
                    <span className='align-middle'><FormattedMessage id='Add'/> User</span>
                  </h4>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='name'>Name</Label>
                    <Input
                      id='name'
                      name='name'
                      placeholder='Name'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input
                      id='username'
                      name='username'
                      placeholder='Username'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.username
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
                      placeholder='Email'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.email
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input
                      id='password'
                      name='password'
                      type='password'
                      placeholder='Password'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.password
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='telepon'>Telepon</Label>
                    <Input
                      id='telepon'
                      name='telepon'
                      placeholder='Telepon'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.telepon
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='type'><FormattedMessage id='Type'/></Label>
                    <Input
                      id='type'
                      name='type'
                      placeholder={intl.formatMessage({id: 'Type'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.type
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='role_id'>Role</Label>
                    <Controller
                      name='role_id'
                      id='role_id'
                      control={control}
                      invalid={data !== null && (data.role_id === undefined || data.role_id === null)}
                      defaultValue={selectedRole}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={roles.allData.map(r => {
                              return {
                                value: r.role_id,
                                label: r.role_name
                              }
                            })}
                            value={selectedRole}
                            onChange={data => {
                              onChange(data)
                              setSelectedRole(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='id_universitas'>Universitas</Label>
                    <Controller
                      name='id_universitas'
                      id='id_universitas'
                      control={control}
                      invalid={data !== null && (data.id_universitas === undefined || data.id_universitas === null)}
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
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='id_satker'>Satker</Label>
                    <Controller
                      name='id_satker'
                      id='id_satker'
                      control={control}
                      invalid={data !== null && (data.id_satker === undefined || data.id_satker === null)}
                      defaultValue={selectedSatker}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={satkers.allData.map(r => {
                              return {
                                value: r.id_satker,
                                label: r.satker
                              }
                            })}
                            value={selectedSatker}
                            onChange={data => {
                              onChange(data)
                              setSelectedSatker(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='default_language'>Default Language</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='default_language'
                      id='default_language'
                      control={control}
                      defaultValue={''}
                      invalid={data !== null && (data.default_language === undefined || data.default_language === null)}
                    >
                      <option value={''}>Select...</option>
                      <option value='ID'>Indonesia</option>
                      <option value='EN'>English</option>
                    </Controller>
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='status'>Status</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='status'
                      id='status'
                      control={control}
                      defaultValue={'A'}
                      invalid={data !== null && (data.status === undefined || data.status === null)}
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
                  <Link to='/management/user/list'>
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
