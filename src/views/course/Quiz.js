import { useContext, useEffect, useState } from 'react'
import { File, Star, Play } from 'react-feather'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media, Button, Label, FormGroup, Input, CustomInput, Form, Progress, Table } from 'reactstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DocViewer, { DocViewerRenderers } from "react-doc-viewer"
import Rating from 'react-rating'
import classnames from 'classnames'

const MySwal = withReactContent(Swal)

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getFrontendQuiz, addFrontendQuizAnswer, attempFrontendQuiz, getFrontendQuizFinalScore } from '@src/views/course/store/action'
import { uploadImage } from '@src/views/backend/master/global_param/store/action'

import vendorCSS from '@src/assets/course/vendor/fontawesome-free/css/all.css'
import courseCSS from '@src/assets/course/css/course-page.css'
import styleCSS from '@src/assets/course/css/styles.css'
import courseJS from '@src/assets/course/js/course-page.js'
import easingJS from '@src/assets/course/vendor/jquery-easing/jquery.easing.js'
import Flag from '@src/assets/course/img/Flag.png'
import PrevBtn from '@src/assets/frontend/img/Previous Button.png'
import NextBtn from '@src/assets/frontend/img/Next Button.png'

//** util
import moment from 'moment'
import {shuffle, timeToSeconds} from '@src/utility/Utils'

const objStatus = ['Belum di nilai', 'Sudah di nilai']

