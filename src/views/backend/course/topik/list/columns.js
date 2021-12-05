// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getTopik, deleteTopik } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { FormattedMessage } from 'react-intl'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

import AvatarGroup from '@components/avatar-group'

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
      store.dispatch(deleteTopik(row.id_topik))
    }
  })
}

export const columns = (number) => {
  return [
    {
      name: '#',
      cell: (row, index) => (index + 1) + number,
      grow: 0
    },
    {
      name: 'Topik',
      minWidth: '200px',
      selector: 'topik',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.topik}
        </div>
      ),
      grow: 3
    },
    {
      name: 'Trainer',
      minWidth: '200px',
      selector: 'fullname',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {`${row.fullname}, ${row.gelar}`}
        </div>
      ),
      grow: 2
    },
    {
      name: 'Sesi',
      minWidth: '100px',
      selector: 'sesi',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <AvatarGroup data={row.sesi.map((r, k) => {
            return {
              title: r.sesi > 0 ? `Sesi ${r.sesi}` : r.sesi,
              color: 'light-primary',
              content: String(k + 1),
              initials: true
            }
          })} />
        </div>
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
              to={`/course/topik/save/${row.id_topik}`}
              className='w-100'
              onClick={() => store.dispatch(getTopik(row))}
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
