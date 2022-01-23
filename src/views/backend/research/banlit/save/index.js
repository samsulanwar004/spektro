// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addAdminResearch, getAdminResearchData, emailAddResearch } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataGlobalParam, uploadImage } from '@src/views/backend/master/global_param/store/action'
import { getAllDataUniversity } from '@src/views/backend/master/universitas/store/action'
import { getAllDataCategory } from '@src/views/backend/master/category/store/action'
import { getAllDataBank } from '@src/views/backend/master/bank/store/action'

// ** Third Party Components
import { User, Info, Share2, MapPin, Check, X, Plus, File, Book } from 'react-feather'
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
import logoDefault from '@src/assets/images/avatars/avatar-blank.png'
import ReactSummernote from 'react-summernote'
import DocViewer, { DocViewerRenderers } from "react-doc-viewer"
import Fancybox from '@src/utility/hooks/useFancy'

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-id-ID'

// ** Utils
import { isObjEmpty, selectThemeColors, ipks, isUserLoggedIn } from '@utils'

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

const stratas = [
  {
    label: 'Bachelor - S1',
    value: 'S1'
  },
  {
    label: 'Master - S2',
    value: 'S2'
  },
  {
    label: 'Doctor - S3',
    value: 'S3'
  }
]

const statusApproved = ['AJ', 'AFP', 'RA']
const statusRejected = ['RR', 'RJ', 'RFP']

const BanlitSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.banlits),
    auth = useSelector(state => state.auth),
    universitys = useSelector(state => state.universitys),
    globalparams = useSelector(state => state.globalparams),
    categorys = useSelector(state => state.categorys),
    banks = useSelector(state => state.banks),
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
  const [selectedStrata, setSelectedStrata] = useState({label: 'Select...', value: ''})
  const [selectedCategory, setSelectedCategory] = useState({label: 'Select...', value: ''})
  const [selectedMajor, setSelectedMajor] = useState({label: 'Select...', value: ''})
  const [selectedBank, setSelectedBank] = useState({label: 'Select...', value: ''})
  const [selectedStatus, setSelectedStatus] = useState({label: 'Select...', value: ''})
  const [selectedIpk, setSelectedIpk] = useState({label: 'Select...', value: ''})
  const [majors, setMajors] = useState([])
  const [status, setStatus] = useState([])
  const [cv, setCv] = useState({file: null, link: null})
  const [proposal, setProposal] = useState({file: null, link: null})
  const [transcript, setTranscript] = useState({file: null, link: null})
  const [request, setRequest] = useState({file: null, link: null})
  const [ktp, setKtp] = useState({file: null, link: null})
  const [tax, setTax] = useState({file: null, link: null})
  const [bank, setBank] = useState({file: null, link: null})
  const [userData, setUserData] = useState(null)

  // ** redirect
  const history = useHistory()

  const sendEmailResearch = () => {
    dispatch(emailAddResearch({
      type: "submit_banlit",
      to: store.addData?.email,
      cc: userData?.email,
      nama_pendaftar: store.addData?.authors_name,
      nama_peserta: userData?.full_name,
      nama_penelitian: store.addData?.research_title,
      link_dasbor_research: `${process.env.REACT_APP_BASE_FE_URL}/research_submission`
    }))
  }

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      const user = JSON.parse(localStorage.getItem('userData'))
      setUserData(user.userdata)
    }
  }, [auth.userData])

  // ** Function to get user on mount
  useEffect(() => {
    dispatch(getAllDataUniversity())
    dispatch(getAllDataGlobalParam({key: 'MAJORS'}))
    dispatch(getAllDataGlobalParam({key: 'BANLIT_STATUS'}))
    dispatch(getAllDataCategory())
    dispatch(getAllDataBank())

    if (store.selected !== null && store.selected !== undefined) {
      dispatch(getAdminResearchData({
        id: store.selected.id,
        type: 'banlit'
      }))
    }
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )

      if (store.addData?.update_date === null) {
        sendEmailResearch()
      }

      history.push("/research_fund/banlit/list")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }

    if (globalparams.params?.key === 'BANLIT_STATUS') {
      setStatus(globalparams.allData)
    }

    if (globalparams.params?.key === 'MAJORS') {
      setMajors(globalparams.allData)
    }
  }, [store.loading, globalparams.allData])

  useEffect(() => {
    if (store.selected !== null && store.selected !== undefined) {
      if (store.selectData) {
        const universitas = universitys.allData.find(r => r.id_universitas === store.selectData?.university_id)
        if (universitas) {
          setSelectedUniversity({label: universitas?.universitas, value: universitas?.id_universitas})
        }

        const category = categorys.allData.find(r => r.id === store.selectData?.category_id)

        if (category) {
          setSelectedCategory({label: category?.category_name, value: category?.id})
        }

        const bank = banks.allData.find(r => r.id === parseInt(store.selectData?.bank_id))

        if (bank) {
          setSelectedBank({label: bank?.name, value: bank?.id})
        }

        setSelectedStrata({label: store.selectData.degree_level, value: store.selectData.degree_level})

        setSelectedMajor({label: store.selectData.major, value: store.selectData.major})

        setSelectedIpk({label: store.selectData.gpa, value: store.selectData.gpa})

        setProposal({...proposal, link: `${process.env.REACT_APP_BASE_URL + store.selectData.documents_proposal}`})
        setCv({...cv, link: `${process.env.REACT_APP_BASE_URL + store.selectData.documents_cv}`})
        setTranscript({...transcript, link: `${process.env.REACT_APP_BASE_URL + store.selectData.documents_transcript}`})
        setRequest({...request, link: `${process.env.REACT_APP_BASE_URL + store.selectData.documents_request}`})
        setKtp({...ktp, link: `${process.env.REACT_APP_BASE_URL + store.selectData.images_nationalid}`})
        setTax({...tax, link: `${process.env.REACT_APP_BASE_URL + store.selectData.images_taxid}`})
        setBank({...bank, link: `${process.env.REACT_APP_BASE_URL + store.selectData.images_saving}`})

        setSelectedStatus({label: store.selected.status_desc ?? 'None', value: store.selected.status_id ?? 'NN'})
      }
    }
  }, [universitys.allData, categorys.allData, store.selectData])

  const sendEmailAction = (type, data) => {

    dispatch(emailAddResearch({
      type,
      to: data.email,
      nama_pendaftar: data.authors_name,
      nama_peserta: data.authors_name,
      nama_penelitian: data.research_title,
      link_dasbor_research: `${process.env.REACT_APP_BASE_FE_URL}/research_submission`
    }))
  }

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)

      const datas = new FormData()

      if (id) {
        datas.append('id', id)
      }

      datas.append('type', 'banlit')
      datas.append('research_title', data.research_title)
      datas.append('authors_ids', data.authors_ids)
      datas.append('authors_name', data.authors_name)
      datas.append('bank_account', data.bank_account)
      datas.append('email', data.email)
      datas.append('phone_number', data.phone_number)
      datas.append('faculty', data.faculty)
      datas.append('tax_number', data.tax_number)
      datas.append('gpa', selectedIpk.value)
      datas.append('bank_id', selectedBank.value)
      datas.append('category_id', selectedCategory.value)
      datas.append('degree_level', selectedStrata.value)
      datas.append('major', selectedMajor.value)
      datas.append('status_id', selectedStatus.value)
      datas.append('university_id', selectedUniversity.value)
      // ** File
      datas.append('documents_cv', cv.file)
      datas.append('documents_proposal', proposal.file)
      datas.append('documents_request', request.file)
      datas.append('documents_transcript', transcript.file)
      datas.append('images_nationalid', ktp.file)
      datas.append('images_saving', bank.file)
      datas.append('images_taxid', tax.file)

      dispatch(addAdminResearch(datas))

      if (statusApproved.includes(selectedStatus.value)) {
        sendEmailAction('approve_banlit', data)
      } else if (statusRejected.includes(selectedStatus.value)) {
        sendEmailAction('rejected_banlit', data)
      }
      
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

  const onChangeRequest = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setRequest({file: files[0], link: blobURL})
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

  const onChangeTranscript = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setTranscript({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
  }

  const onChangeKtp = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setKtp({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
  }

  const onChangeTax = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setTax({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
  }

  const onChangeBank = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setBank({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
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
                    <span className='align-middle'>Research Submission</span>
                  </h4>
                </Col>
                <Col sm='12' md='9'>
                  <FormGroup>
                    <Label for='research_title'>Judul</Label>
                    <Input
                      id='research_title'
                      name='research_title'
                      placeholder='Judul'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.research_title
                      })}
                      type='textarea'
                      defaultValue={store.selectData?.research_title}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='category_id'>Kategori</Label>
                    <Controller
                      name='category_id'
                      id='category_id'
                      control={control}
                      invalid={data !== null && (data.category_id === undefined || data.category_id === null)}
                      defaultValue={selectedCategory}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={categorys.allData.filter(r => r.type === 'RESEARCH').map(r =>  {
                              return {
                                label: r.category_name,
                                value: r.id
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
                  <h4 className='mb-1'>
                    <User size={20} className='mr-50' />
                    <span className='align-middle'>Author Detail</span>
                  </h4>
                </Col>
                <Col sm='12' md='7'>
                  <FormGroup>
                    <Label for='authors_name'>Authors Name</Label>
                    <Input
                      id='authors_name'
                      name='authors_name'
                      placeholder='Authors Name'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.authors_name
                      })}
                      defaultValue={store.selectData?.authors_name}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='degree_level'>Degree Level</Label>
                    <Controller
                      name='degree_level'
                      id='degree_level'
                      control={control}
                      invalid={data !== null && (data.degree_level === undefined || data.degree_level === null)}
                      defaultValue={selectedStrata}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={stratas}
                            value={selectedStrata}
                            onChange={data => {
                              onChange(data)
                              setSelectedStrata(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='2'>
                  <FormGroup>
                    <Label for='gpa'>IPK</Label>
                    <Controller
                      name='gpa'
                      id='gpa'
                      control={control}
                      invalid={data !== null && (data.gpa === undefined || data.gpa === null)}
                      defaultValue={selectedIpk}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={ipks()}
                            value={selectedIpk}
                            onChange={data => {
                              onChange(data)
                              setSelectedIpk(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='university_id'>Universitas / Institusi</Label>
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
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='faculty'>Faculty</Label>
                    <Input
                      id='faculty'
                      name='faculty'
                      placeholder='Faculty'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.faculty
                      })}
                      defaultValue={store.selectData?.faculty}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='major'>Major</Label>
                    <Controller
                      name='major'
                      id='major'
                      control={control}
                      invalid={data !== null && (data.major === undefined || data.major === null)}
                      defaultValue={selectedMajor}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={majors.map(r => {
                              return {
                                value: r.param_value,
                                label: r.param_value
                              }
                            })}
                            value={selectedMajor}
                            onChange={data => {
                              onChange(data)
                              setSelectedMajor(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='authors_ids'>Author ID</Label>
                    <Input
                      id='authors_ids'
                      name='authors_ids'
                      type='number'
                      placeholder='Author ID (National ID / KTP / Passport)'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.authors_ids
                      })}
                      defaultValue={store.selectData?.authors_ids}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='phone_number'>Phone Number</Label>
                    <Input
                      id='phone_number'
                      name='phone_number'
                      placeholder='Phone Number'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.phone_number
                      })}
                      defaultValue={store.selectData?.phone_number}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='email'>E-Mail</Label>
                    <Input
                      id='email'
                      name='email'
                      placeholder='E-Mail'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.email
                      })}
                      defaultValue={store.selectData?.email}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <Check size={20} className='mr-50' />
                    <span className='align-middle'>Informasi Tambahan</span>
                  </h4>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='bank_account'>Bank Account</Label>
                    <Input
                      id='bank_account'
                      name='bank_account'
                      placeholder='Bank Account'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.bank_account
                      })}
                      defaultValue={store.selectData?.bank_account}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='bank_id'>Bank Name</Label>
                    <Controller
                      name='bank_id'
                      id='bank_id'
                      control={control}
                      invalid={data !== null && (data.bank_id === undefined || data.bank_id === null)}
                      defaultValue={selectedBank}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={banks.allData.map(r => {
                              return {
                                label: r.name,
                                value: r.id
                              }
                            })}
                            value={selectedBank}
                            onChange={data => {
                              onChange(data)
                              setSelectedBank(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='tax_number'>Tax Number</Label>
                    <Input
                      id='tax_number'
                      name='tax_number'
                      placeholder='Tax Number'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.tax_number
                      })}
                      defaultValue={store.selectData?.tax_number}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <File size={20} className='mr-50' />
                    <span className='align-middle'>Lampiran (pdf / jpg)</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='documents_request'>Request Letter</Label>
                    <Input
                      id='documents_request'
                      name='documents_request'
                      type='file'
                      onChange={onChangeRequest}
                      accept=".pdf,.jpg"
                    />
                  </FormGroup>
                  {request.link && <a href={request.link} target="_blank">{request.link}</a>}
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='documents_transcript'>IPK Transcript</Label>
                    <Input
                      id='documents_transcript'
                      name='documents_transcript'
                      type='file'
                      onChange={onChangeTranscript}
                      accept=".pdf,.jpg"
                    />
                  </FormGroup>
                  {transcript.link && <a href={transcript.link} target="_blank">{transcript.link}</a>}
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='documents_cv'>CV</Label>
                    <Input
                      id='documents_cv'
                      name='documents_cv'
                      type='file'
                      onChange={onChangeCv}
                      accept=".pdf,.jpg"
                    />
                  </FormGroup>
                  {cv.link && <a href={cv.link} target="_blank">{cv.link}</a>}
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='documents_proposal'>Proposal</Label>
                    <Input
                      id='documents_proposal'
                      name='documents_proposal'
                      type='file'
                      onChange={onChangeProposal}
                      accept=".pdf,.jpg"
                    />
                  </FormGroup>
                  {proposal.link && <a href={proposal.link} target="_blank">{proposal.link}</a>}
                </Col>
                <Fancybox options={{ infinite: false }}>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='images_nationalid'>Scan of National ID</Label>
                    <Input
                      id='images_nationalid'
                      name='images_nationalid'
                      type='file'
                      onChange={onChangeKtp}
                      accept='image/*' 
                    />
                  </FormGroup>
                  {ktp.link && <a data-fancybox="gallery" data-src={ktp.link}><img className="img-fluid" src={ktp.link} width="300" /></a>}
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='images_taxid'>Scan of Tax Card</Label>
                    <Input
                      id='images_taxid'
                      name='images_taxid'
                      type='file'
                      onChange={onChangeTax}
                      accept='image/*' 
                    />
                  </FormGroup>
                  {tax.link && <a data-fancybox="gallery" data-src={tax.link}><img className="img-fluid" src={tax.link} width="300" /></a>}
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='images_saving'>Scan of Bank Saving Book</Label>
                    <Input
                      id='images_saving'
                      name='images_saving'
                      type='file'
                      onChange={onChangeBank}
                      accept='image/*' 
                    />
                  </FormGroup>
                  {bank.link && <a data-fancybox="gallery" data-src={bank.link}><img className="img-fluid" src={bank.link} width="300" /></a>}
                </Col>
                </Fancybox>
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
                  <Link to='/research_fund/banlit/list'>
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
                    <span className='align-middle'>Research Submission</span>
                  </h4>
                </Col>
                <Col sm='12' md='9'>
                  <FormGroup>
                    <Label for='research_title'>Judul</Label>
                    <Input
                      id='research_title'
                      name='research_title'
                      placeholder='Judul'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.research_title
                      })}
                      type='textarea'
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='category_id'>Kategori</Label>
                    <Controller
                      name='category_id'
                      id='category_id'
                      control={control}
                      invalid={data !== null && (data.category_id === undefined || data.category_id === null)}
                      defaultValue={selectedCategory}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={categorys.allData.filter(r => r.type === 'RESEARCH').map(r =>  {
                              return {
                                label: r.category_name,
                                value: r.id
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
                  <h4 className='mb-1'>
                    <User size={20} className='mr-50' />
                    <span className='align-middle'>Author Detail</span>
                  </h4>
                </Col>
                <Col sm='12' md='7'>
                  <FormGroup>
                    <Label for='authors_name'>Authors Name</Label>
                    <Input
                      id='authors_name'
                      name='authors_name'
                      placeholder='Authors Name'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.authors_name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='degree_level'>Degree Level</Label>
                    <Controller
                      name='degree_level'
                      id='degree_level'
                      control={control}
                      invalid={data !== null && (data.degree_level === undefined || data.degree_level === null)}
                      defaultValue={selectedStrata}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={stratas}
                            value={selectedStrata}
                            onChange={data => {
                              onChange(data)
                              setSelectedStrata(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='2'>
                  <FormGroup>
                    <Label for='gpa'>IPK</Label>
                    <Controller
                      name='gpa'
                      id='gpa'
                      control={control}
                      invalid={data !== null && (data.gpa === undefined || data.gpa === null)}
                      defaultValue={selectedIpk}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={ipks()}
                            value={selectedIpk}
                            onChange={data => {
                              onChange(data)
                              setSelectedIpk(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='university_id'>Universitas / Institusi</Label>
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
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='faculty'>Faculty</Label>
                    <Input
                      id='faculty'
                      name='faculty'
                      placeholder='Faculty'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.faculty
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='major'>Major</Label>
                    <Controller
                      name='major'
                      id='major'
                      control={control}
                      invalid={data !== null && (data.major === undefined || data.major === null)}
                      defaultValue={selectedMajor}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={majors.map(r => {
                              return {
                                value: r.param_value,
                                label: r.param_value
                              }
                            })}
                            value={selectedMajor}
                            onChange={data => {
                              onChange(data)
                              setSelectedMajor(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='authors_ids'>Author ID</Label>
                    <Input
                      id='authors_ids'
                      name='authors_ids'
                      type='number'
                      placeholder='Author ID (National ID / KTP / Passport)'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.authors_ids
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='phone_number'>Phone Number</Label>
                    <Input
                      id='phone_number'
                      name='phone_number'
                      placeholder='Phone Number'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.phone_number
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='email'>E-Mail</Label>
                    <Input
                      id='email'
                      name='email'
                      placeholder='E-Mail'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.email
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <Check size={20} className='mr-50' />
                    <span className='align-middle'>Informasi Tambahan</span>
                  </h4>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='bank_account'>Bank Account</Label>
                    <Input
                      id='bank_account'
                      name='bank_account'
                      placeholder='Bank Account'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.bank_account
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='bank_id'>Bank Name</Label>
                    <Controller
                      name='bank_id'
                      id='bank_id'
                      control={control}
                      invalid={data !== null && (data.bank_id === undefined || data.bank_id === null)}
                      defaultValue={selectedBank}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={banks.allData.map(r => {
                              return {
                                label: r.name,
                                value: r.id
                              }
                            })}
                            value={selectedBank}
                            onChange={data => {
                              onChange(data)
                              setSelectedBank(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='4'>
                  <FormGroup>
                    <Label for='tax_number'>Tax Number</Label>
                    <Input
                      id='tax_number'
                      name='tax_number'
                      placeholder='Tax Number'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.tax_number
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <File size={20} className='mr-50' />
                    <span className='align-middle'>Lampiran (pdf /jpg)</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='documents_request'>Request Letter</Label>
                    <Input
                      id='documents_request'
                      name='documents_request'
                      type='file'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.documents_request
                      })}
                      onChange={onChangeRequest}
                      accept=".pdf,.jpg"
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='documents_transcript'>IPK Transcript</Label>
                    <Input
                      id='documents_transcript'
                      name='documents_transcript'
                      type='file'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.documents_transcript
                      })}
                      onChange={onChangeTranscript}
                      accept=".pdf,.jpg"
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='documents_cv'>CV</Label>
                    <Input
                      id='documents_cv'
                      name='documents_cv'
                      type='file'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.documents_cv
                      })}
                      onChange={onChangeCv}
                      accept=".pdf,.jpg"
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='documents_proposal'>Proposal</Label>
                    <Input
                      id='documents_proposal'
                      name='documents_proposal'
                      type='file'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.documents_proposal
                      })}
                      onChange={onChangeProposal}
                      accept=".pdf,.jpg"
                    />
                  </FormGroup>
                </Col>
                <Fancybox options={{ infinite: false }}>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='images_nationalid'>Scan of National ID</Label>
                    <Input
                      id='images_nationalid'
                      name='images_nationalid'
                      type='file'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.images_nationalid
                      })}
                      onChange={onChangeKtp}
                      accept='image/*' 
                    />
                  </FormGroup>
                  {ktp.link && <a data-fancybox="gallery" data-src={ktp.link}><img className="img-fluid" src={ktp.link} width="300" /></a>}
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='images_taxid'>Scan of Tax Card</Label>
                    <Input
                      id='images_taxid'
                      name='images_taxid'
                      type='file'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.images_taxid
                      })}
                      onChange={onChangeTax}
                      accept='image/*' 
                    />
                  </FormGroup>
                  {tax.link && <a data-fancybox="gallery" data-src={tax.link}><img className="img-fluid" src={tax.link} width="300" /></a>}
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='images_saving'>Scan of Bank Saving Book</Label>
                    <Input
                      id='images_saving'
                      name='images_saving'
                      type='file'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.images_saving
                      })}
                      onChange={onChangeBank}
                      accept='image/*' 
                    />
                  </FormGroup>
                  {bank.link && <a data-fancybox="gallery" data-src={bank.link}><img className="img-fluid" src={bank.link} width="300" /></a>}
                </Col>
                </Fancybox>
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
                  <Link to='/research_fund/banlit/list'>
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
export default BanlitSave
