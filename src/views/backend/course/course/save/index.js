// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addCourse } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataCertificate } from '@src/views/backend/course/certificate/store/action'
import { getAllDataGlobalParam, uploadImage } from '@src/views/backend/master/global_param/store/action'
import { getAllDataTopik} from '@src/views/backend/course/topik/store/action'
import { getAllDataWhitelistDomain } from '@src/views/backend/master/whitelist_domain/store/action'

// ** Third Party Components
import { User, Check, X, Plus} from 'react-feather'
import { Card, CardBody, Row, Col, Button, Label, FormGroup, Input, Form, Media, Progress } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import Select from 'react-select'
import logoDefault from '@src/assets/images/avatars/picture-blank.png'
import ReactSummernote from 'react-summernote'
import { ReactSortable } from 'react-sortablejs'

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

const CourseSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.courses),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl(),
    certificates = useSelector(state => state.certificates),
    globalparams = useSelector(state => state.globalparams),
    whitelistdomains = useSelector(state => state.whitelistdomains),
    topiks = useSelector(state => state.topiks)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  // ** State
  const [data, setData] = useState(null)
  const [selectedCertificate, setSelectedCertificate] = useState({value: '', label: 'Select...'})
  const [selectedInstansi, setSelectedInstansi] = useState({value: '', label: 'Select...'})
  const [selectedCategory, setSelectedCategory] = useState({value: '', label: 'Select...'})
  const [selectedGroup, setSelectedGroup] = useState({value: '', label: 'Select...'})
  const [selectedModul, setSelectedModul] = useState({value: '', label: 'Select...'})
  const [topik, setTopik] = useState([
    {
      id_topik: ''
    }
  ])
  const [logo, setLogo] = useState({file: null, link: null})
  const [file, setFile] = useState({file: null, link: null})
  const [shortDesc, setShortDesc] = useState('')
  const [editor, setEditor] = useState('')
  const [categorys, setCategorys] = useState([])
  const [groups, setGroups] = useState([])
  const [moduls, setModuls] = useState([])
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

      setSelectedCertificate({label: store.selected.id_certificate.label ?? 'No Certifcate',  value: store.selected.id_certificate.value ?? ''})
      setSelectedInstansi({label: store.selected.nama_instansi, value: store.selected.nama_instansi})
      setSelectedCategory({label: store.selected.category, value: store.selected.category})
      setSelectedGroup({label: store.selected.group_course, value: store.selected.group_course})
      setSelectedModul({label: store.selected.modul, value: store.selected.modul})
      setShortDesc(store.selected.course)
      setEditor(store.selected.desc)
      setTopik(store.selected.topik)
    }

    dispatch(getAllDataTopik())
    dispatch(getAllDataCertificate())
    dispatch(getAllDataWhitelistDomain())
    dispatch(getAllDataGlobalParam({key: 'CAT_COURSE'}))
    dispatch(getAllDataGlobalParam({key: 'COURSE_GROUP'}))
    dispatch(getAllDataGlobalParam({key: 'MODUL_COURSE'}))

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

    if (globalparams.params?.key === 'CAT_COURSE') {
      setCategorys(globalparams.allData)
    }

    if (globalparams.params?.key === 'COURSE_GROUP') {
      setGroups(globalparams.allData)
    }

    if (globalparams.params?.key === 'MODUL_COURSE') {
      setModuls(globalparams.allData)
    }
  }, [store.loading, globalparams.allData])

  useEffect(() => {
    if (globalparams.upload) {
      ReactSummernote.insertImage(`${process.env.REACT_APP_BASE_URL}${globalparams.upload}`, $image => {
        $image.css("width", Math.floor($image.width() / 2))
        $image.attr("alt", 'Spektro')
      })
    }
  }, [globalparams.upload])

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      if (selectedCategory.value === '') {
        toast.error(
          <ToastContent text={'Kategori wajib dipilih'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )

        return null
      } else if (selectedModul.value === '') {
        toast.error(
          <ToastContent text={'Modul wajib dipilih'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )

        return null
      } else if (selectedGroup.value === '') {
        toast.error(
          <ToastContent text={'Group wajib dipilih'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )

        return null
      } else if (selectedInstansi.value === '') {
        toast.error(
          <ToastContent text={'Instansi wajib dipilih'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )

        return null
      } else if (topik.length === 0 || topik[0].id_topik === '') {
        toast.error(
          <ToastContent text={'Topik wajib dipilih'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )

        return null
      }

      const datas = new FormData()

      const estimated = Array.isArray(data.estimated) ? data.estimated[0].toTimeString().split(' ')[0] : data.estimated

      data.estimated = estimated

      setData(data)
      
      if (id) {
        datas.append('id_course', id)
      }

      datas.append('content_preview_image', logo.file)
      datas.append('content_preview_video', file.file)
      datas.append('desc', editor)
      datas.append('topik', JSON.stringify(topik))
      datas.append('id_certificate', JSON.stringify(selectedCertificate))
      datas.append('course', shortDesc)
      datas.append('code_course', data.code_course)
      datas.append('duration', data.duration)
      datas.append('estimated', data.estimated)
      datas.append('status', data.status)
      datas.append('category', selectedCategory.value)
      datas.append('group_course', selectedGroup.value)
      datas.append('modul', selectedModul.value)
      datas.append('nama_instansi', selectedInstansi.value)
      datas.append('passing_scores', data.passing_scores)

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

    setFile({file: null, link: null})

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    setTimeout(() => {
      reader.onload = function (e) {
        const blobURL = URL.createObjectURL(files[0])
        setFile({file: files[0], link: blobURL})
      }
      reader.readAsDataURL(files[0])
    }, 500)
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
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Spektro Logo' onError={() => setLogo({...logo, link: logoDefault})} width='100' />
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
                        </video>) : (
                          <>
                            {file.link ? (
                              <video width="300" controls>
                                <source src={file.link}/>
                              </video>) : (<Media object className='rounded mr-50' src={logoDefault} alt='video' width='100' />)
                            }
                          </>
                        )
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
                <Col lg='3' md='6'>
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
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='passing_scores'>Passing Scores</Label>
                    <Input
                      type='number'
                      id='passing_scores'
                      name='passing_scores'
                      min='0'
                      defaultValue={store.selected.passing_scores}
                      placeholder='Passing scores'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.passing_scores
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='estimated'><FormattedMessage id='Estimated'/></Label>
                    <Controller
                      id='estimated'
                      name='estimated'
                      as={Flatpickr}
                      control={control}
                      placeholder='HH:ii'
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: 'H:i',
                        time_24hr: true
                      }}
                      defaultValue={store.selected.estimated}
                      className={classnames('form-control', {
                        'is-invalid': errors.estimated
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
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
                            options={categorys.map(r => {
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
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='modul'>Modul</Label>
                    <Controller
                      name='modul'
                      id='modul'
                      control={control}
                      invalid={data !== null && (data.modul === undefined || data.modul === null)}
                      defaultValue={selectedModul}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={moduls.map(r => {
                              return {
                                value: r.param_value,
                                label: r.param_value
                              }
                            })}
                            value={selectedModul}
                            onChange={data => {
                              onChange(data)
                              setSelectedModul(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='group_course'>Group</Label>
                    <Controller
                      name='group_course'
                      id='group_course'
                      control={control}
                      invalid={data !== null && (data.group_course === undefined || data.group_course === null)}
                      defaultValue={selectedGroup}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={groups.map(r => {
                              return {
                                value: r.param_value,
                                label: r.param_value
                              }
                            })}
                            value={selectedGroup}
                            onChange={data => {
                              onChange(data)
                              setSelectedGroup(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
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
                            options={[{label: 'No Certificate', value: ''}].concat(certificates.allData.map(r => {
                              return {
                                value: r.id_certificate,
                                label: r.name
                              }
                            }))}
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
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='nama_instansi'>Instansi</Label>
                    <Controller
                      name='nama_instansi'
                      id='nama_instansi'
                      control={control}
                      invalid={data !== null && (data.nama_instansi === undefined || data.nama_instansi === null)}
                      defaultValue={selectedInstansi}
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
                            value={selectedInstansi}
                            onChange={data => {
                              onChange(data)
                              setSelectedInstansi(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
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
                <Col sm='12'>
                  <ReactSortable list={topik} setList={setTopik}>
                    {topik.map((data, key) => {
                      return (
                        <Row key={key}>
                          <Col sm='1' className='d-flex align-items-start justify-content-center'>
                            <Avatar color='light-secondary' content={String(key + 1)} size='xl' />
                          </Col>
                          <Col sm='11'>
                            <Row className='align-items-center'>
                              <Col md={3}>
                                <FormGroup>
                                  <Label for={`id_topik-${key}`}>Topik</Label>
                                  <Select
                                    id={`id_topik-${key}`}
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={topiks.allData.map(r => {
                                      return {
                                        label: r.topik,
                                        value: r.id_topik
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
                          </Col>
                        </Row>
                      )
                    })}
                  </ReactSortable>
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
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Spektro Logo' width='100' />
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
                        </video>) : (<Media object className='rounded mr-50' src={logoDefault} alt='video' width='100' />)
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
                <Col lg='3' md='6'>
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
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='passing_scores'>Passing Scores</Label>
                    <Input
                      type='number'
                      id='passing_scores'
                      name='passing_scores'
                      placeholder='Passing scores'
                      min='0'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.passing_scores
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='estimated'><FormattedMessage id='Estimated'/></Label>
                    <Controller
                      id='estimated'
                      name='estimated'
                      as={Flatpickr}
                      control={control}
                      placeholder='HH:ii'
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: 'H:i',
                        time_24hr: true
                      }}
                      defaultValue={'00:00:00'}
                      className={classnames('form-control', {
                        'is-invalid': errors.estimated
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
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
                            options={categorys.map(r => {
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
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='modul'>Modul</Label>
                    <Controller
                      name='modul'
                      id='modul'
                      control={control}
                      invalid={data !== null && (data.modul === undefined || data.modul === null)}
                      defaultValue={selectedModul}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={moduls.map(r => {
                              return {
                                value: r.param_value,
                                label: r.param_value
                              }
                            })}
                            value={selectedModul}
                            onChange={data => {
                              onChange(data)
                              setSelectedModul(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='group_course'>Group</Label>
                    <Controller
                      name='group_course'
                      id='group_course'
                      control={control}
                      invalid={data !== null && (data.group_course === undefined || data.group_course === null)}
                      defaultValue={selectedGroup}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={groups.map(r => {
                              return {
                                value: r.param_value,
                                label: r.param_value
                              }
                            })}
                            value={selectedGroup}
                            onChange={data => {
                              onChange(data)
                              setSelectedGroup(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
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
                            options={[{label: 'No Certificate', value: ''}].concat(certificates.allData.map(r => {
                              return {
                                value: r.id_certificate,
                                label: r.name
                              }
                            }))}
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
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='nama_instansi'>Instansi</Label>
                    <Controller
                      name='nama_instansi'
                      id='nama_instansi'
                      control={control}
                      invalid={data !== null && (data.nama_instansi === undefined || data.nama_instansi === null)}
                      defaultValue={selectedInstansi}
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
                            value={selectedInstansi}
                            onChange={data => {
                              onChange(data)
                              setSelectedInstansi(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
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
                <Col sm='12'>
                  <ReactSortable list={topik} setList={setTopik}>
                    {topik.map((data, key) => {
                      return (
                        <Row key={key}>
                          <Col sm='1' className='d-flex align-items-start justify-content-center'>
                            <Avatar color='light-secondary' content={String(key + 1)} size='xl' />
                          </Col>
                          <Col sm='11'>
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
                                    options={topiks.allData.map(r => {
                                      return {
                                        label: r.topik,
                                        value: r.id_topik
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
                          </Col>
                        </Row>
                      )
                    })}
                  </ReactSortable>
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
export default CourseSave
