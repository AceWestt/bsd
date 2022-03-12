import React, { useState, useRef, useEffect } from "react";
import { gsap, Linear } from "gsap";
import { useAppContext } from "../context";
import closePointImg from "./img/closePointButton.svg";
import openPointImg from "./img/openPointButton.svg";

const Main = (props) => {
  const { lang, smallScreen } = useAppContext();
  const [activePoint, setActivePoint] = useState(1);
  const activePointRef = useRef(null);
  const iconRef = useRef(null);
  const pointsRef = useRef(null);
  const containerRef = useRef(null);

  const { points } = props;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const height = activePointRef.current?.offsetHeight;
      const top = activePointRef.current?.offsetTop;
      iconRef.current.style.height = `${height}px`;
      iconRef.current.style.marginTop = `${top}px`;
    }, 200);
    return () => clearTimeout(timeout);
  }, [activePoint]);

  useEffect(() => {
    if (points) {
      const initialW = iconRef.current?.offsetWidth;
      gsap.set(iconRef.current, { width: 0 });
      const timeout = setTimeout(() => {
        gsap.from(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "50% 80%",
          },
          right: "-100%",
          duration: 0.5,
          ease: Linear.easeInOut,
          onComplete: () => {
            gsap.to(iconRef.current, {
              width: initialW,
              duration: 0.5,
              ease: Linear.easeInOut,
            });
          },
        });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [lang, points]);

  if (!points) {
    return <div>Something is wrong...</div>;
  }

  return (
    <div className={props.className} ref={containerRef}>
      <div className="icon" ref={iconRef}>
        <img
          src={points[activePoint - 1].icon}
          alt={points[activePoint - 1].title.en}
        />
      </div>
      <div className="points" ref={pointsRef}>
        {points.map((p) => {
          return (
            <div
              className={`point ${activePoint === p.id ? "active" : ""}`}
              key={`point-${p.id}`}
              data-id={p.id}
              ref={activePoint === p.id ? activePointRef : null}
            >
              <h5>{p.title[lang]}</h5>
              {smallScreen ? (
                <>
                  <img
                    className="control"
                    src={activePoint === p.id ? closePointImg : openPointImg}
                    alt="control"
                    onClick={() => setActivePoint(p.id)}
                  />
                  {activePoint === p.id && <p>{p.text[lang]}</p>}
                </>
              ) : (
                <>
                  <p>{activePoint === p.id && p.text[lang]}</p>
                  <img
                    className="control"
                    src={activePoint === p.id ? closePointImg : openPointImg}
                    alt="control"
                    onClick={() => setActivePoint(p.id)}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
