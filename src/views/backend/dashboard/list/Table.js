// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

// ** Columns
import { columns } from './columns'

// ** Store & Actions
import { getDataMentor } from '../store/action/mentor'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button, FormGroup } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import DataTable from 'react-data-table-component'

import Course from '@src/assets/frontend/img/Course Image.png'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const DashboardTable = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.mentors)

  const history = useHistory()

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  // ** Get data on mount
  useEffect(() => {
    if (!store.params) {
      dispatch(
        getDataMentor({
          page: currentPage,
          perPage: rowsPerPage,
          q: searchTerm
        })
      )
    } else {
      dispatch(
        getDataMentor(store.params)
      )
    }
  }, [dispatch])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getDataMentor({
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
      getDataMentor({
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
      getDataMentor({
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

  // ** Table data to render
  const dataToRender = () => {

    const filters = {
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  return (
    <Fragment>
      <Row className="p-2" style={{backgroundColor: '#202C42', borderRadius: 5}}>
        <Col sm='12'>
          <h5 style={{color: '#FFFFFF'}}>Profil Mentee</h5>
          <Row className="p-1 pb-4">
            <DataTable
              style={{borderRadius: 5}}
              noHeader
              responsive
              paginationServer
              columns={columns((currentPage - 1) * rowsPerPage)}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              data={dataToRender()}
            />
          </Row>
          <div style={{position: 'absolute', left: 20, bottom: -25}}>
            <CustomPagination/>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}

export default DashboardTable
