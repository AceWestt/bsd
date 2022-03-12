import React from "react";

const LangSwitch = ({ lang, setLang }) => {
  return (
    <div className="lang-switch">
      <span
        onClick={() => setLang("ru")}
        className={lang === "ru" ? "active" : undefined}
      >
        ru
      </span>
      <span
        onClick={() => setLang("en")}
        className={lang === "en" ? "active" : undefined}
      >
        en
      </span>
    </div>
  );
};

export default LangSwitch;
