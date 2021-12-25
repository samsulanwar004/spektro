// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addDiscussion } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { uploadImage } from '@src/views/backend/master/global_param/store/action'

// ** Third Party Components
import { User, Info, Share2, MapPin, Check, X } from 'react-feather'
import { Card, CardBody, Row, Col, Alert, Button, Label, FormGroup, Input, CustomInput, Form, Media } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import Select from 'react-select'
import ReactSummernote from 'react-summernote'

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

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-id-ID'

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'

const DiscussionShow = () => {
  // ** States & Vars
  const store = useSelector(state => state.discussions),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl()

  // ** redirect
  const history = useHistory()

  useEffect(() => {
    if (!store.selected) {
      history.push('/forum/discussion/list')
    }
  }, [])

  return store.selected !== null && store.selected !== undefined ? (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <Row>
              <Col>
                <div dangerouslySetInnerHTML={{ __html: `${store.selected.content_discussion}`}}></div>
              </Col>
            </Row>
            <Row>
              <Col className='d-flex flex-sm-row flex-column mt-2'>
                <Link to='/forum/discussion/list'>
                  <Button color='secondary' outline>
                    <FormattedMessage id='Back'/>
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : null
}
export default DiscussionShow
