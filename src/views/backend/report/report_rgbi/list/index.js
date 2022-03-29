import { Fragment, useState } from 'react'
import { Table, Row, Col, Card, CardBody, CardHeader, CardTitle, Button } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ReactExport from "react-data-export"

// ** Store & Actions
import { getReportRgbi } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const MySwal = withReactContent(Swal)

const statusObj = {
  OR: 'On Review',
  PP: 'Submitted',
  PR: 'Rejected',
  PU: 'Approve'
}

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const UserReport = () => {

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.reportrgbis)
  const [picker, setPicker] = useState(new Date())

  const handleShow = () => {
    if (!picker[0] || !picker[1]) {
      
      return MySwal.fire({
        title: 'Error',
        text: "Belum memilih Tanggal",
        icon: 'warning'
      })
    }

    dispatch(
      getReportRgbi({
        start_date: moment(picker[0]).format('YYYY-MM-DD'),
        end_date: moment(picker[1]).format('YYYY-MM-DD')
      })
    )
  }

  const renderDownload = () => {
    return (
      <ExcelFile element={
        <Button color='primary'>
          Download Excel
        </Button>
      } filename="Report RGBI">
        <ExcelSheet data={store.allData.map((data, key) => {
            data.no = key + 1
            data.status = statusObj[data.status_id]
            data.create_date = moment(data.create_date).format('DD-MMM-YYYY')
          return data
        })} name="RGBI">
          <ExcelColumn label="No" value="no"/>
          <ExcelColumn label="Nama Author" value="authors"/>
          <ExcelColumn label="Judul RGBI" value="title"/>
          <ExcelColumn label="Tanggal Pengajuan" value="create_date"/>
          <ExcelColumn label="PT / Instansi" value="universitas"/>
          <ExcelColumn label="Category" value="tags"/>
          <ExcelColumn label="Status" value="status"/>
        </ExcelSheet>
      </ExcelFile>
    )
  }

  return (
    <div className='app-user-list'>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filter</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Flatpickr
                value={picker}
                id='range-picker'
                className='form-control'
                onChange={date => setPicker(date)}
                options={{
                  mode: 'range'
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md='12' className='d-flex flex-sm-row flex-column mt-2'>
              <Button color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1' onClick={() => handleShow()}>
                Show
              </Button>
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
                    Nama Author
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Judul RGBI
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Tanggal Pengajuan
                  </th>
                  <th scope='col' className='text-nowrap'>
                    PT / Instansi
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Category
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {store.allData.map((data, key) => {
                  const status = statusObj[data.status_id] ? statusObj[data.status_id] : data.status_id 
                  return (
                    <tr key={key}>
                      <td className='text-nowrap'>{key + 1}</td>
                      <td className='text-nowrap'>{data.authors}</td>
                      <td className='text-nowrap'>{data.title}</td>
                      <td className='text-nowrap'>{moment(data.create_date).format('DD-MMM-YYYY')}</td>
                      <td className='text-nowrap'>{data.universitas}</td>
                      <td className='text-nowrap'>{data.tags}</td>
                      <td className='text-nowrap'>{status}</td>
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

export default UserReport
