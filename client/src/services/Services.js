import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { gsap, Linear } from "gsap";
import Arrow from "../commonComponents/Arrow";
import Top from "./Top";
import Bottom from "./Bottom";
import { useAppContext } from "../context";

const Services = ({ setIsServicesReady }) => {
  const { sectionRefs } = useAppContext();
  const arrowRef = useRef([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const { data } = await axios.get("/api/servicesscreen", config);
        setData(data.data);
        setIsServicesReady(true);
      } catch (error) {
        console.error(error);
        setIsServicesReady(false);
      }
    };
    fetchData();
  }, [setIsServicesReady]);

  useEffect(() => {
    gsap.set(arrowRef.current, { x: -10, opacity: 0 });
    const timeout = setTimeout(() => {
      gsap.to(arrowRef.current, {
        scrollTrigger: {
          trigger: sectionRefs.nav_btn_services.current,
          start: "10% 80%",
        },
        x: 0,
        opacity: 1,
        stagger: {
          each: 0.1,
        },
        ease: Linear.easeInOut,
      });
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [sectionRefs]);

  return (
    <section className="section services" ref={sectionRefs.nav_btn_services}>
      <Arrow count={6} mode="grey" myListRef={arrowRef} />
      <div className="content-container-right">
        <Top
          className="top-wrp"
          data={{
            title: data?.title,
            description: data?.description,
            services: data?.services,
          }}
        />
      </div>
      <Bottom
        className="bottom-wrp"
        data={{ catalog: data?.catalog, footer_img: data?.footer_right_img }}
      />
    </section>
  );
};

export default Services;
