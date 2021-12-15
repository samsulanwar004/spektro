// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addCalonPeserta, addPesertaStatus } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataGlobalParam, uploadImage } from '@src/views/backend/master/global_param/store/action'
import { getAllDataUniversity } from '@src/views/backend/master/universitas/store/action'
import { getAllDataProvince } from '@src/views/backend/master/province/store/action'
import { getAllDataSatker} from '@src/views/backend/master/satker/store/action'

// ** Third Party Components
import { User, Info, Share2, MapPin, Check, X, Plus, File, Book, Users } from 'react-feather'
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
import DocViewer, { DocViewerRenderers } from "react-doc-viewer"

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-id-ID'

// ** Utils
import { isObjEmpty, selectThemeColors, ipks } from '@utils'

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
    label: 'D3',
    value: 'D3'
  },
  {
    label: 'S1',
    value: 'S1'
  },
  {
    label: 'S2',
    value: 'S2'
  }
]

const semesters = [
  {
    label: '5',
    value: '5'
  },
  {
    label: '6',
    value: '6'
  },
  {
    label: '7',
    value: '7'
  },
  {
    label: '8',
    value: '8'
  }
]

const durationSemesters = [
  {
    label: '1 Semester',
    value: '1 Semester'
  },
  {
    label: '2 Semester',
    value: '2 Semester'
  }
]

const UserSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.calonpesertas),
    universitys = useSelector(state => state.universitys),
    globalparams = useSelector(state => state.globalparams),
    provinces = useSelector(state => state.provinces),
    satkers = useSelector(state => state.satkers),
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
  const [selectedExplore, setSelectedExplore] = useState({label: 'Select...', value: ''})
  const [selectedMajor, setSelectedMajor] = useState({label: 'Select...', value: ''})
  const [selectedSkill, setSelectedSkill] = useState({label: 'Select...', value: ''})
  const [selectedStrata, setSelectedStrata] = useState({label: 'Select...', value: ''})
  const [selectedSemester, setSelectedSemester] = useState({label: 'Select...', value: ''})
  const [selectedDurationInterest, setSelectedDurationInterest] = useState({label: 'Select...', value: ''})
  const [selectedProvince, setSelectedProvince] = useState({label: 'Select...', value: ''})
  const [selectedSatker, setSelectedSatker] = useState({label: 'Select...', value: ''})
  const [selectedIpk, setSelectedIpk] = useState({label: 'Select...', value: ''})
  const [shortDesc, setShortDesc] = useState('')
  const [dataExplores, setDataExplores] = useState([])
  const [majors, setMajors] = useState([])
  const [dataSkills, setDataSkills] = useState([])
  const [explores, setExplores] = useState([''])
  const [skills, setSkills] = useState([''])
  const [riset, setRiset] = useState('')
  const [project, setProject] = useState('')
  const [software, setSoftware] = useState('')
  const [akademik, setAkademik] = useState('')
  const [nonAkademik, setNonAkademik] = useState('')
  const [motivasi, setMotivasi] = useState('')
  const [cv, setCv] = useState({file: null, link: null})
  const [photo, setPhoto] = useState({file: null, link: null})
  const [lectures, setLectures] = useState([{supporting_lecturer: '', email_lecturer: ''}])

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount

  useEffect(() => {
    dispatch(getAllDataSatker())
    dispatch(getAllDataUniversity())
    dispatch(getAllDataGlobalParam({key: 'AREA_EXPLORE'}))
    dispatch(getAllDataGlobalParam({key: 'MAJORS'}))
    dispatch(getAllDataGlobalParam({key: 'KEAHLIAN'}))
    dispatch(getAllDataProvince())

    if (store.selected !== null && store.selected !== undefined) {
      setSelectedMajor({label: store.selected.majoring, value: store.selected.majoring})
      setSelectedStrata({label: store.selected.strata, value: store.selected.strata})
      setSelectedSemester({label: store.selected.semester, value: store.selected.semester})
      setSelectedIpk({label: store.selected.gpa, value: store.selected.gpa})
      setExplores(store.selected.exploration_interest ? store.selected.exploration_interest.split(',').map(r => {
        return {
          label: r,
          value: r
        }
      }) : [''])
      setSkills(store.selected.skills ? store.selected.skills.split(',').map(r => {
        return {
          label: r,
          value: r
        }
      }) : [''])
      setSelectedDurationInterest({label: store.selected.kmbi_duration_interest, value: store.selected.kmbi_duration_interest})
      setRiset(store.selected.research_experience)
      setProject(store.selected.project_experience)
      setSoftware(store.selected.software_experience)
      setAkademik(store.selected.academic_achievement)
      setNonAkademik(store.selected.non_academic_achievement)
      setMotivasi(store.selected.motivation_in_kmbi)
      setPhoto({...photo, link: `${process.env.REACT_APP_BASE_URL + store.selected.attachment_images}`})
      setCv({...cv, link: `${process.env.REACT_APP_BASE_URL + store.selected.attachment}`})

      //lecture
      const arrLecture = store.selected.supporting_lecturer ? store.selected.supporting_lecturer.split(',') : []
      const arrEmailLecture = store.selected.email_lecturer ? store.selected.email_lecturer.split(',') : []

      const dosens = []
      for (let i = 0; i < arrLecture.length; i++) {
        dosens.push({
          supporting_lecturer: arrLecture[i],
          email_lecturer: arrEmailLecture[i]
        })
      }
      setLectures(dosens)
    }
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/kmbi/calon_peserta/list")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }

    if (globalparams.params?.key === 'AREA_EXPLORE') {
      setDataExplores(globalparams.allData)
    }

    if (globalparams.params?.key === 'MAJORS') {
      setMajors(globalparams.allData)
    }

    if (globalparams.params?.key === 'KEAHLIAN') {
      setDataSkills(globalparams.allData)
    }
  }, [store.loading, globalparams.allData])

  useEffect(() => {
    const universitas = universitys.allData.find(r => r.id_universitas === store.selected?.university_id)
    if (universitas) {
      setSelectedUniversity({label: universitas?.universitas, value: universitas?.id_universitas})
    }
  }, [universitys.allData])


  useEffect(() => {
    const province = provinces.allData.find(r => r.id_provinsi === store.selected?.province_id)
    if (province) {
      setSelectedProvince({label: province?.provinsi, value: province?.id_provinsi})
    }
  }, [provinces.allData])

  useEffect(() => {
    const satker = satkers.allData.find(r => r.id_satker === parseInt(store.selected?.handler))
    if (satker) {
      setSelectedSatker({label: satker?.satker, value: satker?.id_satker})
    }
  }, [satkers.allData])

  useEffect(() => {
    if (store.dataSave) {
      if (store.dataSave.handler && store.dataSave.status_id === 'KSU') {
        dispatch(addPesertaStatus({
          id_kmbi: store.dataSave.id,
          status_id: 'KSI'
        }))
      }
    }

    return () => {
      dispatch({
        type: 'ADD_CALON_PESERTA',
        data: null
      })
    }
  }, [store.dataSave])

  useEffect(() => {
    if (store.dataStatus) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/kmbi/calon_peserta/list")
    }
  }, [store.dataStatus])

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)
      
      const datas = new FormData()

      datas.append('university_id', selectedUniversity.value)
      datas.append('fullname', data.fullname)
      datas.append('majoring', selectedMajor.value)
      datas.append('strata', selectedStrata.value)
      datas.append('semester', selectedSemester.value)
      datas.append('gpa', selectedIpk.value)
      datas.append('supporting_lecturer', data.supporting_lecturer.join(','))
      datas.append('email_lecturer', data.email_lecturer.join(','))
      datas.append('skills', skills.map(r => {
        return r.value
      }).join(','))
      datas.append('exploration_interest', explores.map(r => {
        return r.value
      }).join(','))
      datas.append('total_current_study_credit', data.total_current_study_credit)
      datas.append('total_current_course', data.total_current_course)
      datas.append('kmbi_duration_interest', selectedDurationInterest.value)
      datas.append('email', data.email)
      datas.append('phone', data.phone)
      datas.append('province_id', selectedProvince.value)
      datas.append('city', data.city)
      datas.append('research_experience', riset)
      datas.append('project_experience', project)
      datas.append('software_experience', software)
      datas.append('academic_achievement', akademik)
      datas.append('non_academic_achievement', nonAkademik)
      datas.append('motivation_in_kmbi', motivasi)
      datas.append('attachment', cv.file)
      datas.append('attachment_images', photo.file)
      datas.append('handler', selectedSatker.value)

      dispatch(addCalonPeserta(datas))
    }
  }

  const handleSelectExplore = (key, value) => {
    let oldExplore = explores
    oldExplore = oldExplore.map((d, k) => {
      if (k === key) {
        d = value
      }
      return d
    })

    setExplores(oldExplore)
  }

  const handleAddExplore = () => {
    let oldExplore = explores

    oldExplore = oldExplore.concat('')

    setExplores(oldExplore)
  }

  const handleSelectSkill = (key, value) => {
    let oldSkill = skills
    oldSkill = oldSkill.map((d, k) => {
      if (k === key) {
        d = value
      }
      return d
    })

    setSkills(oldSkill)
  }

  const handleAddSkill = () => {
    let oldSkill = skills

    oldSkill = oldSkill.concat('')

    setSkills(oldSkill)
  }

  const handleAddDosen = () => {
    let oldLectures = lectures

    oldLectures = oldLectures.concat({
      email_lecturer: '',
      supporting_lecturer: ''
    })

    setLectures(oldLectures)
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

  const onChangePhoto = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setPhoto({file: files[0], link: blobURL})
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
                    <span className='align-middle'>KMBI Submission</span>
                  </h4>
                </Col>
                <Col sm='12' md='9'>
                  <FormGroup>
                    <Label for='fullname'>Nama Mahasiswa</Label>
                    <Input
                      id='fullname'
                      name='fullname'
                      placeholder='Nama Mahasiswa'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.fullname
                      })}
                      defaultValue={store.selected.fullname}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='handler'>Satuan Kerja</Label>
                    <Controller
                      name='handler'
                      id='handler'
                      control={control}
                      invalid={data !== null && (data.handler === undefined || data.handler === null)}
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
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='university_id'>Perguruan Tinggi</Label>
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
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='majoring'>Program Studi</Label>
                    <Controller
                      name='majoring'
                      id='majoring'
                      control={control}
                      invalid={data !== null && (data.majoring === undefined || data.majoring === null)}
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
                <Col sm='12' md='2'>
                  <FormGroup>
                    <Label for='strata'>Strata</Label>
                    <Controller
                      name='strata'
                      id='strata'
                      control={control}
                      invalid={data !== null && (data.strata === undefined || data.strata === null)}
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
                    <Label for='semester'>Semester</Label>
                    <Controller
                      name='semester'
                      id='semester'
                      control={control}
                      invalid={data !== null && (data.semester === undefined || data.semester === null)}
                      defaultValue={selectedSemester}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={semesters}
                            value={selectedSemester}
                            onChange={data => {
                              onChange(data)
                              setSelectedSemester(data)
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
                <Col sm='12' md='6'>
                  <Row>
                    <Col sm='12'>
                      <FormGroup>
                        <Label for='exploration_interest'>Minat Area Explorasi</Label>
                        {explores.map((data, key) => {
                          return (
                            <Select
                              key={key}
                              id={`explore-${key}`}
                              theme={selectThemeColors}
                              isClearable={false}
                              className='react-select mb-1'
                              classNamePrefix='select'
                              options={dataExplores.map(r => {
                                return {
                                  label: r.param_value,
                                  value: r.param_value
                                }
                              })}
                              value={data}
                              onChange={value => {
                                handleSelectExplore(key, value)
                              }}
                            />
                          )
                        })}
                      </FormGroup>
                    </Col>
                    <Col sm='12'>
                      <Button.Ripple className='btn-icon' color='success' onClick={() => handleAddExplore()}>
                        <Plus size={14} />
                        <span className='align-middle ml-25'>Explore</span>
                      </Button.Ripple>
                    </Col>
                  </Row>
                </Col>
                <Col sm='12' md='6'>
                  <Row>
                    <Col sm='12'>
                      <FormGroup>
                        <Label for='skills'>Keahlian yang dimiliki</Label>
                        {skills.map((data, key) => {
                          return (
                            <Select
                              key={key}
                              id={`skill-${key}`}
                              theme={selectThemeColors}
                              isClearable={false}
                              className='react-select mb-1'
                              classNamePrefix='select'
                              options={dataSkills.map(r => {
                                return {
                                  label: r.param_value,
                                  value: r.param_value
                                }
                              })}
                              value={data}
                              onChange={value => {
                                handleSelectSkill(key, value)
                              }}
                            />
                          )
                        })}
                      </FormGroup>
                    </Col>
                    <Col sm='12'>
                      <Button.Ripple className='btn-icon' color='success' onClick={() => handleAddSkill()}>
                        <Plus size={14} />
                        <span className='align-middle ml-25'>Skill</span>
                      </Button.Ripple>
                    </Col>
                  </Row>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='total_current_course'>Jumlah Matakuliah</Label>
                    <Input
                      id='total_current_course'
                      name='total_current_course'
                      type='number'
                      placeholder='Jumlah Matakuliah'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.total_current_course
                      })}
                      defaultValue={store.selected.total_current_course}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='total_current_study_credit'>Jumlah SKS</Label>
                    <Input
                      id='total_current_study_credit'
                      name='total_current_study_credit'
                      type='number'
                      placeholder='Jumlah SKS'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.total_current_study_credit
                      })}
                      defaultValue={store.selected.total_current_study_credit}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='phone'>No. HP Mahasiswa</Label>
                    <Input
                      id='phone'
                      name='phone'
                      placeholder='No. HP Mahasiswa'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.phone
                      })}
                      defaultValue={store.selected.phone}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='email'>E-Mail Mahasiswa</Label>
                    <Input
                      id='email'
                      name='email'
                      placeholder='E-Mail Mahasiswa'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.email
                      })}
                      defaultValue={store.selected.email}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='kmbi_duration_interest'>Minat Durasi KMBI</Label>
                    <Controller
                      name='kmbi_duration_interest'
                      id='kmbi_duration_interest'
                      control={control}
                      invalid={data !== null && (data.kmbi_duration_interest === undefined || data.kmbi_duration_interest === null)}
                      defaultValue={selectedDurationInterest}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={durationSemesters}
                            value={selectedDurationInterest}
                            onChange={data => {
                              onChange(data)
                              setSelectedDurationInterest(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <Users size={20} className='mr-50' />
                    <span className='align-middle'>Dosen Pembimbing KMBI (jika belum ada, diisi dengan Nama PIC PT)</span>
                  </h4>
                </Col>
                {lectures.map((data, key) => {
                  return (
                    <Fragment key={key}>
                      <Col sm='12' md='6'>
                        <FormGroup>
                          <Label for='supporting_lecturer'>Dosen Pembimbing {`${key + 1}`}</Label>
                          <Input
                            id='supporting_lecturer'
                            name={`supporting_lecturer[${key}]`}
                            placeholder='Nama Dosen'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.supporting_lecturer
                            })}
                            defaultValue={data.supporting_lecturer}
                          />
                        </FormGroup>
                      </Col>
                      <Col md='6'>
                        <FormGroup>
                          <Label for='email_lecturer'>Email Dosen Pembimbing {`${key + 1}`}</Label>
                          <Input
                            id='email_lecturer'
                            name={`email_lecturer[${key}]`}
                            placeholder='Email Dosen'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.email_lecturer
                            })}
                            defaultValue={data.email_lecturer}
                          />
                        </FormGroup>
                      </Col>
                    </Fragment>
                  )
                })}
                <Col sm='12'>
                  <Button.Ripple className='btn-icon mb-1' color='success' onClick={() => handleAddDosen()}>
                    <Plus size={14} />
                    <span className='align-middle ml-25'>Dosen</span>
                  </Button.Ripple>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <MapPin size={20} className='mr-50' />
                    <span className='align-middle'>Domisili</span>
                  </h4>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='province_id'>Provinsi</Label>
                    <Controller
                      name='province_id'
                      id='province_id'
                      control={control}
                      invalid={data !== null && (data.province_id === undefined || data.province_id === null)}
                      defaultValue={selectedProvince}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={provinces.allData.map(r => {
                              return {
                                value: r.id_provinsi,
                                label: r.provinsi
                              }
                            })}
                            value={selectedProvince}
                            onChange={data => {
                              onChange(data)
                              setSelectedProvince(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='city'>Kota</Label>
                    <Input
                      id='city'
                      name='city'
                      placeholder='Kota'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.city
                      })}
                      defaultValue={store.selected.city}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <Book size={20} className='mr-50' />
                    <span className='align-middle'>Pengalaman</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='research_experience'>Riset</Label>
                    <ReactSummernote
                      value={riset}
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
                      onChange={setRiset}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='project_experience'>Project</Label>
                    <ReactSummernote
                      value={project}
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
                      onChange={setProject}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='software_experience'>Membuat Aplikasi</Label>
                    <ReactSummernote
                      value={software}
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
                      onChange={setSoftware}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <Book size={20} className='mr-50' />
                    <span className='align-middle'>Prestasi</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='academic_achievement'>Akademik</Label>
                    <ReactSummernote
                      value={akademik}
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
                      onChange={setAkademik}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='non_academic_achievement'>Non Akademik</Label>
                    <ReactSummernote
                      value={nonAkademik}
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
                      onChange={setNonAkademik}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <Book size={20} className='mr-50' />
                    <span className='align-middle'>Motivasi</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='motivation_in_kmbi'>Motivasi mengiktui KMBI</Label>
                    <ReactSummernote
                      value={motivasi}
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
                      onChange={setMotivasi}
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
                  <a href={cv.link} target="_blank">{cv.link}</a>
                </Col>
                <Col sm='12' md='9'>
                  <FormGroup>
                    <Label for='attachment_images'>Pas Photo</Label>
                    <Input
                      id='attachment_images'
                      name='attachment_images'
                      type='file'
                      onChange={onChangePhoto}
                      accept='image/*' 
                    />
                  </FormGroup>
                  <img className="img-fluid" src={photo.link} width="300"/>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Button color='success' className='mb-1 mb-sm-0 mr-0 mr-sm-1' onClick={() => {
                    dispatch(addPesertaStatus({
                      id_kmbi: parseInt(id),
                      status_id: 'KSA'
                    }))
                  }}>
                    Accepted
                  </Button>
                  <Button color='danger' className='mb-1 mb-sm-0 mr-0 mr-sm-1' onClick={() => {
                    dispatch(addPesertaStatus({
                      id_kmbi: parseInt(id),
                      status_id: 'KSR'
                    }))
                  }}>
                    Rejected
                  </Button>
                  <Link to='/kmbi/calon_peserta/list'>
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
                    <span className='align-middle'>KMBI Submission</span>
                  </h4>
                </Col>
                <Col sm='12' md='9'>
                  <FormGroup>
                    <Label for='fullname'>Nama Mahasiswa</Label>
                    <Input
                      id='fullname'
                      name='fullname'
                      placeholder='Nama Mahasiswa'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.fullname
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='handler'>Satuan Kerja</Label>
                    <Controller
                      name='handler'
                      id='handler'
                      control={control}
                      invalid={data !== null && (data.handler === undefined || data.handler === null)}
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
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='university_id'>Perguruan Tinggi</Label>
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
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='majoring'>Program Studi</Label>
                    <Controller
                      name='majoring'
                      id='majoring'
                      control={control}
                      invalid={data !== null && (data.majoring === undefined || data.majoring === null)}
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
                <Col sm='12' md='2'>
                  <FormGroup>
                    <Label for='strata'>Strata</Label>
                    <Controller
                      name='strata'
                      id='strata'
                      control={control}
                      invalid={data !== null && (data.strata === undefined || data.strata === null)}
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
                    <Label for='semester'>Semester</Label>
                    <Controller
                      name='semester'
                      id='semester'
                      control={control}
                      invalid={data !== null && (data.semester === undefined || data.semester === null)}
                      defaultValue={selectedSemester}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={semesters}
                            value={selectedSemester}
                            onChange={data => {
                              onChange(data)
                              setSelectedSemester(data)
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
                <Col sm='12' md='6'>
                  <Row>
                    <Col sm='12'>
                      <FormGroup>
                        <Label for='exploration_interest'>Minat Area Explorasi</Label>
                        {explores.map((data, key) => {
                          return (
                            <Select
                              key={key}
                              id={`explore-${key}`}
                              theme={selectThemeColors}
                              isClearable={false}
                              className='react-select mb-1'
                              classNamePrefix='select'
                              options={dataExplores.map(r => {
                                return {
                                  label: r.param_value,
                                  value: r.param_value
                                }
                              })}
                              value={data}
                              onChange={value => {
                                handleSelectExplore(key, value)
                              }}
                            />
                          )
                        })}
                      </FormGroup>
                    </Col>
                    <Col sm='12'>
                      <Button.Ripple className='btn-icon' color='success' onClick={() => handleAddExplore()}>
                        <Plus size={14} />
                        <span className='align-middle ml-25'>Explore</span>
                      </Button.Ripple>
                    </Col>
                  </Row>
                </Col>
                <Col sm='12' md='6'>
                  <Row>
                    <Col sm='12'>
                      <FormGroup>
                        <Label for='skills'>Keahlian yang dimiliki</Label>
                        {skills.map((data, key) => {
                          return (
                            <Select
                              key={key}
                              id={`skill-${key}`}
                              theme={selectThemeColors}
                              isClearable={false}
                              className='react-select mb-1'
                              classNamePrefix='select'
                              options={dataSkills.map(r => {
                                return {
                                  label: r.param_value,
                                  value: r.param_value
                                }
                              })}
                              value={data}
                              onChange={value => {
                                handleSelectSkill(key, value)
                              }}
                            />
                          )
                        })}
                      </FormGroup>
                    </Col>
                    <Col sm='12'>
                      <Button.Ripple className='btn-icon' color='success' onClick={() => handleAddSkill()}>
                        <Plus size={14} />
                        <span className='align-middle ml-25'>Skill</span>
                      </Button.Ripple>
                    </Col>
                  </Row>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='total_current_course'>Jumlah Matakuliah</Label>
                    <Input
                      id='total_current_course'
                      name='total_current_course'
                      type='number'
                      placeholder='Jumlah Matakuliah'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.total_current_course
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='total_current_study_credit'>Jumlah SKS</Label>
                    <Input
                      id='total_current_study_credit'
                      name='total_current_study_credit'
                      type='number'
                      placeholder='Jumlah SKS'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.total_current_study_credit
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='phone'>No. HP Mahasiswa</Label>
                    <Input
                      id='phone'
                      name='phone'
                      placeholder='No. HP Mahasiswa'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.phone
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='email'>E-Mail Mahasiswa</Label>
                    <Input
                      id='email'
                      name='email'
                      placeholder='E-Mail Mahasiswa'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.email
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='3'>
                  <FormGroup>
                    <Label for='kmbi_duration_interest'>Minat Durasi KMBI</Label>
                    <Controller
                      name='kmbi_duration_interest'
                      id='kmbi_duration_interest'
                      control={control}
                      invalid={data !== null && (data.kmbi_duration_interest === undefined || data.kmbi_duration_interest === null)}
                      defaultValue={selectedDurationInterest}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={durationSemesters}
                            value={selectedDurationInterest}
                            onChange={data => {
                              onChange(data)
                              setSelectedDurationInterest(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <Users size={20} className='mr-50' />
                    <span className='align-middle'>Dosen Pembimbing KMBI (jika belum ada, diisi dengan Nama PIC PT)</span>
                  </h4>
                </Col>
                {lectures.map((data, key) => {
                  return (
                    <Fragment key={key}>
                      <Col sm='12' md='6'>
                        <FormGroup>
                          <Label for='supporting_lecturer'>Dosen Pembimbing {`${key + 1}`}</Label>
                          <Input
                            id='supporting_lecturer'
                            name={`supporting_lecturer[${key}]`}
                            placeholder='Nama Dosen'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.supporting_lecturer
                            })}
                            defaultValue={data.supporting_lecturer}
                          />
                        </FormGroup>
                      </Col>
                      <Col md='6'>
                        <FormGroup>
                          <Label for='email_lecturer'>Email Dosen Pembimbing {`${key + 1}`}</Label>
                          <Input
                            id='email_lecturer'
                            name={`email_lecturer[${key}]`}
                            placeholder='Email Dosen'
                            innerRef={register({ required: true })}
                            className={classnames({
                              'is-invalid': errors.email_lecturer
                            })}
                            defaultValue={data.email_lecturer}
                          />
                        </FormGroup>
                      </Col>
                    </Fragment>
                  )
                })}
                <Col sm='12'>
                  <Button.Ripple className='btn-icon mb-1' color='success' onClick={() => handleAddDosen()}>
                    <Plus size={14} />
                    <span className='align-middle ml-25'>Dosen</span>
                  </Button.Ripple>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <MapPin size={20} className='mr-50' />
                    <span className='align-middle'>Domisili</span>
                  </h4>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='province_id'>Provinsi</Label>
                    <Controller
                      name='province_id'
                      id='province_id'
                      control={control}
                      invalid={data !== null && (data.province_id === undefined || data.province_id === null)}
                      defaultValue={selectedProvince}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={provinces.allData.map(r => {
                              return {
                                value: r.id_provinsi,
                                label: r.provinsi
                              }
                            })}
                            value={selectedProvince}
                            onChange={data => {
                              onChange(data)
                              setSelectedProvince(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='city'>Kota</Label>
                    <Input
                      id='city'
                      name='city'
                      placeholder='Kota'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.city
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <Book size={20} className='mr-50' />
                    <span className='align-middle'>Pengalaman</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='research_experience'>Riset</Label>
                    <ReactSummernote
                      value={riset}
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
                      onChange={setRiset}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='project_experience'>Project</Label>
                    <ReactSummernote
                      value={project}
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
                      onChange={setProject}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='software_experience'>Membuat Aplikasi</Label>
                    <ReactSummernote
                      value={software}
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
                      onChange={setSoftware}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <Book size={20} className='mr-50' />
                    <span className='align-middle'>Prestasi</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='academic_achievement'>Akademik</Label>
                    <ReactSummernote
                      value={akademik}
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
                      onChange={setAkademik}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='non_academic_achievement'>Non Akademik</Label>
                    <ReactSummernote
                      value={nonAkademik}
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
                      onChange={setNonAkademik}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <Book size={20} className='mr-50' />
                    <span className='align-middle'>Motivasi</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='motivation_in_kmbi'>Motivasi mengiktui KMBI</Label>
                    <ReactSummernote
                      value={motivasi}
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
                      onChange={setMotivasi}
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
                </Col>
                <Col sm='12' md='9'>
                  <FormGroup>
                    <Label for='attachment_images'>Pas Photo</Label>
                    <Input
                      id='attachment_images'
                      name='attachment_images'
                      type='file'
                      onChange={onChangePhoto}
                      accept='image/*' 
                    />
                  </FormGroup>
                  {photo.link && <img className="img-fluid" src={photo.link} width="300"/>}
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/kmbi/calon_peserta/list'>
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
