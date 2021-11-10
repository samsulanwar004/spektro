import { useContext } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { Helmet } from 'react-helmet'

import frontCSS from '@src/assets/frontend/css/styles.css'

import BgCampus from '@src/assets/frontend/img/bg_kampusmerdeka.png'
import Course1 from '@src/assets/frontend/img/book 1.png'
import Course2 from '@src/assets/frontend/img/project.png'
import Course3 from '@src/assets/frontend/img/increase.png'
import Testimoni1 from '@src/assets/frontend/img/testimoni 1.png'
import Testimoni2 from '@src/assets/frontend/img/testimoni 2.png'
import Testimoni3 from '@src/assets/frontend/img/testimoni 3.png'

const Campus = () => {

  return (
    <div className="frontend-campus">
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Kampus Merdeka</title>
        <noscript>{`
            <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
      </Helmet>
      <div className="section">
        <div style={{backgroundImage: `url("${BgCampus}")`, minHeight: '285px', position: 'relative'}}>
          <div className="container px-5">
            <div style={{position: 'absolute', bottom: '1rem', color: 'white'}}>
              <h2>Kampus Merdeka</h2>
              <h1>Bank Indonesia</h1>
            </div>
          </div>
        </div>
      </div>
      {/* Section Tentang */}
      <div className="section pt-5" style={{backgroundColor: '#EDF8FC'}}>            
        <div className="container px-5">
          <div className="row gx-5">
            <div className="col-lg-3">
              <div className="judul pb-5" style={{textAlign: 'right'}}>
                <h2>Merdeka Belajar Bersama Bank Indonesia</h2>
                <hr className="float-lg-end float-start" style={{height: '3px', width: '100px', margin: '1rem auto 0'}} />
              </div>
            </div>
            <div className="col-lg-9">
              <div>
                <p style={{fontSize: '0.9rem', fontWeight: 300}}>"Bank Indonesia mengundang Putra/Putri terbaik bangsa, Mahasiswa Program S1 atau S2 dari Perguruan Tinggi Negeri/Swasta di Indonesia, untuk bergabung ke dalam Program Kampus Merdeka  di Bank Indonesia. Melalui program ini, Bank Indonesia mengintegrasikan kegiatan pembelajaran berupa learning, project/research, dan working experience sehingga peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Explore */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2>Eksplor Potensimu Bersama Kami</h2>
              <hr style={{height: '3px', width: '100px', margin: '1rem auto 0'}} />
            </div>
          </div>
          <div className="row gx-5 pt-4">
            <div className="col-lg-4">
              <div className="text-center">
                <div><img className="img-fluid" src={Course1} alt="Spektro Explore" /></div>
                <div className="my-4">
                  <h3>Learning</h3>
                </div>
                <div style={{fontSize: '0.9rem', fontWeight: 300}}>
                  <p>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center">
                <div><img className="img-fluid" src={Course2} alt="Spektro Explore" /></div>
                <div className="my-4">
                  <h3>Project/Research</h3>
                </div>
                <div style={{fontSize: '0.9rem', fontWeight: 300}}>
                  <p>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center">
                <div><img className="img-fluid" src={Course3} alt="Spektro Explore" /></div>
                <div className="my-4">
                  <h3>Working Experience</h3>
                </div>
                <div style={{fontSize: '0.9rem', fontWeight: 300}}>
                  <p>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Linimasa */}
      <div className="section pt-5">
        <div className="container px-5 pt-5">
          <div className="row gx-5">
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2>Linimasa Pendaftaran</h2>
              <hr style={{height: '3px', width: '100px', margin: '1rem auto 0'}} />
            </div>
          </div>
        </div>
        <div className="row gx-0 px-3 py-4" style={{backgroundColor: '#EDF8FC'}}>
          <div className="px-3 col-lg text-center">
            <h3 style={{color: '#0A558C'}}>Sosialisasi</h3>
            <p style={{fontSize: '0.9rem', fontWeight: 300}}>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
          </div>
          <div className="px-3 col-lg text-center" style={{borderLeft: '1px solid #c4c4c4'}}>
            <h3 style={{color: '#0A558C'}}>Pendaftaran</h3>
            <p style={{fontSize: '0.9rem', fontWeight: 300}}>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
          </div>
          <div className="px-3 col-lg text-center" style={{borderLeft: '1px solid #c4c4c4'}}>
            <h3 style={{color: '#0A558C'}}>Seleksi</h3>
            <p style={{fontSize: '0.9rem', fontWeight: 300}}>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
          </div>
          <div className="px-3 col-lg-3 text-center" style={{borderLeft: '1px solid #c4c4c4'}}>
            <h3 style={{color: '#0A558C'}}>Pengumuman</h3>
            <p style={{fontSize: '0.9rem', fontWeight: 300}}>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
          </div>
          <div className="col-lg">
            <div style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
              <div className="mb-3 text-center">
                <button className="py-3" style={{minWidth: '150px', backgroundColor: '#0A558C', borderRadius: '6px'}}><a href="#" style={{color: 'white'}}>Lihat Program</a></button>
              </div>
              <div className="text-center">
                <button className="py-3" style={{minWidth: '150px', backgroundColor: '#0A558C', borderRadius: '6px'}}><a href="#" style={{color: 'white'}}>Daftar Program</a></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Pengumuman Terkini */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul py-5" style={{textAlign: 'center'}}>
              <h2>Pengumuman Terkini</h2>
              <hr style={{height: '3px', width: '100px', margin: '1rem auto 0'}} />
            </div>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-3 mb-lg-0 mb-4">
              <div className="p-3" style={{backgroundColor: '#EDF8FC', borderRadius: '6px'}}>
                <div className="mb-3"><img src="https://via.placeholder.com/390x217" className="img-fluid" alt="" /></div>
                <h3>Judul</h3>
                <p style={{fontSize: '0.9rem', fontWeight: 300}}>lorem ipsum lorem ipsum lorem</p>
              </div>
            </div>
            <div className="col-lg-3 mb-lg-0 mb-4">
              <div className="p-3" style={{backgroundColor: '#EDF8FC', borderRadius: '6px'}}>
                <div className="mb-3"><img src="https://via.placeholder.com/390x217" className="img-fluid" alt="" /></div>
                <h3>Judul</h3>
                <p style={{fontSize: '0.9rem', fontWeight: 300}}>lorem ipsum lorem ipsum lorem</p>
              </div>
            </div>
            <div className="col-lg-3 mb-lg-0 mb-4">
              <div className="p-3" style={{backgroundColor: '#EDF8FC', borderRadius: '6px'}}>
                <div className="mb-3"><img src="https://via.placeholder.com/390x217" className="img-fluid" alt="" /></div>
                <h3>Judul</h3>
                <p style={{fontSize: '0.9rem', fontWeight: 300}}>lorem ipsum lorem ipsum lorem</p>
              </div>
            </div>
            <div className="col-12 text-center pt-4">
              <div><button className="p-3" style={{minWidth: '150px', backgroundColor: '#0A558C', borderRadius: '6px'}}><a href="#" style={{color: 'white'}}>Pengumuman Lain</a></button></div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Testimoni */}
      <div className="section pt-5">
        <div className="py-5">
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
                <div><img src={Testimoni1} alt="Spektro Testimoni" /></div>
                <div className="my-3">
                  <h5 className="mb-0">IVAN WIDJANARKO</h5>
                  <span>Peserta KMBI III</span>
                </div>
                <div>
                  <p style={{fontWeight: 300}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
              </div>
              <div className="col-lg-4" style={{textAlign: 'center'}}>
                <div><img src={Testimoni2} alt="Spektro Testimoni" /></div>
                <div className="my-3">
                  <h5 className="mb-0">SHARFINA</h5>
                  <span>OJK</span>
                </div>
                <div>
                  <p style={{fontWeight: 300}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
              </div>
              <div className="col-lg-4" style={{textAlign: 'center'}}>
                <div><img src={Testimoni3} alt="Spektro Testimoni" /></div>
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

export default Campus
