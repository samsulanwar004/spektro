import { useContext } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { Helmet } from 'react-helmet'

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

  return (
    <div className="frontend-learn">
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Learning Space</title>
        <noscript>{`
          <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" type="text/css" href="${frontCSS}" />
      `}</noscript>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
      </Helmet>
      <div className="section">
        <div style={{backgroundImage: `url("${BgLearnSpace}")`, minHeight: '290px', position: 'relative'}}>
          <div className="container px-5">
            <div style={{position: 'absolute', bottom: '1rem'}}><h1 style={{color: 'white'}}>Learning Space</h1></div>
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
                <hr style={{height: '3px', width: '100px', margin: '1rem auto 0', float: 'right'}} />
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
              <hr style={{height: '3px', width: '100px', margin: '1rem auto 0'}} />
            </div>
          </div>
          <div id="carouselCourse" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row gx-5">
                  <div className="col-lg-4">
                    <div style={{overflow: 'hidden', height: '100%', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px'}}>
                      <div><img className="img-fluid" src={Course1} alt="Spektro Learn" style={{width: '100%'}} /></div>
                      <div className="p-4" style={{backgroundColor: '#EF5533', color: 'white', height: '100%'}}>
                        <div>
                          <h3 style={{fontWeight: 300}}>K-01</h3>
                          <h3>Moneter</h3>
                          <span>BI Institute</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{overflow: 'hidden', height: '100%', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px'}}>
                      <div><img className="img-fluid" src={Course2} alt="Spektro Learn" style={{width: '100%'}} /></div>
                      <div className="p-4" style={{backgroundColor: '#EF5533', color: 'white'}}>
                        <h3 style={{fontWeight: 300}}>K-02</h3>
                        <h3>Stabilitas Sistem Keuangan</h3>
                        <span>BI Institute</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{overflow: 'hidden', height: '100%', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px'}}>
                      <div><img className="img-fluid" src={Course3} alt="Spektro Learn" style={{width: '100%'}} /></div>
                      <div className="p-4" style={{backgroundColor: '#EF5533', color: 'white', height: '100%'}}>
                        <div>
                          <h3 style={{fontWeight: 300}}>K-03</h3>
                          <h3>Sistem Pembayaran</h3>
                          <span>BI Institute</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5" style={{position: 'relative', top: '3rem', display: 'flex', justifyContent: 'center'}}>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselCourse" data-bs-slide="prev" style={{position: 'relative', opacity: 1, width: '10%'}}>
                <img src={PrevBtn} alt="Spektro" />
                <span className="visually-hidden">Previous</span>
              </button>
              <a href="#"><button style={{backgroundColor: '#0A558C', height: '100%', borderRadius: '6px', color: 'white'}} className="px-4">Lihat semua</button></a>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselCourse" data-bs-slide="next" style={{position: 'relative', opacity: 1, width: '10%'}}>
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
              <hr style={{height: '3px', width: '100px', margin: '1rem auto 0'}} />
            </div>
          </div>
          <div id="carouselMaterials" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row gx-5">
                  <div className="col-lg-4">
                    <div style={{overflow: 'hidden', height: '100%', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px'}}>
                      <div><img className="img-fluid" src={Course2} alt="" style={{width: '100%'}} /></div>
                      <div className="p-4" style={{backgroundColor: '#FFE37A', height: '100%'}}>
                        <div>
                          <h3 style={{fontWeight: 300}}>K-01</h3>
                          <h3>Stabilitas Sistem Keuangan</h3>
                          <span>BI Institute</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{overflow: 'hidden', height: '100%', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px'}}>
                      <div><img className="img-fluid" src={Course2} alt="" style={{width: '100%'}} /></div>
                      <div className="p-4" style={{backgroundColor: '#FFE37A'}}>
                        <h3 style={{fontWeight: 300}}>K-02</h3>
                        <h3>Stabilitas Sistem Keuangan</h3>
                        <span>BI Institute</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{overflow: 'hidden', height: '100%', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px'}}>
                      <div><img className="img-fluid" src={Course2} alt="" style={{width: '100%'}} /></div>
                      <div className="p-4" style={{backgroundColor: '#FFE37A', height: '100%'}}>
                        <div>
                          <h3 style={{fontWeight: 300}}>K-03</h3>
                          <h3>Stabilitas Sistem Keuangan</h3>
                          <span>BI Institute</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5" style={{position: 'relative', top: '3rem', display: 'flex', justifyContent: 'center'}}>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselMaterials" data-bs-slide="prev" style={{position: 'relative', opacity: 1, width: '10%'}}>
                <img src={PrevBtn} alt="Spektro" />
                <span className="visually-hidden">Previous</span>
              </button>
              <a href="#"><button style={{backgroundColor: '#0A558C', height: '100%', borderRadius: '6px', color: 'white'}} className="px-4">Lihat semua</button></a>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselMaterials" data-bs-slide="next" style={{position: 'relative', opacity: 1, width: '10%'}}>
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
              <hr style={{height: '3px', width: '100px', margin: '1rem auto 0'}} />
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
                  <hr style={{height: '3px', width: '100px', margin: '1rem auto 0'}} />
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
