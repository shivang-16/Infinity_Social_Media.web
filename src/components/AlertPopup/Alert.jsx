import React from "react";
import "./alert.scss";

const Alert = ({ photo, description, action, actionFunction, closePopup }) => {
  return (
    <>
      <div className="popup">
        <div className="popup-content">
          <div className="alert-popup-head">
            <img src={photo} alt="" />
          </div>
          <div className="alert-popup-content">
            <h4>{description}</h4>
            <button onClick={actionFunction}>{action}</button>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
