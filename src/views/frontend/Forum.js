import { useContext, useEffect } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { Helmet } from 'react-helmet'

import frontCSS from '@src/assets/frontend/css/styles.css'

import Testimoni1 from '@src/assets/frontend/img/testimoni 1.png'
import Testimoni2 from '@src/assets/frontend/img/testimoni 2.png'
import Testimoni3 from '@src/assets/frontend/img/testimoni 3.png'

const Forum = () => {

  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Forum</title>
        <noscript>{`
          <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Helmet>
    </>
  )
}

export default Forum
