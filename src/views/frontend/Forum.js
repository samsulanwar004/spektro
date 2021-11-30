import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media, Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'
import { Helmet } from 'react-helmet'
import ReactPaginate from 'react-paginate'
import Avatar from '@components/avatar'
import ReactSummernote from 'react-summernote'
import { Search } from 'react-feather'
import { Link } from 'react-router-dom'
import moment from 'moment'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getDataFrontendDiscussion, addFrontedDiscussion, getDataFrontendArticle, getDataFrontendComment, addFrontedComment, addFrontedLikeDiscussion, getAllDataFrontendWhitelistDomain } from '@src/views/frontend/store/action'
import { uploadImage, getAllDataGlobalParam } from '@src/views/backend/master/global_param/store/action'

//** Utils
import { formatDateFull, isUserLoggedIn, days, hours, minutes } from '@src/utility/Utils'

import frontCSS from '@src/assets/frontend/css/styles.css'
import BgForum from '@src/assets/frontend/img/bg_forumdiskusi.png'
import Foto from '@src/assets/frontend/img/Foto.png'
import Video from '@src/assets/frontend/img/Video.png'
import Bold from '@src/assets/frontend/img/Bold.png'
import Italic from '@src/assets/frontend/img/Italic.png'
import Hyperlink from '@src/assets/frontend/img/Hyperlink.png'
import CreateArticle from '@src/assets/frontend/img/CreateArticle.png'

// ** Styles
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-id-ID'

