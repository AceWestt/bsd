import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import SectionBg from "../commonComponents/SectionBg";
import Title from "./Title";
import bgImg from "./img/aboutbg.png";
import Main from "./Main";
import Footer from "./Footer";
import { useAppContext } from "../context";

const About = ({ setIsAboutReady }) => {
  const { sectionRefs } = useAppContext();
  const bgImgRef = useRef(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.get("/api/aboutscreen", config);
        setData(data.data);
        setIsAboutReady(true);
      } catch (error) {
        console.error(error);
        setIsAboutReady(false);
      }
    };
    fetchData();
  }, [setIsAboutReady]);

  useEffect(() => {
    gsap.set(bgImgRef.current, { y: "-=20%" });
    const timeout = setTimeout(() => {
      gsap.to(bgImgRef.current, {
        scrollTrigger: {
          trigger: sectionRefs.nav_btn_about.current,
          scrub: true,
        },
        y: "+=20%",
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [sectionRefs.nav_btn_about]);

  return (
    <section className="section about" ref={sectionRefs.nav_btn_about}>
      <SectionBg img={bgImg} imgRef={bgImgRef} />
      <div className="content-container-right">
        <Title className="title-wrp" title={data?.screen_title} />
        <Main className="main-wrp" points={data?.points} />
      </div>
      <div className="section footer">
        <Footer
          className="footer-wrp"
          data={{ slogan: data?.slogan, person: data?.person }}
        />
      </div>
    </section>
  );
};

export default About;
