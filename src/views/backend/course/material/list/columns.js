// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getMaterial, deleteMaterial } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media } from 'reactstrap'
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
      store.dispatch(deleteMaterial(row.id_materials))
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
      name: <FormattedMessage id='Title'/>,
      minWidth: '200px',
      selector: 'title',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.title}
        </div>
      )
    },
    {
      name: 'Image Preview',
      minWidth: '200px',
      selector: 'image_banner',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <Media object className='rounded mr-50' src={`${process.env.REACT_APP_BASE_URL}${row.image_banner}`} height='50' width='50' />
        </div>
      )
    },
    {
      name: 'File',
      minWidth: '200px',
      selector: 'attach_file',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
        <a href={`${process.env.REACT_APP_BASE_URL}${row.attach_file}`} target='_blank'>
          <FileText  size={20}/>
        </a>
        </div>
      )
    },
    {
      name: 'Status',
      minWidth: '200px',
      selector: 'status',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.status}
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
              to={`/course/material/save/${row.id_materials}`}
              className='w-100'
              onClick={() => store.dispatch(getMaterial(row))}
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
