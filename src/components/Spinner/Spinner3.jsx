import React from "react";
import loader from "../../assets/infinite.gif";

const Spinner3 = () => {
  return (
    <div className="myposts-bookmark-section spinner3">
      <img src={loader} alt="" style={{ height: "150px" }} />
    </div>
  );
};

export default Spinner3;
