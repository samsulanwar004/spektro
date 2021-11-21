import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { Helmet } from 'react-helmet'
import { Link, useHistory, useParams } from 'react-router-dom'
import DocViewer, { DocViewerRenderers } from "react-doc-viewer"

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

import vendorCSS from '@src/assets/course/vendor/fontawesome-free/css/all.css'
import courseCSS from '@src/assets/course/css/course-page.css'
import styleCSS from '@src/assets/course/css/styles.css'
import courseJS from '@src/assets/course/js/course-page.js'
import easingJS from '@src/assets/course/vendor/jquery-easing/jquery.easing.js'

const Material = () => {

  // ** States & Vars
  const store = useSelector(state => state.enrolls),
    dispatch = useDispatch(),
    { courseid } = useParams()

  const [uri, setUri] = useState(null)
  const [pageIndex, setPageIndex] = useState(0)


  useEffect(() => {
    if (!store.selectedSesi) {
      window.location = `/course-home/${courseid}`
    }

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
    setUri(null)

    setTimeout(() => {
      setUri(store.selectedSesi.url_path)
    }, 100)
  }, [store.selectedSesi])

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
          <h1 className="h3 mb-0 text-gray-800">Materi Topik</h1>
        </div>
        {/* Content Row */}
        <div className="row">
          <div className="col-12">
            <div id="carouselExampleControls" className="carousel slide" data-bs-interval="false" data-bs-ride="carousel">
              <div className="carousel-inner">
                {store.selectedSesi && uri &&
                  <DocViewer 
                    pluginRenderers={DocViewerRenderers} 
                    documents={[{ uri }]} 
                    style={{height: 500}}
                    config={{
                      header: {
                      disableHeader: true,
                      disableFileName: true,
                      retainURLParams: false
                     }
                    }}
                  />
                }
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

export default Material
