// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getTrainer, deleteTrainer } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive, Star} from 'react-feather'
import { FormattedMessage } from 'react-intl'
import Rating from 'react-rating'

// ** Custom Components
import Avatar from '@components/avatar'

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

export const columns = (number) => {
  return [
    {
      name: '#',
      cell: (row, index) => (index + 1) + number,
      grow: 0
    },
    {
      name: <FormattedMessage id='Name'/>,
      selector: 'fullname',
      sortable: true,
      minWidth: '250px',
      cell: row => (
        <div className='d-flex align-items-center'>
          {row.image_profile === '' ? (
            <Avatar color={`light-primary`} content={row.fullname} initials />
          ) : (
            <Avatar img={`${process.env.REACT_APP_BASE_URL}${row.image_profile}`} />
          )}
          <div className='user-info text-truncate ml-1'>
            <span className='d-block font-weight-bold text-truncate'>{row.fullname}</span>
            <small>{row.gelar}</small>
          </div>
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
          <Rating
            emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
            fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
            readonly
            initialRating={row.ratting}
          />
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
}
