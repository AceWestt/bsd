import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import FileUploadField from "../formComponents/FileUploadField";
import Form from "../formComponents/Form";
import IconImgSwapShow from "../formComponents/IconImgSwapShow";
import InputField from "../formComponents/InputField";
import MainbarContentWrapper from "../MainbarContentWrapper";
import LangSwitch from "../utils/LangSwitch";
import instructionsImg from "../../../common/imgs/main_instructions.jpg";
import { validateIcons } from "../../../common/validate";
import { getObjLentgh } from "../../../common/utils";
import axios from "axios";

const Mainscreen = () => {
  const [lang, setLang] = useState("ru");

  const data = useFetch("/api/mainscreen");

  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [titleTop, setTitleTop] = useState({});
  const [titleBottom, setTitleBottom] = useState({});
  const [subtitle, setSubtitle] = useState({});
  const [moreButtonText, setMoreButtonText] = useState({});
  const [socialText, setSocialText] = useState({});
  const [facebookLink, setFacebookLink] = useState("");
  const [facebookIcon, setFaceBookIcon] = useState(null);
  const [facebookIconOldUrl, setFacebookIconOldUrl] = useState("");
  const [facebookIconNewTempUrl, setFacebookIconNewTempUrl] = useState(null);
  const [instagramLink, setInstagramLink] = useState("");
  const [instagramIcon, setInstagramIcon] = useState(null);
  const [instagramIconOldUrl, setInstagramIconOldUrl] = useState("");
  const [instagramIconNewTempUrl, setInstagramIconNewTempUrl] = useState(null);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setId(data?._id);
    setTitleTop(data?.title_top);
    setTitleBottom(data?.title_bottom);
    setSubtitle(data?.subtitle);
    setMoreButtonText(data?.morebtn_text);
    setFacebookLink(data?.social_links.facebook.link);
    setFacebookIconOldUrl(data?.social_links.facebook.icon_url);
    setInstagramLink(data?.social_links.instagram.link);
    setInstagramIconOldUrl(data?.social_links.instagram.icon_url);
    setSocialText(data?.social_links.label);
    setLoading(false);
  }, [data]);

  const handleFacebookIconUpload = (e) => {
    const validate = validateIcons(e.target.files[0]);
    if (validate.valid) {
      setFaceBookIcon(e.target.files[0]);
      setFacebookIconNewTempUrl(URL.createObjectURL(e.target.files[0]));
      setErrors({ ...errors, facebookIcon: undefined });
    } else {
      setFaceBookIcon(null);
      setFacebookIconNewTempUrl(null);
      setErrors({ ...errors, facebookIcon: validate.msg });
    }
  };

  const handleInstagramIconUpload = (e) => {
    const validate = validateIcons(e.target.files[0]);
    if (validate.valid) {
      setInstagramIcon(e.target.files[0]);
      setInstagramIconNewTempUrl(URL.createObjectURL(e.target.files[0]));
      setErrors({ ...errors, instagramIcon: undefined });
    } else {
      setInstagramIcon(null);
      setErrors({ ...errors, instagramIcon: validate.msg });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorList = errors;
    const emptyfieldmsg = "Заполните поле на обоих языках!";
    if (!titleTop.ru || !titleTop.en) {
      errorList.titleTop = emptyfieldmsg;
    } else {
      errorList.titleTop = undefined;
    }
    if (!titleBottom.ru || !titleBottom.en) {
      errorList.titleBottom = emptyfieldmsg;
    } else {
      errorList.titleBottom = undefined;
    }
    if (!subtitle.ru || !subtitle.en) {
      errorList.subtitle = emptyfieldmsg;
    } else {
      errorList.subtitle = undefined;
    }
    if (!moreButtonText.ru || !moreButtonText.en) {
      errorList.moreButtonText = emptyfieldmsg;
    } else {
      errorList.moreButtonText = undefined;
    }
    if (!socialText.ru || !socialText.en) {
      errorList.socialText = emptyfieldmsg;
    } else {
      errorList.socialText = undefined;
    }
    if (!facebookLink) {
      errorList.facebookLink = "Заполните поле!";
    } else {
      errorList.facebookLink = undefined;
    }
    if (!instagramLink) {
      errorList.instagramLink = "Заполните поле!";
    } else {
      errorList.instagramLink = undefined;
    }
    setErrors({ ...errors, ...errorList });
    if (getObjLentgh(errorList) === 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append("title_top", JSON.stringify(titleTop));
      formData.append("title_bottom", JSON.stringify(titleBottom));
      formData.append("subtitle", JSON.stringify(subtitle));
      formData.append("morebtn_text", JSON.stringify(moreButtonText));
      formData.append("social_links_label", JSON.stringify(socialText));
      formData.append("facebook_link", facebookLink);
      formData.append("instagram_link", instagramLink);
      formData.append("facebook_icon", facebookIcon);
      formData.append("instagram_icon", instagramIcon);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const res = await axios.put(`/api/mainscreen/${id}`, formData, config);
        if (res.data.status === "success") {
          setLoading(false);
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
        console.log(error.response);
      }
    }
  };

  return (
    <MainbarContentWrapper className="mainscreen" img={instructionsImg}>
      <h4 className="greeting">
        <span>Главный блок</span>
        <LangSwitch lang={lang} setLang={setLang} />
      </h4>
      <Form
        classname="mainscreen"
        submitLabel="Сохранить изменения"
        onSubmit={handleSubmit}
        disabled={loading}
      >
        <InputField
          classname={errors.titleTop ? "title-top has-error" : "title-top"}
          label={`Заголовок блока (верхний ${lang})`}
          type="text"
          value={titleTop?.[lang]}
          onChange={(e) => setTitleTop({ ...titleTop, [lang]: e.target.value })}
        />
        {errors.titleTop && <p className="text-danger">{errors.titleTop}</p>}
        <InputField
          classname={
            errors.titleBottom ? "title-bottom has-error" : "title-bottom"
          }
          label={`Заголовок блока (нижний ${lang})`}
          type="text"
          value={titleBottom?.[lang]}
          onChange={(e) =>
            setTitleBottom({ ...titleBottom, [lang]: e.target.value })
          }
        />
        {errors.titleBottom && (
          <p className="text-danger">{errors.titleBottom}</p>
        )}
        <InputField
          classname={errors.subtitle ? "subtitle has-error" : "subtitle"}
          label={`Подзаголовок блока (${lang})`}
          type="text"
          value={subtitle?.[lang]}
          onChange={(e) => setSubtitle({ ...subtitle, [lang]: e.target.value })}
        />
        {errors.subtitle && <p className="text-danger">{errors.subtitle}</p>}
        <InputField
          classname={
            errors.moreButtonText ? "more-btn-text has-error" : "more-btn-text"
          }
          label={`Текст на кнопке снизу блока (${lang})`}
          type="text"
          value={moreButtonText?.[lang]}
          onChange={(e) =>
            setMoreButtonText({ ...moreButtonText, [lang]: e.target.value })
          }
        />
        {errors.moreButtonText && (
          <p className="text-danger">{errors.moreButtonText}</p>
        )}
        <InputField
          classname={
            errors.socialText
              ? "social-links-label has-error"
              : "social-links-label"
          }
          label={`Текст заголовок социальных сетей (${lang})`}
          type="text"
          value={socialText?.[lang]}
          onChange={(e) =>
            setSocialText({ ...socialText, [lang]: e.target.value })
          }
        />
        {errors.socialText && (
          <p className="text-danger">{errors.socialText}</p>
        )}
        <InputField
          classname={
            errors.facebookLink ? "facebook-link has-error" : "facebook-link"
          }
          label="Ссылка на страницу в facebook"
          type="text"
          value={facebookLink}
          onChange={(e) => setFacebookLink(e.target.value)}
        />
        {errors.facebookLink && (
          <p className="text-danger">{errors.facebookLink}</p>
        )}
        <FileUploadField
          classname={
            errors?.facebookIcon ? "facebook-icon has-error" : "facebook-icon"
          }
          name="facebook-icon"
          label="Иконка facebook"
          onChange={handleFacebookIconUpload}
        />
        <IconImgSwapShow
          oldImg={facebookIconOldUrl}
          type="icon"
          newImg={facebookIconNewTempUrl}
        />
        {errors?.facebookIcon && (
          <p className="text-danger">{errors.facebookIcon}</p>
        )}
        <InputField
          classname={
            errors.instagramLink ? "instagram-link has-error" : "instagram-link"
          }
          label="Ссылка на страницу в instagram"
          type="text"
          value={instagramLink}
          onChange={(e) => setInstagramLink(e.target.value)}
        />
        {errors.instagramLink && (
          <p className="text-danger">{errors.instagramLink}</p>
        )}
        <FileUploadField
          classname={
            errors?.instagramIcon
              ? "instagram-icon has-error"
              : "instagram-icon"
          }
          name="instagram-icon"
          label="Иконка instagram"
          onChange={handleInstagramIconUpload}
        />
        <IconImgSwapShow
          oldImg={instagramIconOldUrl}
          type="icon"
          newImg={instagramIconNewTempUrl}
        />
        {errors?.instagramIcon && (
          <p className="text-danger">{errors.instagramIcon}</p>
        )}
      </Form>
    </MainbarContentWrapper>
  );
};

export default Mainscreen;
