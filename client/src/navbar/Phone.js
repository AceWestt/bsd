import React from "react";
import { MdLocalPhone } from "react-icons/md";

const Phone = (props) => {
  const { phone } = props;
  return (
    <a className={props.className} href={`tel:${phone}`}>
      <MdLocalPhone className="icon" /> <span>{phone}</span>
    </a>
  );
};

export default Phone;
