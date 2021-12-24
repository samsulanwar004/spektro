import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAdminResearch } from './store/action'

// ** List Component
import Table from './list/Table'

// ** image
import AvatarMount from '@src/assets/images/AvatarMount.png'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const DashboardResearch = () => {

  // ** Store Vars
  const store = useSelector(state => state.profile),
  dispatch = useDispatch()

  const [userData, setUserData] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      const user = JSON.parse(localStorage.getItem('userData'))
      setUserData(user.userdata)
    }

    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div id='dashboard' className="px-1">
      <Row>
        <Col sm='6' className="p-0 pr-1">
          <Link to="/research_fund/banlit/save" onClick={() => {
            dispatch({
              type: 'ADD_BANLIT',
              data: null
            })

            dispatch(getAdminResearch(null))
          }}>
            <Button color='primary' className="w-100">
              Daftar BANLIT
            </Button>
          </Link>
        </Col>
      </Row>
      <div className="mb-2" />
      <Table/>
    </div>
  )
}

export default DashboardResearch
