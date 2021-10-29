// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getQuiz, deleteQuiz } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
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
      store.dispatch(deleteQuiz(row.id_quiz))
    }
  })
}

export const columns = [
  {
    name: <FormattedMessage id='Code'/>,
    minWidth: '200px',
    selector: 'code_quiz',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.code_quiz}
      </div>
    )
  },,
  {
    name: <FormattedMessage id='Name'/>,
    minWidth: '200px',
    selector: 'title_quiz',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.title_quiz}
      </div>
    )
  },
  {
    name: 'Passing Score',
    minWidth: '200px',
    selector: 'passing_score',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.passing_score}
      </div>
    )
  },
  {
    name: 'Rondomize',
    minWidth: '200px',
    selector: 'rondomize',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.rondomize}
      </div>
    )
  },
  {
    name: 'Attemp',
    minWidth: '200px',
    selector: 'attemp',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.attemp}
      </div>
    )
  },
  {
    name: 'Duration',
    minWidth: '200px',
    selector: 'duration',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.duration}
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
            to={`/master/quiz/save/${row.id_quiz}`}
            className='w-100'
            onClick={() => store.dispatch(getQuiz(row))}
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
