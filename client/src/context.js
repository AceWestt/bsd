import React, { useState, useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";

const AppContext = React.createContext();
const smallScreenBp = 1024;

const AppProvider = ({ children }) => {
  const [lang, setLang] = useState("ru");
  const [smallScreen, setSmallScreen] = useState(false);
  const aboutSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const portfolioSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  const handleResize = () => {
    const wWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (wWidth <= smallScreenBp) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [smallScreen]);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        smallScreen,
        sectionRefs: {
          nav_btn_about: aboutSectionRef,
          nav_btn_services: servicesSectionRef,
          nav_btn_portfolio: portfolioSectionRef,
          nav_btn_contact: contactSectionRef,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export const scrollTo = (obj) => {
  gsap.to(window, { duration: 0.5, scrollTo: obj });
};

export { AppContext, AppProvider };
