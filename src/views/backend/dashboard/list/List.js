// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { getDataCertficateCourse } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { selectThemeColors } from '@utils'
import { Input, Row, Col, FormGroup, Table } from 'reactstrap'
import Certificate from '@src/assets/images/Certificate.png'
import moment from 'moment'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const DashboardList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.certificatecourses)

  const history = useHistory()

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(2)

  // ** Get data on mount
  useEffect(() => {
    if (!store.params) {
      dispatch(
        getDataCertficateCourse({
          page: currentPage,
          perPage: rowsPerPage,
          q: searchTerm
        })
      )
    } else {
      dispatch(
        getDataCertficateCourse(store.params)
      )
      setSearchTerm(store.params.q)
      setCurrentPage(store.params.page)
      setRowsPerPage(store.params.perPage)
    }
  }, [dispatch])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getDataCertficateCourse({
        page: page.selected + 1,
        perPage: rowsPerPage,
        q: searchTerm
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getDataCertficateCourse({
        page: currentPage,
        perPage: value,
        q: searchTerm
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getDataCertficateCourse({
        page: currentPage,
        perPage: rowsPerPage,
        q: val
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
      />
    )
  }

  return (
    <Fragment>
      <Row className="p-2" style={{backgroundColor: '#444F62', borderRadius: 5}}>
        <Col sm='12'>
          <h5 style={{color: '#FFFFFF'}}>Certificates & Badges</h5>
          <Row className="pt-1 p-1">
            <Col sm='4'>
              <FormGroup>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  options={[{label: 'All Courses', value: 'all'}]}
                  value={{label: 'All Courses', value: 'all'}}
                  onChange={data => console.log(data)}
                />
              </FormGroup>
            </Col>
            <Col sm='4'>
              <FormGroup>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  options={[{label: 'Name (Ascending)', value: 'name_asc'}]}
                  value={{label: 'Name (Ascending)', value: 'name_asc'}}
                  onChange={data => console.log(data)}
                />
              </FormGroup>
            </Col>
            <Col sm='4'>
              <FormGroup>
                <Input
                  id='search-research'
                  type='text'
                  value={searchTerm}
                  placeholder="Search"
                  onChange={e => handleFilter(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="p-2 pb-4">
            {store.data.map((data, key) => {
              return (
                <Fragment key={key}>
                  <Col lg='12' className="d-flex align-items-center">
                    <div className="mr-1">
                      <img height={200} src={`${process.env.REACT_APP_BASE_URL}${data.image_certificate}`} onError={(e) => (e.target.src = Certificate)} alt="Certificate" />
                    </div>
                    <div>
                      <Table responsive className='borderless table-certificate' style={{color: '#FFFFFF'}}>
                        <tbody>
                          <tr><td><h3 style={{color: '#FFFFFF'}} dangerouslySetInnerHTML={{ __html: `${data.course?.course ?? 'Title'}`}}></h3></td><td></td></tr>
                          <tr><td><h6 style={{color: '#FFFFFF'}}>{data.course?.category ?? 'Category'}</h6></td><td></td></tr>
                          <tr><td>Nilai yang Diperoleh</td><td>&nbsp;:&nbsp;{data.enroll?.nilai_akhir_course ?? '-'}</td></tr>
                          <tr><td>Tanggal Terbit</td><td>&nbsp;:&nbsp;{data.enroll?.certificate_date ? moment(data.enroll?.certificate_date).format('DD MMM YYYY') : '-'}</td></tr>
                          <tr><td>Tanggal Kadaluarsa</td><td>&nbsp;:&nbsp;{data.enroll?.certificate_expired ? moment(data.enroll?.certificate_expired).format('DD MMM YYYY') : '-'}</td></tr>
                          <tr><td>ID Kredensial</td><td>&nbsp;:&nbsp;{data.enroll?.id_kredensial ?? '-'}</td></tr>
                          <tr><td>Link Kredensial</td><td>&nbsp;:&nbsp;<Link className='text-white' to={`/certificate/${data.enroll?.id_kredensial}`}>{`${data.enroll?.id_kredensial}`}</Link></td></tr>
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                  <hr style={{width: '100%', border: '1px solid #7CB721'}}/>
                </Fragment>
              )
            })}
          </Row>
          <div style={{position: 'absolute', left: 20, bottom: -25}}>
            <CustomPagination/>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}

export default DashboardList
