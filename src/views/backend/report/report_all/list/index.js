import { Fragment, useState, useEffect } from 'react'
import { Table, Row, Col, Card, CardBody, CardHeader, CardTitle, Button } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ReactExport from "react-data-export"

// ** Store & Actions
import { getReportAllCreated } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const MySwal = withReactContent(Swal)

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const ReportAll = () => {

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.reportallcreateds)
  const [picker, setPicker] = useState(new Date())

  useEffect(() => {
    dispatch(
      getReportAllCreated()
    )
  }, [])

  const renderDownload = () => {
    return (
      <ExcelFile element={
        <Button color='primary'>
          Download Excel
        </Button>
      } filename="Report User">
        <ExcelSheet data={store.allData.map((data, key) => {
            data.no = key + 1
          return data
        })} name="User">
          <ExcelColumn label="No" value="no"/>
          <ExcelColumn label="Keterangan" value="keterangan"/>
          <ExcelColumn label="Total" value="total"/>
        </ExcelSheet>
      </ExcelFile>
    )
  }

  return (
    <div className='app-user-list'>
      <Card>
        <CardBody>
          <Row>
            <Col md='12' className='d-flex flex-sm-row flex-column mt-2'>
              {renderDownload()}
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <Row>
          <Col lg='12'>
            <Table responsive>
              <thead>
                <tr>
                  <th scope='col' className='text-nowrap'>
                    No
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Keterangan
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {store.allData.map((data, key) => {

                  return (
                    <tr key={key}>
                      <td className='text-nowrap'>{key + 1}</td>
                      <td className='text-nowrap'>{data.keterangan}</td>
                      <td className='text-nowrap'>{data.total}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        </Card>
    </div>
  )
}

export default ReportAll
