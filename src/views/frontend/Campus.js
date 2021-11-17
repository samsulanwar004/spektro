import { useContext, useEffect } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { Helmet } from 'react-helmet'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay
} from 'swiper'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getDataFrontendTestimoni, getDataFrontendAnnouncement} from '@src/views/frontend/store/action'

import frontCSS from '@src/assets/frontend/css/styles.css'

import BgCampus from '@src/assets/frontend/img/bg_kampusmerdeka.png'
import Explore1 from '@src/assets/frontend/img/book 1.png'
import Explore2 from '@src/assets/frontend/img/project.png'
import Explore3 from '@src/assets/frontend/img/increase.png'
import Spinner from '@src/layouts/components/Spinner'

const configTestimoni = {
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  }
}

import '@styles/react/libs/swiper/swiper.scss'

SwiperCore.use([Navigation, Pagination, Autoplay])

const Campus = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch()

  useEffect(() => {

    dispatch(getDataFrontendAnnouncement({
      page: 1,
      perPage: 3
    }))

    dispatch(getDataFrontendTestimoni({
      page: 1,
      perPage: 1000
    }))
  }, [dispatch])

  return (
    <div className="frontend-campus">
      {store.loading && <Spinner/>}
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
        <div style={{backgroundImage: `url("${BgCampus}")`, minHeight: '285px', position: 'relative', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}}>
          <div className="container px-5">
            <div style={{position: 'absolute', bottom: '1rem', color: 'white'}}>
              <h2 style={{textShadow: '2px 0px #c4c4c4', color: '#FFFFFF'}}>Kampus Merdeka</h2>
              <h1 style={{textShadow: '2px 0px #c4c4c4', color: '#FFFFFF'}}>Bank Indonesia</h1>
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
                <hr className="float-lg-end float-start" style={{height: '5px', opacity: 1, width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C'}} />
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
              <hr style={{height: '5px', opacity: 1, width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C'}} />
            </div>
          </div>
          <div className="row gx-5 pt-4">
            <div className="col-lg-4">
              <div className="text-center">
                <div><img className="img-fluid" src={Explore1} alt="Spektro Explore" /></div>
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
                <div><img className="img-fluid" src={Explore2} alt="Spektro Explore" /></div>
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
                <div><img className="img-fluid" src={Explore3} alt="Spektro Explore" /></div>
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
              <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
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
                <button className="py-3" style={{minWidth: '150px', backgroundColor: '#0A558C', borderRadius: '6px'}}><a href="#" style={{color: 'white', fontWeight: 'bold', textDecorationLine: 'none'}}>Lihat Program</a></button>
              </div>
              <div className="text-center">
                <button className="py-3" style={{minWidth: '150px', backgroundColor: '#0A558C', borderRadius: '6px'}}><a href="#" style={{color: 'white', fontWeight: 'bold', textDecorationLine: 'none'}}>Daftar Program</a></button>
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
              <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
            </div>
          </div>
          <div className="row gx-5 justify-content-center">
            {store.dataAnnouncement.map((data, key) => {
              return (
                <div className="col-lg-3 mb-lg-0 mb-4" key={key}>
                  <div className="p-3" style={{backgroundColor: '#EDF8FC', borderRadius: '6px', boxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', WebkitBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', MozBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)'}}>
                    <div className="mb-3"><img style={{borderRadius: 6}} src={`${process.env.REACT_APP_BASE_URL}${data.path_thumbnail}`} className="img-fluid" alt={data.title} /></div>
                    <h3>{data.title}</h3>
                    <p className="announcement-desc" style={{fontSize: '0.9rem', fontWeight: 300}} dangerouslySetInnerHTML={{ __html: `${data.description}`}}></p>
                  </div>
                </div>
              )
            })}
            <div className="col-12 text-center pt-4">
              <div><button className="p-3" style={{minWidth: '150px', backgroundColor: '#0A558C', borderRadius: '6px'}}><a href="#" style={{color: 'white', fontWeight: 'bold', textDecorationLine: 'none'}}>Pengumuman Lain</a></button></div>
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
                  <hr style={{height: '5px', width: '100px', margin: '1rem auto 0', borderRadius: '20px', color: '#0A558C', opacity: 1}} />
                </div>
              </div>
            </div>
            <div className="row gx-5">
              <Swiper {...configTestimoni}>
                {store.dataTestimoni.map((data, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <div style={{textAlign: 'center'}}>
                        <div><img style={{borderRadius: 100}} src={`${process.env.REACT_APP_BASE_URL}${data.path_image}`} alt="Spektro Testimoni" /></div>
                        <div className="my-3">
                          <h5 className="mb-0">{data.nama}</h5>
                          <span>{data.posisi}</span>
                        </div>
                        <div>
                          <p style={{fontWeight: 300}} dangerouslySetInnerHTML={{ __html: `${data.testimoni}`}}></p>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
            <div style={{border: '1px solid #0A558C', width: '50%', margin: '0 auto 7rem', filter: 'blur(5px)', WebkitFilter: 'blur(5px)'}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Campus
