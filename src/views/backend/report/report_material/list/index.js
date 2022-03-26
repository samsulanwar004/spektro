import { Fragment, useState } from 'react'
import { Table, Row, Col, Card, CardBody, CardHeader, CardTitle, Button } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ReactExport from "react-data-export"

// ** Store & Actions
import { getReportMaterial } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const MySwal = withReactContent(Swal)

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const UserReport = () => {

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.reportmaterials)
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
      getReportMaterial({
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
      } filename="Report Material">
        <ExcelSheet data={store.allData.map((data, key) => {
            data.no = key + 1
            data.date_created = moment(data.created_date).format('DD-MM-YYYY')
            data.time_created = moment(data.created_date).format('HH:mm:ss')
          return data
        })} name="Material">
          <ExcelColumn label="No" value="no"/>
          <ExcelColumn label="Author Name" value="full_name"/>
          <ExcelColumn label="Judul Artikel" value="title"/>
          <ExcelColumn label="Instansi" value="institusi"/>
          <ExcelColumn label="Kategori" value="category"/>
          <ExcelColumn label="Date Created" value="date_created"/>
          <ExcelColumn label="Time Created" value="time_created"/>
          <ExcelColumn label="Total Hit File" value="total_hit"/>
          <ExcelColumn label="Total Download" value="total_download"/>
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
                    Author Name
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Judul Artikel
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Instansi
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Kategori
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Date Created
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Time Created
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Total Hit File
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Total Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {store.allData.map((data, key) => {

                  return (
                    <tr key={key}>
                      <td className='text-nowrap'>{key + 1}</td>
                      <td className='text-nowrap'>{data.full_name}</td>
                      <td className='text-nowrap'>{data.title}</td>
                      <td className='text-nowrap'>{data.institusi}</td>
                      <td className='text-nowrap'>{data.category}</td>
                      <td className='text-nowrap'>{moment(data.created_date).format('DD-MM-YYYY')}</td>
                      <td className='text-nowrap'>{moment(data.created_date).format('HH:mm:ss')}</td>
                      <td className='text-nowrap'>-</td>
                      <td className='text-nowrap'>-</td>
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
