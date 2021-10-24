// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getDepartemen, deleteDepartemen } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { FormattedMessage } from 'react-intl'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
      store.dispatch(deleteDepartemen(row.dep_id))
    }
  })
}

const statusObj = {
  A: {
    color: 'light-success',
    value: 'Active'
  },
  D: {
    color: 'light-secondary',
    value: 'Deactive'
  }
}

export const columns = [
  {
    name: <FormattedMessage id='Name'/>,
    minWidth: '200px',
    selector: 'dep_name',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.dep_name}
      </div>
    )
  },
  {
    name: <FormattedMessage id='Address'/>,
    minWidth: '200px',
    selector: 'dep_address',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.dep_address}
      </div>
    )
  },
  {
    name: 'No. Telp',
    minWidth: '200px',
    selector: 'dep_notlp',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.dep_notlp}
      </div>
    )
  },
  {
    name: 'Status',
    minWidth: '100px',
    selector: 'dep_status',
    sortable: true,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.dep_status]['color']} pill>
        {statusObj[row.dep_status]['value']}
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
            to={`/master/departemen/save/${row.dep_id}`}
            className='w-100'
            onClick={() => store.dispatch(getDepartemen(row))}
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
