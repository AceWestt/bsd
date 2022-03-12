import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { gsap, Linear } from "gsap";
import Logo from "./Logo";
import Menu from "./Menu";
import Phone from "./Phone";
import LangSelection from "./LangSelection";
import burgerImg from "./imgs/burger-menu.svg";

const Navbar = ({ setIsNavbarReady }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionRef = useRef(null);
  const contetnRef = useRef(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.get("/api/navigation", config);
        setData(data.data);
        setIsNavbarReady(true);
      } catch (error) {
        console.error(error);
        setIsNavbarReady(false);
      }
    };

    fetchdata();
  }, [setIsNavbarReady]);

  useEffect(() => {
    gsap.from(sectionRef.current, {
      height: "100vh",
      duration: 0.5,
      ease: Linear.easeOut,
    });
    gsap.from(contetnRef.current, {
      y: "-100%",
      duration: 0.5,
      ease: Linear.easeInOut,
    });
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="section navbar" ref={sectionRef}>
      <div className="content-container navbar__content" ref={contetnRef}>
        <Logo className="logo-wrp" />
        <Menu
          className="menu-wrp"
          mobile={{ isMobileMenuOpen, setIsMobileMenuOpen }}
          data={data}
        />
        <Phone className="phone-wrp" phone={data?.tel_number} />
        <LangSelection className="lang-wrp" />
        <div className="mobile-menu-wrp">
          <img
            src={burgerImg}
            alt="menu"
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
