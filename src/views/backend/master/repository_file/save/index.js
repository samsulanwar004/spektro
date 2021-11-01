// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addRepository } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

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

const RepositorySave = () => {
  // ** States & Vars
  const store = useSelector(state => state.repositorys),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl()

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
      const linkLogo = `${process.env.REACT_APP_BASE_URL}${store.selected.path}`
      setLogo({...logo, link: linkLogo})
    }
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/master/repository_file/list")
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
        datas.append('id_repository', id)
      }

      datas.append('doc', logo.file)
      datas.append('category', data.category)

      dispatch(addRepository(datas))
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
                    <span className='align-middle'>Edit Repository Doc</span>
                  </h4>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='category'><FormattedMessage id='Category'/></Label>
                    <Input
                      id='category'
                      name='category'
                      defaultValue={store.selected.category}
                      placeholder={intl.formatMessage({id: 'Category'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.category
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='file'>File</Label>
                    <Input type='file' onChange={onChangeLogo} />
                  </FormGroup>
                  {logo.link && !logo.link.includes("application") && logo.file &&
                    <Media>
                      <Media className='mr-25' left>
                        <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Generic placeholder image' height='100' width='100' />
                      </Media>
                    </Media>
                  }
                  {['jpeg', 'jpg', 'png', 'gif'].includes(store.selected.type) && !logo.file ? (<Media>
                      <Media className='mr-25' left>
                        <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Generic placeholder image' height='100' width='100' />
                      </Media>
                    </Media>) : (logo.file ? '' : <a href={`${process.env.REACT_APP_BASE_URL}${store.selected.path}`} target='_blank'><p>{store.selected.filename}</p></a>)}
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/master/repository_file/list'>
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
                    <span className='align-middle'><FormattedMessage id='Add'/> Repository Doc</span>
                  </h4>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='category'><FormattedMessage id='Category'/></Label>
                    <Input
                      id='category'
                      name='category'
                      placeholder={intl.formatMessage({id: 'Category'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.category
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='file'>File</Label>
                    <Input type='file' onChange={onChangeLogo} />
                  </FormGroup>
                  {logo.link && !logo.link.includes("application") &&
                    <Media>
                      <Media className='mr-25' left>
                        <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Generic placeholder image' height='100' width='100' />
                      </Media>
                    </Media>
                  }
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/master/repository_file/list'>
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
export default RepositorySave
