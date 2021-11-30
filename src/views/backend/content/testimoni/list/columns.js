// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getTestimoni, deleteTestimoni } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { FormattedMessage } from 'react-intl'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import logoDefault from '@src/assets/images/avatars/picture-blank.png'

const MySwal = withReactContent(Swal)

const handleDelete = (row) => {
  return MySwal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger ml-1'
    },
    buttonsStyling: false
  }).then(function (result) {
    if (result.value) {
      store.dispatch(deleteTestimoni(row.id_testimoni))
    }
  })
}

const statusObj = {
  1: {
    color: 'light-success',
    value: 'Active'
  },
  0: {
    color: 'light-secondary',
    value: 'Deactive'
  }
}

export const columns = (number) => {
  return [
    {
      name: '#',
      cell: (row, index) => (index + 1) + number,
      grow: 0
    },
    {
      name: <FormattedMessage id='Category' />,
      minWidth: '200px',
      selector: 'category_page',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.category_page}
        </div>
      )
    },
    {
      name: 'Thumbnail',
      minWidth: '50px',
      selector: 'path_image',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <Media object className='rounded mr-50' src={`${process.env.REACT_APP_BASE_URL}${row.path_image}`} onError={(e) => (e.target.src = logoDefault)} height='50' width='50' />
        </div>
      )
    },
    {
      name: <FormattedMessage id='Name' />,
      minWidth: '200px',
      selector: 'nama',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.nama}
        </div>
      )
    },
    {
      name: 'Posisi',
      minWidth: '100px',
      selector: 'posisi',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.posisi}
        </div>
      )
    },
    {
      name: 'Sequence',
      minWidth: '50px',
      selector: 'seq',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.seq}
        </div>
      )
    },
    {
      name: 'Status',
      minWidth: '100px',
      selector: 'status',
      sortable: true,
      cell: row => (
        <Badge className='text-capitalize' color={statusObj[row.status]['color']} pill>
          {statusObj[row.status]['value']}
        </Badge>
      )
    },
    {
      name: 'Actions',
      minWidth: '100px',
      cell: row => (
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/content/testimoni/save/${row.id_testimoni}`}
              className='w-100'
              onClick={() => store.dispatch(getTestimoni(row))}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem className='w-100' onClick={() => handleDelete(row)}>
              <Trash2 size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id='Delete'/></span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ]
}
