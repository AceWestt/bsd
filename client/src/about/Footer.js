import React, { useRef, useEffect } from "react";
import { gsap, Linear } from "gsap";
import { useAppContext } from "../context";
import SectionBg from "../commonComponents/SectionBg";
import leftBg from "./img/footerLeftBg.png";

const Footer = (props) => {
  const { lang } = useAppContext();
  const footerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const { slogan, person } = props.data;

  useEffect(() => {
    gsap.set(leftRef.current, { x: "200%" });
    gsap.set(rightRef.current, { x: "100%" });
    const timeout = setTimeout(() => {
      gsap.to(rightRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "50% 80%",
        },
        x: 0,
        duration: 0.3,
        ease: Linear.easeOut,
        onComplete: () => {
          gsap.to(leftRef.current, {
            x: 0,
            duration: 0.5,
            ease: Linear.easeOut,
          });
        },
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={props.className} ref={footerRef}>
      <div className="item left" ref={leftRef}>
        <SectionBg img={leftBg} alt="desc" />
        <div className="text-wrp">
          <h5>{slogan?.title[lang]}</h5>
          <p>{slogan?.text[lang]}</p>
        </div>
      </div>
      <div className="item right" ref={rightRef}>
        <img src={person?.img} alt="manager" />
        <div>
          <h5>{person?.name[lang]}</h5>
          <p>{person?.job_title[lang]}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
