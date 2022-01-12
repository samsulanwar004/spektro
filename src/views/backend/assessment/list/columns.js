// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getAssessment } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media, Progress } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Eye } from 'react-feather'
import { FormattedMessage } from 'react-intl'

// ** Custom Components
import Avatar from '@components/avatar'
import AvatarGroup from '@components/avatar-group'

import imageDefault from '@src/assets/images/avatars/avatar-blank.png'
import logoDefault from '@src/assets/images/avatars/picture-blank.png'

const statusObj = {
  1: {
    color: 'light-secondary',
    value: 'Enroll',
    progress: 'progress-bar-secondary'
  },
  2: {
    color: 'light-warning',
    value: 'Start Course',
    progress: 'progress-bar-warning'
  },
  3: {
    color: 'light-success',
    value: 'Lulus',
    progress: 'progress-bar-success'
  },
  4: {
    color: 'light-info',
    value: 'Progress Assessment',
    progress: 'progress-bar-info'
  },
  5: {
    color: 'light-danger',
    value: 'Tidak Lulus',
    progress: 'progress-bar-danger'
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
      name: 'Peserta',
      minWidth: '300px',
      selector: 'full_name',
      sortable: false,
      cell: row => (
        <div className='d-flex align-items-center'>
          {row.image_foto === '' ? (
            <Avatar color={`light-primary`} content={row.full_name} initials />
          ) : (
            <Avatar img={`${process.env.REACT_APP_BASE_URL}${row.image_foto}`} onError={(e) => (e.target.src = imageDefault)}/>
          )}
          <div className='user-info text-truncate ml-1'>
            <span className='d-block font-weight-bold text-truncate'>{row.full_name}</span>
            <span>{row.created_by}</span>
          </div>
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
      minWidth: '50px',
      selector: 'content_preview_image',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <Media object className='rounded mr-50' src={`${process.env.REACT_APP_BASE_URL}${row.content_preview_image}`} onError={(e) => (e.target.src = logoDefault)} height='50' width='50' />
        </div>
      )
    },
    {
      name: 'Progress',
      minWidth: '200px',
      sortable: false,
      cell: row => (
        <div>
          <div style={{marginRight: 150, minWidth: '100%'}}>
            <Progress value={row.persentage} className={statusObj[row.status]?.progress}>
              {row.persentage}%
            </Progress>
          </div>
        </div>
      )
    },
    {
      name: 'Status',
      minWidth: '100px',
      selector: 'status',
      sortable: false,
      cell: row => (
        <Badge className='text-capitalize' color={statusObj[row.status]?.color} pill>
          {statusObj[row.status]?.value}
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
              to={`/assessment/save/${row.id_enrollment}`}
              className='w-100'
              onClick={() => store.dispatch(getAssessment(row))}
            >
              <Eye size={14} className='mr-50' />
              <span className='align-middle'>Show</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ]
}
