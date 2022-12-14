// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addBanner } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { uploadImage } from '@src/views/backend/master/global_param/store/action'
import { getAllDataRepository } from '@src/views/backend/master/repository_file/store/action'

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

const BannerSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.banners),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl(),
    globalparams = useSelector(state => state.globalparams),
    repositorys = useSelector(state => state.repositorys)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  // ** State
  const [data, setData] = useState(null)
  const [editor, setEditor] = useState('')
  const [logo, setLogo] = useState({file: null, link: null})

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount
  useEffect(() => {
    if (store.selected !== null && store.selected !== undefined) {

      const linkLogo = `${process.env.REACT_APP_BASE_URL}${store.selected.path_thumbnail}`
      setLogo({...logo, link: linkLogo})
      setEditor(store.selected.description)
    }

    dispatch(getAllDataRepository())

    $('.modal-title').remove()
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/content/banner/list")
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

    reader.onload = function (fileReaderEvent) {
      const blobURL = URL.createObjectURL(files[0])
      setLogo({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)

      const datas = new FormData()
      
      if (id) {
        datas.append('id_banner', id)
      }

      datas.append('title', data.title)
      datas.append('description', editor)
      datas.append('path_thumbnail', logo.file)
      datas.append('path_image', logo.file)
      datas.append('path_video', data.path_video)
      datas.append('link_url', data.link_url)
      datas.append('seq', data.seq)
      datas.append('status', data.status)

      dispatch(addBanner(datas))
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
                    <span className='align-middle'>Edit Banner</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Logo' onError={() => setLogo({...logo, link: logoDefault})} width='500' />
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
                <Col lg='11' md='8'>
                  <FormGroup>
                    <Label for='title'>Title</Label>
                    <Input
                      id='title'
                      name='title'
                      defaultValue={store.selected.title}
                      placeholder='Title'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.title
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='1' md='6'>
                  <FormGroup>
                    <Label for='seq'>Sequence</Label>
                    <Input
                      id='seq'
                      name='seq'
                      type='number'
                      defaultValue={store.selected.seq}
                      placeholder='Sequence'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.seq
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for={`file-select`}>File Video</Label>
                    <Select
                      id={`file-select`}
                      theme={selectThemeColors}
                      isClearable={false}
                      className='react-select'
                      classNamePrefix='select'
                      options={repositorys.allData.map(r => {
                        return {
                          label: r.filename,
                          value: `${process.env.REACT_APP_BASE_URL}${r.path}`
                        }
                      })}
                      onChange={value => {
                        setValue('path_video', value.value)
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='8' md='6'>
                  <FormGroup>
                    <Label for='path_video'>Url Video</Label>
                    <Input
                      id='path_video'
                      name='path_video'
                      defaultValue={store.selected.path_video}
                      placeholder='Url video'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.path_video
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='10' md='6'>
                  <FormGroup>
                    <Label for='link_url'>Url Link</Label>
                    <Input
                      id='link_url'
                      name='link_url'
                      defaultValue={store.selected.link_url}
                      placeholder='Url link'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.link_url
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='2' md='6'>
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
                      <option value='1'>Active</option>
                      <option value='0'>Deactive</option>
                    </Controller>
                  </FormGroup>
                </Col>
                <Col sm='12'>
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
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1' disabled={store.loading}>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/content/banner/list'>
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
                    <span className='align-middle'><FormattedMessage id='Add'/> Banner</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Logo' onError={() => setLogo({...logo, link: logoDefault})} width={logo.link ? '500' : '100'} />
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
                <Col lg='12'>
                  <FormGroup>
                    <Label for='title'>Title</Label>
                    <Input
                      id='title'
                      name='title'
                      placeholder='Title'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.title
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for={`file-select`}>File Video</Label>
                    <Select
                      id={`file-select`}
                      theme={selectThemeColors}
                      isClearable={false}
                      className='react-select'
                      classNamePrefix='select'
                      options={repositorys.allData.map(r => {
                        return {
                          label: r.filename,
                          value: `${process.env.REACT_APP_BASE_URL}${r.path}`
                        }
                      })}
                      onChange={value => {
                        setValue('path_video', value.value)
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='8' md='6'>
                  <FormGroup>
                    <Label for='path_video'>Url Video</Label>
                    <Input
                      id='path_video'
                      name='path_video'
                      placeholder='Url video'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.path_video
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='10' md='6'>
                  <FormGroup>
                    <Label for='link_url'>Url Link</Label>
                    <Input
                      id='link_url'
                      name='link_url'
                      placeholder='Url link'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.link_url
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='2' md='6'>
                  <FormGroup>
                    <Label for='status'>Status</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='status'
                      id='status'
                      control={control}
                      defaultValue={'1'}
                      invalid={data !== null && (data.status === undefined || data.status === null)}
                    >
                      <option value='1'>Active</option>
                      <option value='0'>Deactive</option>
                    </Controller>
                  </FormGroup>
                </Col>
                <Col sm='12'>
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
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1' disabled={store.loading}>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/content/banner/list'>
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
export default BannerSave
