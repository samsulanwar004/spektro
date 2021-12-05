// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getSubmitPeserta } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FormattedMessage } from 'react-intl'

const MySwal = withReactContent(Swal)
import logoDefault from '@src/assets/images/avatars/avatar-blank.png'

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
              to={`/kmbi/submit_peserta/save/${row.id}`}
              className='w-100'
              onClick={() => store.dispatch(getSubmitPeserta(row))}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ]
}
