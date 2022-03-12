import React from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useAdminContext } from "../../context";

const Mainbar = ({ children, logoutHandler, mainClass, username }) => {
  const { activeScreen, menuItems } = useAdminContext();

  return (
    <div className={`${mainClass}__mainbar`}>
      <div className="top">
        <div className="header">
          <span>{menuItems[activeScreen]?.label || ""}</span>
          <span className="username">{username}</span>
          <button onClick={logoutHandler}>
            <AiOutlinePoweroff className="icon" />
          </button>
        </div>
      </div>
      <div className="body">{children}</div>
    </div>
  );
};

export default Mainbar;
