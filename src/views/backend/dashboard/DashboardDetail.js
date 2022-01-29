import { useContext, useEffect, useState, Fragment } from 'react'
import { 
  Row, 
  Col, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardBody, 
  Media, 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
  Table,
  Input,
  Button 
} from 'reactstrap'
import { useHistory, useParams, Link } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import { User, Info, Share2, MapPin, Check, X, Plus} from 'react-feather'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getDataMentorDetail, addMentorEvaluation } from './store/action/mentor'

// ** List Component
import LogBook from './list/LogBook'

// ** image
import AvatarMount from '@src/assets/images/AvatarMount.png'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const ToastContent = ({ text }) => {
  if (text) {
    return (
      <Fragment>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color='danger' icon={<X size={12} />} />
            <h6 className='toast-title font-weight-bold'>Error</h6>
          </div>
          <div className='toastify-body'>
            <span>{text}</span>
          </div>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
            <h6 className='toast-title font-weight-bold'>Success</h6>
          </div>
        </div>
      </Fragment>
    )
  }
}

const DashboardDetail = () => {

  // ** Store Vars
  const store = useSelector(state => state.mentors),
    dispatch = useDispatch(),
    history = useHistory(),
    {id} = useParams()

  const [userData, setUserData] = useState(null)
  const [active, setActive] = useState('1')
  const [activeExperience, setActiveExperience] = useState('1')
  const [activeLearning, setActiveLearning] = useState('1')
  const [activeRekap, setActiveRekap] = useState('1')
  const [proyek, setProyek] = useState([
    {
      no: 1,
      key: 'p1',
      komponen: 'Pemahaman terhadap Proyek',
      percentage: 15,
      value: 0,
      nilai_akhir: 0,
      description: ''
    },
    {
      no: 2,
      key: 'p2',
      komponen: 'Kualitas dan kedalaman penyelesaian proyek',
      percentage: 30,
      value: 0,
      nilai_akhir: 0,
      description: ''
    },
    {
      no: 3,
      key: 'p3',
      komponen: 'Originalitas ide dan kretivitas penyelesaian proyek',
      percentage: 30,
      value: 0,
      nilai_akhir: 0,
      description: ''
    },
    {
      no: 4,
      key: 'p4',
      komponen: 'Ketepatan waktu penyelesaian proyek',
      percentage: 10,
      value: 0,
      nilai_akhir: 0,
      description: ''
    },
    {
      no: 5,
      key: 'p5',
      komponen: 'Penyajian hasil penyelesaian proyek',
      percentage: 15,
      value: 0,
      nilai_akhir: 0,
      description: ''
    }
  ])

  const [riset, setRiset] = useState([
    {
      no: 1,
      key: 'r1',
      komponen: 'Sistematika pelaksanaan riset',
      percentage: 15,
      value: 0,
      nilai_akhir: 0,
      description: ''
    },
    {
      no: 2,
      key: 'r2',
      komponen: 'Ketajaman dan kedalam analisis',
      percentage: 30,
      value: 0,
      nilai_akhir: 0,
      description: ''
    },
    {
      no: 3,
      key: 'r3',
      komponen: 'Kualitas rekomendasi hasil riset',
      percentage: 30,
      value: 0,
      nilai_akhir: 0,
      description: ''
    },
    {
      no: 4,
      key: 'r4',
      komponen: 'Ketepatan waktu penyelesaian riset',
      percentage: 10,
      value: 0,
      nilai_akhir: 0,
      description: ''
    },
    {
      no: 5,
      key: 'r5',
      komponen: 'Penyajian hasil penyelesaian riset',
      percentage: 15,
      value: 0,
      nilai_akhir: 0,
      description: ''
    }
  ])

  const [experiences, setExperiences] = useState([
    {
      no: 1,
      key: 'w1',
      komponen: 'Kedisiplinan, termasuk etika  dan akhlak',
      percentage: 25,
      value: 0,
      nilai_akhir: 0,
      description: ''
    },
    {
      no: 2,
      key: 'w2',
      komponen: 'Komunikasi tertulis  dan lisan, termasuk kemampuan menyampaikan pendapat dan kepercayaan diri',
      percentage: 25,
      value: 0,
      nilai_akhir: 0,
      description: ''
    },
    {
      no: 3,
      key: 'w3',
      komponen: 'Kerjasama dengan rekan kerja',
      percentage: 25,
      value: 0,
      nilai_akhir: 0,
      description: ''
    },
    {
      no: 4,
      key: 'w4',
      komponen: 'Inisiatif dan keaktifan, termasuk dalam mecari infromasi dan menggali ide/pemikiran baru',
      percentage: 25,
      value: 0,
      nilai_akhir: 0,
      description: ''
    }
  ])

  const [learnings, setLearnings] = useState([
    {
      no: 1,
      key: 'l1',
      komponen: 'Modul Wajib',
      percentage: 50,
      value: 0,
      nilai_akhir: 0,
      description: '',
      child: ['a.', 'b.']
    },
    {
      no: 2,
      key: 'l2',
      komponen: 'Modul Pilihan',
      percentage: 25,
      value: 0,
      nilai_akhir: 0,
      description: '',
      child: ['a.', 'b.']
    },
    {
      no: 3,
      key: 'l3',
      komponen: 'Modul Pelengkap',
      percentage: 25,
      value: 0,
      nilai_akhir: 0,
      description: '',
      child: ['a.', 'b.']
    }
  ])

  const [rekaps, setRekaps] = useState([
    {
      no: 1,
      key: 'proyek',
      komponen: 'Proyek / Riset',
      percentage: 50,
      value: 0,
      nilai_akhir: 0,
      description: '',
      child: ['a.', 'b.']
    },
    {
      no: 2,
      key: 'working',
      komponen: 'Experience',
      percentage: 25,
      value: 0,
      nilai_akhir: 0,
      description: ''
    },
    {
      no: 3,
      key: 'learning',
      komponen: 'Learning',
      percentage: 25,
      value: 0,
      nilai_akhir: 0,
      description: ''
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

  useEffect(() => {
    if (store.selected) {
      dispatch(getDataMentorDetail({
        user_kmbi: id
      }))
    }
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/dashboard")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
  }, [store.loading])

  useEffect(() => {
    if (store.selectData) {
      const evaluations = store.selectData

      //** init proyek
      let oldProyek = proyek

      oldProyek = oldProyek.map(r => {

        const findData = evaluations.find(rs => rs.key === r.key)

        if (findData) {
          r.percentage = findData.percentage
          r.value = findData.value
          r.nilai_akhir = findData.value * findData.percentage / 100
          r.description = findData.description
          r.id_evaluation_detail = findData.id_evaluation_detail
          r.id_evaluation = findData.id_evaluation
        }
        return r
      })

      setProyek(oldProyek)

      //** init riset
      let oldRiset = riset

      oldRiset = oldRiset.map(r => {

        const findData = evaluations.find(rs => rs.key === r.key)

        if (findData) {
          r.percentage = findData.percentage
          r.value = findData.value
          r.nilai_akhir = findData.value * findData.percentage / 100
          r.description = findData.description
          r.id_evaluation_detail = findData.id_evaluation_detail
          r.id_evaluation = findData.id_evaluation
        }
        return r
      })

      setRiset(oldRiset)

      //** init working experience
      let oldWorking = experiences

      oldWorking = oldWorking.map(r => {

        const findData = evaluations.find(rs => rs.key === r.key)

        if (findData) {
          r.percentage = findData.percentage
          r.value = findData.value
          r.nilai_akhir = findData.value * findData.percentage / 100
          r.description = findData.description
          r.id_evaluation_detail = findData.id_evaluation_detail
          r.id_evaluation = findData.id_evaluation
        }
        return r
      })

      setExperiences(oldWorking)

      //** init learning
      let oldLearning = learnings

      oldLearning = oldLearning.map(r => {

        const findData = evaluations.find(rs => rs.key === r.key)

        if (findData) {
          r.percentage = findData.percentage
          r.value = findData.value
          r.nilai_akhir = findData.value * findData.percentage / 100
          r.description = findData.description
          r.id_evaluation_detail = findData.id_evaluation_detail
          r.id_evaluation = findData.id_evaluation
        }
        return r
      })

      setLearnings(oldLearning)
    }
  }, [store.selectData])

  const handleSave = () => {
    const details = [...proyek, ...riset, ...experiences, ...learnings]

    const datas = {}
    
    if (details[0].id_evaluation) {
      datas.id_evaluation = details[0].id_evaluation
      datas.user_kmbi = parseInt(id)
      datas.details = details
    } else {
      datas.user_kmbi = parseInt(id)
      datas.details = details
    }

    dispatch(addMentorEvaluation(datas))
  }

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

  const handleTextValueProyek = (key, value, name) => {
    let oldProyek = proyek

    if (value > 100) return null

    oldProyek = oldProyek.map((d, k) => {
      if (d.key === key) {
        d[name] = value
        if (name === 'value') {
          d.nilai_akhir = value * d.percentage / 100
        }
      }
      return d
    })

    setProyek(oldProyek)
  }

  const sumProyek = () => {
    const total = proyek.reduce((total, item) => total + item.nilai_akhir, 0)
    return total
  }

  const handleTextValueRiset = (key, value, name) => {
    let oldRiset = riset

    if (value > 100) return null

    oldRiset = oldRiset.map((d, k) => {
      if (d.key === key) {
        d[name] = value
        if (name === 'value') {
          d.nilai_akhir = value * d.percentage / 100
        }
      }
      return d
    })

    setRiset(oldRiset)
  }

  const sumRiset = () => {
    const total = riset.reduce((total, item) => total + item.nilai_akhir, 0)
    return total
  }

  const handleTextValueWorking = (key, value, name) => {
    let oldWorking = experiences

    if (value > 100) return null

    oldWorking = oldWorking.map((d, k) => {
      if (d.key === key) {
        d[name] = value
        if (name === 'value') {
          d.nilai_akhir = value * d.percentage / 100
        }
      }
      return d
    })

    setExperiences(oldWorking)
  }

  const sumWorking = () => {
    const total = experiences.reduce((total, item) => total + item.nilai_akhir, 0)
    return total
  }

  const handleTextValueLearning = (key, value, name) => {
    let oldLearning = learnings

    if (value > 100) return null

    oldLearning = oldLearning.map((d, k) => {
      if (d.key === key) {
        d[name] = value
        if (name === 'value') {
          d.nilai_akhir = value * d.percentage / 100
        }
      }
      return d
    })

    setLearnings(oldLearning)
  }

  const sumLearning = () => {
    const total = learnings.reduce((total, item) => total + item.nilai_akhir, 0)
    return total
  }

  useEffect(() => {
    let oldRekap = rekaps

    oldRekap = oldRekap.map((d, k) => {
      if (d.key === 'proyek') {
        if (sumProyek() > 0 && sumRiset() > 0) {
          d.value = (sumProyek() + sumRiset()) / 2
        } else if (sumRiset() > 0) {
          d.value = sumRiset()
        } else if (sumProyek() > 0) {
          d.value = sumProyek()
        }
        d.nilai_akhir = d.value * d.percentage / 100
      } else if (d.key === 'working') {
        d.value = sumWorking()
        d.nilai_akhir = d.value * d.percentage / 100
      } else if (d.key === 'learning') {
        d.value = sumLearning()
        d.nilai_akhir = d.value * d.percentage / 100
      }
      return d
    })

    setRekaps(oldRekap)
  }, [proyek, riset, experiences, learnings])

  const sumRekap = () => {
    const total = rekaps.reduce((total, item) => total + item.nilai_akhir, 0)
    return total
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
                        <td className='text-nowrap'>{`${data.percentage}%`}</td>
                        <td className='text-nowrap'> 
                          <Input
                            type='number'
                            min='0'
                            max='100'
                            value={data.value}
                            onChange={(e) => handleTextValueProyek(data.key, e.target.value, 'value')}
                            placeholder='Nilai'
                          />
                        </td>
                        <td className='text-nowrap text-right'>{data.nilai_akhir}</td>
                        <td className='text-nowrap'>
                          <Input
                            style={{width: 400}}
                            value={data.description}
                            onChange={(e) => handleTextValueProyek(data.key, e.target.value, 'description')}
                            placeholder='Keterangan'
                          />
                        </td>
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
                      {sumProyek()}
                    </td>
                    <td></td>
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
                        <td className='text-nowrap'>{`${data.percentage}%`}</td>
                        <td className='text-nowrap'>
                          <Input
                            type='number'
                            min='0'
                            max='100'
                            value={data.value}
                            onChange={(e) => handleTextValueRiset(data.key, e.target.value, 'value')}
                            placeholder='Nilai'
                          />
                        </td>
                        <td className='text-nowrap text-right'>{data.nilai_akhir}</td>
                        <td className='text-nowrap'>
                          <Input
                            style={{width: 400}}
                            value={data.description}
                            onChange={(e) => handleTextValueRiset(data.key, e.target.value, 'description')}
                            placeholder='Keterangan'
                          />
                        </td>
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
                      {sumRiset()}
                    </td>
                    <td></td>
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
                        <td className='text-nowrap'>{`${data.percentage}%`}</td>
                        <td className='text-nowrap'>
                          <Input
                            type='number'
                            min='0'
                            max='100'
                            value={data.value}
                            onChange={(e) => handleTextValueWorking(data.key, e.target.value, 'value')}
                            placeholder='Nilai'
                          />
                        </td>
                        <td className='text-nowrap text-right'>{data.nilai_akhir}</td>
                        <td className='text-nowrap'>
                          <Input
                            style={{width: 400}}
                            value={data.description}
                            onChange={(e) => handleTextValueWorking(data.key, e.target.value, 'description')}
                            placeholder='Keterangan'
                          />
                        </td>
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
                      {sumWorking()}
                    </td>
                    <td></td>
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
                              <span key={k}>{d}</span>
                            )
                          })}
                        </td>
                        <td className='text-nowrap'>{`${data.percentage}%`}</td>
                        <td className='text-nowrap'>
                          <Input
                            type='number'
                            min='0'
                            max='100'
                            value={data.value}
                            onChange={(e) => handleTextValueLearning(data.key, e.target.value, 'value')}
                            placeholder='Nilai'
                          />
                        </td>
                        <td className='text-nowrap text-right'>{data.nilai_akhir}</td>
                        <td className='text-nowrap'>
                          <Input
                            style={{width: 400}}
                            value={data.description}
                            onChange={(e) => handleTextValueLearning(data.key, e.target.value, 'description')}
                            placeholder='Keterangan'
                          />
                        </td>
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
                      {sumLearning()}
                    </td>
                    <td></td>
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
                        <td className='text-nowrap'>{`${data.percentage}%`}</td>
                        <td className='text-nowrap'>{data.value}</td>
                        <td className='text-nowrap text-right'>{data.nilai_akhir}</td>
                        <td className='text-nowrap'>{data.description}</td>
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
                      {sumRekap()}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </Table>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
      <Row className='p-2 mb-4' style={{backgroundColor: '#202C42'}}>
        <Col className='d-flex flex-sm-row flex-column'>
          <Button color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1' disabled={store.loading} onClick={() => handleSave()}>
            <FormattedMessage id='Save'/>
          </Button>
          <Link to='/dashboard'>
            <Button color='secondary' style={{backgroundColor: '#FFFFFF', color: '#08558c'}} outline>
              <FormattedMessage id='Back'/>
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardDetail
