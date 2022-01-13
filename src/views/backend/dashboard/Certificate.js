import { useEffect, useState, Fragment } from 'react'
import { 
  Row, 
  Col,
  Button
} from 'reactstrap'
import { useHistory, useParams, Link } from 'react-router-dom'
import { getCertficateCourse } from './store/action'
import DocViewer, { DocViewerRenderers } from "react-doc-viewer"
import {FormattedMessage} from 'react-intl'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const Certificate = () => {

  // ** Store Vars
  const store = useSelector(state => state.certificatecourses),
    auth = useSelector(state => state.auth),
    dispatch = useDispatch(),
    history = useHistory(),
    {id} = useParams()

  const [userData, setUserData] = useState(null)
  const [open, setOpen] = useState(true)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      const user = JSON.parse(localStorage.getItem('userData'))
      setUserData(user.userdata)
    }
  }, [auth.userData])

  useEffect(() => {
    dispatch(getCertficateCourse(id))
  }, [])

  return (
    <div id='dashboard' className="px-1">
        <Row className="p-2 mb-2" style={{backgroundColor: '#202C42', borderRadius: 5}}>
            <Col lg="12">
                {store.selected && store.selected !== 'invalid' && open ? (
                    <DocViewer 
                        pluginRenderers={DocViewerRenderers} 
                        documents={[{ uri: `${process.env.REACT_APP_BASE_URL + store.selected}` }]} 
                        style={{height: 500}}
                        config={{
                            header: {
                                disableHeader: true,
                                disableFileName: true,
                                retainURLParams: true
                            }
                        }}
                    />
                ) : (<h3 className='text-white'>Certificate Not Found</h3>)}
            </Col>
        </Row>
        <Row className='p-2' style={{backgroundColor: '#202C42', borderRadius: 5}}>
            <Col className='d-flex flex-sm-row flex-column'>
            <a href={`${process.env.REACT_APP_BASE_URL + store.selected}`} className="d-none download-certificate" target={'_blank'}/>
                <Link to='#' className='mr-1' onClick={() => {
                    $('.download-certificate')[0].click()

                    setOpen(false)
                    setTimeout(() => {
                        setOpen(true)
                    }, 1000)
                    
                }}>
                    <Button color='primary'>
                        Download
                    </Button>
                </Link>
                <Link to='/dashboard'>
                    <Button color='secondary' style={{backgroundColor: '#FFFFFF', color: '#08558c'}} outline>
                    <FormattedMessage id='Back'/>
                    </Button>
                </Link>
            </Col>
        </Row>
    </div>
  )
}

export default Certificate
