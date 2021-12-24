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

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const DashboardGrid = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.dashboards)

  const history = useHistory()

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(8)

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
      setSearchTerm(store.params.q)
      setCurrentPage(store.params.page)
      setRowsPerPage(store.params.perPage)
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
      <Row className="p-2" style={{backgroundColor: '#202C42', borderRadius: 5}}>
        <Col sm='12'>
          <h5 style={{color: '#FFFFFF'}}>Course Overview</h5>
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
          <Row className="p-1 pb-4">
            {store.data.map((data, key) => {
              return (
                <a className="col-lg-3 mb-2" key={key} onClick={() => {
                  dispatch({
                    type: 'SELECT_DATA_FRONTEND_COURSE',
                    data
                  })
                  history.push(`/course-detail/${data.id_course}`)
                }}>
                  <div style={{overflow: 'hidden', height: '100%', borderRadius: '6px', boxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', WebkitBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', MozBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)'}}>
                    <div>
                      <img className="img-fluid" src={data.content_preview_image ? `${process.env.REACT_APP_BASE_URL}${data.content_preview_image}` : Course} alt="Spektro Learn" style={{width: '100%', height: 150}} />
                    </div>
                    <div className="p-2 pb-0" style={{backgroundColor: '#7CB721', color: 'white', height: '100%'}}>
                      <div style={{height: 40}}>
                        <h6 className="title-course" style={{color: '#FFFFFF'}} dangerouslySetInnerHTML={{ __html: `${data.course}`}}></h6>
                      </div>
                      <div className='mt-1 d-flex justify-content-between'>
                        <span className="title-course" style={{fontWeight: 300, color: '#FFFFFF'}}>{data.category}</span>
                        <span className='mt-2' style={{fontSize: 12, fontWeight: 300}}>1-2 jam</span>
                      </div>
                    </div>
                  </div>
                </a>
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

export default DashboardGrid
