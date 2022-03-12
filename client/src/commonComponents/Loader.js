import React, { useRef, useEffect } from "react";
import img from "./img/loading.svg";

const Loader = (props) => {
  const { loading } = props;
  const ref = useRef(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        ref.current.style.display = "flex";
      } else {
        ref.current.style.display = "none";
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [loading]);
  return (
    <div
      className={`${loading ? "section loader loading" : "section loader"}`}
      ref={ref}
    >
      <img src={img} alt="loader" />
    </div>
  );
};

export default Loader;
