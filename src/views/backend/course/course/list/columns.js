// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getCourse, deleteCourse } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { FormattedMessage } from 'react-intl'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import AvatarGroup from '@components/avatar-group'
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
      store.dispatch(deleteCourse(row.id_course))
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
      name: 'Group Course',
      minWidth: '100px',
      selector: 'group_course',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.group_course}
        </div>
      )
    },
    {
      name: 'Kode Course',
      minWidth: '100px',
      selector: 'code_course',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.code_course}
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
          <Media object className='rounded mr-50' src={`${process.env.REACT_APP_BASE_URL}${row.content_preview_image}`} onError={(e) => (e.target.src = logoDefault)} height='50' width='50' />
        </div>
      )
    },
    {
      name: <FormattedMessage id='Duration'/>,
      minWidth: '100px',
      selector: 'duration',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.duration}
        </div>
      )
    },
    {
      name: 'Topik',
      minWidth: '200px',
      selector: 'topik',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <AvatarGroup data={row.topik.map((r, k) => {
            return {
              title: r.topik,
              color: 'light-primary',
              content: String(k + 1),
              initials: true
            }
          })} />
        </div>
      )
    },
    {
      name: 'Status',
      minWidth: '100px',
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
              to={`/course/course/save/${row.id_course}`}
              className='w-100'
              onClick={() => store.dispatch(getCourse(row))}
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
