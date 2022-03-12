import React, { useEffect } from "react";
import logoImg from "../../../contact/img/logoWhite.svg";
import { Link } from "react-router-dom";
import { useAdminContext } from "../../context";

const Sidebar = (props) => {
  const { mainClass } = props;
  const { menuItems, activeScreen, setActiveScreen } = useAdminContext();

  useEffect(() => {
    const changeactivescreen = () => {
      const currentPath = window.location.pathname;
      const activescreenname = currentPath.split("/")[2];
      setActiveScreen(activescreenname);
    };

    changeactivescreen();
    window.onpopstate = () => {
      changeactivescreen();
    };
  }, [setActiveScreen]);

  return (
    <div className={`${mainClass}__sidebar`}>
      <div className="top">
        <div className="header">
          <div className="logo" onClick={() => window.open("/", "_blank")}>
            <img src={logoImg} alt="logo" />
          </div>
          <Link to="/admin">
            <span onClick={() => setActiveScreen(-1)}>Админ панель</span>
          </Link>
        </div>
      </div>
      <div className="body">
        <div className="content menu">
          <div className="list">
            {Object.keys(menuItems).map((key, index) => {
              const Icon = menuItems[key].icon;
              return (
                <Link
                  to={menuItems[key].url}
                  key={`menu-item_${index}`}
                  className={activeScreen === key ? "active" : undefined}
                  onClick={() => setActiveScreen(key)}
                >
                  <Icon className="icon" />
                  <label>{menuItems[key].label}</label>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
