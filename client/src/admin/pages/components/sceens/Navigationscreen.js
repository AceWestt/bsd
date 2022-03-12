import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "../formComponents/Form";
import InputField from "../formComponents/InputField";
import TextArea from "../formComponents/TextArea";
import MainbarContentWrapper from "../MainbarContentWrapper";
import LangSwitch from "../utils/LangSwitch";
import instructionImg from "../../../common/imgs/navigation_instructions.jpg";
import { useFetch } from "../../../hooks/useFetch";

const Navigationscreen = () => {
  const fetchData = useFetch("/api/navigation");
  const [lang, setLang] = useState("ru");
  const [id, setId] = useState(null);
  const [address, setAddress] = useState({ ru: null, en: null });
  const [tel, setTel] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setId(fetchData?._id);
    setTel(fetchData?.tel_number);
    setAddress(fetchData?.address);
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address?.ru || !address?.en || !tel) {
      setError("Не оставляйте поля пустыми!");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const body = { address, tel };

    try {
      const res = await axios.put(`/api/navigation/${id}`, body, config);
      if (res.data.status === "success") {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainbarContentWrapper className="navigation" img={instructionImg}>
      <h4 className="greeting">
        <span>Меню навигации</span>
        <LangSwitch lang={lang} setLang={setLang} />
      </h4>
      <Form
        classname="navbar"
        submitLabel="Сохранить изменения"
        onSubmit={handleSubmit}
      >
        <InputField
          classname="tel"
          label="Телефон"
          type="text"
          value={tel}
          onChange={(e) => {
            setTel(e.target.value);
          }}
        />
        <TextArea
          classname="address_ru"
          label={`Адрес (${lang})`}
          value={address?.[lang]}
          onChange={(e) => setAddress({ ...address, [lang]: e.target.value })}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Form>
    </MainbarContentWrapper>
  );
};

export default Navigationscreen;
