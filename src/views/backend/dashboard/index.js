import { useContext } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'

// ** List Component
import Grid from './list/Grid'
import List from './list/List'

// ** Styles
import '@styles/react/apps/app-users.scss'

const Dashboard = () => {
  const { colors } = useContext(ThemeColors)

  return (
    <div id='dashboard' className="px-1">
      <Row style={{backgroundColor: '#202C42', borderRadius: 5}}>
        <Row className="p-2">
          <Col sm='12'>
            <h5 style={{color: '#FFFFFF'}}>Course Overview</h5>
          </Col>
          <Col sm='12'>
            <Grid/>
          </Col>
        </Row>
      </Row>
      <Row className="mt-2" style={{backgroundColor: '#444F62', borderRadius: 5}}>
        <Row className="p-2">
          <Col sm='12'>
            <h5 style={{color: '#FFFFFF'}}>Certificates & Badges</h5>
          </Col>
          <Col sm='12'>
            <List/>
          </Col>
        </Row>
      </Row>
    </div>
  )
}

export default Dashboard
