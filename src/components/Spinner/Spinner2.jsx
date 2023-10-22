import React from "react";
import loader from "../../assets/loader.gif";
import './spinner2.scss'
const Spinner2 = () => {
  return (
    <div
      className="popup-content spinner2"
      style={{
       
      }}
    >
      <img src={loader} alt="" style={{ height: "50px" }} />
    </div>
  );
};

export default Spinner2;
