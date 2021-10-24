import { useContext } from 'react'
import { List } from 'react-feather'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'

import '@styles/react/libs/charts/apex-charts.scss'

const AnalyticsDashboard = () => {
  const { colors } = useContext(ThemeColors)

  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        <Col lg='6' sm='12'>

        </Col>
      </Row>
    </div>
  )
}

export default AnalyticsDashboard
