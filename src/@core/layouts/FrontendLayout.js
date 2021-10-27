// ** React Imports
import { useEffect, useState } from 'react'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

import Logo from '@src/assets/frontend/img/Logo.png'
import Banner from '@src/assets/frontend/img/Banner.png'
import LogoWhite from '@src/assets/frontend/img/Logo (White).png'
import Youtube from '@src/assets/frontend/img/YT.png'
import Website from '@src/assets/frontend/img/Website.png'
import Instagram from '@src/assets/frontend/img/IG.png'

const FrontendLayout = ({ children, ...rest }) => {
  // ** Hooks
  const [skin, setSkin] = useSkin()

  // ** States
  const [isMounted, setIsMounted] = useState(false)

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    console.log(JSON.parse(localStorage.getItem('userData')))
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm" id="mainNav">
        <div className="container px-5">
          <a className="navbar-brand fw-bold" href="#page-top">
            <img src={Logo} alt="" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="bi-list" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
              <li className="nav-item"><a className="nav-link me-lg-3" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link me-lg-3" href="#learning">Learning Space</a></li>
              <li className="nav-item"><a className="nav-link me-lg-3" href="#kampus">Kampus Merdeka</a></li>
              <li className="nav-item"><a className="nav-link me-lg-3" href="#research">Research Fund</a></li>
              <li className="nav-item"><a className="nav-link me-lg-3" href="#forum">Forum</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="section">
        <div>
          <img className="img-fluid" src={Banner} alt="..." />
        </div>
      </div>
      {/* Section Tentang */}
      {children}
      {/* Footer*/}
      <footer className="py-5" style={{backgroundColor: '#0A558C'}}>
        <div className="container px-5">
          <div className="row gx-5">
            <div className="col-lg-9 text-white" style={{borderRight: '1px solid white'}}>
              <div className="mb-4"><img src={LogoWhite} alt="" /></div>
              <div className="mb-4" style={{fontWeight: 300}}><p>SPEKTRO merupakan Knowledge Management System berskala nasional sebagai sarana pertukaran pengetahuan interaktif antara Bank Indonesia dan Perguruan Tinggi yang memiliki local wisdom dalam rangka edukasi kebanksentralan serta memberikan masukan terhadap kebijakan Bank Indonesia</p></div>
              <div>
                <ul className="list-group list-group-horizontal" style={{listStyleType: 'none'}}>
                  <li className style={{}}>Tentang</li>
                  <li className style={{paddingLeft: '2rem'}}>FAQ</li>
                  <li className style={{paddingLeft: '2rem'}}>Kebijakan Privasi</li>
                  <li className style={{paddingLeft: '2rem'}}>Kontributor</li>
                  <li className style={{paddingLeft: '2rem'}}>Event</li>
                  <li className style={{paddingLeft: '2rem'}}>BMEB</li>
                  <li className style={{paddingLeft: '2rem'}}>JMIF</li>
                  <li className style={{paddingLeft: '2rem'}}>PERPUSBI</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div style={{textAlign: 'center', position: 'relative', top: '10%', transform: 'translateY(-10%)'}}>
                <img className="px-3" src={Youtube} alt="" />
                <img className="px-3" src={Website} alt="" />
                <img className="px-3" src={Instagram} alt="" />
              </div>
              <div style={{position: 'relative', top: '50%', transform: 'translateY(-50%)', color: 'white', fontWeight: 300}}>
                <p style={{fontSize: '0.75rem'}}>Bank Indonesia
                  Building D 10th Floor, Bank Indonesia Institute
                  Learning Innovation and Partnership Team
                  Jl. MH Thamrin no. 2, Central Jakarta
                  No. Telp : +6221 - 29810000 ext.2167
                  E-mail    : kmadmin@bi.go.id</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default FrontendLayout
