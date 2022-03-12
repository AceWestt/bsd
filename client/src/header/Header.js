import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import Title from "./Title";
import More from "./More";
import SectionBg from "../commonComponents/SectionBg";
import bg from "./img/headerbg.png";
const Header = ({ setIsHeaderReady }) => {
  const bgImgRef = useRef(null);
  const sectionRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const { data } = await axios.get("/api/mainscreen", config);
        setData(data.data);
        setIsHeaderReady(true);
      } catch (error) {
        console.error(error);
        setIsHeaderReady(false);
      }
    };
    fetchData();
  }, [setIsHeaderReady]);

  useEffect(() => {
    gsap.set(bgImgRef.current, { height: "120%", y: "-10%" });
    const timeout = setTimeout(() => {
      gsap.to(bgImgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
          start: "top top",
        },
        y: "10%",
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <section className="section header" ref={sectionRef}>
      <SectionBg img={bg} imgRef={bgImgRef} />
      <div className="content-container header__content">
        <Title className="title-wrp" data={data} />
        <More className="more-wrp" data={data} />
      </div>
    </section>
  );
};

export default Header;
