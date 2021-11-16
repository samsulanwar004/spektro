import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { Helmet } from 'react-helmet'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getDataFrontendCourse, getDataFrontendMaterial} from '@src/views/frontend/store/action'

import frontCSS from '@src/assets/frontend/css/styles.css'

import BgLearnSpace from '@src/assets/frontend/img/bg_learningspace.png'
import Course1 from '@src/assets/frontend/img/Course Image.png'
import Course2 from '@src/assets/frontend/img/Course Image2.png'
import Course3 from '@src/assets/frontend/img/Course Image3.png'
import PrevBtn from '@src/assets/frontend/img/Previous Button.png'
import NextBtn from '@src/assets/frontend/img/Next Button.png'
import Mitra from '@src/assets/frontend/img/Mitra.png'
import Testimoni1 from '@src/assets/frontend/img/testimoni 1.png'
import Testimoni2 from '@src/assets/frontend/img/testimoni 2.png'
import Testimoni3 from '@src/assets/frontend/img/testimoni 3.png'

const LearnSpace = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch()

    // ** States
  const [currentPageCourse, setCurrentPageCourse] = useState(1)
  const [rowsPerPageCourse, setRowsPerPageCourse] = useState(3)

  const [currentPageMaterial, setCurrentPageMaterial] = useState(1)
  const [rowsPerPageMaterial, setRowsPerPageMaterial] = useState(3)

  useEffect(() => {
    dispatch(getDataFrontendCourse({
      page: currentPageCourse,
      perPage: rowsPerPageCourse
    }))

    dispatch(getDataFrontendMaterial({
      page: currentPageMaterial,
      perPage: rowsPerPageMaterial
    }))
  }, [dispatch])

  const handlePageCourse = (page) => {

    const count = Number(Math.ceil(store.totalCourse / rowsPerPageCourse))

    if (page === 'next') {
      
      if (count === currentPageCourse) return null

      dispatch(getDataFrontendCourse({
        page: currentPageCourse + 1,
        perPage: rowsPerPageCourse
      }))

      setCurrentPageCourse(currentPageCourse + 1)
    } else if (page === 'prev') {

      if ((currentPageCourse - 1) === 0) return null
        
      dispatch(getDataFrontendCourse({
        page: currentPageCourse - 1,
        perPage: rowsPerPageCourse
      }))

      setCurrentPageCourse(currentPageCourse - 1)
    }
  }

  const handlePageMaterial = (page) => {

    const count = Number(Math.ceil(store.totalMaterial / rowsPerPageMaterial))

    if (page === 'next') {
      
      if (count === currentPageMaterial) return null

      dispatch(getDataFrontendCourse({
        page: currentPageMaterial + 1,
        perPage: rowsPerPageMaterial
      }))

      setCurrentPageMaterial(currentPageMaterial + 1)
    } else if (page === 'prev') {

      if ((currentPageMaterial - 1) === 0) return null
        
      dispatch(getDataFrontendCourse({
        page: currentPageMaterial - 1,
        perPage: rowsPerPageMaterial
      }))

      setCurrentPageMaterial(currentPageMaterial - 1)
    }
  }

  return (
    <div className="frontend-learn">
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Learning Space</title>
        <noscript>{`
            <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
      </Helmet>
      <div className="section">
        <div style={{backgroundImage: `url("${BgLearnSpace}")`, minHeight: '290px', position: 'relative', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}}>
          <div className="container px-5">
            <div style={{position: 'absolute', bottom: '1rem'}}>
              <h1 style={{color: 'white', textShadow: '2px 0px #c4c4c4', color: '#FFFFFF'}}>Learning Space</h1>
            </div>
          </div>
        </div>
      </div>
      {/* Section Tentang */}
      <div className="section pt-5">            
        <div className="container px-5">
          <div className="row gx-5">
            <div className="col-lg-3">
              <div className="judul pb-5" style={{textAlign: 'right'}}>
                <h2>Tentang Learning Space</h2>
                <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', float: 'right', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
              </div>
            </div>
            <div className="col-lg-9">
              <div>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Course */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2>Courses</h2>
              <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
            </div>
          </div>
          <div id="carouselCourse" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row gx-5" style={{margin: '10px'}}>
                  {store.dataCourse && store.dataCourse.map((data, key) => {
                    return (
                      <div className="col-lg-4" key={key}>
                        <div style={{overflow: 'hidden', height: '100%', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px', boxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', WebkitBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', MozBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)'}}>
                          <div><img className="img-fluid" src={Course1} alt="Spektro Learn" style={{width: '100%'}} /></div>
                          <div className="p-4" style={{backgroundColor: '#EF5533', color: 'white', height: '100%'}}>
                            <div>
                              <h5 style={{fontWeight: 300, color: '#FFFFFF'}}>{data.code_course}</h5>
                              <h3 style={{color: '#FFFFFF'}} dangerouslySetInnerHTML={{ __html: `${data.course}`}}></h3>
                              <span>BI Institute</span>
                            </div>
                            <div className='mt-3 d-flex justify-content-between'>
                              <span>{data.category}</span>
                              <span className='mt-5' style={{fontSize: 12}}>1-2 jam</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="mb-5" style={{position: 'relative', top: '3rem', display: 'flex', justifyContent: 'center'}}>
              <button onClick={() => handlePageCourse('prev')} className="carousel-control-prev" type="button" data-bs-target="#carouselCourse" data-bs-slide="prev" style={{position: 'relative', opacity: 1, width: '10%'}}>
                <img src={PrevBtn} alt="Spektro" />
                <span className="visually-hidden">Previous</span>
              </button>
              <a href="#"><button style={{backgroundColor: '#0A558C', height: '100%', borderRadius: '6px', color: 'white'}} className="px-4">Lihat semua</button></a>
              <button onClick={() => handlePageCourse('next')} className="carousel-control-next" type="button" data-bs-target="#carouselCourse" data-bs-slide="next" style={{position: 'relative', opacity: 1, width: '10%'}}>
                <img src={NextBtn} alt="Spektro" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Section Materials */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div style={{border: '1px solid #0A558C', width: '50%', margin: '0 auto 7rem', filter: 'blur(5px)', WebkitFilter: 'blur(5px)'}} />
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2>Materials</h2>
              <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
            </div>
          </div>
          <div id="carouselMaterials" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row gx-5" style={{margin: '10px'}}>
                  {store.dataMaterial && store.dataMaterial.map((data, key) => {
                    return (
                      <div className="col-lg-4" key={key}>
                        <div style={{overflow: 'hidden', height: '100%', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px', boxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', WebkitBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', MozBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)'}}>
                          <div><img className="img-fluid" src={Course2} alt="" style={{width: '100%'}} /></div>
                          <div className="p-4" style={{backgroundColor: '#FFE37A', height: '100%'}}>
                            <div>
                              <h5 style={{fontWeight: 300, color: '#000000'}}>{data.title}</h5>
                              <h3 dangerouslySetInnerHTML={{ __html: `${data.sort_desc}`}}></h3>
                              <span>BI Institute</span>
                            </div>
                            <div className='mt-3 d-flex justify-content-between'>
                              <span>{data.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="mb-5" style={{position: 'relative', top: '3rem', display: 'flex', justifyContent: 'center'}}>
              <button onClick={() => handlePageMaterial('prev')} className="carousel-control-prev" type="button" data-bs-target="#carouselMaterials" data-bs-slide="prev" style={{position: 'relative', opacity: 1, width: '10%'}}>
                <img src={PrevBtn} alt="Spektro" />
                <span className="visually-hidden">Previous</span>
              </button>
              <a href="#"><button style={{backgroundColor: '#0A558C', height: '100%', borderRadius: '6px', color: 'white'}} className="px-4">Lihat semua</button></a>
              <button onClick={() => handlePageMaterial('next')} className="carousel-control-next" type="button" data-bs-target="#carouselMaterials" data-bs-slide="next" style={{position: 'relative', opacity: 1, width: '10%'}}>
                <img src={NextBtn} alt="Spektro" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Section Mitra Kami */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div style={{border: '1px solid #0A558C', width: '50%', margin: '0 auto 7rem', filter: 'blur(5px)', WebkitFilter: 'blur(5px)'}} />
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2>Mitra Kami</h2>
              <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
            </div>
          </div>
          <div id="carouselMitraKami" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators" style={{bottom: '-3rem'}}>
              <button type="button" data-bs-target="#carouselMitraKami" data-bs-slide-to={0} style={{width: '13px', height: '13px', backgroundColor: '#09558c', borderRadius: '50%'}} className="active" aria-current="true" aria-label="Slide 1" />
              <button type="button" data-bs-target="#carouselMitraKami" data-bs-slide-to={1} style={{width: '13px', height: '13px', backgroundColor: '#09558c', borderRadius: '50%'}} aria-label="Slide 2" />
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row gx-5">
                  <div className="text-center">
                    <img src={Mitra} className="img-fluid" alt="Spektro Metro" />
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row gx-5">
                  <div className="text-center">
                    <img src={Mitra} className="img-fluid" alt="Spektro Metro" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselMitraKami" data-bs-slide="prev" style={{opacity: 1, width: '5%'}}>
                <i style={{color: '#0A558C', fontSize: '2rem'}} className="bi bi-caret-left-fill" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>                        
              <button className="carousel-control-next" type="button" data-bs-target="#carouselMitraKami" data-bs-slide="next" style={{opacity: 1, width: '5%'}}>
                <i style={{color: '#0A558C', fontSize: '2rem'}} className="bi bi-caret-right-fill" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Section Testimoni */}
      <div className="section">
        <div className="py-5">
          <div className="container px-5">
            <div className="row gx-5">
              <div className="col-12">
                <div style={{border: '1px solid #0A558C', width: '50%', margin: '0 auto 7rem', filter: 'blur(5px)', WebkitFilter: 'blur(5px)'}} />
                <div className="judul mb-5" style={{textAlign: 'center'}}>
                  <h2>Testimoni</h2>
                  <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
                </div>
              </div>
            </div>
            <div className="row gx-5">
              <div className="col-lg-4" style={{textAlign: 'center'}}>
                <div><img src={Testimoni1} alt="" /></div>
                <div className="my-3">
                  <h5 className="mb-0">IVAN WIDJANARKO</h5>
                  <span>Peserta KMBI III</span>
                </div>
                <div>
                  <p style={{fontWeight: 300}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
              </div>
              <div className="col-lg-4" style={{textAlign: 'center'}}>
                <div><img src={Testimoni2} alt="" /></div>
                <div className="my-3">
                  <h5 className="mb-0">SHARFINA</h5>
                  <span>OJK</span>
                </div>
                <div>
                  <p style={{fontWeight: 300}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
              </div>
              <div className="col-lg-4" style={{textAlign: 'center'}}>
                <div><img src={Testimoni3} alt="" /></div>
                <div className="my-3">
                  <h5 className="mb-0">WAHYU ADI</h5>
                  <span>Dosen ITTENAS</span>
                </div>
                <div>
                  <p style={{fontWeight: 300}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnSpace
