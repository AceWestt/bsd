import React from "react";
import { useAppContext } from "../context";

const LangSelection = (props) => {
  const { lang, setLang } = useAppContext();
  return (
    <div className={props.className}>
      <div
        className={lang === "ru" ? "lang-item active" : "lang-item"}
        onClick={() => setLang("ru")}
      >
        Ru
      </div>
      <div
        className={lang === "en" ? "lang-item active" : "lang-item"}
        onClick={() => setLang("en")}
      >
        En
      </div>
    </div>
  );
};

export default LangSelection;
