import React from "react";
import loader from "../../assets/loading2.gif";

const Spinner = () => {
  return (
    <div className="popup">
      <div className="popup-content spinner1">
        <img src={loader} alt="" />
      </div>
    </div>
  );
};

export default Spinner;
