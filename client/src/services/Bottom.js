import React, { useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";
import { useAppContext } from "../context";
import SectionBg from "../commonComponents/SectionBg";
import leftImg from "./img/bottomLeftBg.svg";
import fileIcon from "./img/fileIcon.svg";
import downloadBg from "./img/downloadBg.svg";

const Bottom = (props) => {
  const { lang, sectionRefs } = useAppContext();
  const itemsRef = useRef([]);
  const blockRef = useRef(null);
  const leftBgRef = useRef(null);

  const { catalog, footer_img } = props.data;

  useEffect(() => {
    gsap.set(itemsRef.current, { y: 10, opacity: 0 });
    const timeout = setTimeout(() => {
      gsap.to(itemsRef.current, {
        scrollTrigger: {
          trigger: blockRef.current,
          start: "30% 80%",
        },
        y: 0,
        opacity: 1,
        stagger: {
          each: 0.5,
          ease: Linear.easeNone,
        },
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    gsap.set(leftBgRef.current, { y: "-100%" });
    const timeout = setTimeout(() => {
      gsap.to(leftBgRef.current, {
        scrollTrigger: {
          trigger: sectionRefs.nav_btn_services.current,
          scrub: true,
        },
        y: 0,
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [sectionRefs]);

  return (
    <div className={props.className} ref={blockRef}>
      <div ref={(e) => itemsRef.current.push(e)}>
        <div className="bgs" ref={leftBgRef}>
          <SectionBg img={leftImg} />
          <SectionBg img={leftImg} />
        </div>

        <a href={catalog} download>
          <SectionBg img={downloadBg} />
          <img src={fileIcon} alt="download catalog" />
          <p>{textContent[lang]}</p>
        </a>
      </div>
      <div ref={(e) => itemsRef.current.push(e)}>
        <SectionBg img={footer_img} />
      </div>
    </div>
  );
};

export default Bottom;

const textContent = {
  ru: "Каталог продукции(pdf)",
  en: "Product Catalog(pdf)",
};
