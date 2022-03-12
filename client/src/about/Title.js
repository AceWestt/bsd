import React, { useRef, useEffect } from "react";
import { useAppContext } from "../context";
import { gsap, Linear } from "gsap";

const Title = (props) => {
  const { lang } = useAppContext();

  const svgRef = useRef(null);
  const titleRef = useRef(null);

  const { title } = props;

  useEffect(() => {
    gsap.set(svgRef.current.children, { scale: 2, opacity: 0 });
    const timeout = setTimeout(() => {
      gsap.to(svgRef.current.children, {
        scrollTrigger: {
          trigger: svgRef.current,
          start: "bottom bottom",
        },
        scale: 1,
        opacity: 1,
        stagger: {
          each: 0.2,
          from: "start",
          ease: "none",
        },
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    gsap.set(titleRef.current, { opacity: 0, y: -10 });
    const timout = setTimeout(() => {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "bottom bottom",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: Linear.easeInOut,
      });
    }, 500);
    return () => clearTimeout(timout);
  }, [lang]);

  return (
    <div className={props.className}>
      <h2 ref={titleRef}>{title && title[lang]}</h2>
      <svg
        viewBox="0 0 416 172"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
      >
        <rect
          x="329.542"
          y="162.677"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 329.542 162.677)"
          fill="#E31E24"
        />
        <rect
          x="329.542"
          y="81.2952"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 329.542 81.2952)"
          fill="#E31E24"
        />
        <rect
          x="329.542"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 329.542 0)"
          fill="#E31E24"
        />
        <rect
          x="248.29"
          y="81.2952"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 248.29 81.2952)"
          fill="#E31E24"
        />
        <rect
          x="248.29"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 248.29 0)"
          fill="#E31E24"
        />
        <rect
          x="248.29"
          y="162.677"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 248.29 162.677)"
          fill="#E31E24"
        />
        <rect
          x="410.923"
          y="81.2952"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 410.923 81.2952)"
          fill="#E31E24"
        />
        <rect
          x="410.923"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 410.923 0)"
          fill="#E31E24"
        />
        <rect
          x="410.923"
          y="162.677"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 410.923 162.677)"
          fill="#E31E24"
        />
        <rect
          x="85.5419"
          y="162.677"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 85.5419 162.677)"
          fill="#E31E24"
        />
        <rect
          x="85.5419"
          y="81.2952"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 85.5419 81.2952)"
          fill="#E31E24"
        />
        <rect
          x="85.5419"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 85.5419 0)"
          fill="#E31E24"
        />
        <rect
          x="4.28992"
          y="81.2952"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 4.28992 81.2952)"
          fill="#E31E24"
        />
        <rect
          x="4.28992"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 4.28992 0)"
          fill="#E31E24"
        />
        <rect
          x="4.28992"
          y="162.677"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 4.28992 162.677)"
          fill="#E31E24"
        />
        <rect
          x="166.923"
          y="81.2952"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 166.923 81.2952)"
          fill="#E31E24"
        />
        <rect
          x="166.923"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 166.923 0)"
          fill="#E31E24"
        />
        <rect
          x="166.923"
          y="162.677"
          width="6.0668"
          height="6.0668"
          transform="rotate(45 166.923 162.677)"
          fill="#E31E24"
        />
      </svg>
    </div>
  );
};

export default Title;
