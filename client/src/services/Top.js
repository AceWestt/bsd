import React, { useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";
import { useAppContext } from "../context";
import SectionBg from "../commonComponents/SectionBg";

const Top = (props) => {
  const { lang } = useAppContext();
  const titleRef = useRef(null);
  const titleChildren = useRef([]);
  const rightItemsRef = useRef(null);
  const rightItemListRef = useRef([]);

  const { title, description, services } = props.data;

  useEffect(() => {
    gsap.set(titleChildren.current, { y: -10, opacity: 0 });
    const timeout = setTimeout(() => {
      gsap.to(titleChildren.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "50% 80%",
        },
        y: 0,
        opacity: 1,
        stagger: {
          each: 0.5,
          ease: Linear.easeNone,
        },
      });
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    gsap.set(rightItemListRef.current, { x: 10, opacity: 0 });
    const timeout = setTimeout(() => {
      gsap.to(rightItemListRef.current, {
        scrollTrigger: {
          trigger: rightItemsRef.current,
          start: "30% 80%",
        },
        x: 0,
        opacity: 1,
        stagger: {
          each: 0.5,
          ease: Linear.easeNone,
        },
      });
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={props.className}>
      <div className="item left" ref={titleRef}>
        <h2 ref={(e) => titleChildren.current.push(e)}>
          {title && title[lang]}
        </h2>
        <p ref={(e) => titleChildren.current.push(e)}>
          {description && description[lang]}
        </p>
      </div>
      <div className="item right" ref={rightItemsRef}>
        {services &&
          services.map((s) => {
            return (
              <div
                key={`service-point-${s.id}`}
                ref={(e) => (rightItemListRef.current[s.id - 1] = e)}
              >
                <SectionBg img={s.img} overlay={true} />
                <p>{s.text[lang]}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Top;
