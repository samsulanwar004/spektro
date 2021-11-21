// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addQuiz } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataGlobalParam } from '@src/views/backend/master/global_param/store/action'

// ** Third Party Components
import { User, Info, Share2, MapPin, Check, X, Plus } from 'react-feather'
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

const QuizSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.quizs),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl(),
    globalparams = useSelector(state => state.globalparams)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  // ** State
  const [data, setData] = useState(null)
  const [types, setTypes] = useState([])
  const [randomize, setRandomize] = useState(false)
  const [questions, setQuestions] = useState([
    {
      question: "",
      type_question: "Header",
      parent_id: "0",
      child: [
        {
          question: "",
          type_question: "",
          answers: [{label: '',  value: ''}],
          bobot: '',
          key_answers: ''
        } 
      ]
    }
  ])

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount

  useEffect(() => {

    if (store.selected !== null && store.selected !== undefined) {
      setRandomize(store.selected.randomize === 1)
      setQuestions(store.selected.questions ? store.selected.questions : [])
    } 
  }, [])

  useEffect(() => {

    dispatch(getAllDataGlobalParam({
      key: 'TYPE_SOAL'
    }))
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/master/quiz/list")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }

    if (globalparams.params?.key === 'TYPE_SOAL') {
      setTypes(globalparams.allData)
    }
  }, [store.loading, globalparams.allData])

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      const duration = Array.isArray(data.duration) ? data.duration[0].toTimeString().split(' ')[0] : data.duration

      data.duration = duration

      setData(data)
      
      if (id) {
        data.id_quiz = id
      }

      data.randomize = randomize ? 1 : 0
      data.questions = questions

      dispatch(addQuiz(data))
    }
  }

  const handleAddHeader = () => {
    let oldQuestions = questions
    oldQuestions = oldQuestions.concat({
      question: "",
      type_question: "Header",
      parent_id: "0",
      child: [
        {
          question: "",
          type_question: "",
          answers: [{label: '',  value: ''}],
          bobot: '',
          key_answers: ''
        } 
      ]
    })
    setQuestions(oldQuestions)
  }

  const handleDeleteQuestion = (key) => {
    let oldQuestions = questions
    oldQuestions = oldQuestions.filter((d, k) => k !== key)
    setQuestions(oldQuestions)
  }

  const handleTextValue = (key, name, value) => {
    let oldQuestions = questions
    oldQuestions = oldQuestions.map((d, k) => {
      if (k === key) {
        d[name] = value
      }
      return d
    })

    setQuestions(oldQuestions)
  }

  const handleAddQuestion = (key) => {
    let oldQuestions = questions
    let oldChild = oldQuestions[key].child

    oldChild = oldChild.concat({
      question: "",
      type_question: "",
      answers: [{label: '',  value: ''}],
      bobot: '',
      key_answers: ''
    })

    oldQuestions = oldQuestions.map((data, ky) => {
      if (ky === key) {
        data.child = oldChild
      }

      return data
    })
    setQuestions(oldQuestions)
  }

  const handleDeleteChild = (key, k) => {
    let oldQuestions = questions

    const oldChild = oldQuestions[key].child.filter((dt, ki) => ki !== k)
    oldQuestions = oldQuestions.map((data, ky) => {
      if (ky === key) {
        data.child = oldChild
      }

      return data
    })
    setQuestions(oldQuestions)
  }

  const handleTextChildValue = (key, k, name, value) => {
    let oldQuestions = questions
    let oldChild = oldQuestions[key].child

    oldChild = oldChild.map((dt, ki) => {
      if (ki === k) {
        dt[name] = value
      }

      return dt
    })

    oldQuestions = oldQuestions.map((data, ky) => {
      if (ky === key) {
        data.child = oldChild
      }

      return data
    })

    setQuestions(oldQuestions)
  }

  const handleAddAnswer = (key, k) => {
    let oldQuestions = questions
    let oldAnswer = oldQuestions[key].child[k].answers

    oldAnswer = oldAnswer.concat({label: '',  value: ''})

    oldQuestions = oldQuestions.map((data, ky) => {
      if (ky === key) {
        data.child = data.child.map((dt, ki) => {
          if (ki === k) {
            dt.answers = oldAnswer
          }
          return dt
        })
      }

      return data
    })

    setQuestions(oldQuestions)
  }

  const handleDeleteAnswer = (key, k, ki) => {
    let oldQuestions = questions

    const oldAnswer = oldQuestions[key].child[k].answers.filter((dt, ky) => ky !== ki)

    oldQuestions = oldQuestions.map((data, ky) => {
      if (ky === key) {
        data.child = data.child.map((dt, ki) => {
          if (ki === k) {
            dt.answers = oldAnswer
          }
          return dt
        })
      }

      return data
    })

    setQuestions(oldQuestions)
  }

  const handleTextAnswerValue = (key, k, ki, name, value) => {
    let oldQuestions = questions
    let oldAnswer = oldQuestions[key].child[k].answers

    oldAnswer = oldAnswer.map((dt, ky) => {
      if (ky === ki) {
        dt[name] = value
      }

      return dt
    })

    oldQuestions = oldQuestions.map((data, ky) => {
      if (ky === key) {
        data.child = data.child.map((dt, ki) => {
          if (ki === k) {
            dt.answers = oldAnswer
          }
          return dt
        })
      }

      return data
    })

    setQuestions(oldQuestions)
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
                    <span className='align-middle'>Edit Quiz</span>
                  </h4>
                </Col>
                <Col lg='2' md='6'>
                  <FormGroup>
                    <Label for='code_quiz'><FormattedMessage id='Code'/></Label>
                    <Input
                      id='code_quiz'
                      name='code_quiz'
                      defaultValue={store.selected.code_quiz}
                      placeholder={intl.formatMessage({id: 'Code'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.code_quiz
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='10' md='6'>
                  <FormGroup>
                    <Label for='title_quiz'><FormattedMessage id='Name'/></Label>
                    <Input
                      id='title_quiz'
                      name='title_quiz'
                      defaultValue={store.selected.title_quiz}
                      placeholder={intl.formatMessage({id: 'Name'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.title_quiz
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='passing_score'>Passing score</Label>
                    <Input
                      id='passing_score'
                      name='passing_score'
                      type='number'
                      defaultValue={store.selected.passing_score}
                      placeholder={'Passing score'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.passing_score
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='attemp'>Attemp</Label>
                    <Input
                      id='attemp'
                      name='attemp'
                      type='number'
                      defaultValue={store.selected.attemp}
                      placeholder={'Attemp'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.attemp
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='duration'>{intl.formatMessage({id: 'Duration'})}</Label>
                    <Controller
                      id='duration'
                      name='duration'
                      as={Flatpickr}
                      control={control}
                      placeholder='HH:ii'
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: 'H:i',
                        time_24hr: true
                      }}
                      defaultValue={store.selected.duration}
                      className={classnames('form-control', {
                        'is-invalid': errors.duration
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='randomize'>Randomize</Label>
                    <CustomInput type='checkbox' id='randomize' onChange={() => setRandomize(!randomize)} checked={randomize}/>
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  {questions.map((data, key) => {
                    return (
                      <Row className='align-items-center' key={key}>
                        <Col md={10}>
                          <FormGroup>
                            <Label for={`question-${key}`}>Header</Label>
                            <Input type='text' id={`question-${key}`} value={data.question} placeholder='Header' onChange={(e) => handleTextValue(key, 'question', e.target.value)} />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <Button.Ripple color='danger' className='text-nowrap px-1' style={{marginTop: '5px'}} onClick={() => handleDeleteQuestion(key)} outline>
                            <X size={14} className='mr-50' />
                            <span>{intl.formatMessage({id: 'Delete'})}</span>
                          </Button.Ripple>
                        </Col>
                        <Col md={4}/>
                        <Col sm={12}>
                        {data.child.map((d, k) => {
                          return (
                            <Row className='align-items-center ml-1' key={k}>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for={`question-${k}`}>Question</Label>
                                  <Input type='textarea' id={`question-${k}`} value={d.question} placeholder='Question' onChange={(e) => handleTextChildValue(key, k, 'question', e.target.value)} />
                                </FormGroup>
                              </Col>
                              <Col md={7}>
                                <FormGroup>
                                  <Label for={`key_answers-${k}`}>Kunci Jawaban</Label>
                                  <Input type='text' id={`key_answers-${k}`} value={d.key_answers} placeholder='Kunci jawaban' onChange={(e) => handleTextChildValue(key, k, 'key_answers', e.target.value)} />
                                </FormGroup>
                              </Col>
                              <Col md={1}>
                                <FormGroup>
                                  <Label for={`bobot-${k}`}>Bobot</Label>
                                  <Input type='number' id={`bobot-${k}`} value={d.bobot} placeholder='Bobot' onChange={(e) => handleTextChildValue(key, k, 'bobot', e.target.value)} />
                                </FormGroup>
                              </Col>
                              <Col md={2}>
                                <FormGroup>
                                  <Label for={`type-${k}`}>{intl.formatMessage({id: 'Type'})}</Label>
                                  <Select
                                    id={`type-${k}`}
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={types.filter(r => r.param_value !== 'Header').map(r => {
                                      return {
                                        label: r.param_value,
                                        value: r.param_value
                                      }
                                    })}
                                    value={d.type_question}
                                    onChange={value => {
                                      handleTextChildValue(key, k, 'type_question', value)
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={2}>
                                <Button.Ripple color='danger' className='text-nowrap px-1' style={{marginTop: '5px'}} onClick={() => handleDeleteChild(key, k)} outline>
                                  <X size={14} className='mr-50' />
                                  <span>{intl.formatMessage({id: 'Delete'})}</span>
                                </Button.Ripple>
                              </Col>
                              {['Dropdown', 'CheckBox', 'RadioButton'].includes(d.type_question.value) &&
                                <>
                                  <Col md={12}>
                                    {d.answers.map((dt, ki) => {
                                      return (
                                        <Row className='align-items-center' key={ki}>
                                          <Col md={10}>
                                            <FormGroup>
                                              <Label for={`value-${ki}`}>Value</Label>
                                              <Input type='text' id={`value-${ki}`} value={dt.value} placeholder='Value' onChange={(e) => {
                                                handleTextAnswerValue(key, k, ki, 'label', e.target.value)
                                                handleTextAnswerValue(key, k, ki, 'value', e.target.value)
                                              }} />
                                            </FormGroup>
                                          </Col>
                                          <Col md={2}>
                                            <Button.Ripple color='danger' className='text-nowrap px-1' style={{marginTop: '5px'}} onClick={() => handleDeleteAnswer(key, k, ki)} outline>
                                              <X size={14} className='mr-50' />
                                              <span>{intl.formatMessage({id: 'Delete'})}</span>
                                            </Button.Ripple>
                                          </Col>
                                        </Row>
                                      )
                                    })}
                                  </Col>
                                  <Col md={12}>
                                    <Button.Ripple className='btn-icon' color='success' style={{marginTop: '5px', marginBottom: '10px'}} onClick={() => handleAddAnswer(key, k)}>
                                      <Plus size={14} />
                                      <span className='align-middle ml-25'>Answer</span>
                                    </Button.Ripple>
                                  </Col>
                                </>
                              }
                            </Row>
                          )
                        })}
                        </Col>
                        <Col md={12}>
                          <Button.Ripple className='btn-icon' color='success' onClick={() => handleAddQuestion(key)}>
                            <Plus size={14} />
                            <span className='align-middle ml-25'>Question</span>
                          </Button.Ripple>
                        </Col>
                        <Col sm={12}>
                          <hr />
                        </Col>
                      </Row>
                    )
                  })}
                </Col>
                <Col sm='12' className='d-flex justify-content-between'>
                  <Button.Ripple className='btn-icon' color='success' onClick={() => handleAddHeader()}>
                    <Plus size={14} />
                    <span className='align-middle ml-25'>Header</span>
                  </Button.Ripple>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/master/quiz/list'>
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
                    <span className='align-middle'><FormattedMessage id='Add'/> Quiz</span>
                  </h4>
                </Col>
                <Col lg='2' md='6'>
                  <FormGroup>
                    <Label for='code_quiz'><FormattedMessage id='Code'/></Label>
                    <Input
                      id='code_quiz'
                      name='code_quiz'
                      placeholder={intl.formatMessage({id: 'Code'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.code_quiz
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='10' md='6'>
                  <FormGroup>
                    <Label for='title_quiz'><FormattedMessage id='Name'/></Label>
                    <Input
                      id='title_quiz'
                      name='title_quiz'
                      placeholder={intl.formatMessage({id: 'Name'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.title_quiz
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='passing_score'>Passing score</Label>
                    <Input
                      id='passing_score'
                      name='passing_score'
                      type='number'
                      placeholder={'Passing score'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.passing_score
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='attemp'>Attemp</Label>
                    <Input
                      id='attemp'
                      name='attemp'
                      type='number'
                      placeholder={'Attemp'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.attemp
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='duration'>{intl.formatMessage({id: 'Duration'})}</Label>
                    <Controller
                      id='duration'
                      name='duration'
                      as={Flatpickr}
                      control={control}
                      placeholder='HH:ii'
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: 'H:i',
                        time_24hr: true
                      }}
                      defaultValue={''}
                      className={classnames('form-control', {
                        'is-invalid': errors.duration
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='3' md='6'>
                  <FormGroup>
                    <Label for='randomize'>Randomize</Label>
                    <CustomInput type='checkbox' id='randomize' onChange={() => setRandomize(!randomize)} checked={randomize}/>
                  </FormGroup>
                </Col>
                <Col sm='12'>
                  {questions.map((data, key) => {
                    return (
                      <Row className='align-items-center' key={key}>
                        <Col md={10}>
                          <FormGroup>
                            <Label for={`question-${key}`}>Header</Label>
                            <Input type='text' id={`question-${key}`} value={data.question} placeholder='Header' onChange={(e) => handleTextValue(key, 'question', e.target.value)} />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <Button.Ripple color='danger' className='text-nowrap px-1' style={{marginTop: '5px'}} onClick={() => handleDeleteQuestion(key)} outline>
                            <X size={14} className='mr-50' />
                            <span>{intl.formatMessage({id: 'Delete'})}</span>
                          </Button.Ripple>
                        </Col>
                        <Col md={4}/>
                        <Col sm={12}>
                        {data.child.map((d, k) => {
                          return (
                            <Row className='align-items-center ml-1' key={k}>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for={`question-${k}`}>Question</Label>
                                  <Input type='textarea' id={`question-${k}`} value={d.question} placeholder='Question' onChange={(e) => handleTextChildValue(key, k, 'question', e.target.value)} />
                                </FormGroup>
                              </Col>
                              <Col md={7}>
                                <FormGroup>
                                  <Label for={`key_answers-${k}`}>Kunci Jawaban</Label>
                                  <Input type='text' id={`key_answers-${k}`} value={d.key_answers} placeholder='Kunci jawaban' onChange={(e) => handleTextChildValue(key, k, 'key_answers', e.target.value)} />
                                </FormGroup>
                              </Col>
                              <Col md={1}>
                                <FormGroup>
                                  <Label for={`bobot-${k}`}>Bobot</Label>
                                  <Input type='number' id={`bobot-${k}`} value={d.bobot} placeholder='Bobot' onChange={(e) => handleTextChildValue(key, k, 'bobot', e.target.value)} />
                                </FormGroup>
                              </Col>
                              <Col md={2}>
                                <FormGroup>
                                  <Label for={`type-${k}`}>{intl.formatMessage({id: 'Type'})}</Label>
                                  <Select
                                    id={`type-${k}`}
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={types.filter(r => r.param_value !== 'Header').map(r => {
                                      return {
                                        label: r.param_value,
                                        value: r.param_value
                                      }
                                    })}
                                    value={d.type_question}
                                    onChange={value => {
                                      handleTextChildValue(key, k, 'type_question', value)
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={2}>
                                <Button.Ripple color='danger' className='text-nowrap px-1' style={{marginTop: '5px'}} onClick={() => handleDeleteChild(key, k)} outline>
                                  <X size={14} className='mr-50' />
                                  <span>{intl.formatMessage({id: 'Delete'})}</span>
                                </Button.Ripple>
                              </Col>
                              {['Dropdown', 'CheckBox', 'RadioButton'].includes(d.type_question.value) &&
                                <>
                                  <Col md={12}>
                                    {d.answers.map((dt, ki) => {
                                      return (
                                        <Row className='align-items-center' key={ki}>
                                          <Col md={10}>
                                            <FormGroup>
                                              <Label for={`value-${ki}`}>Value</Label>
                                              <Input type='text' id={`value-${ki}`} value={dt.value} placeholder='Value' onChange={(e) => {
                                                handleTextAnswerValue(key, k, ki, 'label', e.target.value)
                                                handleTextAnswerValue(key, k, ki, 'value', e.target.value)
                                              }} />
                                            </FormGroup>
                                          </Col>
                                          <Col md={2}>
                                            <Button.Ripple color='danger' className='text-nowrap px-1' style={{marginTop: '5px'}} onClick={() => handleDeleteAnswer(key, k, ki)} outline>
                                              <X size={14} className='mr-50' />
                                              <span>{intl.formatMessage({id: 'Delete'})}</span>
                                            </Button.Ripple>
                                          </Col>
                                        </Row>
                                      )
                                    })}
                                  </Col>
                                  <Col md={12}>
                                    <Button.Ripple className='btn-icon' color='success' style={{marginTop: '5px', marginBottom: '10px'}} onClick={() => handleAddAnswer(key, k)}>
                                      <Plus size={14} />
                                      <span className='align-middle ml-25'>Answer</span>
                                    </Button.Ripple>
                                  </Col>
                                </>
                              }
                            </Row>
                          )
                        })}
                        </Col>
                        <Col md={12}>
                          <Button.Ripple className='btn-icon' color='success' onClick={() => handleAddQuestion(key)}>
                            <Plus size={14} />
                            <span className='align-middle ml-25'>Question</span>
                          </Button.Ripple>
                        </Col>
                        <Col sm={12}>
                          <hr />
                        </Col>
                      </Row>
                    )
                  })}
                </Col>
                <Col sm='12' className='d-flex justify-content-between'>
                  <Button.Ripple className='btn-icon' color='success' onClick={() => handleAddHeader()}>
                    <Plus size={14} />
                    <span className='align-middle ml-25'>Header</span>
                  </Button.Ripple>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/master/quiz/list'>
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
export default QuizSave
