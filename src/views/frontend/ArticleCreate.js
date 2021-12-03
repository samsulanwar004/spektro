import { useContext, useEffect, useState, Fragment } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Button, InputGroup, InputGroupAddon, InputGroupText, Input, Form } from 'reactstrap'
import { Helmet } from 'react-helmet'
import Avatar from '@components/avatar'
import ReactSummernote from 'react-summernote'
import { Camera, X, Check } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import Select from 'react-select'
import { toast, Slide } from 'react-toastify'
import { useHistory } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { addArticle, getAllDataFrontendWhitelistDomain } from '@src/views/frontend/store/action'
import { uploadImage, getAllDataGlobalParam } from '@src/views/backend/master/global_param/store/action'

//** Utils
import { formatDateFull, isUserLoggedIn } from '@src/utility/Utils'

import frontCSS from '@src/assets/frontend/css/styles.css'
import BgForum from '@src/assets/frontend/img/bg_forumdiskusi.png'
import Foto from '@src/assets/frontend/img/Foto.png'
import Video from '@src/assets/frontend/img/Video.png'
import Bold from '@src/assets/frontend/img/Bold.png'
import Italic from '@src/assets/frontend/img/Italic.png'
import Hyperlink from '@src/assets/frontend/img/Hyperlink.png'
import CreateArticle from '@src/assets/frontend/img/CreateArticle.png'

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

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'

// ** Styles
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-id-ID'

const ArticleCreate = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch(),
    globalparams = useSelector(state => state.globalparams)

    // ** States
  const [data, setData] = useState(null)
  const [editor, setEditor] = useState('')
  const [cover, setCover] = useState({file: null, link: null})
  const [selectedCategory, setSelectedCategory] = useState({value: '', label: 'Kategori Artikel'})
  const [selectedCompany, setSelectedCompany] = useState({value: '', label: 'Instansi / Universitas'})

    // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

    // ** redirect
  const history = useHistory()

  useEffect(() => {

    if (!isUserLoggedIn()) {
      window.location = '/home'

      return null
    }

    let mounted = true

    const input = () => {
      $('.close').on('click', (e) => {
        $('.note-modal').modal('hide')
      })
      $('.modal-title').remove()
    }

    if (mounted) {
      input()
    }

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    dispatch(getAllDataGlobalParam({key: 'CAT_ARTIKEL'}))
    dispatch(getAllDataFrontendWhitelistDomain())
  }, [dispatch])

  useEffect(() => {
    if (globalparams.upload) {
      ReactSummernote.insertImage(`${process.env.REACT_APP_BASE_URL}${globalparams.upload}`, $image => {
        $image.css("width", Math.floor($image.width() / 2))
        $image.attr("alt", 'Spektro')
      })
    }
  }, [globalparams.upload])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/forum")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
  }, [store.loading])

  const onChangeCover = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function (fileReaderEvent) {
      const blobURL = URL.createObjectURL(files[0])
      setCover({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)
      const datas = new FormData()

      datas.append('path_thumbnail', cover.file)
      datas.append('path_image', cover.file)
      datas.append('title', data.title)
      datas.append('category', selectedCategory.value)
      datas.append('company', selectedCompany.value)
      datas.append('description', editor)

      dispatch(addArticle(datas))
    }
  }

  return (
    <div className='frontend-article-create'>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Buat Artikel</title>
        <noscript>{`
          <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Helmet>
      <div className="section">
        <div className="container px-5 mb-4">
          <Form
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row className='mt-1'>
              <Col sm='12'>
                <Input id='image-cover' onChange={onChangeCover} type='file' hidden />
                {cover.link ? (
                  <img src={cover.link} style={{width: '100%', height: 300, borderRadius: 6}} />
                ) : (
                  <a onClick={() => $('#image-cover').click()} className="d-flex align-items-center justify-content-center flex-column" style={{height: 300, width: '100%', backgroundColor: '#C4C4C4', borderRadius: 6}}>
                    <Camera size={50} color="black"/>
                    <span style={{color: 'black'}}>Unggah cover artikel Anda di sini</span>
                  </a>
                )}
              </Col>
              <Col sm='12'>
                <Row className='mt-4 m-1' style={{backgroundColor: '#236698', borderRadius: 5}}>
                  <Col lg='6' md='6'>
                    <FormGroup>
                      <Label for='category' className="invisible">Kategori</Label>
                      <Select
                        id='category'
                        theme={selectThemeColors}
                        isClearable={false}
                        className='react-select'
                        classNamePrefix='select'
                        options={globalparams.allData.map(r => {
                          return {
                            label: r.param_value,
                            value: r.param_value
                          }
                        })}
                        value={selectedCategory}
                        onChange={data => {
                          setSelectedCategory(data)
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg='6' md='6'>
                    <FormGroup>
                      <Label for='company' className="invisible">Instansi / Universitas</Label>
                      <Select
                        id='company'
                        theme={selectThemeColors}
                        isClearable={false}
                        className='react-select'
                        classNamePrefix='select'
                        options={store.allDataWhitelistDomain.map(r => {
                          return {
                            label: r.name,
                            value: r.name
                          }
                        })}
                        value={selectedCompany}
                        onChange={data => {
                          setSelectedCompany(data)
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg='12' md='6'>
                    <FormGroup>
                      <Input
                        id='title'
                        name='title'
                        placeholder={'Judul Artikel'}
                        innerRef={register({ required: true })}
                        className={classnames({
                          'is-invalid': errors.title
                        })}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm='12' className='article-form'>
                    <ReactSummernote
                      style={{backgroundColor: '#FFFFFF'}}
                      value={editor}
                      options={{
                        lang: 'id-ID',
                        height: 350,
                        dialogsInBody: true,
                        toolbar: [
                          ['style', ['style']],
                          ['font', ['bold', 'underline', 'clear']],
                          ['fontname', ['fontname']],
                          ['fontsize', ['fontsize']],
                          ['para', ['ul', 'ol', 'paragraph']],
                          ['table', ['table']],
                          ['insert', ['link', 'picture', 'video']]
                        ],
                        fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36', '48']
                      }}
                      onChange={setEditor}
                      onImageUpload={(files) => {

                        const datas = new FormData()
                        datas.append('upload', files[0])
                        dispatch(uploadImage(datas))
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm='12' className="d-flex justify-content-end">
                <Button type='submit' color='primary' size="lg" className='mt-2 mb-sm-0 mr-0 mr-sm-1'>
                  Post
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ArticleCreate
