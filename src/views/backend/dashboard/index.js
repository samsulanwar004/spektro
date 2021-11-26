import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** List Component
import Grid from './list/Grid'
import List from './list/List'
import LogBook from './list/LogBook'

// ** image
import AvatarMount from '@src/assets/images/AvatarMount.png'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const Dashboard = () => {

  // ** Store Vars
  const store = useSelector(state => state.profile),
  dispatch = useDispatch()

  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      const user = JSON.parse(localStorage.getItem('userData'))
      setUserData(user.userdata)
    }
  }, [])

  function renderDashboard() {


    if (userData?.role_id.value === 10) {
      // ** render Peserta KMBI
      return (
        <>
          <Row className="p-2 mb-2" style={{backgroundColor: '#4F4F4F', borderRadius: 5}}>
            <Col lg="4">
              <h4 style={{color: '#FFFFFF'}}>Profil</h4>
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
          <Grid/>
          <div className="mb-2" />
          <List/>
          <div className="mb-2" />
          <LogBook/>
        </>
      )
    } else {
      return (
        <>
          <Grid/>
          <div className="mb-2" />
          <List/>
        </>
      )
    }
  }

  return (
    <div id='dashboard' className="px-1">
      {renderDashboard()}
    </div>
  )
}

export default Dashboard
