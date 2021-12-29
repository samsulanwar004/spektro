import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { useParams } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getFrontendCourseFinalScore } from './store/action'

import vendorCSS from '@src/assets/course/vendor/fontawesome-free/css/all.css'
import courseCSS from '@src/assets/course/css/course-page.css'
import styleCSS from '@src/assets/course/css/styles.css'
import courseJS from '@src/assets/course/js/course-page.js'

import Spinner from '@src/layouts/components/Spinner'

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
  })

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
              <div className="container d-flex align-items-center justify-content-center" style={{height: 400}}>
                <div className="text-center">
                  <h2>Selamat Datang Peserta Course</h2>
                  <div className="my-4">
                    <span>Tanggal Enroll : {moment(quiz?.enrollment_date).format('DD MMM YYYY')}</span><br />
                    <span>Waktu Pengerjaan : {quiz?.estimated}</span><br />
                    <span>Course Expired : {moment(quiz?.expired_date).format('DD MMM YYYY')}</span><br />
                  </div>
                  <div className="my-4">
                    <span>Hasil</span><br />
                    <span>Nilai Akhir : {quiz?.nilai_akhir}</span><br />
                  </div>
                  <span>Untuk memulai course silahkan klik tombol di bawah ini</span>
                  <div className="my-4 d-flex align-items-center justify-content-center">
                    <button onClick={() => handleNextPage()} className="carousel-control-next mx-5" type="button" style={{position: 'unset', backgroundColor: '#2F4B7B', borderRadius: '50%'}}>
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                    </button>
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
