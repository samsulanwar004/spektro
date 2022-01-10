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
import { useHistory, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay
} from 'swiper'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getDataFrontendArticleDetail, addFrontedLikeArticle, getDataFrontendComment, addFrontedComment, getDataFrontendArticle, addFrontedLikeComment } from '@src/views/frontend/store/action'

//** Utils
import { formatDateFull, isUserLoggedIn } from '@src/utility/Utils'

import frontCSS from '@src/assets/frontend/css/styles.css'
import PostImage from '@src/assets/frontend/img/Post Image.png'

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

const configSwipe = {
  className: 'swiper-centered-slides p-1',
  slidesPerView: 'auto'
}

SwiperCore.use([Navigation, Pagination, Autoplay])

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'

// ** Styles
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-id-ID'
import '@styles/react/libs/swiper/swiper.scss'

const ArticleDetail = () => {

  // ** States & Vars
  const store = useSelector(state => state.frontends),
    dispatch = useDispatch(),
    {id} = useParams()

    // ** States
  const [data, setData] = useState(null)
  const [currentPageComment, setCurrentPageComment] = useState(1)
  const [rowsPerPageComment, setRowsPerPageComment] = useState(2)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

    // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

    // ** redirect
  const history = useHistory()

  useEffect(() => {

    if (!isUserLoggedIn()) {
      window.location = '/home'

      return null
    }
  }, [])

  useEffect(() => {
    dispatch(getDataFrontendArticleDetail(id))
    dispatch(getDataFrontendComment({
      page: currentPageComment,
      perPage: rowsPerPageComment,
      id_ad: id,
      category: 1
    }))
    dispatch(getDataFrontendArticle({
      page: 1,
      perPage: 10
    }))
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
  }, [store.loading])

  useEffect(() => {
    if (store.paramsComment?.page > 1) {
      let oldComments = comments
      oldComments = oldComments.concat(store.dataComment)
      setComments(oldComments)
    } else {
      setComments(store.dataComment)
    }
  }, [store.dataComment])

  useEffect(() => {
    if (store.addLikeArticle) {
      dispatch(getDataFrontendArticleDetail(id))
    }
  }, [store.addLikeArticle])
  
  useEffect(() => {
    if (store.addLikeComment) {
      let oldComments = comments

      oldComments = oldComments.map(r => {
        if (r.id_comment === store.addLikeComment.id_article_discussion) {
          if (r.count_likes) {
            r.count_likes = r.count_likes + 1
          } else {
            r.count_likes = 1
          }
        }
        return r
      })

      setComments(oldComments)
    }
  }, [store.addLikeComment])

  useEffect(() => {
    if (store.addComment?.category === 3) {
      let oldComments = comments

      oldComments = oldComments.map(r => {
        if (r.id_comment === store.addComment.id_article_discussion) {
          if (r.child) {
            r.child.unshift(store.addComment)
          } else {
            r.child = [store.addComment]
          }
        }
        return r
      })

      setComments(oldComments)
      
    } else {
      let oldComments = comments
      oldComments = oldComments.unshift(store.addComment)

      dispatch(getDataFrontendArticleDetail(id))
    }

  }, [store.addComment])

  const handleComment = () => {
    dispatch(addFrontedComment({
      comment,
      id_article_discussion: parseInt(id),
      category: 1
    }))

    setComment('')
  }

  const handleLikeArticle = () => {
    dispatch(addFrontedLikeArticle({
      id_article_discussion: parseInt(id),
      category: 1
    }))
  }

  const handleNextComment = () => {

    dispatch(getDataFrontendComment({
      page: currentPageComment + 1,
      perPage: rowsPerPageComment,
      id_ad: id,
      category: 1
    }))

    setCurrentPageComment(currentPageComment + 1)
  }

  const handleTextComment = (id, value) => {
    let oldComments = comments

    oldComments = oldComments.map(r => {
      if (r.id_comment === id) {
        r.reply = value
      }
      return r
    })

    setComments(oldComments)
  }

  const handleKeyComment = (id, e) => {

    if (e.key === 'Enter') {
      const oldComments = comments
      const find = oldComments.find(r => r.id_comment === id)

      if (find.reply) {
        dispatch(addFrontedComment({
          comment: find.reply,
          id_article_discussion: id,
          category: 3
        }))

        //hapus comment after send
        setTimeout(() => {
          handleTextComment(id, '')
        }, 100)
      }
    }
  }

  const handleLikeComment = (id) => {
    dispatch(addFrontedLikeComment({
      id_article_discussion: parseInt(id),
      category: 3
    }))
  }

  const hanldeReply = (id) => {
    let oldComments = comments

    oldComments = oldComments.map(r => {
      if (r.id_comment === id) {
        r.is_open = true
      }
      return r
    })

    setComments(oldComments)
  }

  function renderBtnMoreComment() {

    const count = Number(Math.ceil(store.totalComment / store.paramsComment?.perPage))

    return (
      <div className={`${count > currentPageComment ? '' : 'd-none' }`} style={{textAlign: 'center', width: '100%'}}>
        <a onClick={() => handleNextComment()}><button style={{padding: '1rem 2rem', border: 'none', borderRadius: '6px'}}>Lihat Komentar Lainnya</button></a>
      </div>
    )
  }

  return (
    <div className='frontend-article-detail'>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Spektro | Artikel</title>
        <noscript>{`
          <link rel="stylesheet" type="text/css" href="${frontCSS}" />
        `}</noscript>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Helmet>
      <div className="section">
        <div className="banner-content" style={{backgroundImage: `url(${store.selectedArticle?.path_image ? process.env.REACT_APP_BASE_URL + store.selectedArticle?.path_image : ''})`}}>
          <div className="container px-5">
          </div>
        </div>
      </div>
      {/* Section Tentang */}
      <div className="section pt-5">            
        <div className="container px-md-5 px-lg-5">
          <div className="row gx-5">
            <div className="col">
              <div className="judul pb-5">
                <div className="mb-1 py-2 text-center" style={{backgroundColor: '#C4C4C4', borderRadius: '6px', maxWidth: '200px'}}><span>{store.selectedArticle?.category}</span></div>
                <h1 style={{fontWeight: 'bold', color: 'black'}}>{store.selectedArticle?.title}</h1>
                <div className="d-flex">
                  <div className="me-3">
                    <span>By <b>{store.selectedArticle?.user.full_name}</b></span>
                  </div>
                  <div className="mr-2">
                    <span>{formatDateFull(store.selectedArticle?.created_date)}</span>
                  </div>
                  <a href="#comment" style={{textDecorationLine: 'none', color: 'black'}}><i className="bi bi-chat-left-fill me-2" style={{color: '#236698'}} />
                    <span className="mr-1">{store.selectedArticle?.count_comment}</span>
                  </a>
                  <a onClick={() => handleLikeArticle()} style={{textDecorationLine: 'none', color: 'black'}}>
                    <i className="bi bi-suit-heart-fill me-2" style={{color: '#236698'}} /><span>{store.selectedArticle?.count_likes}</span>
                  </a>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: `${store.selectedArticle?.description}`}}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Komentar*/}
      <div className="section">
        <div className="container px-md-5 px-lg-5">
          <div className="row gx-5">
            <div className="col">
              <div className="judul pt-5 pb-4">
                <h1 style={{fontWeight: 'bold'}}>Komentar ({store.selectedArticle?.count_comment})</h1>
              </div>
              {comments.map((data, key) => {

                return (
                  <div style={{background: '#f5f5f5', borderRadius: '6px'}} className="p-4 mb-4" key={key}>
                    <div className="d-flex">
                      <div style={{width: '80px', marginRight: '2rem'}}>
                        {data?.user.image_foto ? (
                          <Avatar className="me-3 mb-3 mb-lg-0" img={`${process.env.REACT_APP_BASE_URL}${data.user.image_foto}`} size='xl' />
                        ) : (
                          <Avatar className="me-3 mb-3 mb-lg-0" color='light-secondary' content={data?.user?.full_name ?? 'No Name'} size="xl" initials/>
                        )}
                      </div>
                      <div className="w-100">
                        <h4 className="mb-0">{data.user.full_name}</h4>
                        <span>{formatDateFull(data.created_date)}</span>
                        <div className="mt-3">
                          <span>{data.comment}</span>
                        </div>
                        <div>
                          <a onClick={() => handleLikeComment(data.id_comment)}>
                            <i className="bi bi-heart-fill me-2" />
                          </a>
                          <span>{data.count_likes ?? 0} likes</span>
                        </div>
                        <div>
                          <a onClick={() => hanldeReply(data.id_comment)}>Reply</a>
                        </div>
                        <div className={`mt-1 ${data.is_open ? '' : 'd-none'}`}>
                          <Input 
                            className="w-100"
                            placeholder='Tulis balasan'
                            type='text'
                            value={data.reply ?? ''}
                            onChange={(e) => handleTextComment(data.id_comment, e.target.value)}
                            onKeyDown={(e) => handleKeyComment(data.id_comment, e)}
                          />
                        </div>
                        {data.child && data.child.map((d, k) => {

                          return (
                            <div className="d-flex my-2" key={k}>
                              <div>
                                {d.user.image_foto ? (
                                  <Avatar className="me-4" img={`${process.env.REACT_APP_BASE_URL}${d.user.image_foto}`} size='lg' />
                                ) : (
                                  <Avatar className="me-4" color='light-secondary' content={d?.user?.full_name ?? 'No Name'} size="lg" initials/>
                                )}
                              </div>
                              <div>
                                <div style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                                  <div>
                                    <h5 className="mb-0 me-3">{d.user.full_name}</h5>
                                    <span>{d.comment}</span>
                                  </div>
                                  <div className="d-flex">
                                    <div className="me-3"><span style={{fontWeight: 300}}>{formatDateFull(d.created_date)}</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className="text-center pt-3" id="comment">
                {renderBtnMoreComment()}
              </div>
              <hr className="my-4" />
              <div style={{background: '#f5f5f5', borderRadius: '6px'}} className="p-4">
                <div className="d-flex">
                  <div style={{width: '80px', marginRight: '2rem'}}><img src="../bi-spektro/assets/img/testimoni 2.png" alt="" className="img-fluid" /></div>
                  <div className="w-100">
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows={4} placeholder="Silahkan tulis komentar Anda disini" />
                    <button onClick={() => handleComment()} className="px-4 py-2 mt-3" style={{border: 'none', borderRadius: '6px', backgroundColor: '#C4C4C4', float: 'right'}}><span href="#" style={{color: 'black'}}>Post Comment</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Artikel Lainnya*/}
      <div className="section">
        <div className="container px-md-5 px-lg-5">
          <div className="row gx-5">
            <div className="col-12">
              <div className="judul pt-5 pb-4">
                <h1 className="mb-0" style={{fontWeight: 'bold'}}>Artikel Lainnya</h1>
              </div>
            </div>
            <div className="artikel-swipe pb-5">
              <Swiper {...configSwipe}>
                {store.dataArticle.map((data, key) => {

                  return (
                    <SwiperSlide key={key}>
                      <a href={`/article-detail/${data.id_article}`} style={{textDecorationLine: 'none', color: 'black'}}>
                        <div className="article-item p-3 p-lg-4 mx-auto" style={{backgroundColor: 'white', boxShadow: '2px 2px 10px rgb(0 0 0 / 15%)', borderRadius: '6px', height: 170}}>
                          <div className="d-flex">
                            <div className="me-md-3 col-md-5 mb-3 mb-md-0">
                              <img src={`${process.env.REACT_APP_BASE_URL + data.path_thumbnail}`} onError={(e) => (e.target.src = PostImage)} className="img-fluid" width="200" alt="spektro content" />
                            </div>
                            <div style={{width: '100%'}}>
                              <div className="d-flex flex-column align-items-end">
                                <span>{formatDateFull(data.created_date)}</span>
                              </div>
                              <div className="d-flex flex-column align-items-start justify-content-between">
                                <h5 style={{color: 'black'}}>{data.title}</h5>
                                <span>By <b>{data.user.full_name}</b></span>
                                <div className="d-flex action-btn mt-4">
                                  <button style={{border: 'none', backgroundColor: '#C4C4C``4', borderRadius: '6px'}} className="me-2 py-1 px-3">{data.category}</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail
