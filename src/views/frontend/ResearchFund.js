import { useContext, useEffect, useState } from 'react'
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
import { getDataFrontendTestimoni } from '@src/views/frontend/store/action'

import frontCSS from '@src/assets/frontend/css/styles.css'

import BgResearch from '@src/assets/frontend/img/bg_research.png'
import Program1 from '@src/assets/frontend/img/Banlit.png'
import Program2 from '@src/assets/frontend/img/RGBI.png'
import Spinner from '@src/layouts/components/Spinner'

const configTestimoni = {
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 5
    }
  }
}

import '@styles/react/libs/swiper/swiper.scss'

SwiperCore.use([Navigation, Pagination, Autoplay])

const categoryPage = 'research fund'

const ResearchFund = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch()

  const [spinner, setSpinner] = useState(true)

  useEffect(() => {

    dispatch(getDataFrontendTestimoni({
      page: 1,
      perPage: 1000,
      category_page: categoryPage
    }))

    setTimeout(() => setSpinner(false), 1000)
  }, [dispatch])

  return (
    <div className="frontend-research">
      {spinner && <Spinner/>}
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Research Fund</title>
        <noscript>{`
            <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
      </Helmet>
      <div className="section">
        <div style={{backgroundImage: `url("${BgResearch}")`, minHeight: '285px', position: 'relative', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}}>
          <div className="container px-5">
            <div style={{position: 'absolute', bottom: '1rem', color: 'white'}}>
              <h1 style={{textShadow: '2px 0px #c4c4c4', color: '#FFFFFF'}}>Riset Bank Indonesia</h1>
            </div>
          </div>
        </div>
      </div>
      {/* Section Tentang */}
      <div className="section pt-5" style={{backgroundColor: '#FFF5ED'}}>            
        <div className="container px-5">
          <div className="row gx-5">
            <div className="col-lg-3">
              <div className="judul pb-5 text-lg-end">
                <h2 style={{color: '#803333'}}>Tentang Riset Bank Indonesia</h2>
                <hr className="float-lg-end float-start" style={{height: '5px', background: '#B11116', opacity: 1, width: '100px', margin: '1rem auto 0', borderRadius: '20px'}} />
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
      {/* Section Program */}
      <div className="section py-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="judul pb-5" style={{textAlign: 'center'}}>
              <h2 style={{color: '#803333'}}>Program yang Ditawarkan</h2>
              <hr style={{height: '5px', background: '#B11116', opacity: 1, width: '100px', margin: '1rem auto 0', borderRadius: '20px'}} />
            </div>
          </div>
          <div className="row gx-5 pt-4">
            <div className="col-lg-6">
              <div className="text-center">
                <div><img className="img-fluid" src={Program1} alt="Spektro Program" /></div>
                <div className="my-4" style={{color: '#B11116'}}>
                  <h3>Bantuan Penelitian BI Institute</h3>
                </div>
                <div style={{fontSize: '0.9rem', fontWeight: 300}}>
                  <p>Program Bantuan Penelitian (Banlit) merupakan salah satu program Bank Indonesia Institute yang diberikan kepada mahasiswa tingkat akhir pada jenjang S1 dan/atau setara, S2, dan S3 yang sedang menyelesaikan tugas akhirnya untuk bidang yang relevan. Program ini bertujuan untuk mendorong partisipasi mahasiswa perguruan tinggi dalam pelaksanaan menyusun tugas akhir yang terkait dengan ruang lingkup penelitian Bank Indonesia.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <div><img className="img-fluid" src={Program2} alt="Spektro Program" /></div>
                <div className="my-4" style={{color: '#B11116'}}>
                  <h3>Research Grant Bank Indonesia</h3>
                </div>
                <div style={{fontSize: '0.9rem', fontWeight: 300}}>
                  <p>Peserta dapat mengembangkan  potensi terbaik dirinya menjadi SDM unggul, memiliki daya saing, berwawasan luas dan memiliki kesiapan memasuki dunia kerja di bidang Kebanksentralan ataupun bidang Ekonomi dan Keuangan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Banlit */}
      <div className="section py-5" style={{backgroundColor: '#FFF5ED'}}>
        <div className="container px-5">
          <div className="row gx-5">
            <div>
              <h2>Program Banlit BI Institute</h2>
            </div>
            <div className="mt-5">
              <h2 className="text-center">Jumlah Bantuan</h2>
              <ul className="mx-auto" style={{listStyleType: 'circle', width: 'fit-content'}}>
                <li>Rp 10.000.000,00* (Sepuluh Juta Rupiah) untuk mahasiswa S1</li>
                <li>Rp 15.000.000,00* (Lima Belas Juta Rupiah) untuk mahasiswa S2</li>
                <li>Rp 20.000.000,00* (Dua Puluh Juta Rupiah) untuk mahasiswa S3</li>
              </ul>
            </div>
            <div className="mt-4 mb-5 text-center">
              <h2>Periode Pendaftaran</h2>
              <p>s.d. 31 Oktober setiap tahunnya</p>
            </div>
          </div>
          <div className="row gx-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div>
                <h3>Persyaratan Pendaftaran</h3>
                <ul style={{listStyleType: 'circle', fontSize: '00.9rem', fontWeight: 300}}>
                  <li>Mahasiswa/i WNI Program S1 dan/atau setara S2, maupun S3 dari Universitas/Perguruan Tinggi yang sudah memiliki Nota Kesepahaman (NK) dan Perjanjian Kerja Sama (PKS Prgogram Banlit dengan Bank Indonesia Institute yang masih berlaku.</li>
                  <li>Mahasiswa/yang sedang menyusun skripsi/thesis/disertasi di bidang ekonomi dan kebanksentralan, dan belum melakukan seminarhasil maupun sidang tugas akhir.</li>
                  <li>IPK minimal 3.23 dari skala 4.00</li>
                  <li>Direkomendasikan oleh dosen pembimbing/promotor dandosen pengampu kebanksentralan</li>
                  <li>Proposal Banlit dinyatakan layak menerima Banlit oleh panitia seleksi Bank Indonesia Institute</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{borderLeft: '1px solid #c4c4c4', paddingLeft: '2rem'}}>
                <h3>Cara Mengajukan</h3>
                <ul style={{listStyleType: 'circle', fontSize: '00.9rem', fontWeight: 300}}>
                  <li>Mengunjungi laman SPEKTRO (www.spektro-bi.org) dengan akun dosen pengampu kebanksentralan masing-masing universitas yang telah memiliki NK dan PKS dengan Bank Indonesia Institute yang masih berlaku</li>
                  <li>Menyiapkan dan mengunggah dokumen berikut:
                    <ol style={{listStyleType: 'lower-roman'}}>
                      <li>Surat rekomendasi yang ditandatangani oleh Kepala Program Studi</li>
                      <li>Legalisir transkrip IPK</li>
                      <li>Proposal penelitian yang telah disetukui oleh pembimbing/promotor dan dosen pengampu kebanksentralan
                      </li><li>Lembar persetujuan pembimbing/promotor</li>
                      <li>Curriculum Vitae (CV)</li>
                      <li>Foto Kartu Tanda Penduduk (KTP)</li>
                      <li>Halaman muka buku rekening </li>
                      <li>Nomor Pokok Wajib Pajak (NPWP)</li>
                    </ol>
                  </li>
                  <li>Melakukan unggah dokumen melalui laman SPEKTRO</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row gx-5">
            <div className="d-lg-flex justify-content-center text-center">
              <div style={{margin: '1.25rem 2rem 0'}}><button className="px-4" style={{backgroundColor: '#CC5353', minWidth: '175px', maxWidth: '175px', minHeight: '60px', borderRadius: '6px'}}><a href="#" style={{color: 'white', fontWeight: 'bold', textDecorationLine: 'none'}}>Download Flyer</a></button></div>
              <div style={{margin: '1.25rem 2rem 0'}}><button style={{backgroundColor: '#CC5353', minWidth: '175px', maxWidth: '175px', minHeight: '60px', borderRadius: '6px'}}><a href="#" style={{color: 'white', fontWeight: 'bold', textDecorationLine: 'none'}}>Panduan Program Banlit 2021</a></button></div>
              <div style={{margin: '1.25rem 2rem 0'}}><button style={{backgroundColor: '#CC5353', minWidth: '175px', maxWidth: '175px', minHeight: '60px', borderRadius: '6px'}}><a href="#" style={{color: 'white', fontWeight: 'bold', textDecorationLine: 'none'}}>Template Lembar Persetujuan</a></button></div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Research */}
      <div className="section py-5">
        <div className="container px-5">
          <div>
            <h2>Research Grant Bank Indonesia</h2>
          </div>
        </div>
      </div>
      {/* Section Testimoni */}
      <div className="section pt-5" style={{backgroundColor: '#FFF5ED'}}>
        <div className="py-5">
          <div className="container px-5">
            <div className="row gx-5">
              <div className="col-12">
                <div className="judul mb-5" style={{textAlign: 'center'}}>
                  <h2>Testimoni</h2>
                  <hr style={{height: '5px', background: '#B11116', opacity: 1, width: '100px', margin: '1rem auto 0', borderRadius: '20px'}} />
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResearchFund
