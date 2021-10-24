// ** React Imports
import { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn, formatTime, formatDate } from '@utils'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '@store/actions/auth'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Input } from 'reactstrap'
import { Clock, Settings, Power, X, Check } from 'react-feather'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast, Slide } from 'react-toastify'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'

const ToastContent = ({ text }) => {
  if (text) {
    return (
      <Fragment>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color='danger' icon={<X size={12} />} />
            <h6 className='toast-title font-weight-bold'>Error</h6>
          </div>
          <div className='toastify-body'>
            <span>{text}</span>
          </div>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
            <h6 className='toast-title font-weight-bold'>Success</h6>
          </div>
        </div>
      </Fragment>
    )
  }
}

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch(),
  intl = useIntl()

  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <Fragment>
      <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
        <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
          <div className='user-nav d-sm-flex d-none'>
            <span className='user-name font-weight-bold'>{(userData && userData.userdata.full_name) || 'John Doe'}</span>
          </div>
          <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
            <Power size={14} className='mr-75' />
            <span className='align-middle'><FormattedMessage id={'Logout'} /></span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Fragment>
  )
}

export default UserDropdown
