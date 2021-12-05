import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media, Button, CustomInput } from 'reactstrap'
import { Helmet } from 'react-helmet'
import ReactPlayer from 'react-player'
import { CheckSquare, Square } from 'react-feather'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { verifyEmail } from '@src/views/frontend/store/action'

import frontCSS from '@src/assets/frontend/css/styles.css'
import LogoWhite from '@src/assets/frontend/img/Logo (White).png'
import BgCampus from '@src/assets/frontend/img/bg_kampusmerdeka.png'

const Confirm = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch(),
    location = useLocation()

  const [message, setMessage] = useState('')

  useEffect(() => {

    const verify = queryString.parse(location.search)?.verify

    if (verify) {
      dispatch(verifyEmail({
        confirm_hash: verify
      }))
    } else {
      window.location = `/home`

      return null
    }
  }, [dispatch])

  useEffect(() => {
    if (store.verifyEmail) {
      setMessage(store.verifyEmail)
      $('#modal-success-verify').modal('show')
    }
  }, [store.verifyEmail])

  return (
    <div className='frontend-confirm'>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Confirm Verify</title>
        <noscript>{`
            <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Helmet>
      <div className="section">
        <div style={{backgroundImage: `url("${BgCampus}")`, minHeight: '53vh', position: 'relative', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}}>
          <div className="container px-5">
            <div style={{position: 'absolute', bottom: '50%', left: '40%', color: 'white'}}>
              <h1 style={{textShadow: '2px 0px #c4c4c4', color: '#FFFFFF'}}>Verify Email</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modal-success-verify" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="row gx-0">
                <div className="col-lg-12 p-5 pb-3">
                  <p style={{fontWeight: '400', fontSize: 12, textAlign: 'center', color: '#FFFFFF' }}>
                    {message}
                  </p>
                  <hr style={{borderTop: '2px solid #FFFFFF'}}/>
                  <div className="text-center">
                    <img className="img-fluid" src={LogoWhite} width="100" alt="logo spektro" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm
