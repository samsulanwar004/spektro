// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addAdminResearch, getAdminResearchData } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataGlobalParam, uploadImage } from '@src/views/backend/master/global_param/store/action'
import { getAllDataUniversity, addUniversity } from '@src/views/backend/master/universitas/store/action'

// ** Third Party Components
import { User, Info, Share2, MapPin, Check, X, Plus, File, Book, Save } from 'react-feather'
import { Card, CardBody, Row, Col, Alert, Button, Label, FormGroup, Input, CustomInput, Form, Media, Progress, InputGroup } from 'reactstrap'
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
import DocViewer, { DocViewerRenderers } from "react-doc-viewer"

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-id-ID'

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

const RgbiSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.rgbis),
    universitys = useSelector(state => state.universitys),
    globalparams = useSelector(state => state.globalparams),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl()

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm({
    defaultValues: { gender: 'gender-female', dob: null }
  })

  // ** State
  const [data, setData] = useState(null)
  const [selectedUniversity, setSelectedUniversity] = useState({label: 'Select...', value: ''})
  const [selectedCategory, setSelectedCategory] = useState({label: 'Select...', value: ''})
  const [selectedStatus, setSelectedStatus] = useState({label: 'Select...', value: ''})
  const [informasi, setInformasi] = useState('')
  const [concept, setConcept] = useState('')
  const [cv, setCv] = useState({file: null, link: null})
  const [proposal, setProposal] = useState({file: null, link: null})
  const [sertifikat, setSertifikat] = useState({file: null, link: null})
  const [status, setStatus] = useState([])
  const [categorys, setCategorys] = useState([])
  const [openSaveUniversitas, setOpenSaveUniversitas] = useState(false)
  const [university, setUniversity] = useState('')

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount

  useEffect(() => {
    dispatch(getAllDataUniversity())
    dispatch(getAllDataGlobalParam({key: 'CAT_RGBI'}))
    dispatch(getAllDataGlobalParam({key: 'RGBI_STATUS'}))

    if (store.selected !== null && store.selected !== undefined) {
      dispatch(getAdminResearchData({
        id: store.selected.id,
        type: 'rgbi'
      }))
    }
  }, [dispatch])

  useEffect(() => {
    if (store.selected !== null && store.selected !== undefined) {
      if (store.selectData) {
        const universitas = universitys.allData.find(r => r.id_universitas === store.selectData?.university_id)
        if (universitas) {
          setSelectedUniversity({label: universitas?.universitas, value: universitas?.id_universitas})
        }

        setInformasi(store.selectData?.informasi_dasar)
        setConcept(store.selectData?.concept_notes)
        setProposal({...proposal, link: `${process.env.REACT_APP_BASE_URL + store.selectData.attachment_proposal}`})
        setCv({...cv, link: `${process.env.REACT_APP_BASE_URL + store.selectData.attachment}`})
        setSertifikat({...sertifikat, link: `${process.env.REACT_APP_BASE_URL + store.selectData.attachment_sertificate}`})

        setSelectedCategory({label: store.selectData?.tags, value: store.selectData?.tags})
        setSelectedStatus({label: store.selected.status_desc ?? 'Submitted', value: store.selected.status_id ?? 'PP'})
      }
    }
  }, [universitys.allData, store.selectData])


  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/research_fund/rgbi/list")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }

    if (globalparams.params?.key === 'CAT_RGBI') {
      setCategorys(globalparams.allData)
    }

    if (globalparams.params?.key === 'RGBI_STATUS') {
      setStatus(globalparams.allData)
    }
  }, [store.loading, globalparams.allData])

  useEffect(() => {
    if (universitys.dataSave) {
      setSelectedUniversity({label: universitys.dataSave.universitas, value:  universitys.dataSave.id_universitas})
      setOpenSaveUniversitas(false)
    }
  }, [universitys.dataSave])

  useEffect(() => {
    if (universitys.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    } else if (universitys.error) {
      toast.error(
        <ToastContent text={universitys.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
  }, [universitys.loading])

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)
      
      const datas = new FormData()

      if (id) {
        datas.append('id', id)
      }

      datas.append('type', 'rgbi')
      datas.append('title', data.title)
      datas.append('authors', data.authors)
      datas.append('tags', selectedCategory.value)
      datas.append('university_id', selectedUniversity.value)
      datas.append('gpa', '0')
      datas.append('informasi_dasar', informasi)
      datas.append('concept_notes', concept)
      datas.append('status_id', selectedStatus.value)
      // ** File
      datas.append('attachment', cv.file)
      datas.append('attachment_proposal', proposal.file)
      datas.append('attachment_sertificate', sertifikat.file)

      dispatch(addAdminResearch(datas))
    }
  }

  const onChangeCv = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setCv({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
  }

  const onChangeProposal = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setProposal({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
  }

  const onChangeSertifikat = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setSertifikat({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
  }

  const handleSaveUniversitas = () => {
    if (!university) return null
    dispatch(addUniversity({universitas: university}))
  }

  return store.selected !== null && store.selected !== undefined ? (
    <Row className='app-user-edit' style={{marginBottom: 200}}>
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
                    <span className='align-middle'>RGBI Submission</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='title'>Judul Penelitian</Label>
                    <Input
                      id='title'
                      name='title'
                      placeholder='Judul Penelitian'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.title
                      })}
                      defaultValue={store.selectData?.title}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='university_id'>Perguruan Tinggi / Institusi</Label>
                    <Controller
                      name='university_id'
                      id='university_id'
                      control={control}
                      invalid={data !== null && (data.university_id === undefined || data.university_id === null)}
                      defaultValue={selectedUniversity}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={[{label: 'Others', value: '0'}].concat(universitys.allData.map(r => {
                              return {
                                value: r.id_universitas,
                                label: r.universitas
                              }
                            }))}
                            value={selectedUniversity}
                            onChange={data => {
                              onChange(data)
                              setSelectedUniversity(data)
                              setOpenSaveUniversitas(data.value === '0')
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                {openSaveUniversitas &&
                  <Col sm='6'>
                    <InputGroup>
                      <Input
                        id='title'
                        name='title'
                        placeholder='Institusi / Universitas'
                        className="mr-1"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                      />
                      <Button color='success' className="px-1" onClick={() => handleSaveUniversitas()} outline>
                        <Save size={14}/>
                      </Button>
                    </InputGroup>
                  </Col>
                }
                <Col sm='12'>
                  <FormGroup>
                    <Label for='tags'>Kategori</Label>
                    <Controller
                      name='tags'
                      id='tags'
                      control={control}
                      invalid={data !== null && (data.tags === undefined || data.tags === null)}
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
                <Col sm='12'>
                  <FormGroup>
                    <Label for='authors'>Penulis</Label>
                    <Input
                      id='authors'
                      name='authors'
                      placeholder='Separated by comma ex: Adi, Wahyu, Samsul, dst...'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.authors
                      })}
                      defaultValue={store.selectData?.authors}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='informasi_dasar'>Informasi Dasar</Label>
                    <ReactSummernote
                      value={informasi}
                      options={{
                        lang: 'id-ID',
                        height: 250,
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
                      onChange={setInformasi}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='concept_notes'>Concept Notes</Label>
                    <ReactSummernote
                      value={concept}
                      options={{
                        lang: 'id-ID',
                        height: 250,
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
                      onChange={setConcept}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <File size={20} className='mr-50' />
                    <span className='align-middle'>Lampiran</span>
                  </h4>
                </Col>
                <Col sm='12' md='9'>
                  <FormGroup>
                    <Label for='attachment'>CV</Label>
                    <Input
                      id='attachment'
                      name='attachment'
                      type='file'
                      onChange={onChangeCv}
                    />
                  </FormGroup>
                  {cv.link && <a href={cv.link} target="_blank">{cv.link}</a>}
                </Col>
                <Col sm='12' md='9'>
                  <FormGroup>
                    <Label for='attachment_proposal'>Proposal</Label>
                    <Input
                      id='attachment_proposal'
                      name='attachment_proposal'
                      type='file'
                      onChange={onChangeProposal}
                    />
                  </FormGroup>
                  {proposal.link && <a href={proposal.link} target="_blank">{proposal.link}</a>}
                </Col>
                <Col sm='12' md='9'>
                  <FormGroup>
                    <Label for='attachment_sertificate'>Sertifikat dan Penghargaan</Label>
                    <Input
                      id='attachment_sertificate'
                      name='attachment_sertificate'
                      type='file'
                      onChange={onChangeSertifikat}
                    />
                  </FormGroup>
                  {sertifikat.link && <a href={sertifikat.link} target="_blank">{sertifikat.link}</a>}
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='status_id'>Status</Label>
                    <Controller
                      name='status_id'
                      id='status_id'
                      control={control}
                      invalid={data !== null && (data.status_id === undefined || data.status_id === null)}
                      defaultValue={selectedStatus}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={status.map(r => {
                              return {
                                value: r.param_value,
                                label: r.param_desc
                              }
                            })}
                            value={selectedStatus}
                            onChange={data => {
                              onChange(data)
                              setSelectedStatus(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {store.progress &&
                  <Col sm='12'>
                    <Progress value={store.progress}>{`${store.progress}%`}</Progress>
                  </Col>
                }
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1' disabled={store.loading}>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/research_fund/rgbi/list'>
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
    <Row className='app-user-edit' style={{marginBottom: 200}}>
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
                    <span className='align-middle'>RGBI Submission</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='title'>Judul Penelitian</Label>
                    <Input
                      id='title'
                      name='title'
                      placeholder='Judul Penelitian'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.title
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='university_id'>Perguruan Tinggi / Institusi</Label>
                    <Controller
                      name='university_id'
                      id='university_id'
                      control={control}
                      invalid={data !== null && (data.university_id === undefined || data.university_id === null)}
                      defaultValue={selectedUniversity}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={[{label: 'Others', value: '0'}].concat(universitys.allData.map(r => {
                              return {
                                value: r.id_universitas,
                                label: r.universitas
                              }
                            }))}
                            value={selectedUniversity}
                            onChange={data => {
                              onChange(data)
                              setSelectedUniversity(data)
                              setOpenSaveUniversitas(data.value === '0')
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                {openSaveUniversitas &&
                  <Col sm='6'>
                    <InputGroup>
                      <Input
                        id='title'
                        name='title'
                        placeholder='Institusi / Universitas'
                        className="mr-1"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                      />
                      <Button color='success' className="px-1" onClick={() => handleSaveUniversitas()} outline>
                        <Save size={14}/>
                      </Button>
                    </InputGroup>
                  </Col>
                }
                <Col sm='12'>
                  <FormGroup>
                    <Label for='tags'>Kategori</Label>
                    <Controller
                      name='tags'
                      id='tags'
                      control={control}
                      invalid={data !== null && (data.tags === undefined || data.tags === null)}
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
                <Col sm='12'>
                  <FormGroup>
                    <Label for='authors'>Penulis</Label>
                    <Input
                      id='authors'
                      name='authors'
                      placeholder='Separated by comma ex: Adi, Wahyu, Samsul, dst...'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.authors
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='informasi_dasar'>Informasi Dasar</Label>
                    <ReactSummernote
                      value={informasi}
                      options={{
                        lang: 'id-ID',
                        height: 250,
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
                      onChange={setInformasi}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='concept_notes'>Concept Notes</Label>
                    <ReactSummernote
                      value={concept}
                      options={{
                        lang: 'id-ID',
                        height: 250,
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
                      onChange={setConcept}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <File size={20} className='mr-50' />
                    <span className='align-middle'>Lampiran</span>
                  </h4>
                </Col>
                <Col sm='12' md='9'>
                  <FormGroup>
                    <Label for='attachment'>CV</Label>
                    <Input
                      id='attachment'
                      name='attachment'
                      type='file'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.attachment
                      })}
                      onChange={onChangeCv}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='9'>
                  <FormGroup>
                    <Label for='attachment_proposal'>Proposal</Label>
                    <Input
                      id='attachment_proposal'
                      name='attachment_proposal'
                      type='file'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.attachment_proposal
                      })}
                      onChange={onChangeProposal}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='9'>
                  <FormGroup>
                    <Label for='attachment_sertificate'>Sertifikat dan Penghargaan</Label>
                    <Input
                      id='attachment_sertificate'
                      name='attachment_sertificate'
                      type='file'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.attachment_sertificate
                      })}
                      onChange={onChangeSertifikat}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='status_id'>Status</Label>
                    <Controller
                      name='status_id'
                      id='status_id'
                      control={control}
                      invalid={data !== null && (data.status_id === undefined || data.status_id === null)}
                      defaultValue={selectedStatus}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={status.map(r => {
                              return {
                                value: r.param_value,
                                label: r.param_desc
                              }
                            })}
                            value={selectedStatus}
                            onChange={data => {
                              onChange(data)
                              setSelectedStatus(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {store.progress &&
                  <Col sm='12'>
                    <Progress value={store.progress}>{`${store.progress}%`}</Progress>
                  </Col>
                }
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1' disabled={store.loading}>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/research_fund/rgbi/list'>
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
export default RgbiSave
