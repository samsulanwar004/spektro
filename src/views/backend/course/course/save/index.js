// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addCourse } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataSurvey } from '@src/views/backend/master/survey/store/action'
import { getAllDataCertificate } from '@src/views/backend/master/certificate/store/action'

// ** Third Party Components
import { User, Info, Share2, MapPin, Check, X, Plus} from 'react-feather'
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
import ReactSummernote from 'react-summernote'

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
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-id-ID'

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'

const GlobalParamSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.courses),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl(),
    surveys = useSelector(state => state.surveys),
    certificates = useSelector(state => state.certificates)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  // ** State
  const [data, setData] = useState(null)
  const [selectedSurvey, setSelectedSurvey] = useState({value: '', label: 'Select...'})
  const [selectedCertificate, setSelectedCertificate] = useState({value: '', label: 'Select...'})
  const [topik, setTopik] = useState([
    {
      id_topik: ''
    }
  ])
  const [logo, setLogo] = useState({file: null, link: null})
  const [file, setFile] = useState({file: null, link: null})
  const [editor, setEditor] = useState(null)
  const status = ['Publish', 'Draft']

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount
  useEffect(() => {

    if (store.selected !== null && store.selected !== undefined) {

      const linkLogo = `${process.env.REACT_APP_BASE_URL}${store.selected.content_preview_image}` 
      setLogo({...logo, link: linkLogo})
      const linkFile = `${process.env.REACT_APP_BASE_URL}${store.selected.content_preview_video}`
      setFile({...file, link: linkFile})

      setSelectedSurvey(store.selected.id_survey)
      setSelectedCertificate(store.selected.id_certificate)
      setEditor(store.selected.desc)
      setTopik(store.selected.topik)
    }

    dispatch(getAllDataSurvey())
    dispatch(getAllDataCertificate())

    $('.modal-title').remove()
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/course/course/list")
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
      const datas = new FormData()
      
      if (id) {
        datas.append('id_course', id)
      }

      datas.append('content_preview_image', logo.file)
      datas.append('content_preview_video', file.file)
      datas.append('desc', editor)
      datas.append('topik', JSON.stringify(topik))
      datas.append('id_certificate', JSON.stringify(selectedCertificate))
      datas.append('id_survey', JSON.stringify(selectedSurvey))
      datas.append('course', data.course)
      datas.append('code_course', data.code_course)
      datas.append('duration', data.duration)
      datas.append('estimated', data.estimated)
      datas.append('status', data.status)

      dispatch(addCourse(datas))
    }
  }

  const handleDelete = (key) => {
    let oldTopik = topik
    oldTopik = oldTopik.filter((d, k) => k !== key)
    setTopik(oldTopik)
  }

  const handleTextValue = (key, name, value) => {
    let oldTopik = topik
    oldTopik = oldTopik.map((d, k) => {
      if (k === key) {
        d[name] = value
      }
      return d
    })

    setTopik(oldTopik)
  }

  const handleAdd = () => {
    let oldTopik = topik

    oldTopik = oldTopik.concat({
      id_topik: ''
    })

    setTopik(oldTopik)
  }

  const onChangeFile = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function (e) {
      const blobURL = URL.createObjectURL(files[0])
      setFile({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
  }

  const onChangeLogo = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setLogo({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
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
                    <span className='align-middle'>Edit Course</span>
                  </h4>
                </Col>
                {store.progress &&
                  <Col sm='12'>
                    <Progress value={store.progress}>{`${store.progress}%`}</Progress>
                  </Col>
                }
                <Col sm='4'>
                  <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Spektro Logo' onError={() => setLogo({...logo, link: logoDefault})} height='100' width='100' />
                    </Media>
                    <Media className='mt-75 ml-1' body>
                      <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                        Upload image preview
                        <Input type='file' onChange={onChangeLogo} hidden accept='image/*' />
                      </Button.Ripple>
                      <Button.Ripple style={{marginBottom: '4px'}} color='secondary' size='sm' outline onClick={() => setLogo({file: null, link: null})}>
                        Reset
                      </Button.Ripple>
                      <p>Allowed JPG or PNG. Max size of 1MB</p>
                    </Media>
                  </Media>
                </Col>
                <Col sm='6'>
                  <Media>
                    <Media className='mr-25' left>

                      {file.file ? (
                        <video width="300" controls>
                          <source src={file.link}/>
                        </video>) : (<Media object className='rounded mr-50' src={logoDefault} alt='video' height='100' width='100' />)
                      }
                    </Media>
                    <Media className='mt-75 ml-1' body>
                      <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                        Upload video preview
                        <Input type='file' accept="video/mp4,video/x-m4v,video/*" hidden onChange={onChangeFile} />
                      </Button.Ripple>
                      <Button.Ripple style={{marginBottom: '4px'}} color='secondary' size='sm' outline onClick={() => setFile({file: null, link: null})}>
                        Reset
                      </Button.Ripple>
                      <p>Allowed MP4</p>
                    </Media>
                  </Media>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='code_course'>Kode Course</Label>
                    <Input
                      id='code_course'
                      name='code_course'
                      defaultValue={store.selected.code_course}
                      placeholder='Code course'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.code_course
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='9' md='6'>
                  <FormGroup>
                    <Label for='course'>Nama Course</Label>
                    <Input
                      id='course'
                      name='course'
                      defaultValue={store.selected.course}
                      placeholder='Nama course'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.course
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='duration'><FormattedMessage id='Duration'/></Label>
                    <Input
                      id='duration'
                      name='duration'
                      defaultValue={store.selected.duration}
                      placeholder={intl.formatMessage({id: 'Duration'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.duration
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='estimated'><FormattedMessage id='Estimated'/></Label>
                    <Input
                      id='estimated'
                      name='estimated'
                      defaultValue={store.selected.estimated}
                      placeholder={intl.formatMessage({id: 'Estimated'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.estimated
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='id_survey'>Survey</Label>
                    <Controller
                      name='id_survey'
                      id='id_survey'
                      control={control}
                      invalid={data !== null && (data.id_survey === undefined || data.id_survey === null)}
                      defaultValue={selectedSurvey}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={surveys.allData.map(r => {
                              return {
                                value: r.id_survey,
                                label: r.name_survey
                              }
                            })}
                            value={selectedSurvey}
                            onChange={data => {
                              onChange(data)
                              setSelectedSurvey(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='id_certificate'>Certificate</Label>
                    <Controller
                      name='id_certificate'
                      id='id_certificate'
                      control={control}
                      invalid={data !== null && (data.id_certificate === undefined || data.id_certificate === null)}
                      defaultValue={selectedCertificate}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={certificates.allData.map(r => {
                              return {
                                value: r.id_certificate,
                                label: r.name
                              }
                            })}
                            value={selectedCertificate}
                            onChange={data => {
                              onChange(data)
                              setSelectedCertificate(data)
                            }}
                          />
                        )
                      }}
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
                      {status.map((data, key) => {
                        return (<option value={data} key={key}>{data}</option>)
                      })}
                    </Controller>
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <ReactSummernote
                    value={editor}
                    options={{
                      lang: 'id-ID',
                      height: 350,
                      dialogsInBody: true,
                      toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['fontname', ['fontname']],
                        ['fontsize', ['fontsize']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture', 'video']]
                      ],
                      fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36', '48']
                    }}
                    onChange={setEditor}
                  />
                </Col>
                <Col sm='12'>
                  {topik.map((data, key) => {
                    return (
                      <Row className='align-items-center' key={key}>
                        <Col md={3}>
                          <FormGroup>
                            <Label for={`id_topik-${key}`}>Topik</Label>
                            <Select
                              id={`id_topik-${key}`}
                              theme={selectThemeColors}
                              isClearable={false}
                              className='react-select'
                              classNamePrefix='select'
                              options={[{label: 'Kebangsentralan', value: 1}, {label: 'Bank', value: 2}].map(r => {
                                return {
                                  label: r.label,
                                  value: r.value
                                }
                              })}
                              value={data.id_topik}
                              onChange={value => {
                                handleTextValue(key, 'id_topik', value)
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <Button.Ripple color='danger' className='text-nowrap px-1' style={{marginTop: '5px'}} onClick={() => handleDelete(key)} outline>
                            <X size={14} className='mr-50' />
                            <span>{intl.formatMessage({id: 'Delete'})}</span>
                          </Button.Ripple>
                        </Col>
                        <Col sm={12}>
                          <hr />
                        </Col>
                      </Row>
                    )
                  })}
                </Col>
                <Col md={12}>
                  <Button.Ripple className='btn-icon' color='success' onClick={() => handleAdd()}>
                    <Plus size={14} />
                    <span className='align-middle ml-25'>Topik</span>
                  </Button.Ripple>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/course/course/list'>
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
                    <span className='align-middle'><FormattedMessage id='Add'/> Course</span>
                  </h4>
                </Col>
                {store.progress &&
                  <Col sm='12'>
                    <Progress value={store.progress}>{`${store.progress}%`}</Progress>
                  </Col>
                }
                <Col sm='4'>
                  <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Spektro Logo' height='100' width='100' />
                    </Media>
                    <Media className='mt-75 ml-1' body>
                      <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                        Upload image preview
                        <Input type='file' onChange={onChangeLogo} hidden accept='image/*' />
                      </Button.Ripple>
                      <Button.Ripple style={{marginBottom: '4px'}} color='secondary' size='sm' outline onClick={() => setLogo({file: null, link: null})}>
                        Reset
                      </Button.Ripple>
                      <p>Allowed JPG or PNG. Max size of 1MB</p>
                    </Media>
                  </Media>
                </Col>
                <Col sm='6'>
                  <Media>
                    <Media className='mr-25' left>

                      {file.file ? (
                        <video width="300" controls>
                          <source src={file.link}/>
                        </video>) : (<Media object className='rounded mr-50' src={logoDefault} alt='video' height='100' width='100' />)
                      }
                    </Media>
                    <Media className='mt-75 ml-1' body>
                      <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                        Upload video preview
                        <Input type='file' accept="video/mp4,video/x-m4v,video/*" hidden onChange={onChangeFile} />
                      </Button.Ripple>
                      <Button.Ripple style={{marginBottom: '4px'}} color='secondary' size='sm' outline onClick={() => setFile({file: null, link: null})}>
                        Reset
                      </Button.Ripple>
                      <p>Allowed MP4</p>
                    </Media>
                  </Media>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='code_course'>Kode Course</Label>
                    <Input
                      id='code_course'
                      name='code_course'
                      placeholder='Code course'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.code_course
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='9' md='6'>
                  <FormGroup>
                    <Label for='course'>Nama Course</Label>
                    <Input
                      id='course'
                      name='course'
                      placeholder='Nama course'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.course
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='duration'><FormattedMessage id='Duration'/></Label>
                    <Input
                      id='duration'
                      name='duration'
                      placeholder={intl.formatMessage({id: 'Duration'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.duration
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='estimated'><FormattedMessage id='Estimated'/></Label>
                    <Input
                      id='estimated'
                      name='estimated'
                      placeholder={intl.formatMessage({id: 'Estimated'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.estimated
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='id_survey'>Survey</Label>
                    <Controller
                      name='id_survey'
                      id='id_survey'
                      control={control}
                      invalid={data !== null && (data.id_survey === undefined || data.id_survey === null)}
                      defaultValue={selectedSurvey}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={surveys.allData.map(r => {
                              return {
                                value: r.id_survey,
                                label: r.name_survey
                              }
                            })}
                            value={selectedSurvey}
                            onChange={data => {
                              onChange(data)
                              setSelectedSurvey(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='id_certificate'>Certificate</Label>
                    <Controller
                      name='id_certificate'
                      id='id_certificate'
                      control={control}
                      invalid={data !== null && (data.id_certificate === undefined || data.id_certificate === null)}
                      defaultValue={selectedCertificate}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={certificates.allData.map(r => {
                              return {
                                value: r.id_certificate,
                                label: r.name
                              }
                            })}
                            value={selectedCertificate}
                            onChange={data => {
                              onChange(data)
                              setSelectedCertificate(data)
                            }}
                          />
                        )
                      }}
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
                      defaultValue={'Publish'}
                      invalid={data !== null && (data.status === undefined || data.status === null)}
                    >
                      {status.map((data, key) => {
                        return (<option value={data} key={key}>{data}</option>)
                      })}
                    </Controller>
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <ReactSummernote
                    value={editor}
                    options={{
                      lang: 'id-ID',
                      height: 350,
                      dialogsInBody: true,
                      toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['fontname', ['fontname']],
                        ['fontsize', ['fontsize']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture', 'video']]
                      ],
                      fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36', '48']
                    }}
                    onChange={setEditor}
                  />
                </Col>
                <Col sm='12'>
                  {topik.map((data, key) => {
                    return (
                      <Row className='align-items-center' key={key}>
                        <Col md={3}>
                          <FormGroup>
                            <Label for={`id_topik-${key}`}>Topik</Label>
                            <Select
                              id={`id_topik-${key}`}
                              theme={selectThemeColors}
                              isClearable={false}
                              className='react-select'
                              classNamePrefix='select'
                              options={[{label: 'Kebangsentralan', value: 1}, {label: 'Bank', value: 2}].map(r => {
                                return {
                                  label: r.label,
                                  value: r.value
                                }
                              })}
                              value={data.id_topik}
                              onChange={value => {
                                handleTextValue(key, 'id_topik', value)
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <Button.Ripple color='danger' className='text-nowrap px-1' style={{marginTop: '5px'}} onClick={() => handleDelete(key)} outline>
                            <X size={14} className='mr-50' />
                            <span>{intl.formatMessage({id: 'Delete'})}</span>
                          </Button.Ripple>
                        </Col>
                        <Col sm={12}>
                          <hr />
                        </Col>
                      </Row>
                    )
                  })}
                </Col>
                <Col md={12}>
                  <Button.Ripple className='btn-icon' color='success' onClick={() => handleAdd()}>
                    <Plus size={14} />
                    <span className='align-middle ml-25'>Topik</span>
                  </Button.Ripple>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/course/course/list'>
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
