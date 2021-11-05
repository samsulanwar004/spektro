// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getTrainer, deleteTrainer } from '../store/action'
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
      store.dispatch(deleteTrainer(row.id_trainer))
    }
  })
}

export const columns = [
  {
    name: 'Photo',
    minWidth: '50px',
    selector: 'image_profile',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <Media object className='rounded mr-50' src={`${process.env.REACT_APP_BASE_URL}${row.image_profile}`} height='50' width='50' />
      </div>
    )
  },
  {
    name: <FormattedMessage id='Name'/>,
    minWidth: '300px',
    selector: 'fullname',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.fullname}
      </div>
    )
  },
  {
    name: 'Gelar',
    minWidth: '200px',
    selector: 'gelar',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.gelar}
      </div>
    )
  },
  {
    name: 'Rating',
    minWidth: '200px',
    selector: 'ratting',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.ratting}
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
            to={`/course/trainer/save/${row.id_trainer}`}
            className='w-100'
            onClick={() => store.dispatch(getTrainer(row))}
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
