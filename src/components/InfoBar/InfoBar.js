import React from "react";

import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

import "./InfoBar.css";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img src={onlineIcon} alt="" className="onlineIcon" alt="online image" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/" src={closeIcon} alt="close image">
        x
      </a>
    </div>
  </div>
);

export default InfoBar;
