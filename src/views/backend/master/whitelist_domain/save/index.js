// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addWhitelistDomain } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataGlobalParam } from '@src/views/backend/master/global_param/store/action'

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

const GlobalParamSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.whitelistdomains),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl(),
    globalparams = useSelector(state => state.globalparams)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  // ** State
  const [data, setData] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState({label: 'Select...', value: ''})

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount
  useEffect(() => {
    if (store.selected !== null && store.selected !== undefined) {

      const selectCategory = {
        value: store.selected.category,
        label: store.selected.category
      }

      setSelectedCategory(selectCategory)
    } 

    dispatch(getAllDataGlobalParam({
      key: 'CAT_WL_DOMAIN'
    }))
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/master/whitelist_domain/list")
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
        data.wl_id  = id
      }

      data.category = selectedCategory.value

      dispatch(addWhitelistDomain(data))
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
                    <span className='align-middle'>Edit Whitelist Domain</span>
                  </h4>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='category'>{intl.formatMessage({id: 'Category'})}</Label>
                    <Controller
                      name='category'
                      id='category'
                      control={control}
                      invalid={data !== null && (data.category === undefined || data.category === null)}
                      defaultValue={selectedCategory}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={globalparams.allData.map(r => {
                              return {
                                value: r.param_value,
                                label: r.param_value
                              }
                            })}
                            value={selectedCategory}
                            onChange={data => {
                              onChange(data)
                              setSelectedCategory(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='8' md='6'>
                  <FormGroup>
                    <Label for='name'>{intl.formatMessage({id: 'Name'})}</Label>
                    <Input
                      id='name'
                      name='name'
                      defaultValue={store.selected.name}
                      placeholder={intl.formatMessage({id: 'Name'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='domain'>Domain</Label>
                    <Input
                      id='domain'
                      name='domain'
                      defaultValue={store.selected.domain}
                      placeholder='Domain'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.domain
                      })}
                    />
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
                      defaultValue={store.selected.status}
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
                  <Link to='/master/whitelist_domain/list'>
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
                    <span className='align-middle'><FormattedMessage id='Add'/> Whitelist Domain</span>
                  </h4>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='category'>{intl.formatMessage({id: 'Category'})}</Label>
                    <Controller
                      name='category'
                      id='category'
                      control={control}
                      invalid={data !== null && (data.category === undefined || data.category === null)}
                      defaultValue={selectedCategory}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={globalparams.allData.map(r => {
                              return {
                                value: r.param_value,
                                label: r.param_value
                              }
                            })}
                            value={selectedCategory}
                            onChange={data => {
                              onChange(data)
                              setSelectedCategory(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='8' md='6'>
                  <FormGroup>
                    <Label for='name'>{intl.formatMessage({id: 'Name'})}</Label>
                    <Input
                      id='name'
                      name='name'
                      placeholder={intl.formatMessage({id: 'Name'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='domain'>Domain</Label>
                    <Input
                      id='domain'
                      name='domain'
                      placeholder='Domain'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.domain
                      })}
                    />
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
                  <Link to='/master/whitelist_domain/list'>
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
export default GlobalParamSave
