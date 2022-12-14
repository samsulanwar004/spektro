// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getRoleMenu, deleteRoleMenu } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Slack, User, Settings, Database, Menu, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
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
      store.dispatch(deleteRoleMenu(row.role_menu_id))
    }
  })
}

// ** Renders Role Columns
const renderRole = row => {

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <User size={18} className={`text-primary mr-50`} />
      {row.role_name}
    </span>
  )
}

// ** Renders Menu Columns
const renderMenu = row => {

  return (
    <span className='text-truncate align-middle'>
      <Menu size={18} className={`text-primary mr-50`} />
      {row.menu_name}
    </span>
  )
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

export const columns = (number) => {
  return [
    {
      name: '#',
      cell: (row, index) => (index + 1) + number,
      grow: 0
    },
    {
      name: 'Role',
      minWidth: '200px',
      selector: 'role_name',
      sortable: false,
      cell: row => renderRole(row)
    },
    {
      name: 'Menu',
      minWidth: '200px',
      selector: 'menu_name',
      sortable: false,
      cell: row => renderMenu(row)
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
              to={`/management/role_menu/save/${row.role_menu_id}`}
              className='w-100'
              onClick={() => store.dispatch(getRoleMenu(row))}
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