const Quiz = () => {

  // ** States & Vars
  const store = useSelector(state => state.enrolls),
    dispatch = useDispatch(),
    { courseid } = useParams(),
    globalparams = useSelector(state => state.globalparams)

  const [dataQuiz, setDataQuiz] = useState([])
  const [selectIndex, setSelectIndex] = useState(0)
  const [selectQuiz, setSelectQuiz] = useState(null)
  const [answer, setAnswer] = useState([])
  const [dataChecbox, setDataChecbox] = useState([])
  const [quiz, setQuiz] = useState(null)
  const [results, setResults] = useState([])
  const [isPlay, setIsPlay] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const [loop, setLoop] = useState(null)
  const [selectUpload, setSelectUpload] = useState([])
  const [loadQuiz, setLoadQuiz] = useState(false)

  const handleFinishQuiz = () => {

    if (answer.length > 0) {
      dispatch(addFrontendQuizAnswer(answer))
    }

    setSelectIndex(0)
    setSelectQuiz(null)
    setAnswer([])
    setDataChecbox([])
    setIsPlay(false)

    dispatch({
      type: 'UNSELECT_FRONTEND_QUIZ'
    })
    dispatch({
      type: 'UNSELECT_FRONTEND_ATTEMP_QUIZ'
    })
  }

  const handleFinishConfirm = (row) => {

    if (answer.length < dataQuiz.length) {
      return MySwal.fire({
        title: 'Belum Selesai',
        text: "Silahkan selesaikan pertanyaan yang ada",
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    }
    
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

  const handleFinishSesiConfirm = (row) => {
    return MySwal.fire({
      title: 'Ini sesi terakhir',
      text: "Apakah ingin mengulang sesi kembali?",
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
        const pageSesi = store.dataPageSesi[0]
        $(`.nav-sesi-${pageSesi.number}`)[0].click()
      } else {
        if (result.dismiss === 'cancel') {
          window.location = `/course-home/${courseid}`
          return null
        }
      }
    })
  }

  useEffect(() => {
    if (!store.selectedSesi) {
      window.location = `/course-home/${courseid}`
      return null
    }
    setIsPlay(false)

  }, [dispatch])

  const handleNextPage = () => {
    const index = parseInt(pageIndex) + 1

    if (index >= store.dataPageSesi.length) {
      handleFinishSesiConfirm()
      return null
    }

    const pageSesi = store.dataPageSesi[index]
    $(`#${pageSesi.topik}`).collapse('show')
    $(`.nav-sesi-${pageSesi.number}`)[0].click()
  }

  const handlePrevPage = () => {
    const index = parseInt(pageIndex) - 1

    if (index < 0) return null
    const pageSesi = store.dataPageSesi[index]
    $(`#${pageSesi.topik}`).collapse('show')
    $(`.nav-sesi-${pageSesi.number}`)[0].click()
  }

  useEffect(() => {
    setQuiz(null)
    setIsPlay(false)
    setLoadQuiz(false)
    setTimeout(() => {
      setQuiz(store.selectedSesi.quiz)
    }, 100)

    const indexPage = Object.keys(store.dataPageSesi).find(key => store.dataPageSesi[key].id_stage_course === store.selectedSesi.id_stage_course)

    setPageIndex(indexPage)

    dispatch(getFrontendQuizFinalScore({
      id_course: courseid,
      id_topik: store.selectedSesi.id_topik,
      id_quiz: store.selectedSesi.id_quiz
    }))
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
            answers: shuffle(child[j].answers),
            max_char: child[j].max_char
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

  useEffect(() => {
    if (store.selectedQuizFinalScore) {
      setResults(store.selectedQuizFinalScore)
      setLoadQuiz(true)
    }
  }, [store.selectedQuizFinalScore])

  useEffect(() => {
    if (store.savedQuiz && store.savedQuiz?.status) {
      dispatch(getFrontendQuizFinalScore({
        id_course: courseid,
        id_topik: store.selectedSesi.id_topik,
        id_quiz: store.selectedSesi.id_quiz
      }))
    }
  }, [store.savedQuiz])

  const handleStartQuiz = () => {
    const index = results.length - 1

    if (results[index]?.status_penilaian === 1 || results.length === 0) {
      dispatch(attempFrontendQuiz({
        id_course: parseInt(courseid),
        id_topik: store.selectedSesi.id_topik,
        id_quiz: store.selectedSesi.id_quiz,
        nilai_akhir: 0,
        attemp: store.selectedSesi.quiz.attemp
      }))
    } else {
      return MySwal.fire({
        title: 'Peringatan',
        text: "Menunggu penilaian",
        icon: 'warning',
        buttonsStyling: true
      })
    }
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

    //add color btn select
    $(`#btn-select-${data.id_question}`).addClass('btn-hijau')

    const datas = {
      id_course: parseInt(courseid),
      id_topik: store.selectedSesi.id_topik,
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

  const handleCheckbox = (val, key, data) => {

    const datas = {
      id_question: data.id_question,
      value: val,
      key
    }

    let oldDataChecbox = dataChecbox

    const checkData = oldDataChecbox.find(r => r.key === key)

    if (checkData) {
      oldDataChecbox = oldDataChecbox.filter(r => r.key !== key)
    } else {
      oldDataChecbox = oldDataChecbox.concat(datas)
    }

    setDataChecbox(oldDataChecbox)

    const value = oldDataChecbox.filter(r => r.id_question === data.id_question).map(r => r.value)

    handleAddAnswer(value, data)
  }

  const onUploadFile = (e, data) => {
    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    setSelectUpload(data)

    reader.onload = function (fileReaderEvent) {
      const datas = new FormData()
      datas.append('upload', files[0])
      dispatch(uploadImage(datas))
    }
    reader.readAsDataURL(files[0])
  }

  useEffect(() => {
    if (globalparams.upload) {
      handleAddAnswer(`${process.env.REACT_APP_BASE_URL}${globalparams.upload}`, selectUpload)
    }
  }, [globalparams.upload])

  function renderAnswer(data, key) {

    if (data.type_question === 'RadioButton') {
      return (
        <>
          {data.answers.map((dt, ky) => {
            return (
              <Col sm='12' key={ky} className="p-2 answer-checkbox">
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
        </>
      )
    } else if (data.type_question === 'CheckBox') {
      return (
        <>
          {data.answers.map((dt, ky) => {
            return (
              <Col sm='12' key={ky} className="p-2 answer-checkbox">
                <CustomInput type='checkbox' label={dt.label} id={`answer-${key}-${ky}`} onChange={() => handleCheckbox(dt.value, `${key}${ky}`, data)}/>
              </Col>
            )
          })}
        </>
      )
    } else if (data.type_question === 'Dropdown') {
      return (
        <>
          <Col sm='12' className="p-2">
            <Input type="select" name={`text-${key}`} id={`text-${key}`} onChange={(e) => handleAddAnswer(e.target.value, data)}>
              <option value=''>Select...</option>
              {data.answers.map((dt, ky) => {
                return (
                  <option key={ky} value={dt.label}>{dt.label}</option>
                )
              })}
            </Input>
          </Col>
        </>
      )
    } else if (data.type_question === 'File') {

      const findFile = selectQuiz.id_question === data.id_question ? answer.find(r => r.id_question === data.id_question) : null
      
      return (
        <>
          <Col sm='12' className="p-2">
            <Input id={`text-${key}`} onChange={(e) => onUploadFile(e, data)} type='file' hidden />
            {findFile && findFile.value ? (
                <DocViewer 
                  pluginRenderers={DocViewerRenderers} 
                  documents={[{ uri: findFile.value }]} 
                  style={{height: 300}}
                  config={{
                    header: {
                    disableHeader: true,
                    disableFileName: true,
                    retainURLParams: false
                   }
                  }}
                />
              ) : (
                <>
                  {globalparams.progress &&
                    <Progress className='progress-bar-success' value={globalparams.progress}>{`${globalparams.progress}%`}</Progress>
                  }
                  <a onClick={() => $(`#text-${key}`).click()} className="d-flex align-items-center justify-content-center flex-column" style={{height: 200, width: '100%', backgroundColor: '#C4C4C4'}}>
                    <File size={50} color="black"/>
                    <span style={{color: 'black'}}>Unggah file Anda di sini</span>
                  </a>
                </>
              )
            }
          </Col>
        </>
      )
    } else if (data.type_question === 'TextArea') {

      const valueText = answer.find(r => r.id_question === data.id_question)
      return (
        <>
          <Col sm='12' className="p-2">
            <Input
              rows={10}
              type="textarea"
              id={`text-${key}`}
              name={`text-${key}`}
              value={valueText?.value}
              placeholder='Type here ...'
              onChange={(e) =>  {
                const maxChar = valueText?.value.length ?? 0
                if ((maxChar < data.max_char || e.nativeEvent.inputType === 'deleteContentBackward') && e.nativeEvent.inputType !== 'insertFromPaste') {
                  handleAddAnswer(e.target.value, data)
                }
              }}
            />
            <span
              className={classnames('textarea-counter-value float-right', {
                'bg-danger': valueText?.value.length >= data.max_char
              })}
            >
              {`${valueText?.value.length ?? 0}/${data.max_char}`}
            </span>
          </Col>
        </>
      )
    } else if (data.type_question === 'Text') {

      const valueText = answer.find(r => r.id_question === data.id_question)

      return (
        <>
          <Col sm='12' className="p-2">
            <Input
              id={`text-${key}`}
              name={`text-${key}`}
              value={valueText?.value}
              placeholder='Type here ...'
              onChange={(e) =>  {
                const maxChar = valueText?.value.length ?? 0
                if ((maxChar < data.max_char || e.nativeEvent.inputType === 'deleteContentBackward') && e.nativeEvent.inputType !== 'insertFromPaste') {
                  handleAddAnswer(e.target.value, data)
                }
              }}
            />
            <span
              className={classnames('textarea-counter-value float-right', {
                'bg-danger': valueText?.value.length >= data.max_char
              })}
            >
              {`${valueText?.value.length ?? 0}/${data.max_char}`}
            </span>
          </Col>
        </>
      )
    } else if (data.type_question === 'Rating') {

      const findFile = selectQuiz.id_question === data.id_question ? answer.find(r => r.id_question === data.id_question) : null

      return (
        <>
          <Col sm='12' className="p-2">
            <Rating
              emptySymbol={<Star size={32} fill='#babfc7' stroke='#babfc7' />}
              fullSymbol={<Star size={32} fill='#ff9f43' stroke='#ff9f43' />}
              initialRating={findFile?.value}
              onChange={e => handleAddAnswer(e, data)}
            />
          </Col>
        </>
      )
    }
    
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
                          {renderAnswer(data, key)}
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
              {(selectIndex + 1) >= dataQuiz.length ? (<><a onClick={() => handlePrevQuiz()}>
                  <img src={PrevBtn} alt="Spektro" width="30"/>
                </a><Button type='button' color='primary' onClick={() => handleFinishConfirm()}>
                  Finish
                </Button></>) : (<><a onClick={() => {
                  if (selectIndex > 0) {
                    handlePrevQuiz()
                  }
                }}>
                  <img src={PrevBtn} alt="Spektro" width="30"/>
                </a><a onClick={() => handleNextQuiz()}>
                  <img src={NextBtn} alt="Spektro" width="30"/>
                </a></>)
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
              <h3>Anda akan memulai pengerjaan quiz</h3>
              <h3>{quiz?.title_quiz}</h3>
              <div className="my-4">
                <span>Passing Score : {quiz?.passing_score}</span><br />
                <span>Waktu Pengerjaan : {quiz?.duration}</span><br />
                <span>Jumlah Attempt : {`${quiz && quiz.attemp > 0 ? quiz.attemp : 'Tak Terbatas'}`}</span><br />
              </div>
              <div className="my-4">
                <span>Hasil</span><br />
                <Table responsive style={{backgroundColor: '#FFFFFF'}}>
                  <thead>
                    <tr>
                      <th scope='col' className='text-nowrap'>
                        No
                      </th>
                      <th scope='col' className='text-nowrap'>
                        Nilai
                      </th>
                      <th scope='col' className='text-nowrap'>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((data, key) => {
                      return (
                        <tr key={key}>
                          <td className='text-nowrap'>{key + 1}</td>
                          <td className='text-nowrap'>{data.nilai_akhir}</td>
                          <td className='text-nowrap'>{objStatus[data.status_penilaian]}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
              <h3>Jika Anda siap, klik tombol "Mulai" untuk melanjutkan</h3>
            </div>
          </Row>
          <Row>
            <Col sm='12' className='text-center'>
              <Button type='button' color='primary' onClick={() => handleStartQuiz()} disabled={!loadQuiz}>
                <Play size={16} /> Mulai
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
