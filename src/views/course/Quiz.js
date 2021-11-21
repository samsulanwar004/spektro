import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media, Button, Label, FormGroup, Input, CustomInput, Form } from 'reactstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getFrontendQuiz, addFrontendQuizAnswer, attempFrontendQuiz } from '@src/views/course/store/action'

import vendorCSS from '@src/assets/course/vendor/fontawesome-free/css/all.css'
import courseCSS from '@src/assets/course/css/course-page.css'
import styleCSS from '@src/assets/course/css/styles.css'
import courseJS from '@src/assets/course/js/course-page.js'
import easingJS from '@src/assets/course/vendor/jquery-easing/jquery.easing.js'
import Flag from '@src/assets/course/img/Flag.png'

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
  const [pageIndex, setPageIndex] = useState(0)
  const [loop, setLoop] = useState(null)

  const handleFinishQuiz = () => {

    if (answer.length > 0) {
      dispatch(addFrontendQuizAnswer(answer))
    }

    setSelectIndex(0)
    setSelectQuiz(null)
    setAnswer([])
    setIsPlay(false)

    dispatch({
      type: 'UNSELECT_FRONTEND_QUIZ'
    })
    dispatch({
      type: 'UNSELECT_FRONTEND_ATTEMP_QUIZ'
    })
  }

  const handleFinishConfirm = (row) => {
    return MySwal.fire({
      title: 'Apakah anda yakin?',
      text: "Mengakhiri Quiz ini",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        handleFinishQuiz()
      }
    })
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
      setQuiz(store.selectedSesi.quiz)
    }, 100)
  }, [store.selectedSesi])

  useEffect(() => {

    const datas = []

    if (store.selectedQuiz) {
      for (let i = 0; i < store.selectedQuiz.length; i++) {
        const child = store.selectedQuiz[i].child

        for (let j = 0; j < child.length; j++) {
          datas.push({
            question: child[j].question,
            id_quiz: child[j].id_quiz,
            id_question: child[j].id_question,
            type_question: child[j].type_question.value,
            answers: shuffle(child[j].answers)
          })
        }
      }
    }

    setDataQuiz(datas)

    if (isPlay) {
      setTimeout(() => {
        setSelectQuiz(datas[0])
      }, 100)

      const seconds = timeToSeconds(store.selectedSesi.quiz.duration)
      const countDownDate = moment().add(seconds, 'seconds')

      setLoop(setInterval(function() {
        const diff = countDownDate.diff(moment())

        if (diff <= 0) {
          handleFinishQuiz()
          if (document.getElementById("rundown-timer")) {
            document.getElementById("rundown-timer").innerHTML = 'Time Out'
          }
          clearInterval(loop)
        } else {
          if (document.getElementById("rundown-timer")) {
            document.getElementById("rundown-timer").innerHTML = moment.utc(diff).format("HH:mm:ss")
          }
        }
      }, 1000))
    }

    return function cleanup() {
      clearInterval(loop)
    }
  }, [store.selectedQuiz])

  useEffect(() => {
    if (store.selectedAttemp) {
      setIsPlay(true)
      dispatch(getFrontendQuiz(store.selectedSesi.id_quiz))
    }
  }, [store.selectedAttemp])

  const handleStartQuiz = () => {
    dispatch(attempFrontendQuiz({
      id_course: parseInt(courseid),
      id_topik: store.selectedSesi.id_topik,
      id_quiz: store.selectedSesi.id_quiz,
      nilai_akhir: 0,
      attemp: store.selectedSesi.quiz.attemp
    }))
  }

  const handleNextQuiz = () => {

    setSelectQuiz(dataQuiz[selectIndex + 1])

    setSelectIndex(prevState => {
      return prevState + 1
    })
  }

  const handlePrevQuiz = () => {

    setSelectQuiz(dataQuiz[selectIndex - 1])

    setSelectIndex(prevState => {
      return prevState - 1
    })
  }

  const handleNumberSelect = (number) => {
    setSelectQuiz(dataQuiz[number])
    setSelectIndex(parseInt(number))
  }

  const handleAddAnswer = (val, data) => {

    const datas = {
      id_course: parseInt(courseid),
      id_quiz: data.id_quiz,
      id_question: data.id_question,
      value: val,
      id_answer_attemp: store.selectedAttemp.id_answer_attemp,
      type_soal: data.type_question
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
                <CardTitle className="d-flex justify-content-between " style={{backgroundColor: '#EF5533'}}>
                  <span className="py-2 px-4">
                    <h4 className="text-white">{`Question ${selectIndex + 1}`}</h4>
                  </span>
                  <span className="d-flex py-2 px-4 align-items-center">
                    <h6 className="text-white mr-2">Flag this Question</h6>
                    <img src={Flag} height="15" style={{marginBottom: 10}}/>
                  </span>
                </CardTitle>
                <CardBody className='pt-2'>
                  {dataQuiz.map((data, key) => {
                    return (
                      <Row className={`mt-1 ${selectQuiz.id_question === data.id_question ? '' : 'd-none'}`} key={key}>
                        <Col sm='12'>
                          <h4 className='mb-1'>
                            <span className='align-middle'>{data.question}</span>
                          </h4>
                          {data.answers.map((dt, ky) => {
                            return (
                              <Col sm='12' key={ky} className="p-2">
                                <CustomInput
                                  type='radio'
                                  label={dt.label}
                                  id={`answer-${key}-${ky}`}
                                  name={`answer-${key}`}
                                  onChange={() => handleAddAnswer(dt.value, data)}
                                />
                              </Col>
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
            <Col sm='12' className='text-center d-flex justify-content-between'>
              {(selectIndex + 1) >= dataQuiz.length ? (<><Button type='button' color='primary' onClick={() => handlePrevQuiz()}>
                  Sebelumnya
                </Button><Button type='button' color='primary' onClick={() => handleFinishConfirm()}>
                  Selesai
                </Button></>) : (<><Button type='button' disabled={selectIndex <= 0} color='primary' onClick={() => handlePrevQuiz()}>
                  Sebelumnya
                </Button><Button type='button' color='primary' onClick={() => handleNextQuiz()}>
                  Selanjutnya
                </Button></>)
              }

              <Button type='button' id="btn-number-select" className="d-none" onClick={(e) => handleNumberSelect(e.target.value)}/>
              <Button type='button' id="btn-finish" className="d-none" onClick={() => handleFinishConfirm()}/>
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <div className="container">
          <Row className='d-flex flex-column align-items-center'>
            <div className="text-center">
              <h3>Anda akan memulai pengerjaan kuis</h3>
              <div className="my-4">
                <span>Waktu Pengerjaan : {quiz ? quiz.duration : ''}</span><br />
                <span>Jumlah Attempt : {`${quiz && quiz.attemp > 0 ? quiz.attemp : 'Tak Terbatas'}`}</span><br />
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
          <h1 className="h3 mb-0 text-gray-800">Quiz</h1>
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
              {store.selectedQuiz ? (null) : (
                <div className="d-flex" style={{justifyContent: 'center', backgroundColor: '#EF5533'}}>
                <button onClick={() => handlePrevPage()} className="carousel-control-prev mx-5" type="button" style={{position: 'unset', backgroundColor: '#2F4B7B', borderRadius: '50%'}}>
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                </button>
                <button onClick={() => handleNextPage()} className="carousel-control-next mx-5" type="button" style={{position: 'unset', backgroundColor: '#2F4B7B', borderRadius: '50%'}}>
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                </button>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
