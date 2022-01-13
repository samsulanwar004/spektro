import { useEffect, useState } from 'react'
import { Button, Badge, Table, Row, Col } from 'reactstrap'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { useParams } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getFrontendCourseFinalScore } from './store/action'

import { Play } from 'react-feather'

import vendorCSS from '@src/assets/course/vendor/fontawesome-free/css/all.css'
import courseCSS from '@src/assets/course/css/course-page.css'
import styleCSS from '@src/assets/course/css/styles.css'
import courseJS from '@src/assets/course/js/course-page.js'

import Spinner from '@src/layouts/components/Spinner'

const statusObj = {
  1: {
    color: 'light-secondary',
    value: 'Enroll'
  },
  2: {
    color: 'light-warning',
    value: 'Start Course'
  },
  3: {
    color: 'light-success',
    value: 'Lulus'
  },
  4: {
    color: 'light-info',
    value: 'Progress Assessment'
  },
  5: {
    color: 'light-danger',
    value: 'Tidak Lulus'
  }
}

const Home = () => {

  // ** States & Vars
  const store = useSelector(state => state.enrolls),
    dispatch = useDispatch(),
    {courseid} = useParams()

    // ** States
  const [spinner, setSpinner] = useState(true)
  const [quiz, setQuiz] = useState(null)

  useEffect(() => {

    dispatch(getFrontendCourseFinalScore({
      id_course: courseid
    }))

    setTimeout(() => setSpinner(false), 1000)
  }, [dispatch])

  useEffect(() => {
    if (store.selectedCourseFinalScore) {
      setQuiz(store.selectedCourseFinalScore[0])
    }
  }, [store.selectedCourseFinalScore])

  const handleNextPage = () => {
    const pageSesi = store.dataPageSesi[0]
    $(`#${pageSesi.topik}`).collapse('show')
    $(`.nav-sesi-${pageSesi.id_stage_course}`)[0].click()
  }

  return (
    <div className='course-home'>
      {spinner && <Spinner/>}
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
        `}</noscript>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
      </Helmet>
      <div className="container-fluid">
        {/* Content Row */}
        <div className="row">
          <div className="col-12">
            <div className="carousel-item active button-quiz">
              <div className="container d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <h2>Selamat Datang Peserta Course</h2>
                  <Row>
                    <Col sm='12'>
                      <Table responsive className='borderless table-quiz' style={{backgroundColor: '#FFFFFF', borderRadius: 6}}>
                        <tbody>
                          <tr><td>Tanggal Enroll</td><td>{moment(quiz?.enrollment_date).format('DD MMM YYYY')}</td></tr>
                          <tr><td>Waktu Pengerjaan</td><td>{quiz?.estimated}</td></tr>
                          <tr><td>Course Expired</td><td>{moment(quiz?.expired_date).format('DD MMM YYYY')}</td></tr>
                          <tr><td>Nilai Akhir</td><td>{quiz?.nilai_akhir_course ?? '-'}</td></tr>
                          <tr>
                            <td>Status</td>
                            <td>
                              <Badge className='text-capitalize' color={statusObj[quiz?.status]?.color} pill>
                                {statusObj[quiz?.status]?.value}
                              </Badge>
                            </td>
                          </tr>
                          <tr><td>Certificate Date</td><td>{quiz?.certificate_date ? moment(quiz?.certificate_date).format('DD MMM YYYY') : '-'}</td></tr>
                          <tr><td>Certificate Expired</td><td>{quiz?.certificate_expired ? moment(quiz?.certificate_expired).format('DD MMM YYYY') : '-'}</td></tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <span>Untuk memulai course silahkan klik tombol di bawah ini</span>
                  <div className="my-4 d-flex align-items-center justify-content-center">
                    <Button color='primary' size='lg' onClick={() => handleNextPage()}>
                      <Play size={20} /> Mulai
                    </Button>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
