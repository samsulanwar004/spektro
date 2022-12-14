// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addMaterial } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataWhitelistDomain} from '@src/views/backend/master/whitelist_domain/store/action'
import { getAllDataGlobalParam, uploadImage } from '@src/views/backend/master/global_param/store/action'

// ** Third Party Components
import { User, Info, Share2, MapPin, Check, X } from 'react-feather'
import { Card, CardBody, Row, Col, Alert, Button, Label, FormGroup, Input, CustomInput, Form, Media, Progress } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import Select from 'react-select'
import logoDefault from '@src/assets/images/avatars/picture-blank.png'
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

const MaterialSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.materials),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl(),
    globalparams = useSelector(state => state.globalparams),
    whitelistdomains = useSelector(state => state.whitelistdomains)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  // ** State
  const [data, setData] = useState(null)
  const [logo, setLogo] = useState({file: null, link: null})
  const [file, setFile] = useState({file: null, link: null})
  const [selectedCategory, setSelectedCategory] = useState({label: 'Select...', value: ''})
  const [selectedUniversity, setSelectedUniversity] = useState({label: 'Select...', value: ''})
  const [shortDesc, setShortDesc] = useState('')
  const [editor, setEditor] = useState('')
  const status = ['Publish', 'Draft']

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount
  useEffect(() => {

    if (store.selected !== null && store.selected !== undefined) {

      const linkLogo = `${process.env.REACT_APP_BASE_URL}${store.selected.image_banner}`
      setLogo({...logo, link: linkLogo})
      setSelectedCategory({label: store.selected.category, value: store.selected.category})
      setSelectedUniversity({label: store.selected.institusi, value: store.selected.institusi})
      setShortDesc(store.selected.sort_desc)
      setEditor(store.selected.desc)
    } 

    dispatch(getAllDataWhitelistDomain())
    dispatch(getAllDataGlobalParam({key: 'CAT_MATERIALS'}))
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/course/material/list")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
  }, [store.loading])

  useEffect(() => {
    if (globalparams.upload) {
      ReactSummernote.insertImage(`${process.env.REACT_APP_BASE_URL}${globalparams.upload}`, $image => {
        $image.css("width", Math.floor($image.width() / 2))
        $image.attr("alt", 'Spektro')
      })
    }
  }, [globalparams.upload])

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

  const onChangeFile = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      setFile({file: files[0], link: null})
    }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)
      const datas = new FormData()
      
      if (id) {
        datas.append('id_materials', id)
      }

      datas.append('image_banner', logo.file)
      datas.append('title', data.title)
      datas.append('status', data.status)
      datas.append('hashtag', data.hashtag)
      datas.append('institusi', selectedUniversity.value)
      datas.append('category', selectedCategory.value)
      datas.append('sort_desc', shortDesc)
      datas.append('desc', editor)
      datas.append('attach_file', file.file)

      dispatch(addMaterial(datas))
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
                    <span className='align-middle'>Edit Material</span>
                  </h4>
                </Col>
                {store.progress &&
                  <Col sm='12'>
                    <Progress value={store.progress}>{`${store.progress}%`}</Progress>
                  </Col>
                }
                <Col sm='12'>
                  <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} onError={() => setLogo({...logo, link: logoDefault})} alt='Spektro image' width='100' />
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
                    <Label for='title'><FormattedMessage id='Title'/></Label>
                    <Input
                      id='title'
                      name='title'
                      defaultValue={store.selected.title}
                      placeholder={intl.formatMessage({id: 'Title'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.title
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='institusi'>Institusi</Label>
                    <Controller
                      name='institusi'
                      id='institusi'
                      control={control}
                      invalid={data !== null && (data.institusi === undefined || data.institusi === null)}
                      defaultValue={selectedUniversity}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={whitelistdomains.allData.map(r => {
                              return {
                                value: r.name,
                                label: r.name
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
                    <Label for='category'>Category</Label>
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
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='file'>Attach File</Label>
                    <Input type='file' onChange={onChangeFile} />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='hashtag'>Hashtag</Label>
                    <Input
                      id='hashtag'
                      name='hashtag'
                      defaultValue={store.selected.hashtag}
                      placeholder={'Hashtag'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.hashtag
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
                      {status.map((data, key) => {
                        return (<option value={data} key={key}>{data}</option>)
                      })}
                    </Controller>
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='short_desc'>Short Description</Label>
                    <ReactSummernote
                      value={shortDesc}
                      options={{
                        lang: 'id-ID',
                        height: 100,
                        dialogsInBody: true,
                        toolbar: [
                          ['style', ['style']],
                          ['font', ['bold', 'underline', 'clear']],
                          ['fontname', ['fontname']],
                          ['fontsize', ['fontsize']],
                          ['para', ['ul', 'ol', 'paragraph']],
                          ['table', ['table']]
                        ],
                        fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36', '48']
                      }}
                      onChange={setShortDesc}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='description'>Description</Label>
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
                      onImageUpload={(files) => {

                        const datas = new FormData()
                        datas.append('upload', files[0])
                        dispatch(uploadImage(datas))
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/course/material/list'>
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
                    <span className='align-middle'><FormattedMessage id='Add'/> Material</span>
                  </h4>
                </Col>
                {store.progress &&
                  <Col sm='12'>
                    <Progress value={store.progress}>{`${store.progress}%`}</Progress>
                  </Col>
                }
                <Col sm='12'>
                  <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Spektro image' width='100' />
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
                    <Label for='title'><FormattedMessage id='Title'/></Label>
                    <Input
                      id='title'
                      name='title'
                      placeholder={intl.formatMessage({id: 'Title'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.title
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='institusi'>Institusi</Label>
                    <Controller
                      name='institusi'
                      id='institusi'
                      control={control}
                      invalid={data !== null && (data.institusi === undefined || data.institusi === null)}
                      defaultValue={selectedUniversity}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={whitelistdomains.allData.map(r => {
                              return {
                                value: r.name,
                                label: r.name
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
                    <Label for='category'>Category</Label>
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
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='file'>Attach File</Label>
                    <Input type='file' onChange={onChangeFile} />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='hashtag'>Hashtag</Label>
                    <Input
                      id='hashtag'
                      name='hashtag'
                      placeholder={'Hashtag'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.hashtag
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
                  <FormGroup>
                    <Label for='short_desc'>Short Description</Label>
                    <ReactSummernote
                      value={shortDesc}
                      options={{
                        lang: 'id-ID',
                        height: 100,
                        dialogsInBody: true,
                        toolbar: [
                          ['style', ['style']],
                          ['font', ['bold', 'underline', 'clear']],
                          ['fontname', ['fontname']],
                          ['fontsize', ['fontsize']],
                          ['para', ['ul', 'ol', 'paragraph']],
                          ['table', ['table']]
                        ],
                        fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36', '48']
                      }}
                      onChange={setShortDesc}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='description'>Description</Label>
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
                      onImageUpload={(files) => {

                        const datas = new FormData()
                        datas.append('upload', files[0])
                        dispatch(uploadImage(datas))
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/course/material/list'>
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
export default MaterialSave
