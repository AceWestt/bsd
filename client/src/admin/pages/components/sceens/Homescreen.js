import React from "react";
import MainbarContentWrapper from "../MainbarContentWrapper";
import img from "../../../common/imgs/home_instructions.jpg";

const Homescreen = ({ username }) => {
  return (
    <MainbarContentWrapper className="home" img={img}>
      <h4 className="greeting">Добро пожаловать, {username}</h4>
      <p>
        Чтобы начать редактировать сайт Beton Stroy Detal, выберите
        соответствующий пункт слева в меню.
      </p>
    </MainbarContentWrapper>
  );
};

export default Homescreen;
