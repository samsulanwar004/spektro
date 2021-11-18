import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { Helmet } from 'react-helmet'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

import vendorCSS from '@src/assets/course/vendor/fontawesome-free/css/all.css'
import courseCSS from '@src/assets/course/css/course-page.css'
import styleCSS from '@src/assets/course/css/styles.css'
import courseJS from '@src/assets/course/js/course-page.js'

import PrevBtn from '@src/assets/frontend/img/Previous Button.png'
import NextBtn from '@src/assets/frontend/img/Next Button.png'
import Course from '@src/assets/frontend/img/Course Image.png'
import Spinner from '@src/layouts/components/Spinner'

const Home = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch()

    // ** States
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {

    setTimeout(() => setSpinner(false), 1000)
  }, [dispatch])

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
              <div className="container">
                <div className="text-center">
                  <h2>Video </h2>
                  <div className="my-4">
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
