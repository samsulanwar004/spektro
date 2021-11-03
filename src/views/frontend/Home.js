import { useContext } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { Helmet } from 'react-helmet'

import frontCSS from '@src/assets/frontend/css/styles.css'

import Banner from '@src/assets/frontend/img/Banner.png'
import Course1 from '@src/assets/frontend/img/Course Image.png'
import Course2 from '@src/assets/frontend/img/Course Image2.png'
import Course3 from '@src/assets/frontend/img/Course Image3.png'
import Testimoni1 from '@src/assets/frontend/img/testimoni 1.png'
import Testimoni2 from '@src/assets/frontend/img/testimoni 2.png'
import Testimoni3 from '@src/assets/frontend/img/testimoni 3.png'
import Partner from '@src/assets/frontend/img/partner 1.png'

const Home = () => {

  return (
    <div className='frontend-home'>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro</title>
        <noscript>{`
          <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" type="text/css" href="${frontCSS}" />
      `}</noscript>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
      </Helmet>
      <div className="section">
        <div>
          <img className="img-fluid" src={Banner} alt="..." />
        </div>
      </div>
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2>Tentang Spektro</h2>
              <hr style={{height: '3px', width: '100px', margin: '1rem auto 0'}} />
            </div>
          </div>
        </div>
        <div className="py-5" style={{backgroundColor: '#EDF8FC'}}>
          <div className="container px-5">
            <div className="row gx-5">
              <div className="col-lg-4">
                <div>
                  <img className="img-fluid" src="https://via.placeholder.com/434x325" alt="" />
                </div>
              </div>
              <div className="col-lg-8">
                <div>
                  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Inside */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2>Inside Spektro</h2>
              <hr style={{height: '3px', width: '100px', margin: '1rem auto 0'}} />
            </div>
          </div>
          <div className="row gx-5 justify-content-center" style={{paddingLeft: '1.5rem'}}>
            <div className="col-lg-4" style={{paddingLeft: 0}}>
              <div className="py-5" style={{backgroundColor: '#C4E8F6', borderRadius: '6px'}}>
                <div style={{margin: 'auto', width: 'fit-content'}}>
                  <h4>Learning Space</h4>
                  <ul className="mb-0" style={{listStyleType: 'circle'}}>
                    <li>Online Course</li>
                    <li>Central Bank Material</li>
                    <li>Central Bank Event</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3" style={{paddingLeft: 0}}>
              <div style={{backgroundColor: '#EDF8FC', borderRadius: '6px', height: '100%'}}>
                <div style={{margin: 'auto', width: 'fit-content', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                  <h4>Forum</h4>
                  <ul className="mb-0" style={{listStyleType: 'circle'}}>
                    <li>Artikel</li>
                    <li>Diskusi</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3" style={{paddingLeft: 0}}>
              <div style={{backgroundColor: '#E2F4FB', borderRadius: '6px', height: '100%'}}>
                <div style={{margin: 'auto', width: 'fit-content', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                  <h4>Riset</h4>
                  <ul className="mb-0" style={{listStyleType: 'circle'}}>
                    <li>BANLIT</li>
                    <li>RGBI</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row gx-5 mt-4 justify-content-center" style={{paddingLeft: '1.5rem'}}>
            <div className="col-lg-4" style={{paddingLeft: 0}}>
              <div className="py-5" style={{backgroundColor: '#E2F4FB', borderRadius: '6px'}}>
                <div style={{margin: 'auto', width: 'fit-content'}}>
                  <h4>Kampus Merdeka</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6" style={{paddingLeft: 0}}>
              <div style={{backgroundColor: '#DCF1FA', borderRadius: '6px', height: '100%'}}>
                <div style={{margin: 'auto', width: 'fit-content', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                  <h4>Event Kebanksentralan</h4>
                </div>
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
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row gx-5">
                  <div className="col-lg-4">
                    <div style={{overflow: 'hidden', height: '100%', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px'}}>
                      <div><img className="img-fluid" src={Course1} alt="" style={{width: '100%'}} /></div>
                      <div className="p-4" style={{backgroundColor: '#2F4B7B', color: 'white', height: '100%'}}>
                        <div>
                          <h3 style={{fontWeight: 300}}>K-01</h3>
                          <h3>Moneter</h3>
                          <span>BI Institute</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px'}}>
                      <div><img className="img-fluid" src={Course2} alt="" style={{width: '100%'}} /></div>
                      <div className="p-4" style={{backgroundColor: '#2F4B7B', color: 'white'}}>
                        <h3 style={{fontWeight: 300}}>K-02</h3>
                        <h3>Stabilitas Sistem Keuangan</h3>
                        <span>BI Institute</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{overflow: 'hidden', height: '100%', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px'}}>
                      <div><img className="img-fluid" src={Course3} alt="" style={{width: '100%'}} /></div>
                      <div className="p-4" style={{backgroundColor: '#2F4B7B', color: 'white', height: '100%'}}>
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
              <div className="carousel-item">
                <div className="col-lg-4">
                  <div style={{overflow: 'hidden', height: '100%'}}>
                    <div><img className="img-fluid" src={Course1} alt="" style={{width: '100%'}} /></div>
                    <div className="p-4" style={{backgroundColor: '#2F4B7B', color: 'white', height: '100%'}}>
                      <div>
                        <h3 style={{fontWeight: 300}}>K-01</h3>
                        <h3>Moneter</h3>
                        <span>BI Institute</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden={true} />
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden={true} />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Section Testimoni */}
      <div className="section pt-5">
        <div className="py-5" style={{backgroundColor: '#C3DBF6'}}>
          <div className="container px-5">
            <div className="row gx-5">
              <div className="col-12">
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
      <div className="section py-5">
        <div className="container px-5 py-5">
          <div className="row gx-5">
            <div className="col-12">
              <div className="judul mb-5" style={{textAlign: 'center'}}>
                <h2>SPEKTRO PARTNER</h2>
              </div>
            </div>
          </div>
          <div className="row gx-5">
            <div className="col-12">
              <div>
                <img src={Partner} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
