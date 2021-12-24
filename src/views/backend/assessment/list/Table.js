// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Columns
import { columns } from './columns'

// ** Store & Actions
import { getDataAssessment, getAssessment, enrollAdminCourse, emailAddResearch } from '../store/action'
import { getAllDataCourse } from '@src/views/backend/course/course/store/action'
import { getAllData } from '@src/views/backend/management/user/store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown, X, Check } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors, removeTags, isObjEmpty } from '@utils'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardBody, 
  Input, 
  Row, 
  Col, 
  Label, 
  CustomInput, 
  Button, 
  Modal, 
  ModalHeader, 
  ModalFooter, 
  ModalBody,
  Form,
  FormGroup 
} from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { useForm, Controller } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import moment from 'moment'

import Logo1 from '@src/assets/course/img/logo1.png'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const ToastContent = ({ text }) => {
  if (text) {
    return (
      <Fragment>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color='danger' icon={<X size={12} />} />
            <h6 className='toast-title font-weight-bold'>Error</h6>
          </div>
          <div className='toastify-body'>
            <span>{text}</span>
          </div>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
            <h6 className='toast-title font-weight-bold'>Success</h6>
          </div>
        </div>
      </Fragment>
    )
  }
}

// ** Table Header
const CustomHeader = ({ handleCreate, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  return (
    <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <Label for='rows-per-page'>Show</Label>
            <CustomInput
              className='form-control mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{
                width: '5rem',
                padding: '0 0.8rem',
                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
              }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </CustomInput>
            <Label for='rows-per-page'>Entries</Label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
            <Label className='mb-0' for='search-invoice'>
              Search:
            </Label>
            <Input
              id='search-invoice'
              className='ml-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>
          <a onClick={handleCreate}>
            <Button.Ripple color='primary'>
              <FormattedMessage id='Add'/>
            </Button.Ripple>
          </a>
        </Col>
      </Row>
    </div>
  )
}

const DepartemenList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.assessments),
    users = useSelector(state => state.users),
    courses = useSelector(state => state.courses)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm({
    defaultValues: { gender: 'gender-female', dob: null }
  })

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** Form Course Enroll
  const [selectedPeserta, setSelectedPeserta] = useState({label: 'Select...', value: ''})
  const [selectedCourse, setSelectedCourse] = useState({label: 'Select...', value: ''})
  const [modalAdd, setModalAdd] = useState(false)
  const [data, setData] = useState(null)

  // ** Get data on mount
  useEffect(() => {
    if (!store.params) {
      dispatch(
        getDataAssessment({
          page: currentPage,
          perPage: rowsPerPage,
          q: searchTerm
        })
      )
    } else {
      dispatch(
        getDataAssessment(store.params)
      )
      setSearchTerm(store.params.q)
      setCurrentPage(store.params.page)
      setRowsPerPage(store.params.perPage)
    }

    dispatch(getAllData())
    dispatch(getAllDataCourse())
    dispatch({
      type: 'ADD_NEW_ASSESSMENT',
      data: null
    })
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )

      setModalAdd(false)
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
  }, [store.loading])

  const sendEmailAddCourse = (data) => {
    dispatch(emailAddResearch({
      type: "enroll_course_dari_admin",
      to: selectedPeserta.email,
      nama_peserta: selectedPeserta.full_name,
      nama_course: removeTags(data.course),
      kode_course: selectedCourse.code_course,
      tanggal: moment(data.expired_date).format('YYYY-MM-DD'),
      link_course: `${process.env.REACT_APP_BASE_FE_URL}/course-detail/${data.id_course.value}`
    }))
  }

  useEffect(() => {
    if (store.newAssessment && store.newAssessment?.status) {
      sendEmailAddCourse(store.newAssessment.data[0])
    }
  }, [store.newAssessment])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getDataAssessment({
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
      getDataAssessment({
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
      getDataAssessment({
        page: currentPage,
        perPage: rowsPerPage,
        q: val
      })
    )
  }

  // ** Function create
  const handleCreate = e => {
    setModalAdd(true)
    setSelectedPeserta({label: 'Select...', value: ''})
    setSelectedCourse({label: 'Select...', value: ''})
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

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)

      if (selectedPeserta.value === '') {
        toast.error(
          <ToastContent text={'Peserta Harus di pilih'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )

        return null
      } else if (selectedCourse.value === '') {
        toast.error(
          <ToastContent text={'Course harus di pilih'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )

        return null
      }

      data.resource_id = selectedPeserta.value
      data.id_course = selectedCourse.value

      dispatch(enrollAdminCourse(data))
    }
  }

  return (
    <Fragment>
      <Card>
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          paginationServer
          columns={columns((currentPage - 1) * rowsPerPage)}
          sortIcon={<ChevronDown />}
          className='react-dataTable'
          paginationComponent={CustomPagination}
          data={dataToRender()}
          subHeaderComponent={
            <CustomHeader
              handleCreate={handleCreate}
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
              searchTerm={searchTerm}
              handleFilter={handleFilter}
            />
          }
        />
      </Card>
      <Modal
        isOpen={modalAdd}
        toggle={() => setModalAdd(!modalAdd)}
        className={'modal-dialog-centered'}
      >
        <ModalHeader style={{paddingRight: 35}} toggle={() => setModalAdd(!modalAdd)}>
          <div className="d-flex align-items-center ">
            <img src={Logo1} className="img-fluid" alt="spektro logo" style={{maxWidth: '15%', marginRight: 10}} />
            <h4>Course Enroll</h4>
          </div>
        </ModalHeader>
        <ModalBody>
          <Row className='app-user-edit'>
            <Col sm='12'>
              <Card>
                <CardBody className='pt-2'>
                  <Form
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Row className='mt-1'>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='resource_id'>Peserta</Label>
                          <Controller
                            name='resource_id'
                            id='resource_id'
                            control={control}
                            invalid={data !== null && (data.resource_id === undefined || data.resource_id === null)}
                            defaultValue={selectedPeserta}
                            render={({value, onChange}) => {

                              return (
                                <Select
                                  isClearable={false}
                                  theme={selectThemeColors}
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={users.allData.map(r => {
                                    return {
                                      value: r.resource_id,
                                      label: `${r.full_name} - ${r.email}`,
                                      email: r.email,
                                      full_name: r.full_name
                                    }
                                  })}
                                  value={selectedPeserta}
                                  onChange={data => {
                                    onChange(data)
                                    setSelectedPeserta(data)
                                  }}
                                />
                              )
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='id_course'>Course</Label>
                          <Controller
                            name='id_course'
                            id='id_course'
                            control={control}
                            invalid={data !== null && (data.id_course === undefined || data.id_course === null)}
                            defaultValue={selectedCourse}
                            render={({value, onChange}) => {

                              return (
                                <Select
                                  isClearable={false}
                                  theme={selectThemeColors}
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={courses.allData.map(r => {
                                    return {
                                      value: r.id_course,
                                      label: `${r.code_course} - ${removeTags(r.course)}`,
                                      code_course: r.code_course
                                    }
                                  })}
                                  value={selectedCourse}
                                  onChange={data => {
                                    onChange(data)
                                    setSelectedCourse(data)
                                  }}
                                />
                              )
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='d-flex flex-sm-row flex-column mt-2'>
                        <Button type='submit' color='primary' className='d-none btn-submit'>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' disabled={store.loading} onClick={() => $('.btn-submit').click()}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default DepartemenList
