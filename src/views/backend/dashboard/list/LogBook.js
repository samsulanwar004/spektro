// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { getDataEnrollCourse } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button, FormGroup } from 'reactstrap'
import { FormattedMessage } from 'react-intl'

import Course from '@src/assets/frontend/img/Course Image.png'
import Certificate from '@src/assets/images/Certificate.png'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const LogBook = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.dashboards)

  const history = useHistory()

  return (
    <Fragment>
      <Row className="p-2" style={{backgroundColor: '#4F4F4F', borderRadius: 5}}>
        <Col sm='12'>
          <h5 style={{color: '#FFFFFF'}}>Logbook</h5>
          <Row className="pt-1 p-1">
            <Col sm='12'>
              <div style={{width: '100%', height: 300, backgroundColor: '#EDF8FC', borderRadius: 5, textAlign: 'center' }}>
                Google Spreadsheet
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  )
}

export default LogBook
