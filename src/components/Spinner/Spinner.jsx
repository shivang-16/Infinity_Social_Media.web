import React from 'react';
import loader from '../../assets/loading2.gif';

const Spinner = () => {
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
      <img src={loader} alt="" style={{ height: '100px' }} />
    </div>
  );
};

export default Spinner;
