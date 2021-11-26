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

const DashboardList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.dashboards)

  const history = useHistory()

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(6)

  // ** Get data on mount
  useEffect(() => {
    if (!store.params) {
      dispatch(
        getDataEnrollCourse({
          page: currentPage,
          perPage: rowsPerPage,
          q: searchTerm
        })
      )
    } else {
      dispatch(
        getDataEnrollCourse(store.params)
      )
    }
  }, [dispatch])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getDataEnrollCourse({
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
      getDataEnrollCourse({
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
      getDataEnrollCourse({
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
          </Row>
          <Row className="p-2 pb-4">
            <Col lg='12' className="d-flex align-items-center">
              <div className="mr-1">
                <img className="img-fluid" src={Certificate} alt="Spektro Learn" />
              </div>
              <div>
                <h3 style={{color: '#FFFFFF'}}>Kebanksentralan</h3>
                <h6 style={{color: '#FFFFFF'}}>BINS</h6>
                <p style={{color: '#FFFFFF'}}>
                  Nilai yang Diperoleh : 100%<br/>
                  Tanggal Terbit           : 24 September 2021<br/>
                  ID Kredensial             : C24092021KBNKSNTRLNJW<br/>
                  Link Kredensial         : https://spektro-bi.org/mooc/certificates/C24092021KBNKSNTRLNJW
                </p>
              </div>
            </Col>
            <hr style={{width: '100%', border: '1px solid #7CB721'}}/>
          </Row>
        </Col>
      </Row>
    </Fragment>
  )
}

export default DashboardList
