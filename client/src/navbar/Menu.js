import React from "react";
import { useAppContext, scrollTo } from "../context";
import SectionBg from "../commonComponents/SectionBg";
import mbBg from "./imgs/mobileMenuWrpBg.png";
import logoWhite from "../contact/img/logoWhite.svg";
import closeImg from "./imgs/closeMobileMenu.svg";
import { MdLocalPhone, MdPlace } from "react-icons/md";

const Menu = (props) => {
  const { lang, smallScreen, sectionRefs } = useAppContext();

  buttons.map((b) => (b.ref = sectionRefs[b.id]));

  const { data } = props;

  if (smallScreen) {
    return (
      <Mobile
        className={props.className}
        lang={lang}
        mobileProps={props.mobile}
        buttons={buttons}
        data={data}
      />
    );
  }
  return (
    <div className={props.className}>
      {buttons.map((item) => {
        return (
          <div
            className="menu-item"
            key={item.id}
            id={item.id}
            onClick={() => {
              scrollTo(item.ref.current);
            }}
          >
            {item[lang]}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;

const Mobile = (props) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = props.mobileProps;
  const buttons = props.buttons;
  const { data } = props;
  return (
    <div
      className={`${props.className} mobile-wrp ${
        isMobileMenuOpen ? "active" : ""
      }`}
      style={{ position: "fixed" }}
    >
      <SectionBg img={mbBg} overlay={true} />
      <div className="header">
        <img src={logoWhite} alt="logo" />
        <div className="close-btn">
          <img
            src={closeImg}
            alt="close"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          />
        </div>
      </div>
      <div className="main">
        {buttons.map((i) => {
          return (
            <div
              className="item"
              key={`mobile-menu-item-${i.id}`}
              id={i.id}
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollTo(i.ref.current);
              }}
            >
              {i[props.lang]}
            </div>
          );
        })}
      </div>
      <div className="footer">
        <MdLocalPhone className="icon" />
        <a href={`tel:${data?.tel_number}`}>{data?.tel_number}</a>
        <MdPlace className="icon" />
        <p>{data?.address[props.lang]}</p>
      </div>
    </div>
  );
};

const buttons = [
  { id: "nav_btn_about", en: "About", ru: "О нас" },
  { id: "nav_btn_services", en: "Services", ru: "Услуги" },
  { id: "nav_btn_portfolio", en: "Portfolio", ru: "Портфолио" },
  { id: "nav_btn_contact", en: "Contact", ru: "Контакты" },
];
