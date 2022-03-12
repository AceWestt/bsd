import React, { useEffect, useState } from "react";
import MainbarContentWrapper from "../MainbarContentWrapper";
import LangSwitch from "../utils/LangSwitch";
import Form from "../formComponents/Form";
import InputField from "../formComponents/InputField";
import FileUploadField from "../formComponents/FileUploadField";
import IconImgSwapShow from "../formComponents/IconImgSwapShow";
import { validateImgs } from "../../../common/validate";
import { getObjLentgh } from "../../../common/utils";
import { useFetch } from "../../../hooks/useFetch";
import axios from "axios";

const Contactscreen = () => {
  const [lang, setLang] = useState("ru");
  const [loading, setLoading] = useState(true);

  const data = useFetch("/api/contactscreen");

  const [id, setId] = useState(null);
  const [title, setTitle] = useState({});
  const [img, setImg] = useState(null);
  const [imgTempUrl, setImgTempUrl] = useState(null);
  const [oldImg, setOldImg] = useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setId(data?._id);
    setTitle(data?.screen_title);
    setOldImg(data?.img);
    setLoading(false);
  }, [data]);

  const handleImgChange = (e) => {
    const validate = validateImgs(e.target.files[0]);
    if (validate.valid) {
      setImg(e.target.files[0]);
      setImgTempUrl(URL.createObjectURL(e.target.files[0]));
      setErrors({ ...errors, img: undefined });
    } else {
      setImg(null);
      setImgTempUrl(null);
      setErrors({ ...errors, img: validate.msg });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorList = errors;
    if (!title.ru || !title.en) {
      errorList.title = "Заполните поле на обоих языках!";
    } else {
      errorList.title = undefined;
    }
    setErrors({ ...errors, ...errorList });
    if (getObjLentgh(errorList) === 0) {
      //   setLoading(true);
      const formData = new FormData();
      formData.append("screen_title", JSON.stringify(title));
      formData.append("img", img);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const res = await axios.put(
          `/api/contactscreen/${id}`,
          formData,
          config
        );
        if (res.data.status === "success") {
          setLoading(false);
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
        console.log(error.response.data);
      }
    }
  };
  return (
    <MainbarContentWrapper className="contactscreen">
      <h4 className="greeting">
        <span>Блок "контакты"</span>
        <LangSwitch lang={lang} setLang={setLang} />
      </h4>
      <Form
        classname="contactscreen"
        submitLabel="Сохранить изменения"
        disabled={loading}
        onSubmit={handleSubmit}
      >
        <InputField
          classname={errors?.title ? "title has-error" : "title"}
          label={`Заголовок блока (${lang})`}
          type="text"
          value={title?.[lang]}
          onChange={(e) => setTitle({ ...title, [lang]: e.target.value })}
        />
        {errors?.title && <p className="text-danger">{errors.title}</p>}
        <FileUploadField
          classname={errors?.img ? "img has-error" : "img"}
          label="Изображение снизу блока"
          onChange={handleImgChange}
          name="block-img"
        />
        <IconImgSwapShow oldImg={oldImg} type="img" newImg={imgTempUrl} />
        {errors?.img && <p className="text-danger">{errors.img}</p>}
      </Form>
    </MainbarContentWrapper>
  );
};

export default Contactscreen;
