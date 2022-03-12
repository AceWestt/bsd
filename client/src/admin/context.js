import React, { useState, useContext } from "react";
import { RiWindow2Line } from "react-icons/ri";
import { RiHome3Line } from "react-icons/ri";
import { RiArticleLine } from "react-icons/ri";
import { RiServiceLine } from "react-icons/ri";
import { RiPantoneLine } from "react-icons/ri";
import { RiProfileLine } from "react-icons/ri";

const AdminContext = React.createContext();

const AdminProvider = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState(-1);
  return (
    <AdminContext.Provider value={{ menuItems, activeScreen, setActiveScreen }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};

export { AdminContext, AdminProvider };

const menuItems = {
  navigation: {
    icon: RiWindow2Line,
    label: "Нав. менью",
    url: "/admin/navigation",
  },
  mainscreen: {
    icon: RiHome3Line,
    label: "Главная страница",
    url: "/admin/mainscreen",
  },
  aboutscreen: {
    icon: RiArticleLine,
    label: "Блок «о нас»",
    url: "/admin/aboutscreen",
  },
  servicesscreen: {
    icon: RiServiceLine,
    label: "Блок «услуги»",
    url: "/admin/servicesscreen",
  },
  portfolioscreen: {
    icon: RiPantoneLine,
    label: "Блок «портфолио»",
    url: "/admin/portfolioscreen",
  },
  contactscreen: {
    icon: RiProfileLine,
    label: "Блок «контакты»",
    url: "/admin/contactscreen",
  },
};