const Forum = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch(),
    globalparams = useSelector(state => state.globalparams)

    // ** States
  const [currentPageDiscussion, setCurrentPageDiscussion] = useState(1)
  const [rowsPerPageDiscussion, setRowsPerPageDiscussion] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPageArticle, setCurrentPageArticle] = useState(1)
  const [rowsPerPageArticle, setRowsPerPageArticle] = useState(6)
  const [discussions, setDiscussions] = useState([])
  const [editor, setEditor] = useState('')
  const [userData, setUserData] = useState(null)
  const [company, setCompany] = useState('Perusahaan')
  const [category, setCategory] = useState('Kategori')
  const [labelDate, setLabelDate] = useState('Tanggal')

  useEffect(() => {

    if (!isUserLoggedIn()) {
      window.location = '/home'

      return null
    } else {
      const user = JSON.parse(localStorage.getItem('userData'))
      setUserData(user.userdata)
    }

    let mounted = true

    const input = () => {
      $('.close').on('click', (e) => {
        $('.note-modal').modal('hide')
      })
      $('.modal-title').remove()
      $('.note-toolbar').addClass('d-none')
      $('.note-statusbar').addClass('statusbar-custom')
      $('.note-editor').addClass('discussion-post')
    }

    if (mounted) {
      input()
    }

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {

    dispatch(getDataFrontendArticle({
      page: currentPageArticle,
      perPage: rowsPerPageArticle,
      q: searchTerm
    }))

    dispatch(getDataFrontendDiscussion({
      page: currentPageDiscussion,
      perPage: rowsPerPageDiscussion
    }))

    dispatch(getAllDataFrontendWhitelistDomain())
    dispatch(getAllDataGlobalParam({key: 'CAT_ARTIKEL'}))
  }, [dispatch])

  useEffect(() => {

    let oldDiscussions = discussions

    oldDiscussions = oldDiscussions.concat(store.dataDiscussion)

    setDiscussions(oldDiscussions)
  }, [store.dataDiscussion])

  useEffect(() => {

    if (store.addDiscussion) {
      const oldDiscussion = discussions

      oldDiscussion.unshift(store.addDiscussion)

      setDiscussions(oldDiscussion)
    }
    
  }, [store.addDiscussion])

  useEffect(() => {
    if (store.dataComment) {
      
      const id = store.dataComment[0]?.id_article_discussion

      if (id) {

        const count = Number(Math.ceil(store.totalComment / store.paramsComment?.perPage))

        let oldDiscussions = discussions

        oldDiscussions = oldDiscussions.map(r => {
          if (r.id_discussion === id) {

            if (r.is_more) {
              r.child = r.child.concat(store.dataComment)
            } else {
              r.child = store.dataComment
            }

            r.is_more = count > r.page
          }
          return r
        })

        setDiscussions(oldDiscussions)
      }
    }
  }, [store.dataComment])

  useEffect(() => {
    if (store.addComment) {
      let oldDiscussions = discussions

      oldDiscussions = oldDiscussions.map(r => {
        if (r.id_discussion === store.addComment.id_article_discussion) {
          if (r.child) {
            r.child.unshift(store.addComment)
          } else {
            r.child = [store.addComment]
          }
        }
        return r
      })

      setDiscussions(oldDiscussions)
    }
  }, [store.addComment])

  useEffect(() => {
    if (store.addLikeDiscussion) {
      const id = store.addLikeDiscussion.id_article_discussion

      if (id) {
        let oldDiscussions = discussions

        oldDiscussions = oldDiscussions.map(r => {
          if (r.id_discussion === id) {
            r.count_likes += 1
          }
          return r
        })

        setDiscussions(oldDiscussions)
      }
    }
  }, [store.addLikeDiscussion])

  useEffect(() => {
    if (globalparams.upload) {
      ReactSummernote.insertImage(`${process.env.REACT_APP_BASE_URL}${globalparams.upload}`, $image => {
        $image.css("width", Math.floor($image.width() / 2))
        $image.attr("alt", 'Spektro')
      })
    }
  }, [globalparams.upload])

  const handleAddDiscussion = () => {
    dispatch(addFrontedDiscussion({
      content_discussion: editor
    }))

    setEditor('')
  }

  const handleNextDiscussion = () => {

    dispatch(getDataFrontendDiscussion({
      page: currentPageDiscussion + 1,
      perPage: rowsPerPageDiscussion
    }))

    setCurrentPageDiscussion(currentPageDiscussion + 1)
  }

  const handleCommentPage = (id, page = 1) => {

    const perPage = 10

    let oldDiscussions = discussions

    oldDiscussions = oldDiscussions.map(r => {
      if (r.id_discussion === id) {
        r.is_open = true
        r.page = page
        r.per_page = perPage
      }
      return r
    })

    setDiscussions(oldDiscussions)

    dispatch(getDataFrontendComment({
      page,
      perPage,
      id_ad: id,
      category: 2
    }))
  }

  const handleTextComment = (id, value) => {
    let oldDiscussions = discussions

    oldDiscussions = oldDiscussions.map(r => {
      if (r.id_discussion === id) {
        r.comment = value
      }
      return r
    })

    setDiscussions(oldDiscussions)
  }

  const handleKeyComment = (id, e) => {

    if (e.key === 'Enter') {
      const oldDiscussions = discussions
      const find = oldDiscussions.find(r => r.id_discussion === id)

      if (find.comment) {
        dispatch(addFrontedComment({
          comment: find.comment,
          id_article_discussion: id,
          category: 2
        }))

        //hapus comment after send
        setTimeout(() => {
          handleTextComment(id, '')
        }, 100)
      }
    }
    
  }

  const handleLikeDiscussion = (id) => {
    dispatch(addFrontedLikeDiscussion({
      id_article_discussion: id,
      category: 2
    }))
  }

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getDataFrontendArticle({
        page: page.selected + 1,
        perPage: rowsPerPageArticle,
        q: searchTerm
      })
    )
    setCurrentPageArticle(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getDataFrontendArticle({
        page: currentPageArticle,
        perPage: value,
        q: searchTerm
      })
    )
    setRowsPerPageArticle(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getDataFrontendArticle({
        page: currentPageArticle,
        perPage: rowsPerPageArticle,
        q: val
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.totalArticle / rowsPerPageArticle))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPageArticle !== 0 ? currentPageArticle - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
      />
    )
  }

  const handlebBtnFilter = (filter, value) => {
    if (filter === 'company')  {
      setCompany(value)
      dispatch(getDataFrontendArticle({
        page: currentPageArticle,
        perPage: rowsPerPageArticle,
        q: value
      }))
    } else if (filter === 'category') {
      setCategory(value)
      dispatch(getDataFrontendArticle({
        page: currentPageArticle,
        perPage: rowsPerPageArticle,
        q: value
      }))
    } else if (filter === 'date') {
      setLabelDate(value)
      console.log(value)
      if (value === 'Hari ini') {
        dispatch(getDataFrontendArticle({
          page: currentPageArticle,
          perPage: rowsPerPageArticle,
          q: moment().format('YYYY-MM-DD')
        }))
      } else if (value === '1 hari yang lalu') {
        dispatch(getDataFrontendArticle({
          page: currentPageArticle,
          perPage: rowsPerPageArticle,
          q: moment().subtract(1, 'days').format('YYYY-MM-DD')
        }))
      } else if (value === '7 hari yang lalu') {
        dispatch(getDataFrontendArticle({
          page: currentPageArticle,
          perPage: rowsPerPageArticle,
          q: moment().subtract(7, 'days').format('YYYY-MM-DD')
        }))
      } else if (value === '1 bulan yang lalu') {
        dispatch(getDataFrontendArticle({
          page: currentPageArticle,
          perPage: rowsPerPageArticle,
          q: moment().subtract(1, 'months').format('YYYY-MM-DD')
        }))
      }
    }
  }

  function renderBtnMoreDiscussion() {

    const count = Number(Math.ceil(store.totalDiscussion / store.paramsDiscussion?.perPage))

    return (
      <div className={`${count > currentPageDiscussion ? '' : 'd-none' }`} style={{textAlign: 'center', width: '100%'}}>
        <a onClick={() => handleNextDiscussion()}>Lihat diskusi lainnya</a>
      </div>
    )
  }

  return (
    <div className='frontend-forum'>
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
      <div className="section">
        <div style={{backgroundImage: `url(${BgForum})`, minHeight: '300px', position: 'relative', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}}>
          <div className="container px-5">
            <div style={{position: 'absolute', bottom: '1rem'}}><h1 style={{color: 'white'}}>Forum Diskusi</h1></div>
          </div>
          <div style={{position: 'absolute', right: '7%', bottom: 10, width: '20%'}}>
            <InputGroup className='input-group-merge mb-2'>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <Search size={14} />
                </InputGroupText>
              </InputGroupAddon>
              <Input 
                placeholder='Search'
                type='text'
                value={searchTerm}
                onChange={e => handleFilter(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
      </div>
      {/* Section Tulis Diskusi */}
      <div className="section pt-5">            
        <div className="container px-5">
          <div className="row gx-5">
            <div className="col-12">
              <div className="p-3 d-lg-flex" style={{backgroundColor: '#F4F4F4'}}>
                <div>
                  {userData?.image_foto ? (
                    <Avatar className="me-3 mb-3 mb-lg-0" img={`${process.env.REACT_APP_BASE_URL}${userData.image_foto}`} size='xl' />
                  ) : (
                    <Avatar className="me-3 mb-3 mb-lg-0" color='light-secondary' content={userData?.full_name ?? 'John Doe'} size="xl" initials/>
                  )}
                </div>
                <div className="w-100">
                  <ReactSummernote
                    value={editor}
                    options={{
                      placeholder: 'Mari mulai berdiskusi',
                      height: 100,
                      lang: 'id-ID',
                      dialogsInBody: true,
                      toolbar: [
                        ['font', ['bold', 'italic']],
                        ['insert', ['link', 'picture', 'video']]
                      ]
                    }}
                    onChange={setEditor}
                    onImageUpload={(files) => {

                      const datas = new FormData()
                      datas.append('upload', files[0])
                      dispatch(uploadImage(datas))
                    }}
                  />
                  <div className="d-flex justify-content-between" style={{backgroundColor: '#B3B3B3', borderRadius: '0px 0px 5px 5px', padding: '5px 20px 5px 20px'}}>
                    <div>
                      <a onClick={() => $('.note-insert .btn-default')[1].click()} className="mr-1">
                        <img src={Foto} width="30" />
                      </a>
                      <a onClick={() => $('.note-insert .btn-default')[2].click()} className="mr-1">
                        <img src={Video} width="30" />
                      </a>
                      <a onClick={() => $('.note-btn-bold').click()} className="mr-1">
                        <img src={Bold} width="25" />
                      </a>
                      <a onClick={() => $('.note-btn-italic').click()} className="mr-1">
                        <img src={Italic} width="25" />
                      </a>
                      <a onClick={() => $('.note-insert .btn-default')[0].click()} className="mr-1">
                        <img src={Hyperlink} width="25" />
                      </a>
                      <Link to="/article-create" className="mr-1" style={{textDecorationLine: 'none', color: 'black'}}>
                        <img src={CreateArticle} width="25" />
                        <span>Tulis artikel</span>
                      </Link>
                    </div>
                    <Button.Ripple onClick={() => {
                      if (editor.length > 0) {
                        handleAddDiscussion()
                      }
                    }} size='md' color='primary' style={{opacity: 0.8}}>
                      Post
                    </Button.Ripple>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Dropdown */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="col-12 col-lg">
              <div className="py-3 py-lg-0" style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}><span>Filter By:</span></div>
            </div>
            <div className="col-12 col-lg">
              <div className="dropdown py-2 py-lg-0" style={{minWidth: '200px'}}>
                <button className="btn dropdown-toggle w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{background: '#0A558C', color: 'white', minWidth: '200px'}}>
                  {company}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{background: '#DCF1FA', minWidth: '100%'}}>
                  {store.allDataWhitelistDomain.map((data, key) => {
                    return (
                      <li key={key}>
                        <a className="dropdown-item" onClick={() => handlebBtnFilter('company', data.name)}>{data.name}</a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg">
              <div className="dropdown py-2 py-lg-0" style={{minWidth: '200px'}}>
                <button className="btn dropdown-toggle w-100" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false" style={{background: '#0A558C', color: 'white', minWidth: '200px'}}>
                  {category}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2" style={{background: '#DCF1FA', minWidth: '100%'}}>
                  {globalparams.allData.map((data, key) => {
                    return (
                      <li key={key}>
                        <a className="dropdown-item" onClick={() => handlebBtnFilter('category', data.param_value)}>{data.param_value}</a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg">
              <div className="dropdown py-2 py-lg-0" style={{minWidth: '200px'}}>
                <button className="btn dropdown-toggle w-100" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false" style={{background: '#0A558C', color: 'white', minWidth: '200px'}}>
                  {labelDate}
                </button>
                <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton3" style={{background: '#DCF1FA'}}>
                  <li><a className="dropdown-item" onClick={() => handlebBtnFilter('date', 'Hari ini')}>Hari ini</a></li>
                  <li><a className="dropdown-item" onClick={() => handlebBtnFilter('date', '1 hari yang lalu')}>1 hari yang lalu</a></li>
                  <li><a className="dropdown-item" onClick={() => handlebBtnFilter('date', '7 hari yang lalu')}>7 hari yang lalu</a></li>
                  <li><a className="dropdown-item" onClick={() => handlebBtnFilter('date', '1 bulan yang lalu')}>1 bulan yang lalu</a></li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg">
              <div className="text-lg-end py-3 py-lg-0" style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}><span>Sort By:</span></div>
            </div>
            <div className="col-12 col-lg">
              <div className="dropdown py-2 py-lg-0" style={{minWidth: '200px'}}>
                <button className="btn dropdown-toggle w-100" type="button" id="dropdownMenuButton4" data-bs-toggle="dropdown" aria-expanded="false" style={{background: '#0A558C', color: 'white', minWidth: '200px'}}>
                  Terbaru
                </button>
                <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton4" style={{background: '#DCF1FA'}}>
                  <li><a className="dropdown-item" href="#">Terbaru</a></li>
                  <li><a className="dropdown-item" href="#">Tren</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Artikel & Diskusi */}
      <div className="section pt-5">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="col-lg-8 mb-5">
              <div className="p-4" style={{background: '#F4F4F4'}}>
                <h2 className="mb-4">Artikel</h2>
                <div className="row">
                  {store.dataArticle.map((data, key) => {
                    return (
                      <div className="col-lg-6 mb-4" key={key}>
                        <div className="p-3" style={{backgroundColor: '#EDF8FC', borderRadius: '6px', boxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', WebkitBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)', MozBoxShadow: '10px 8px 5px 0px rgba(0,0,0,0.25)'}}>
                          <div className="mb-3">
                            <img 
                              src={`${process.env.REACT_APP_BASE_URL}${data.path_thumbnail}`} 
                              onError={(e) => (e.target.src = 'https://via.placeholder.com/390x217')} 
                              className="img-fluid" alt="spektro article"
                              style={{width: 390, height: 217, borderRadius: 6}}
                            />
                          </div>
                          <h3>{data.title}</h3>
                          <div className="announcement-desc" dangerouslySetInnerHTML={{ __html: `${data.description}`}}></div>
                        </div>
                        <div style={{position: 'absolute', right: 40, top: 390 / 2}}>
                          <i className="bi bi-chat-left-fill me-2" style={{color: '#FFFFFF', fontSize: 25}}>
                            <span style={{position: 'absolute', top: '25%', left: '15%', fontSize: 10, color: 'black'}}>{data.count_comment}</span>
                          </i>
                          <i className="bi bi-suit-heart-fill" style={{color: '#FFFFFF', fontSize: 25}}>
                            <span style={{position: 'absolute', top: '25%', left: '70%', fontSize: 10, color: 'black'}}>{data.count_likes}</span>
                          </i>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="d-flex justify-content-center">
                  <CustomPagination/>
                </div>
              </div>
            </div>
            <div className="col-lg-4 ps-lg-0">
              <div className="p-4" style={{background: '#F4F4F4', marginBottom: 50}}>
                <h2 className="mb-4">Diskusi</h2>
                <div style={{overflow: 'scroll', height: '140vh'}}>
                {discussions.map((data, key) => {
                  return (
                    <div className="mb-3" key={key}>
                      <div className="p-3" style={{background: 'white', borderTopLeftRadius: '6px', borderTopRightRadius: '6px'}}>
                        <div className="d-flex mb-3">
                          {data.user.image_foto ? (
                            <Avatar className="me-4" img={`${process.env.REACT_APP_BASE_URL}${data.user.image_foto}`} size='lg' />
                          ) : (
                            <Avatar className="me-4" color='light-secondary' content={data.user.full_name} size="lg" initials/>
                          )}
                          <div>
                            <div style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                              <h5 className="mb-0">{data.user.full_name}</h5>
                              <span style={{fontWeight: 300}}>{formatDateFull(data.created_date)}</span>
                            </div>
                          </div>
                          <div className="ms-auto">
                            <div style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                              <a onClick={() => handleCommentPage(data.id_discussion)}><i className="bi bi-chat-left-fill me-2" style={{color: '#236698'}} /><span>{data.count_comment}</span></a><br />
                              <a onClick={() => handleLikeDiscussion(data.id_discussion)}><i className="bi bi-suit-heart-fill me-2" style={{color: '#236698'}} /><span>{data.count_likes}</span></a>
                            </div>
                          </div>
                        </div>
                        <div className="content-discussion" dangerouslySetInnerHTML={{ __html: `${data.content_discussion}`}}></div>
                      </div>
                      <div className={`p-3 ${data.is_open ? '' : 'd-none'}`} style={{background: '#E2F4FB'}}>
                        <Input 
                          className="mb-2"
                          placeholder='Tulis komentar'
                          type='text'
                          value={data.comment ?? ''}
                          onChange={(e) => handleTextComment(data.id_discussion, e.target.value)}
                          onKeyDown={(e) => handleKeyComment(data.id_discussion, e)}
                        />
                        {data.child && data.child.map((d, k) => {

                          const dateNow = new Date()

                          const dateFuture = new Date(d.created_date)

                          const delta = Math.abs(dateFuture - dateNow) / 1000

                          let date = ''

                          if (days(delta) > 0) {
                            date = `${days(delta)} hari`
                          } else if (hours(delta) > 0) {
                            date = `${hours(delta)} jam`
                          } else {
                            date = `${minutes(delta)} menit`
                          }

                          return (
                            <div className="d-flex mb-4" key={k}>
                              <div>
                                {d.user.image_foto ? (
                                  <Avatar className="me-4" img={`${process.env.REACT_APP_BASE_URL}${d.user.image_foto}`} size='lg' />
                                ) : (
                                  <Avatar className="me-4" color='light-secondary' content={d.user.full_name} size="lg" initials/>
                                )}
                              </div>
                              <div>
                                <div style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                                  <div>
                                    <h5 className="mb-0 me-3">{d.user.full_name}</h5>
                                    <span>{d.comment}</span>
                                  </div>
                                  <div className="d-flex">
                                    <div className="me-3"><span style={{fontWeight: 300}}>{date}</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        {data.is_more &&
                          <div style={{textAlign: 'center', width: '100%'}}>
                            <a onClick={() => handleCommentPage(data.id_discussion, data.page + 1)}>Lihat komentar lainnya</a>
                          </div>
                        }
                      </div>
                    </div>
                  )
                })}
                {renderBtnMoreDiscussion()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forum
