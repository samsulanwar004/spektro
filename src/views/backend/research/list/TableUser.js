// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

// ** Columns
import { columns } from './pesertacolumns'

// ** Store & Actions
import { getDataPesertaResearch } from '../store/action/user'
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
  const store = useSelector(state => state.pesertaresearchs)

  const history = useHistory()

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // ** Get data on mount
  useEffect(() => {
    if (!store.params) {
      dispatch(
        getDataPesertaResearch({
          page: currentPage,
          perPage: rowsPerPage,
          q: searchTerm
        })
      )
    } else {
      dispatch(
        getDataPesertaResearch(store.params)
      )
      setSearchTerm(store.params.q)
      setCurrentPage(store.params.page)
      setRowsPerPage(store.params.perPage)
    }
  }, [dispatch])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getDataPesertaResearch({
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
      getDataPesertaResearch({
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
      getDataPesertaResearch({
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
          <h5 style={{color: '#FFFFFF'}}>Dashboard Research</h5>
          <Row className="pt-1">
            <Col sm='4'>
              <FormGroup>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  options={[{label: 'All Reasearch', value: 'all'}]}
                  value={{label: 'All Reasearch', value: 'all'}}
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
