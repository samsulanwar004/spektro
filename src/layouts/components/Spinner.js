// ** Logo
import logo from '@src/assets/images/logo/bi_loading.png'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner vh-100'>
      <img className='fallback-logo' src={logo} alt='logo' />
      <div className='loading' style={{left: 'calc(50% - 20px)', top: '45%'}}>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent