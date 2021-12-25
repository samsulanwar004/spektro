// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getArticle, deleteArticle, emailDeleteArticle } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media  } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Eye } from 'react-feather'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'

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
      store.dispatch(deleteArticle(row.id_article))
      store.dispatch(emailDeleteArticle({
        type: "artikel_dihapus_oleh_admin",
        to: row.user.email,
        nama_artikel: row.title,
        nama_peserta: row.user.full_name,
        judul_artikel: row.title,
        link_syarat_dan_ketentuan: `${process.env.REACT_APP_BASE_FE_URL}/home`,
        kontak_admin: `${process.env.REACT_APP_NOMER_ADMIN}`
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
      name: <FormattedMessage id='Category' />,
      minWidth: '200px',
      selector: 'category_msg',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.category}
        </div>
      )
    },
    {
      name: 'Title',
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
      name: 'Instansi / Universitas',
      minWidth: '200px',
      selector: 'company',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.company}
        </div>
      )
    },
    {
      name: 'Comment',
      minWidth: '50px',
      selector: 'count_comment',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.count_comment}
        </div>
      )
    },
    {
      name: 'Like',
      minWidth: '50px',
      selector: 'count_likes',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.count_likes}
        </div>
      )
    },
    {
      name: 'Tanggal',
      minWidth: '150px',
      selector: 'created_date',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {moment(row.created_date).format('DD MMM YYYY')}
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
              className='w-100'
              onClick={() => {
                window.open(`/article-detail/${row.id_article}`, '_blank')
              }}
            >
              <Eye size={14} className='mr-50' />
              <span className='align-middle'>Show</span>
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
