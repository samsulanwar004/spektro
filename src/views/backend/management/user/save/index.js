// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addUser } from '../store/action'
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

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { isObjEmpty } from '@utils'

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
    employees = useSelector(state => state.employees),
    roles = useSelector(state => state.roles),
    departemens = useSelector(state => state.departemens),
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
    dispatch(getAllDataEmployee())
    dispatch(getAllDataRole())
    dispatch(getAllDataDepartemen())
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
      }

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
                    <Label for='username'>Username</Label>
                    <Input
                      id='username'
                      name='username'
                      defaultValue={store.selectedUser.appResource?.username}
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
                    <Label for='password'>Password</Label>
                    <Input
                      id='password'
                      name='password'
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
                    <Label for='type'><FormattedMessage id='Type'/></Label>
                    <Input
                      id='type'
                      name='type'
                      defaultValue={store.selectedUser.appResource?.type}
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
                    <Label for='dep_id'><FormattedMessage id='Site'/></Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='dep_id'
                      id='dep_id'
                      control={control}
                      defaultValue={store.selectedUser.appResource?.dep_id ?? ''}
                      invalid={data !== null && (data.dep_id === undefined || data.dep_id === null)}
                    >
                      <option value={''}>Select...</option>
                      { departemens.allData.map((data, key) => {
                          return (
                            <option value={data.dep_id} key={key}>{data.dep_name}</option>
                          )
                        })
                      }
                    </Controller>
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='emp_id'><FormattedMessage id='Employee'/></Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='emp_id'
                      id='emp_id'
                      control={control}
                      defaultValue={store.selectedUser.appResource?.emp_id ?? ''}
                      invalid={data !== null && (data.emp_id === undefined || data.emp_id === null)}
                    >
                    <option value={''}>Select...</option>
                      { employees.allData.map((data, key) => {
                          return (
                            <option value={data.hrEmployee.emp_id} key={key}>{data.hrEmployee.emp_name}</option>
                          )
                        })
                      }
                    </Controller>
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='role_id'>Role</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='role_id'
                      id='role_id'
                      control={control}
                      defaultValue={store.selectedUser.appResource?.role_id ?? ''}
                      invalid={data !== null && (data.role_id === undefined || data.role_id === null)}
                    >
                      <option value={''}>Select...</option>
                      { roles.allData.map((data, key) => {
                          return (
                            <option value={data.role_id} key={key}>{data.role_name}</option>
                          )
                        })
                      }
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
                    <Label for='password'>Password</Label>
                    <Input
                      id='password'
                      name='password'
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
                    <Label for='dep_id'><FormattedMessage id='Site'/></Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='dep_id'
                      id='dep_id'
                      control={control}
                      defaultValue=''
                      invalid={data !== null && (data.dep_id === undefined || data.dep_id === null)}
                    >
                      <option value={''}>Select...</option>
                      { departemens.allData.map((data, key) => {
                          return (
                            <option value={data.dep_id} key={key}>{data.dep_name}</option>
                          )
                        })
                      }
                    </Controller>
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='emp_id'><FormattedMessage id='Employee'/></Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='emp_id'
                      id='emp_id'
                      control={control}
                      defaultValue=''
                      invalid={data !== null && (data.emp_id === undefined || data.emp_id === null)}
                    >
                      <option value={''}>Select...</option>
                      { employees.allData.map((data, key) => {
                          return (
                            <option value={data.hrEmployee.emp_id} key={key}>{data.hrEmployee.emp_name}</option>
                          )
                        })
                      }
                    </Controller>
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='role_id'>Role</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='role_id'
                      id='role_id'
                      control={control}
                      defaultValue=''
                      invalid={data !== null && (data.role_id === undefined || data.role_id === null)}
                    >
                      <option value={''}>Select...</option>
                      { roles.allData.map((data, key) => {
                          return (
                            <option value={data.role_id} key={key}>{data.role_name}</option>
                          )
                        })
                      }
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
