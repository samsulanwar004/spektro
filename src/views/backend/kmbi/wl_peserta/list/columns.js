// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getWlPeserta, deleteWlPeserta } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FormattedMessage } from 'react-intl'

const MySwal = withReactContent(Swal)
import logoDefault from '@src/assets/images/avatars/avatar-blank.png'

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
      store.dispatch(deleteWlPeserta(row.id))
    }
  })
}

const statusObj = {
  KSA: {
    color: 'light-success',
    value: 'Accepted'
  },
  KSU: {
    color: 'light-info',
    value: 'Submitted'
  },
  KSI: {
    color: 'light-info',
    value: 'Booked'
  },
  WL: {
    color: 'light-secondary',
    value: 'White List'
  },
  KSR: {
    color: 'light-danger',
    value: 'Not Accepted'
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
      name: <FormattedMessage id='Name'/>,
      minWidth: '200px',
      selector: 'fullname',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.fullname}
        </div>
      )
    },
    {
      name: 'Email',
      minWidth: '300px',
      selector: 'email',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.email}
        </div>
      )
    },
    {
      name: 'Status',
      minWidth: '100px',
      selector: 'status_id',
      sortable: true,
      cell: row => (
        <Badge className='text-capitalize' color={statusObj[row.status_id]?.color} pill>
          {statusObj[row.status_id]?.value}
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
              to={`/kmbi/wl_peserta/save/${row.id}`}
              className='w-100'
              onClick={() => store.dispatch(getWlPeserta(row))}
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
