import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Arrow from "../commonComponents/Arrow";
import { useAppContext, scrollTo } from "../context";
import img from "./img/moreBTNBG.svg";
import SectionBg from "../commonComponents/SectionBg";

const More = (props) => {
  const { lang, sectionRefs } = useAppContext();
  const moreWrpRef = useRef(null);
  const moreBtnRef = useRef(null);
  const socialWrpRef = useRef(null);

  const { data } = props;

  useEffect(() => {
    gsap.set(moreBtnRef.current, { opacity: 0, x: "-100%" });
    const timeout = setTimeout(() => {
      gsap.to(moreBtnRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: moreWrpRef.current,
          start: "bottom bottom",
        },
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [lang]);

  useEffect(() => {
    gsap.set(socialWrpRef.current, { opacity: 0, x: "100%" });
    const timeout = setTimeout(() => {
      gsap.to(socialWrpRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: moreWrpRef.current,
          start: "bottom bottom",
        },
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [lang]);

  return (
    <div className={props.className} ref={moreWrpRef}>
      <div
        className="more-btn"
        ref={moreBtnRef}
        onClick={() => {
          scrollTo(sectionRefs.nav_btn_about.current);
        }}
      >
        <SectionBg className="bg" img={img} />
        <Arrow className="arrows" count="2" mode="solid" />
        <p>{data?.morebtn_text[lang]}</p>
      </div>
      <div className="social" ref={socialWrpRef}>
        <p>{data?.social_links.label[lang]}</p>
        <div className="social-links">
          <a
            href={data?.social_links.facebook.link}
            target="_blank"
            rel="noreferrer"
          >
            <img src={data?.social_links.facebook.icon_url} alt="facebook" />
          </a>
          <a
            href={data?.social_links.instagram.link}
            target="_blank"
            rel="noreferrer"
          >
            <img src={data?.social_links.instagram.icon_url} alt="instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default More;
