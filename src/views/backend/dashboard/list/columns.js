// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getMentor } from '../store/action/mentor'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { FormattedMessage } from 'react-intl'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'


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
      name: 'Nama Mahasiswa',
      minWidth: '200px',
      selector: 'full_name',
      sortable: false,
      cell: row => (
        <div className='d-flex align-items-center'>
          {row.image_foto === '' ? (
            <Avatar color={`light-primary`} content={row.full_name} initials />
          ) : (
            <Avatar img={`${process.env.REACT_APP_BASE_URL}${row.image_foto}`} onError={(e) => (e.target.src = defaultAvatar)}/>
          )}
          <div className='user-info text-truncate ml-1'>
            <span className='d-block font-weight-bold text-truncate'>{row.full_name}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Perguruan Tinggi',
      minWidth: '200px',
      selector: 'universitas',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.universitas}
        </div>
      )
    },
    {
      name: 'Jurusan',
      minWidth: '200px',
      selector: 'majoring',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.majoring}
        </div>
      )
    },
    {
      name: 'IPK',
      minWidth: '100px',
      selector: 'ipk',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.ipk}
        </div>
      )
    },
    {
      name: 'Nilai Rerata KMBI',
      minWidth: '200px',
      selector: 'nilai',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.nilai}
        </div>
      )
    },
    {
      name: 'Harapan Mengikuti KMBI',
      minWidth: '200px',
      selector: 'motivasi',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.motivasi}
        </div>
      )
    },
    {
      name: 'Actions',
      minWidth: '200px',
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <Link 
            to={`/peserta/detail/${row.resource_id}`}
            onClick={() => store.dispatch(getMentor(row))}
          >
            Lihat Profil Lengkap
          </Link>
        </div>
      )
    }
  ]
}
