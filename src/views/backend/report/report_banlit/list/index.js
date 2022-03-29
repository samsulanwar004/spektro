import { Fragment, useState } from 'react'
import { Table, Row, Col, Card, CardBody, CardHeader, CardTitle, Button } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ReactExport from "react-data-export"

// ** Store & Actions
import { getReportBanlit } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const MySwal = withReactContent(Swal)

const statusObj = {
  RA: 'Accepted Proposal',
  RFP: 'Rejected Final Project',
  RJ: 'Rejected Journal',
  RR: 'Rejected Proposal',
  RV: 'On Review Proposal',
  RVJ: 'On Review Journal',
  RVP: 'On Review Final Project',
  NN: 'None',
  AFP: 'Accepted Final Project',
  AJ: 'Accepted Journal'
}

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const UserReport = () => {

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.reportbanlits)
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
      getReportBanlit({
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
      } filename="Report BANLIT">
        <ExcelSheet data={store.allData.map((data, key) => {
            data.no = key + 1
            data.status = statusObj[data.status_id]
            data.tahun = moment(data.create_date).format('YYYY')
            data.create_date = moment(data.create_date).format('DD-MMM-YYYY')
          return data
        })} name="BANLIT">
          <ExcelColumn label="No" value="no"/>
          <ExcelColumn label="Judul BANLIT" value="research_title"/>
          <ExcelColumn label="Tahun" value="tahun"/>
          <ExcelColumn label="Tanggal Pengajuan" value="create_date"/>
          <ExcelColumn label="Degree Level" value="degree_level"/>
          <ExcelColumn label="IPK" value="gpa"/>
          <ExcelColumn label="Universitas / Institusi" value="universitas"/>
          <ExcelColumn label="Faculty" value="faculty"/>
          <ExcelColumn label="Major" value="major"/>
          <ExcelColumn label="Authors Name" value="authors_name"/>
          <ExcelColumn label="Authors ID" value="authors_ids"/>
          <ExcelColumn label="Phone Number" value="phone_number"/>
          <ExcelColumn label="Email" value="email"/>
          <ExcelColumn label="Bank Account" value="bank_account"/>
          <ExcelColumn label="Bank Name" value="tax_number"/>
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
                    Judul BANLIT
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Tahun
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Tanggal Pengajuan
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Degree Level
                  </th>
                  <th scope='col' className='text-nowrap'>
                    IPK
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Universitas / Institusi
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Faculty
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Major
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Authors Name
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Authors ID
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Phone Number
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Email
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Bank Account
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Bank Name
                  </th>
                  <th scope='col' className='text-nowrap'>
                    Tax Number
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
                      <td className='text-nowrap'>{data.research_title}</td>
                      <td className='text-nowrap'>{moment(data.create_date).format('YYYY')}</td>
                      <td className='text-nowrap'>{moment(data.create_date).format('DD-MMM-YYYY')}</td>
                      <td className='text-nowrap'>{data.degree_level}</td>
                      <td className='text-nowrap'>{data.gpa}</td>
                      <td className='text-nowrap'>{data.universitas}</td>
                      <td className='text-nowrap'>{data.faculty}</td>
                      <td className='text-nowrap'>{data.major}</td>
                      <td className='text-nowrap'>{data.authors_name}</td>
                      <td className='text-nowrap'>{data.authors_ids}</td>
                      <td className='text-nowrap'>{data.phone_number}</td>
                      <td className='text-nowrap'>{data.email}</td>
                      <td className='text-nowrap'>{data.bank_account}</td>
                      <td className='text-nowrap'>{data.bank_name}</td>
                      <td className='text-nowrap'>{data.tax_number}</td>
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
