// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addQuiz } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataGlobalParam } from '@src/views/backend/master/global_param/store/action'

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
  const [questions, setQuestions] = useState([
    {
      question: "",
      type_question: "",
      parent_id: "0",
      sort: "1",
      answers: []
    }
  ])

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount
  useEffect(() => {

    if (store.selected !== null && store.selected !== undefined) {

    } 

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

      setData(data)
      
      if (id) {
        data.id_quiz = id
      }

      dispatch(addQuiz(data))
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
                    <span className='align-middle'>Edit Quiz</span>
                  </h4>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='code_quiz'><FormattedMessage id='Code'/></Label>
                    <Input
                      id='code_quiz'
                      name='code_quiz'
                      defaultValue={store.selected.code_quiz}
                      placeholder={intl.formatMessage({id: 'Name'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.code_quiz
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
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
                <Col lg='4' md='6'>
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
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='rondomize'>Rondomize</Label>
                    <Input
                      id='rondomize'
                      name='rondomize'
                      type='number'
                      defaultValue={store.selected.rondomize}
                      placeholder={'Rondomize'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.rondomize
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
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
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='duration'>{intl.formatMessage({id: 'Duration'})}</Label>
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
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='code_quiz'><FormattedMessage id='Code'/></Label>
                    <Input
                      id='code_quiz'
                      name='code_quiz'
                      placeholder={intl.formatMessage({id: 'Name'})}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.code_quiz
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
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
                <Col lg='4' md='6'>
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
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='rondomize'>Rondomize</Label>
                    <Input
                      id='rondomize'
                      name='rondomize'
                      type='number'
                      placeholder={'Rondomize'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.rondomize
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
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
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='duration'>{intl.formatMessage({id: 'Duration'})}</Label>
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
