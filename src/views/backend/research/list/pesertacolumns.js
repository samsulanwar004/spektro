// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getPesertaResearch, deletePesertaResearch } from '../store/action/user'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Trash2, Archive } from 'react-feather'
import { FormattedMessage } from 'react-intl'
import { formatDateFull } from '@utils'

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
      store.dispatch(deletePesertaResearch({
        id: row.id,
        type: row.jenis 
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
          {row.jenis.toUpperCase() }
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
              to={row.jenis === 'rgbi' ? `/rgbi_submission/save/${row.id}` : `/banlit_submission/save/${row.id}`}
              className='w-100'
              onClick={() =>  {
                store.dispatch({
                  type: 'GET_PESERTA_RESEARCH_DATA',
                  data: null
                })
                store.dispatch(getPesertaResearch(row))
              }}
              disabled={!['PP', 'NN'].includes(row.status_id)}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem className='w-100' onClick={() => handleDelete(row)} disabled={!['PP', 'NN'].includes(row.status_id)}>
              <Trash2 size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id='Delete'/></span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ]
}
