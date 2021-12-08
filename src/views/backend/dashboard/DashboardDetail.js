import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media, TabContent, TabPane, Nav, NavItem, NavLink, Table  } from 'reactstrap'
import { useHistory } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** List Component
import LogBook from './list/LogBook'

// ** image
import AvatarMount from '@src/assets/images/AvatarMount.png'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const DashboardDetail = () => {

  // ** Store Vars
  const store = useSelector(state => state.mentors),
    dispatch = useDispatch(),
    history = useHistory()

  const [userData, setUserData] = useState(null)
  const [active, setActive] = useState('1')
  const [activeExperience, setActiveExperience] = useState('1')
  const [activeLearning, setActiveLearning] = useState('1')
  const [activeRekap, setActiveRekap] = useState('1')
  const [proyek, setProyek] = useState([
    {
      no: 1,
      komponen: 'Pemahaman terhadap Proyek',
      persentase: '15%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    },
    {
      no: 2,
      komponen: 'Kualitas dan kedalaman penyelesaian proyek',
      persentase: '30%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    },
    {
      no: 3,
      komponen: 'Originalitas ide dan kretivitas penyelesaian proyek',
      persentase: '30%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    },
    {
      no: 4,
      komponen: 'Ketepatan waktu penyelesaian proyek',
      persentase: '10%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    },
    {
      no: 5,
      komponen: 'Penyajian hasil penyelesaian proyek',
      persentase: '15%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    }
  ])

  const [riset, setRiset] = useState([
    {
      no: 1,
      komponen: 'Sistematika pelaksanaan riset',
      persentase: '15%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    },
    {
      no: 2,
      komponen: 'Ketajaman dan kedalam analisis',
      persentase: '30%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    },
    {
      no: 3,
      komponen: 'Kualitas rekomendasi hasil riset',
      persentase: '30%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    },
    {
      no: 4,
      komponen: 'Ketepatan waktu penyelesaian riset',
      persentase: '10%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    },
    {
      no: 5,
      komponen: 'Penyajian hasil penyelesaian riset',
      persentase: '15%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    }
  ])

  const [experiences, setExperiences] = useState([
    {
      no: 1,
      komponen: 'Kedisiplinan, termasuk etika  dan akhlak',
      persentase: '25%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    },
    {
      no: 2,
      komponen: 'Komunikasi tertulis  dan lisan, termasuk kemampuan menyampaikan pendapat dan kepercayaan diri',
      persentase: '25%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    },
    {
      no: 3,
      komponen: 'Kerjasama dengan rekan kerja',
      persentase: '25%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    },
    {
      no: 4,
      komponen: 'Inisiatif dan keaktifan, termasuk dalam mecari infromasi dan menggali ide/pemikiran baru',
      persentase: '25%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    }
  ])

  const [learnings, setLearnings] = useState([
    {
      no: 1,
      komponen: 'Modul Wajib',
      persentase: '25%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3',
      child: ['a.', 'b.']
    },
    {
      no: 2,
      komponen: 'Modul Pilihan',
      persentase: '25%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3',
      child: ['a.', 'b.']
    },
    {
      no: 3,
      komponen: 'Modul Pelengkap',
      persentase: '25%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3',
      child: ['a.', 'b.']
    }
  ])

  const [rekaps, setRekaps] = useState([
    {
      no: 1,
      komponen: 'Proyek / Riset',
      persentase: '25%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3',
      child: ['a.', 'b.']
    },
    {
      no: 2,
      komponen: 'Experience',
      persentase: '25%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    },
    {
      no: 3,
      komponen: 'Learning',
      persentase: '25%',
      nilai: 0,
      nilai_akhir: 0,
      keterangan: 'Ipsum Lorem Limited V3'
    }
  ])

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      const user = JSON.parse(localStorage.getItem('userData'))
      setUserData(user.userdata)
    }

    if (!store.selected) {
      history.goBack(null)
    }
  }, [])

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const toggleExperience = tab => {
    if (activeExperience !== tab) {
      setActiveExperience(tab)
    }
  }

  const toggleLearning = tab => {
    if (activeLearning !== tab) {
      setActiveLearning(tab)
    }
  }

  const toggleRekap = tab => {
    if (activeRekap !== tab) {
      setActiveRekap(tab)
    }
  }

  return (
    <div id='dashboard' className="px-1">
      <Row className="p-2 mb-2" style={{backgroundColor: '#4F4F4F', borderRadius: 5}}>
        <Col lg="4">
          <h4 style={{color: '#FFFFFF'}}>Profil Mentee</h4>
          <p style={{color: '#FFFFFF'}}>
            Nama: {store.selected?.full_name} <br/>
            Jurusan: {store.selected?.majoring} <br/>
            Universitas: {store.selected?.universitas} <br/>
          </p>
        </Col>
        <Col lg="4">
          <h5 style={{color: '#FFFFFF'}}>Tema Riset/Proyek</h5>
          <p style={{color: '#FFFFFF'}}>
            Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum
          </p>
          <h5 style={{color: '#FFFFFF'}}>Jumlah SKS yang Diambil:</h5>
          <p style={{color: '#FFFFFF'}}>{store.selected?.total_sks}</p>
        </Col>
        <Col lg="2">
          <h5 style={{color: '#FFFFFF'}}>IPK</h5>
          <p style={{color: '#FFFFFF'}}>{store.selected?.ipk}</p>
          <h5 style={{color: '#FFFFFF'}}>Nilai Rerata KMBI</h5>
          <p style={{color: '#FFFFFF'}}>X.XX</p>
        </Col>
        <Col lg="2">
          <img className="img-fluid" style={{borderRadius: 10}} width="200" src={store.selected?.image_foto ? `${process.env.REACT_APP_BASE_URL}${store.selected?.image_foto}` : AvatarMount} alt="Spektro Profile" />
        </Col>
      </Row>
      <div className="mb-2" />
      <LogBook/>
      <div className="mb-2" />
      <Row>
        <Col sm='12' className="p-0">
          <Nav tabs className="mb-0 table-tab">
            <NavItem style={{marginRight: 10}}>
              <NavLink
                style={{backgroundColor: `${active === '1' ? '#202C42' : '#0A558C'}`, paddingLeft: 40, paddingRight: 40}}
                active={active === '1'}
                onClick={() => {
                  toggle('1')
                }}
              >
                <h4 style={{color: '#FFFFFF', fontWeight: 'bold'}}>Proyek</h4>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{backgroundColor: `${active === '2' ? '#202C42' : '#0A558C'}`, paddingLeft: 40, paddingRight: 40}}
                active={active === '2'}
                onClick={() => {
                  toggle('2')
                }}
              >
                <h4 style={{color: '#FFFFFF', fontWeight: 'bold'}}>Riset</h4>
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
      <Row className="p-2 mt-0" style={{backgroundColor: '#202C42'}}>
        <Col sm='12'>
          <TabContent className='py-50' activeTab={active}>
            <TabPane tabId='1'>
              <Table responsive style={{backgroundColor: '#FFFFFF', borderRadius: 5}}>
                <thead className="borderless">
                  <tr>
                    <td scope='col' className='text-nowrap'>
                      No
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Komponen Penilaian
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Persentase
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Nilai (0-100)
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Nilai Akhir
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Keterangan
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {proyek.map((data, key) => {
                    return (
                      <tr key={key}>
                        <td className='text-nowrap'>{data.no}</td>
                        <td className='text-nowrap'>{data.komponen}</td>
                        <td className='text-nowrap'>{data.persentase}</td>
                        <td className='text-nowrap'>{data.nilai}</td>
                        <td className='text-nowrap'>{data.nilai_akhir}</td>
                        <td className='text-nowrap'>{data.keterangan}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td scope='col' className='text-nowrap text-right' colSpan="2">
                      Nilai Akhir
                    </td>
                    <td scope='col' className='text-nowrap text-right' colSpan="3">
                      =Sum(a:b)
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </TabPane>
            <TabPane tabId='2'>
              <Table responsive style={{backgroundColor: '#FFFFFF', borderRadius: 5}}>
                <thead className="borderless">
                  <tr>
                    <td scope='col' className='text-nowrap'>
                      No
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Komponen Penilaian
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Persentase
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Nilai (0-100)
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Nilai Akhir
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Keterangan
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {riset.map((data, key) => {
                    return (
                      <tr key={key}>
                        <td className='text-nowrap'>{data.no}</td>
                        <td className='text-nowrap'>{data.komponen}</td>
                        <td className='text-nowrap'>{data.persentase}</td>
                        <td className='text-nowrap'>{data.nilai}</td>
                        <td className='text-nowrap'>{data.nilai_akhir}</td>
                        <td className='text-nowrap'>{data.keterangan}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td scope='col' className='text-nowrap text-right' colSpan="2">
                      Nilai Akhir
                    </td>
                    <td scope='col' className='text-nowrap text-right' colSpan="3">
                      =Sum(a:b)
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
      <div className="mb-2" />
      <Row>
        <Col sm='12' className="p-0">
          <Nav tabs className="mb-0 table-tab">
            <NavItem style={{marginRight: 10}}>
              <NavLink
                style={{backgroundColor: `${activeExperience === '1' ? '#202C42' : '#0A558C'}`, paddingLeft: 40, paddingRight: 40}}
                active={activeExperience === '1'}
                onClick={() => {
                  toggleExperience('1')
                }}
              >
                <h4 style={{color: '#FFFFFF', fontWeight: 'bold'}}>Working Experience</h4>
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
      <Row className="p-2 mt-0" style={{backgroundColor: '#202C42'}}>
        <Col sm='12'>
          <TabContent className='py-50' activeTab={activeExperience}>
            <TabPane tabId='1'>
              <Table responsive style={{backgroundColor: '#FFFFFF', borderRadius: 5}}>
                <thead className="borderless">
                  <tr>
                    <td scope='col' className='text-nowrap'>
                      No
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Komponen Penilaian
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Persentase
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Nilai (0-100)
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Nilai Akhir
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Keterangan
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {experiences.map((data, key) => {
                    return (
                      <tr key={key}>
                        <td className='text-nowrap'>{data.no}</td>
                        <td className='text-nowrap'>{data.komponen}</td>
                        <td className='text-nowrap'>{data.persentase}</td>
                        <td className='text-nowrap'>{data.nilai}</td>
                        <td className='text-nowrap'>{data.nilai_akhir}</td>
                        <td className='text-nowrap'>{data.keterangan}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td scope='col' className='text-nowrap text-right' colSpan="2">
                      Nilai Akhir
                    </td>
                    <td scope='col' className='text-nowrap text-right' colSpan="3">
                      =Sum(a:b)
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
      <div className="mb-2" />
      <Row>
        <Col sm='12' className="p-0">
          <Nav tabs className="mb-0 table-tab">
            <NavItem style={{marginRight: 10}}>
              <NavLink
                style={{backgroundColor: `${activeLearning === '1' ? '#202C42' : '#0A558C'}`, paddingLeft: 40, paddingRight: 40}}
                active={activeLearning === '1'}
                onClick={() => {
                  toggleExperience('1')
                }}
              >
                <h4 style={{color: '#FFFFFF', fontWeight: 'bold'}}>Learning</h4>
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
      <Row className="p-2 mt-0" style={{backgroundColor: '#202C42'}}>
        <Col sm='12'>
          <TabContent className='py-50' activeTab={activeLearning}>
            <TabPane tabId='1'>
              <Table responsive style={{backgroundColor: '#FFFFFF', borderRadius: 5}}>
                <thead className="borderless">
                  <tr>
                    <td scope='col' className='text-nowrap'>
                      No
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Komponen Penilaian
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Persentase
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Nilai (0-100)
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Nilai Akhir
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Keterangan
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {learnings.map((data, key) => {
                    return (
                      <tr key={key}>
                        <td className='text-nowrap'>{data.no}</td>
                        <td className='text-nowrap d-flex flex-column'>
                          {data.komponen}
                          {data.child.map((d, k) => {
                            return (
                              <span>{d}</span>
                            )
                          })}
                        </td>
                        <td className='text-nowrap'>{data.persentase}</td>
                        <td className='text-nowrap'>{data.nilai}</td>
                        <td className='text-nowrap'>{data.nilai_akhir}</td>
                        <td className='text-nowrap'>{data.keterangan}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td scope='col' className='text-nowrap text-right' colSpan="2">
                      Nilai Akhir
                    </td>
                    <td scope='col' className='text-nowrap text-right' colSpan="3">
                      =Sum(a:b)
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
      <div className="mb-2" />
      <Row>
        <Col sm='12' className="p-0">
          <Nav tabs className="mb-0 table-tab">
            <NavItem style={{marginRight: 10}}>
              <NavLink
                style={{backgroundColor: `${activeRekap === '1' ? '#202C42' : '#0A558C'}`, paddingLeft: 40, paddingRight: 40}}
                active={activeRekap === '1'}
                onClick={() => {
                  toggleExperience('1')
                }}
              >
                <h4 style={{color: '#FFFFFF', fontWeight: 'bold'}}>Rekapitulasi Nilai</h4>
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
      <Row className="p-2 mt-0" style={{backgroundColor: '#202C42'}}>
        <Col sm='12'>
          <TabContent className='py-50' activeTab={activeRekap}>
            <TabPane tabId='1'>
              <Table responsive style={{backgroundColor: '#FFFFFF', borderRadius: 5}}>
                <thead className="borderless">
                  <tr>
                    <td scope='col' className='text-nowrap'>
                      No
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Komponen Penilaian
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Persentase
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Nilai (0-100)
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Nilai Akhir
                    </td>
                    <td scope='col' className='text-nowrap'>
                      Keterangan
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {rekaps.map((data, key) => {
                    return (
                      <tr key={key}>
                        <td className='text-nowrap'>{data.no}</td>
                        <td className='text-nowrap'>{data.komponen}</td>
                        <td className='text-nowrap'>{data.persentase}</td>
                        <td className='text-nowrap'>{data.nilai}</td>
                        <td className='text-nowrap'>{data.nilai_akhir}</td>
                        <td className='text-nowrap'>{data.keterangan}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td scope='col' className='text-nowrap text-right' colSpan="2">
                      Nilai Akhir
                    </td>
                    <td scope='col' className='text-nowrap text-right' colSpan="3">
                      =Sum(a:b)
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardDetail
