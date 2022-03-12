import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useAppContext } from "../context";
import data from "./data";
import axios from "axios";

const Portfolio = ({ setIsPortfolioReady }) => {
  const { lang, sectionRefs } = useAppContext();
  const portfolioRef = useRef(null);
  const [isScroll, setIsScroll] = useState(false);
  const [posx, setPosx] = useState(0);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.get("/api/portfolioscreen", config);
        setData(data.data);
        setIsPortfolioReady(true);
      } catch (error) {
        console.error(error);
        setIsPortfolioReady(false);
      }
    };
    fetchData();
  }, [setIsPortfolioReady]);

  useEffect(() => {
    gsap.set(titleRef.current, { opacity: 0, y: 10 });
    const timeout = setTimeout(() => {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "100% 80%",
        },
        opacity: 1,
        y: 0,
      });
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    gsap.set(contentRef.current, { x: "100%" });
    const timeout = setTimeout(() => {
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
        x: 0,
        duration: 1,
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="section portfolio" ref={sectionRefs.nav_btn_portfolio}>
      <div className="content-container-right title-wrp">
        <h2 ref={titleRef}>{data?.title[lang]}</h2>
      </div>
      <div className="portfolio-wrp" ref={portfolioRef}>
        <div
          className="content"
          ref={contentRef}
          onMouseDown={(e) => {
            setIsScroll(true);
          }}
          onMouseUp={(e) => {
            setIsScroll(false);
            setPosx(0);
          }}
          onMouseLeave={() => {
            setIsScroll(false);
          }}
          onMouseMove={(e) => {
            if (isScroll) {
              if (e.pageX > posx) {
                portfolioRef.current.scrollLeft -= 15;
              } else {
                portfolioRef.current.scrollLeft += 15;
              }
              setPosx(e.pageX);
            }
          }}
        >
          {data?.works.map((item, n) => {
            return (
              <div className="item" key={`work-${n}`}>
                <div className="img">
                  <img
                    src={item.img}
                    alt={item.work_title.en}
                    onMouseDown={(e) => e.preventDefault()}
                  />
                </div>
                <div className="title">{item.work_title[lang]}</div>
                <div className="year">{item.year}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

const title = {
  ru: "Портфолио",
  en: "Works",
};
