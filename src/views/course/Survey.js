import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media, Button, Label, FormGroup, Input, CustomInput, Form } from 'reactstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getFrontendSurvey, addFrontendQuizAnswer } from '@src/views/course/store/action'

import vendorCSS from '@src/assets/course/vendor/fontawesome-free/css/all.css'
import courseCSS from '@src/assets/course/css/course-page.css'
import styleCSS from '@src/assets/course/css/styles.css'
import courseJS from '@src/assets/course/js/course-page.js'
import easingJS from '@src/assets/course/vendor/jquery-easing/jquery.easing.js'

//** util
import moment from 'moment'
import {shuffle, timeToSeconds} from '@src/utility/Utils'

const Quiz = () => {

  // ** States & Vars
  const store = useSelector(state => state.enrolls),
    dispatch = useDispatch(),
    { courseid } = useParams()

  const [dataQuiz, setDataQuiz] = useState([])
  const [selectIndex, setSelectIndex] = useState(0)
  const [selectQuiz, setSelectQuiz] = useState(null)
  const [answer, setAnswer] = useState([])
  const [quiz, setQuiz] = useState(null)
  const [isPlay, setIsPlay] = useState(false)
  const [timeDuration, setTimeDuration] = useState("00:00:00")
  const [pageIndex, setPageIndex] = useState(0)

  const handleFinishQuiz = () => {

    if (answer.length > 0) {
      dispatch(addFrontendQuizAnswer(answer))
    }

    setSelectIndex(0)
    setSelectQuiz(null)
    setAnswer([])
  }

  useEffect(() => {
    if (!store.selectedSesi) {
      window.location = `/course-home/${courseid}`
      return null
    }
    setIsPlay(false)

    const indexPage = Object.keys(store.dataPageSesi).find(key => store.dataPageSesi[key].id_stage_course === store.selectedSesi.id_stage_course)

    setPageIndex(indexPage)
  }, [dispatch])

  const handleNextPage = () => {
    const index = parseInt(pageIndex) + 1

    if (index >= store.dataPageSesi.length) return null

    const pageSesi = store.dataPageSesi[index]
    $(`#${pageSesi.topik}`).collapse('show')
    $(`.nav-sesi-${pageSesi.id_stage_course}`)[0].click()
  }

  const handlePrevPage = () => {
    const index = parseInt(pageIndex) - 1

    if (index < 0) return null
    const pageSesi = store.dataPageSesi[index]
    $(`#${pageSesi.topik}`).collapse('show')
    $(`.nav-sesi-${pageSesi.id_stage_course}`)[0].click()
  }

  useEffect(() => {
    setQuiz(null)
    setIsPlay(false)
    setTimeout(() => {
      setQuiz(store.selectedSesi.survey)
    }, 100)
  }, [store.selectedSesi])

  useEffect(() => {
    const datas = store.selectedSurvey ? store.selectedSurvey.map(data => {
      return {
        id_question: data.id_question,
        question: data.question,
        quiz: data.child.map(d => {
          return {
            question: d.question,
            id_quiz: d.id_quiz,
            id_question: d.id_question,
            type_question: d.type_question.value,
            answers: shuffle(d.answers)
          }
        })
      }
    }) : []

    setDataQuiz(datas)

    if (isPlay) {
      setTimeout(() => {
        setSelectQuiz(datas[0])
        setSelectIndex(1)
      }, 100)
    }
  }, [store.selectedSurvey])

  const handleStartQuiz = () => {
    setIsPlay(true)
    dispatch(getFrontendSurvey(store.selectedSesi.id_survey))
  }

  const handleSelectQuiz = () => {

    setSelectQuiz(dataQuiz[selectIndex])

    setSelectIndex(selectIndex + 1)
  }

  const handleAddAnswer = (val, data) => {
    const datas = {
      id_course: parseInt(courseid),
      id_quiz: data.id_quiz,
      id_question: data.id_question,
      value: val
    }

    let oldAnswer = answer
    oldAnswer = oldAnswer.filter(r => {
      return r.id_question !== data.id_question
    })

    oldAnswer = oldAnswer.concat(datas)

    setAnswer(oldAnswer)
  }

  function renderContent() {

    if (selectQuiz) {
      return (
        <div className="container">
          <Row>
            <Col sm='12'>
              <Card>
                <CardBody className='pt-2'>
                  {dataQuiz.map((data, key) => {
                    return (
                      <Row className={`mt-1 ${selectQuiz.id_question === data.id_question ? '' : 'd-none'}`} key={key}>
                        <Col sm='12'>
                          <h4 className='mb-1'>
                            <span className='align-middle'>{data.question}</span>
                          </h4>
                        </Col>
                        <Col sm='12'>
                          {data.quiz.map((d, k) => {
                            return (
                              <Row className='mb-1 ml-4' key={k}>
                                <h6><span>{`${k + 1}`}</span>.<span>{d.question}</span></h6>
                                {d.answers.map((dt, ky) => {
                                  return (
                                    <Col sm='12' key={ky}>
                                      <CustomInput
                                        type='radio'
                                        label={dt.label}
                                        id={`answer-${key}-${k}-${ky}`}
                                        name={`answer-${key}-${k}`}
                                        onChange={() => handleAddAnswer(dt.value, d)}
                                      />
                                    </Col>
                                  )
                                })}
                              </Row>
                            )
                          })}
                        </Col>
                      </Row>
                    )
                  })}
                </CardBody>
               </Card>
            </Col>
          </Row>
          <Row>
            <Col sm='12' className='text-center'>
              {selectIndex >= dataQuiz.length ? (<Button type='button' color='primary' onClick={() => handleFinishQuiz()}>
                  Selesai
                </Button>) : (<Button type='button' color='primary' onClick={() => handleSelectQuiz()}>
                  Selanjutnya
                </Button>)
              }
              
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <div className="container">
          <Row className='d-flex flex-column align-items-center'>
            <div className="text-center">
              <h3>Anda akan memulai pengerjaan survey</h3>
              <div className="my-4">
                <span>Waktu Pengerjaan : Tak Terbatas</span><br />
                <span>Jumlah Attempt : Tak Terbatas</span><br />
              </div>
              <h3>Jika Anda siap, klik tombol "Mulai" untuk melanjutkan</h3>
            </div>
          </Row>
          <Row>
            <Col sm='12' className='text-center'>
              <Button type='button' color='primary' onClick={() => handleStartQuiz()}>
                Mulai
              </Button>
            </Col>
          </Row>
        </div>
      )
    }
  }

  return (
    <div className='course-home'>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Course</title>
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
        <noscript>{`
            <link rel="stylesheet" type="text/css" href="${vendorCSS}" />
            <link rel="stylesheet" type="text/css" href="${courseCSS}" />
            <link rel="stylesheet" type="text/css" href="${styleCSS}" />
            <script src="${courseJS}"></script>
            <script src="${easingJS}"></script>
        `}</noscript>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
      </Helmet>
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Survey</h1>
        </div>
        {/* Content Row */}
        <div className="row">
          <div className="col-12">
            <div id="carouselExampleControls" className="carousel slide" data-bs-interval="false" data-bs-ride="carousel" style={{height: '100%'}}>
              <div className="carousel-inner" style={{height: 500}}>
                <div className="carousel-item active button-quiz">
                  {renderContent()}
                </div>  
              </div>
              <div className="d-flex" style={{justifyContent: 'center', backgroundColor: '#EF5533'}}>
                <button onClick={() => handlePrevPage()} className="carousel-control-prev mx-5" type="button" style={{position: 'unset', backgroundColor: '#2F4B7B', borderRadius: '50%'}}>
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                </button>
                <button onClick={() => handleNextPage()} className="carousel-control-next mx-5" type="button" style={{position: 'unset', backgroundColor: '#2F4B7B', borderRadius: '50%'}}>
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
