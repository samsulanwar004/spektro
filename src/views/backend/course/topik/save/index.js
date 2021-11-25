// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addTopik } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataTrainer } from '@src/views/backend/course/trainer/store/action'
import { getAllDataGlobalParam, uploadImage } from '@src/views/backend/master/global_param/store/action'
import { getAllDataRepository } from '@src/views/backend/master/repository_file/store/action'
import { getAllDataQuiz } from '@src/views/backend/master/quiz/store/action'
import { getAllDataSurvey } from '@src/views/backend/master/survey/store/action'

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

const GlobalParamSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.topiks),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl(),
    trainers = useSelector(state => state.trainers),
    globalparams = useSelector(state => state.globalparams),
    repositorys = useSelector(state => state.repositorys),
    quizs = useSelector(state => state.quizs),
    surveys = useSelector(state => state.surveys)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  // ** State
  const [data, setData] = useState(null)
  const [selectedTrainer, setSelectedTrainer] = useState({value: '', label: 'Select...'})
  const [types, setTypes] = useState([])
  const [sesi, setSesi] = useState([
    {
      type: '',
      sesi: '',
      url_path: '',
      id_quiz: '',
      id_survey: '',
      id_sesi: ''
    }
  ])
  const [editor, setEditor] = useState('')

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount
  useEffect(() => {

    if (store.selected !== null && store.selected !== undefined) {
      setSelectedTrainer(store.selected.id_trainer)
      setEditor(store.selected.desc)
      setSesi(store.selected.sesi)
    }

    dispatch(getAllDataTrainer())
    dispatch(getAllDataRepository())
    dispatch(getAllDataQuiz())
    dispatch(getAllDataSurvey())
    dispatch(getAllDataGlobalParam({
      key: 'TYPE_SESI'
    }))

    $('.modal-title').remove()
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/course/topik/list")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }

    if (globalparams.params?.key === 'TYPE_SESI') {
      setTypes(globalparams.allData)
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

      setData(data)
      
      if (id) {
        data.id_topik  = id
        data.course_use = store.selected.course_use > 0 ? 1 : 0
      } else {
        data.course_use = 0
      }

      data.desc = editor
      data.sesi = sesi

      dispatch(addTopik(data))
    }
  }

  const handleDelete = (key) => {
    let oldSesi = sesi
    oldSesi = oldSesi.filter((d, k) => k !== key)
    setSesi(oldSesi)
  }

  const handleTextValue = (key, name, value) => {
    let oldSesi = sesi
    oldSesi = oldSesi.map((d, k) => {
      if (k === key) {
        d[name] = value
      }
      return d
    })

    setSesi(oldSesi)
  }

  const handleAdd = () => {
    let oldSesi = sesi

    oldSesi = oldSesi.concat({
      type: '',
      sesi: '',
      url_path: '',
      id_quiz: '',
      id_survey: '',
      id_sesi: ''
    })

    setSesi(oldSesi)
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
                    <span className='align-middle'>Edit Topik</span>
                  </h4>
                </Col>
                <Col lg='8' md='6'>
                  <FormGroup>
                    <Label for='topik'>Topik</Label>
                    <Input
                      id='topik'
                      name='topik'
                      defaultValue={store.selected.topik}
                      placeholder='Topik'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.topik
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='id_trainer'>Trainer</Label>
                    <Controller
                      name='id_trainer'
                      id='id_trainer'
                      control={control}
                      invalid={data !== null && (data.id_trainer === undefined || data.id_trainer === null)}
                      defaultValue={selectedTrainer}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={trainers.allData.map(r => {
                              return {
                                value: r.id_trainer,
                                label: `${r.fullname}, ${r.gelar}`
                              }
                            })}
                            value={selectedTrainer}
                            onChange={data => {
                              onChange(data)
                              setSelectedTrainer(data)
                            }}
                          />
                        )
                      }}
                    />
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
                <Col sm='12'>
                  <ReactSortable list={sesi} setList={setSesi}>
                    {sesi.map((data, key) => {
                      return (
                        <Row className='pt-2' key={key}>
                          <Col sm='1' className='d-flex align-items-start justify-content-center'>
                            <Avatar color='light-secondary' content={String(key + 1)} size='xl' />
                          </Col>
                          <Col sm='11'>
                            <Row className='align-items-center'>
                              <Col md={3}>
                                <FormGroup>
                                  <Label for={`type-${key}`}>{intl.formatMessage({id: 'Type'})}</Label>
                                  <Select
                                    id={`type-${key}`}
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={types.map(r => {
                                      return {
                                        label: r.param_value,
                                        value: r.param_value
                                      }
                                    })}
                                    value={data.type}
                                    onChange={value => {
                                      handleTextValue(key, 'type', value)
                                      if (value.value !== 'Quiz') {
                                        handleTextValue(key, 'id_quiz', '')
                                      }
                                      if (value.value !== 'Survey') {
                                        handleTextValue(key, 'id_survey', '')
                                      }
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <Label for={`sesi-${key}`}>Sesi</Label>
                                  <Input type='text' id={`sesi-${key}`} value={data.sesi} placeholder='Sesi' onChange={(e) => handleTextValue(key, 'sesi', e.target.value)} />
                                </FormGroup>
                              </Col>
                              {data.type.value === 'Quiz' ? (<Col md={5}>
                                  <FormGroup>
                                    <Label for={`id_quiz-${key}`}>Quiz</Label>
                                    <Select
                                      id={`id_quiz-${key}`}
                                      theme={selectThemeColors}
                                      isClearable={false}
                                      className='react-select'
                                      classNamePrefix='select'
                                      options={quizs.allData.map(r => {
                                        return {
                                          label: r.title_quiz,
                                          value: r.id_quiz
                                        }
                                      })}
                                      value={data.id_quiz}
                                      onChange={value => {
                                        handleTextValue(key, 'id_quiz', value)
                                      }}
                                    />
                                  </FormGroup>
                                </Col>) : (
                                  <>
                                    {data.type.value === 'Survey' ? (<Col md={5}>
                                      <FormGroup>
                                        <Label for={`id_survey-${key}`}>Survey</Label>
                                        <Select
                                          id={`id_survey-${key}`}
                                          theme={selectThemeColors}
                                          isClearable={false}
                                          className='react-select'
                                          classNamePrefix='select'
                                          options={surveys.allData.map(r => {
                                            return {
                                              label: r.name_survey,
                                              value: r.id_survey
                                            }
                                          })}
                                          value={data.id_survey}
                                          onChange={value => {
                                            handleTextValue(key, 'id_survey', value)
                                          }}
                                        />
                                      </FormGroup>
                                    </Col>) : (
                                      <>
                                        <Col md={5}>
                                          <FormGroup>
                                            <Label for={`url_path-${key}`}>File</Label>
                                            <Select
                                              id={`url_path-${key}`}
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
                                                handleTextValue(key, 'url_path', value.value)
                                              }}
                                            />
                                          </FormGroup>
                                        </Col>
                                        <Col md={10}>
                                          <FormGroup>
                                            <Label for={`url_path-${key}`}>Url</Label>
                                            <Input type='text' id={`url_path-${key}`} value={data.url_path} placeholder='Url' onChange={(e) => handleTextValue(key, 'url_path', e.target.value)} />
                                          </FormGroup>
                                        </Col>
                                      </>
                                    )}
                                  </>
                                )
                              }
                              <Col md={2}>
                                <Button.Ripple disabled={store.selected.course_use > 0} color='danger' className='text-nowrap px-1' style={{marginTop: '5px'}} onClick={() => handleDelete(key)} outline>
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
                    <span className='align-middle ml-25'>Sesi</span>
                  </Button.Ripple>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/course/topik/list'>
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
                    <span className='align-middle'><FormattedMessage id='Add'/> Topik</span>
                  </h4>
                </Col>
                <Col lg='8' md='6'>
                  <FormGroup>
                    <Label for='topik'>Topik</Label>
                    <Input
                      id='topik'
                      name='topik'
                      placeholder='Topik'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.topik
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='id_trainer'>Trainer</Label>
                    <Controller
                      name='id_trainer'
                      id='id_trainer'
                      control={control}
                      invalid={data !== null && (data.id_trainer === undefined || data.id_trainer === null)}
                      defaultValue={selectedTrainer}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={trainers.allData.map(r => {
                              return {
                                value: r.id_trainer,
                                label: `${r.fullname}, ${r.gelar}`
                              }
                            })}
                            value={selectedTrainer}
                            onChange={data => {
                              onChange(data)
                              setSelectedTrainer(data)
                            }}
                          />
                        )
                      }}
                    />
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
                <Col sm='12' className='pt-2'>
                  <ReactSortable list={sesi} setList={setSesi}>
                    {sesi.map((data, key) => {
                      return (
                        <Row key={key}>
                          <Col sm='1' className='d-flex align-items-start justify-content-center'>
                            <Avatar color='light-secondary' content={String(key + 1)} size='xl' />
                          </Col>
                          <Col sm='11'>
                            <Row className='align-items-center'>
                              <Col md={3}>
                                <FormGroup>
                                  <Label for={`type-${key}`}>{intl.formatMessage({id: 'Type'})}</Label>
                                  <Select
                                    id={`type-${key}`}
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={types.map(r => {
                                      return {
                                        label: r.param_value,
                                        value: r.param_value
                                      }
                                    })}
                                    value={data.type}
                                    onChange={value => {
                                      handleTextValue(key, 'type', value)
                                      if (value.value !== 'Quiz') {
                                        handleTextValue(key, 'id_quiz', '')
                                      }
                                      if (value.value !== 'Survey') {
                                        handleTextValue(key, 'id_survey', '')
                                      }
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <Label for={`sesi-${key}`}>Sesi</Label>
                                  <Input type='text' id={`sesi-${key}`} value={data.sesi} placeholder='Sesi' onChange={(e) => handleTextValue(key, 'sesi', e.target.value)} />
                                </FormGroup>
                              </Col>
                              {data.type.value === 'Quiz' ? (<Col md={5}>
                                  <FormGroup>
                                    <Label for={`id_quiz-${key}`}>Quiz</Label>
                                    <Select
                                      id={`id_quiz-${key}`}
                                      theme={selectThemeColors}
                                      isClearable={false}
                                      className='react-select'
                                      classNamePrefix='select'
                                      options={quizs.allData.map(r => {
                                        return {
                                          label: r.title_quiz,
                                          value: r.id_quiz
                                        }
                                      })}
                                      value={data.id_quiz}
                                      onChange={value => {
                                        handleTextValue(key, 'id_quiz', value)
                                      }}
                                    />
                                  </FormGroup>
                                </Col>) : (
                                  <>
                                    {data.type.value === 'Survey' ? (<Col md={5}>
                                      <FormGroup>
                                        <Label for={`id_survey-${key}`}>Survey</Label>
                                        <Select
                                          id={`id_survey-${key}`}
                                          theme={selectThemeColors}
                                          isClearable={false}
                                          className='react-select'
                                          classNamePrefix='select'
                                          options={surveys.allData.map(r => {
                                            return {
                                              label: r.name_survey,
                                              value: r.id_survey
                                            }
                                          })}
                                          value={data.id_survey}
                                          onChange={value => {
                                            handleTextValue(key, 'id_survey', value)
                                          }}
                                        />
                                      </FormGroup>
                                    </Col>) : (
                                      <>
                                        <Col md={5}>
                                          <FormGroup>
                                            <Label for={`url_path-${key}`}>File</Label>
                                            <Select
                                              id={`url_path-${key}`}
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
                                                handleTextValue(key, 'url_path', value.value)
                                              }}
                                            />
                                          </FormGroup>
                                        </Col>
                                        <Col md={10}>
                                          <FormGroup>
                                            <Label for={`url_path-${key}`}>Url</Label>
                                            <Input type='text' id={`url_path-${key}`} value={data.url_path} placeholder='Url' onChange={(e) => handleTextValue(key, 'url_path', e.target.value)} />
                                          </FormGroup>
                                        </Col>
                                      </>
                                    )}
                                  </>
                                )
                              }
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
                    <span className='align-middle ml-25'>Sesi</span>
                  </Button.Ripple>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/course/topik/list'>
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
