import React, { useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";
import { useAppContext } from "../context";
import Arrow from "../commonComponents/Arrow";

const Title = (props) => {
  const { lang } = useAppContext();
  const headlineRef = useRef(null);
  const arrowsRef = useRef(null);
  const arrowListRef = useRef([]);
  const h1Ref = useRef(null);

  const { data } = props;

  useEffect(() => {
    const spans = headlineRef.current.getElementsByTagName("span");
    gsap.set(arrowsRef.current, { opacity: 0, y: -10 });
    gsap.set(h1Ref.current, { opacity: 0, y: -10 });
    gsap.from(spans, {
      delay: 0.7,
      y: -10,
      opacity: 0,
      stagger: 0.3,
      ease: "none",
      onComplete: () => {
        gsap.to(arrowsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: Linear.easeInOut,
          onComplete: () => {
            gsap.fromTo(
              arrowListRef.current,
              { opacity: 0 },
              {
                opacity: 1,
                stagger: { each: 0.2, from: "start", ease: "none" },
              }
            );
          },
        });
        gsap.to(h1Ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "none",
        });
      },
    });
  }, [lang]);
  return (
    <div className={props.className}>
      <div className="headLine" ref={headlineRef}>
        <div>
          <span>{data?.title_top[lang]}</span>
        </div>
        <div>
          <span>{data?.title_bottom[lang]}</span>
        </div>
        <div className="arrows">
          <Arrow
            count="6"
            mode="white"
            myRef={arrowsRef}
            myListRef={arrowListRef}
          />
        </div>
      </div>

      <div ref={h1Ref}>
        <h1>{data?.subtitle[lang]}</h1>
      </div>
    </div>
  );
};

export default Title;
