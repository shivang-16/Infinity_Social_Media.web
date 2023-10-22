import React from "react";
// import loader from "../../assets/loader.gif";
import loader from "../../assets/infinite.gif";

import "./spinner2.scss";
const Spinner2 = () => {
  return (
    <div className="post_section spinner2">
      <img src={loader} alt="" />
    </div>
  );
};

export default Spinner2;
