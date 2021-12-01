// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addAssessment, getDataTopikAssessment, getDataQuizAssessment } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import { CheckSquare, Square, Archive, Video, Link as LinkIcon, Check, X, Book, BookOpen, Star} from 'react-feather'
import { Card, CardBody, Row, Col, Alert, Button, Label, FormGroup, Input, CustomInput, Form, Media, Progress, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import Select from 'react-select'
import imageDefault from '@src/assets/images/avatars/avatar-blank.png'
import logoDefault from '@src/assets/images/avatars/picture-blank.png'
import AppCollapse from '@components/app-collapse'
import DocViewer, { DocViewerRenderers } from "react-doc-viewer"
import Rating from 'react-rating'

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

const AssessmentSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.assessments),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl()

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  // ** State
  const [data, setData] = useState(null)
  const [topik, setTopik] = useState([])
  const [logo, setLogo] = useState({file: null, link: null})
  const [file, setFile] = useState({file: null, link: null})
  const [scrollInnerModal, setScrollInnerModal] = useState(false)
  const [quizs, setQuizs] = useState([])
  const [loadFile, setLoadFile] = useState(false)

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount
  useEffect(() => {

    if (store.selected !== null && store.selected !== undefined) {

      const linkLogo = `${process.env.REACT_APP_BASE_URL}${store.selected.image_foto}` 
      setLogo({...logo, link: linkLogo})
      const linkFile = `${process.env.REACT_APP_BASE_URL}${store.selected.content_preview_image}` 
      setFile({...file, link: linkFile})

      dispatch(getDataTopikAssessment(store.selected.id_course, {
        resource_id: store.selected.resource_id
      }))
    } else {
      history.push('/assessment/list')
    }

  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      setScrollInnerModal(false)
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
  }, [store.loading])

  useEffect(() => {
    setQuizs(store.quizAssissment)
    setLoadFile(true)
  }, [store.quizAssissment])

  const handleOpenQuiz = (id_topik, id_quiz) => {
    setScrollInnerModal(true)
    setLoadFile(false)

    dispatch(getDataQuizAssessment({
      id_course: store.selected.id_course,
      id_topik,
      id_quiz
    }))
  }

  useEffect(() => {
    setTopik(store.topikAssissment.map((data, key) => {

      return {
        title: (<h3>{data.topik}</h3>),
        content: (
          <>
            {data.sesi.map((d, k) => {

              if (d.type === 'Materi Topik') {

                return (
                  <div className="d-flex justify-content-between py-1" key={k}>
                    <div className="d-flex justify-content-center">
                      <Archive size={20} color="black" className="mr-50"/>
                      <h6>Materi Topik</h6>
                    </div>
                    {d.status === 1 ? (<CheckSquare color="black" size={20}/>) : (<Square color="black" size={20}/>)}
                  </div>
                )
              } else if (d.type === 'Video') {
                return (
                  <div className="d-flex justify-content-between py-1" key={k}>
                    <div className="d-flex justify-content-center">
                      <Video size={20} color="black" className="mr-50"/>
                      <h6>Video</h6>
                    </div>
                    {d.status === 1 ? (<CheckSquare color="black" size={20}/>) : (<Square color="black" size={20}/>)}
                  </div>
                )
              } else if (d.type === 'Link Eksternal') {
                return (
                  <div className="d-flex justify-content-between py-1" key={k}>
                    <div className="d-flex justify-content-center">
                      <LinkIcon size={20} color="black" className="mr-50"/>
                      <h6>Link Eksternal</h6>
                    </div>
                    {d.status === 1 ? (<CheckSquare color="black" size={20}/>) : (<Square color="black" size={20}/>)}
                  </div>
                )
              } else if (d.type === 'Quiz') {
                return (
                  <div className="d-flex justify-content-between py-1" key={k}>
                    <a className="d-flex justify-content-center" onClick={() => handleOpenQuiz(data.id_topik, d.id_quiz)}>
                      <Book size={20} color="black" className="mr-50"/>
                      <h6 className="mr-50">Quiz</h6>
                    </a>
                    {d.status === 1 ? (<CheckSquare color="black" size={20}/>) : (<Square color="black" size={20}/>)}
                  </div>
                )
              } else if (d.type === 'Survey') {
                return (
                  <div className="d-flex justify-content-between py-1" key={k}>
                    <div className="d-flex justify-content-center">
                      <Book size={20} color="black" className="mr-50"/>
                      <h6>Survey</h6>
                    </div>
                    {d.status === 1 ? (<CheckSquare color="black" size={20}/>) : (<Square color="black" size={20}/>)}
                  </div>
                )
              }
            })}
          </>
        )
      }
    }))
  }, [store.topikAssissment])

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      const nilais = []
      for (let i = 0; i < data.id_answer.length; i++) {
        nilais.push({
          id_answer: data.id_answer[i],
          nilai: data.nilai[i]
        })
      }

      dispatch(addAssessment(nilais))
    }
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

  const handleTextValue = (key, name, value) => {
    let oldQuizs = quizs
    oldQuizs = oldQuizs.map((d, k) => {
      if (k === key) {
        d[name] = value
      }
      return d
    })

    setQuizs(oldQuizs)
  }

  function renderAnswer(value, type) {

    if (type === 'File') {

      return (
        <>
          {loadFile &&
            <DocViewer 
              pluginRenderers={DocViewerRenderers} 
              documents={[{uri: value}]} 
              style={{width: '50%', height: 300}}
              config={{
                header: {
                disableHeader: true,
                disableFileName: true,
                retainURLParams: false
               }
              }}
            />
          }
        </>
      )
    } else if (type === 'Rating') {
      return (
        <div>
          <Rating
            emptySymbol={<Star size={32} fill='#babfc7' stroke='#babfc7' />}
            fullSymbol={<Star size={32} fill='#ff9f43' stroke='#ff9f43' />}
            initialRating={value}
            readonly
          />
        </div>
      )
    }
  }

  return store.selected !== null && store.selected !== undefined && (
    <>
      <Row className='app-user-edit'>
        <Col sm='12'>
          <Card>
            <CardBody className='pt-2'>
              <Row className='mt-1'>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <CheckSquare size={20} className='mr-50' />
                    <span className='align-middle'>Penilaian</span>
                  </h4>
                </Col>
                <Col sm='12' lg='4'>
                  <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : imageDefault} alt='Spektro Logo' onError={() => setLogo({...logo, link: imageDefault})} width='100' />
                    </Media>
                    <Media className='mt-75 ml-1' body>
                      <FormGroup>
                        <Label for='full_name'>Peserta</Label>
                        <h4>{store.selected.full_name}</h4>
                      </FormGroup>
                    </Media>
                  </Media>
                </Col>
                <Col sm='12' lg='8'>
                  <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={file.link ? file.link : logoDefault} alt='Spektro Logo' onError={() => setFile({...file, link: logoDefault})} width='100' />
                    </Media>
                    <Media className='mt-75 ml-1' body>
                      <FormGroup>
                        <Label for='course'>Kursus</Label>
                        <h5>{store.selected.code_course}</h5>
                        <h4 dangerouslySetInnerHTML={{ __html: `${store.selected.course}`}}></h4>
                      </FormGroup>
                    </Media>
                  </Media>
                </Col>
              </Row>
              <Row>
                <Col sm='12'>
                  <AppCollapse data={topik} type='margin' accordion />
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Link to='/assessment/list'>
                    <Button color='secondary' outline>
                      <FormattedMessage id='Back'/>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
        <Modal scrollable isOpen={scrollInnerModal} className="modal-xl" toggle={() => setScrollInnerModal(!scrollInnerModal)}>
          <ModalHeader toggle={() => setScrollInnerModal(!scrollInnerModal)}>
            <div className="d-flex">
              <CheckSquare className='mr-50' color="black" size={20}/> 
              <h4>Penilaian Quiz</h4>
            </div>
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={handleSubmit(onSubmit)}
            >
              {quizs.map((data, key) => {

                return (
                  <Row key={key}>
                    <Col sm='12'>
                      <FormGroup>
                        <Label for='question'>Pertanyaan {key + 1}</Label>
                        <h6>{data.question}</h6>
                      </FormGroup>
                    </Col>
                    <Col sm='12'>
                      <FormGroup>
                        <Label for='key_answers'>Kunci Jawaban</Label>
                        <h6 style={{fontWeight: 300}}>{data.key_answers}</h6>
                      </FormGroup>
                    </Col>
                    <Col sm='12'>
                      <FormGroup>
                        <Label for='bobot'>Bobot</Label>
                        <h6 style={{fontWeight: 300}}>{data.bobot}</h6>
                      </FormGroup>
                    </Col>
                    <Col sm='12'>
                      <FormGroup>
                        <Label for='value'>Jawaban</Label>
                        {data.type_soal === 'File' || data.type_soal === 'Rating' ? renderAnswer(data.value, data.type_soal) : (<h6 style={{fontWeight: 300}}>{data.value}</h6>)}
                      </FormGroup>
                    </Col>
                    <Col sm='6'>
                      <FormGroup>
                        <Label for='nilai'>Nilai</Label>
                        <Input
                          id={`id_answer-${key}`}
                          name={`id_answer[${key}]`}
                          value={data.id_answer}
                          innerRef={register({ required: true })}
                          hidden
                          readOnly
                        />
                        <Input
                          id={`nilai-${key}`}
                          name={`nilai[${key}]`}
                          type='number'
                          value={data.nilai}
                          placeholder="Nilai"
                          innerRef={register({ required: true })}
                          className={classnames({
                            'is-invalid': errors.nilai ? errors.nilai[key] : ''
                          })}
                          onChange={(e) => handleTextValue(key, 'nilai', e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )
              })}
              <Button id="btn-submit" type='submit' hidden/>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() => $('#btn-submit').click()}>
              Simpan
            </Button>
          </ModalFooter>
        </Modal>
      
    </>
  )
}
export default AssessmentSave
