// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getAdminResearch, deleteAdminResearch } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { FormattedMessage } from 'react-intl'
import { formatDateFull } from '@utils'

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
      store.dispatch(deleteAdminResearch({
        id: row.id,
        type: 'rgbi'
      }))
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
      name: 'Title',
      minWidth: '600px',
      selector: 'title',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.title}
        </div>
      )
    },
    {
      name: 'Jenis',
      minWidth: '100px',
      selector: 'jenis',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          RGBI
        </div>
      )
    },
    {
      name: 'Tanggal Pengajuan',
      minWidth: '200px',
      selector: 'create_date',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {formatDateFull(row.create_date)}
        </div>
      )
    },
    {
      name: 'Status',
      minWidth: '200px',
      selector: 'status_desc',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.status_desc}
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
              to={`/research_fund/rgbi/save/${row.id}`}
              className='w-100'
              onClick={() =>  {
                store.dispatch({
                  type: 'GET_ADMIN_RESEARCH_DATA',
                  data: null
                })
                store.dispatch(getAdminResearch(row))
              }}
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
