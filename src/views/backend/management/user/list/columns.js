// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getUser, deleteUser } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FormattedMessage } from 'react-intl'

const MySwal = withReactContent(Swal)

// ** Renders Role Columns
const renderRole = row => {

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <User size={18} className={`text-primary mr-50`} />
      {row.appRole.role_name}
    </span>
  )
}

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
      store.dispatch(deleteUser(row.appResource.resource_id))
    }
  })
}

export const columns = [
  {
    name: <FormattedMessage id='Name'/>,
    minWidth: '200px',
    selector: 'emp_name',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.hrEmployee?.emp_name}
      </div>
    )
  },
  {
    name: 'Username',
    minWidth: '200px',
    selector: 'username',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.appResource?.username}
      </div>
    )
  },
  {
    name: <FormattedMessage id='Site'/>,
    minWidth: '200px',
    selector: 'dep_name',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.globalDepartemen?.dep_name}
      </div>
    )
  },
  {
    name: 'Role',
    minWidth: '172px',
    selector: 'role',
    sortable: false,
    cell: row => renderRole(row)
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
            to={`/management/user/save/${row.appResource.resource_id}`}
            className='w-100'
            onClick={() => store.dispatch(getUser(row))}
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
