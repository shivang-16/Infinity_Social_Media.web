import React from 'react'
import loader from '../../assets/loader.gif'

const Spinner2 = () => {
  return (
    <div
    className="popup-content"
    style={{
      position: 'fixed',
      top: '40%',
      left: '30%',
     display: 'flex',
      border: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none', // A semi-transparent background
    }}
  >
    <img src={loader} alt="" style={{ height: '50px' }} />
  </div>
  )
}

export default Spinner2