import React from "react";
import logo from "./imgs/logo.svg";

const Logo = (props) => {
  return (
    <div className={props.className} onClick={props.onClick}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
