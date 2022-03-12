import React, { useEffect, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { useAppContext, scrollTo } from "../context";
import titleRect from "./img/titleRect.svg";
import SectionBg from "../commonComponents/SectionBg";
import grid from "./img/grid.svg";
import logoWhite from "./img/logoWhite.svg";
import buttonBg from "./img/buttonBg.svg";

const Contact = (props) => {
  const { lang, sectionRefs, smallScreen } = useAppContext();
  const { appRef, setIsContactReady } = props;
  const [data, setData] = useState(null);
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const config = { headers: { "Content-Type": "application/json" } };
      try {
        const { data } = await axios.get("/api/contactscreen", config);
        const contactData = await axios.get("/api/navigation");
        setData(data.data);
        setContactData(contactData.data.data);
        setIsContactReady(true);
      } catch (error) {
        console.error(error);
        setIsContactReady(false);
      }
    };
    fetchData();
  }, [setIsContactReady]);

  useEffect(() => {
    if (!smallScreen) {
      appRef.current.style.paddingBottom = `${sectionRefs.nav_btn_contact.current.offsetHeight}px`;
    } else {
      appRef.current.style.paddingBottom = 0;
    }
  }, [appRef, sectionRefs, smallScreen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!smallScreen) {
        gsap.to(sectionRefs.nav_btn_contact.current, {
          scrollTrigger: {
            trigger: sectionRefs.nav_btn_contact.current,
            scrub: true,
            start: "bottom bottom",
            end: () => {
              const height = window.innerHeight;
              return `${
                sectionRefs.nav_btn_contact.current.offsetHeight -
                (height - sectionRefs.nav_btn_contact.current.offsetHeight)
              }px top`;
            },
          },
          bottom: () => {
            return -sectionRefs.nav_btn_contact.current.offsetHeight;
          },
        });
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [sectionRefs, appRef, smallScreen]);

  return (
    <section className="section contact" ref={sectionRefs.nav_btn_contact}>
      <div className="content-container-right">
        <div className="title-wrp">
          <h2>{data?.screen_title[lang]}</h2>
          <img src={titleRect} alt="title" />
        </div>
      </div>
      <div className="section main-wrp">
        <div className="item left">
          <img className="grid" src={grid} alt="grid" />
          <div>
            <div className="header">
              <img
                src={logoWhite}
                alt="logo-white"
                onClick={() => {
                  scrollTo("0");
                }}
              />
              <div className="social">
                <a
                  href={data?.social_links.facebook.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={data?.social_links.facebook.icon_url}
                    alt="facebook"
                  />
                </a>
                <a
                  href={data?.social_links.instagram.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={data?.social_links.instagram.icon_url}
                    alt="instagram"
                  />
                </a>
              </div>
            </div>
            <div className="contact-block">
              <div className="item left">
                <h5>{textContent.body.contacts.title[lang]}</h5>
                {/* {data?.phones.map((item, i) => {
                  return <p key={`contact-phone__${i}`}>{item}</p>;
                })} */}
                <p>{contactData?.tel_number}</p>
                <h5>{textContent.body.address.title[lang]}</h5>
                {/* <p>{data?.address[lang]}</p> */}
                <p>{contactData?.address[lang]}</p>
              </div>
              <div className="item right">
                <h5>{textContent.body.form.title[lang]}</h5>
                <input
                  type="text"
                  placeholder={textContent.body.form.name[lang]}
                  name="name"
                />
                <input
                  type="text"
                  placeholder={textContent.body.form.msg[lang]}
                  name="msg"
                />
                <button type="button">
                  <img src={buttonBg} alt="submit" />
                  <p>{textContent.body.form.sendButton[lang]}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="item right">
          <SectionBg img={data?.img} />
        </div>
      </div>
    </section>
  );
};

export default Contact;

export const textContent = {
  body: {
    contacts: {
      title: {
        ru: "Наши контакты",
        en: "Our contacts",
      },
    },
    address: {
      title: {
        ru: "Наш адрес",
        en: "Our address",
      },
    },
    form: {
      title: {
        ru: "Напишите нам",
        en: "Text us",
      },
      name: {
        ru: "Ваше имя",
        en: "Your name",
      },
      msg: {
        ru: "Ваше сообщение",
        en: "Your message...",
      },
      sendButton: {
        ru: "Подробнее",
        en: "More",
      },
    },
  },
};
