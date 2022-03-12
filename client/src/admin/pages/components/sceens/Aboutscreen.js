import React, { useEffect, useState } from "react";
import Form from "../formComponents/Form";
import MainbarContentWrapper from "../MainbarContentWrapper";
import instructionImg from "../../../common/imgs/about_instructions.jpg";
import LangSwitch from "../utils/LangSwitch";
import InputField from "../formComponents/InputField";
import FileUploadField from "../formComponents/FileUploadField";
import IconImgSwapShow from "../formComponents/IconImgSwapShow";
import TextArea from "../formComponents/TextArea";
import { useFetch } from "../../../hooks/useFetch";
import { validateIcons, validateImgs } from "../../../common/validate";
import { getObjLentgh } from "../../../common/utils";
import axios from "axios";

const Aboutscreen = () => {
  const [lang, setLang] = useState("ru");
  const [loading, setLoading] = useState(true);

  const data = useFetch("/api/aboutscreen");

  const [id, setId] = useState(null);
  const [title, setTitle] = useState({});
  const [errors, setErrors] = useState({});
  const [points, setPoints] = useState([]);
  const [pointIcons, setPointIcons] = useState([]);
  const [sloganTitle, setSloganTitle] = useState({});
  const [sloganText, setSloganText] = useState({});
  const [personName, setPersonName] = useState({});
  const [personTitle, setPersonTitle] = useState({});
  const [personOldPhoto, setPeronOldPhoto] = useState("");
  const [personPhoto, setPersonPhoto] = useState(null);
  const [personPhotoTempUrl, setPersonPhotoTempUrl] = useState(null);

  useEffect(() => {
    setId(data?._id);
    setTitle(data?.screen_title);
    setPoints(data?.points);
    setPointIcons(
      data?.points.map((p) => {
        return { id: p.id };
      })
    );
    setSloganTitle(data?.slogan.title);
    setSloganText(data?.slogan.text);
    setPersonName(data?.person.name);
    setPersonTitle(data?.person.job_title);
    setPeronOldPhoto(data?.person.img);
    setLoading(false);
  }, [data]);

  const handlePointIconUpload = (e, id) => {
    const validate = validateIcons(e.target.files[0]);
    let newPoint = pointIcons[id - 1];
    if (validate.valid) {
      newPoint.id = id;
      newPoint.newIcon = e.target.files[0];
      newPoint.newIconTempUrl = URL.createObjectURL(e.target.files[0]);
      setErrors({ ...errors, [`point_icon_${id}`]: undefined });
    } else {
      newPoint.id = id;
      newPoint.newIcon = null;
      newPoint.newIconTempUrl = null;
      setErrors({ ...errors, [`point_icon_${id}`]: validate.msg });
    }
    let newArray = pointIcons.filter((point) => point.id !== id);
    newArray.splice(id - 1, 0, newPoint);
    setPointIcons(newArray);
  };

  const handlePointTitleChange = (e, id) => {
    let newPoint = points[id - 1];
    newPoint.title[lang] = e.target.value;
    let newArray = points.filter((point) => point.id !== id);
    newArray.splice(id - 1, 0, newPoint);
    setPoints(newArray);
  };

  const handlePointTextChange = (e, id) => {
    let newPoint = points[id - 1];
    newPoint.text[lang] = e.target.value;
    let newArray = points.filter((point) => point.id !== id);
    newArray.splice(id - 1, 0, newPoint);
    setPoints(newArray);
  };

  const handlePersonPhotoUpload = (e) => {
    const validate = validateImgs(e.target.files[0]);
    if (validate.valid) {
      setPersonPhoto(e.target.files[0]);
      setPersonPhotoTempUrl(URL.createObjectURL(e.target.files[0]));
      setErrors({ ...errors, personPhoto: undefined });
    } else {
      setPersonPhoto(null);
      setPersonPhotoTempUrl(null);
      setErrors({ ...errors, personPhoto: validate.msg });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorList = errors;
    const emptyfieldmsg = "Заполните поле на обоих языках!";
    if (!title.ru || !title.en) {
      errorList.title = emptyfieldmsg;
    } else {
      errorList.title = undefined;
    }
    points.map((i) => {
      if (!i.title.ru || !i.title.en) {
        errorList[`point_${i.id}_title`] = emptyfieldmsg;
      } else {
        errorList[`point_${i.id}_title`] = undefined;
      }
      if (!i.text.ru || !i.text.en) {
        errorList[`point_${i.id}_text`] = emptyfieldmsg;
      } else {
        errorList[`point_${i.id}_text`] = undefined;
      }
      return i;
    });
    if (!sloganTitle.ru || !sloganTitle.en) {
      errorList.sloganTitle = emptyfieldmsg;
    } else {
      errorList.sloganTitle = undefined;
    }
    if (!sloganText.ru || !sloganText.en) {
      errorList.sloganText = emptyfieldmsg;
    } else {
      errorList.sloganText = undefined;
    }
    if (!personName.ru || !personName.en) {
      errorList.personName = emptyfieldmsg;
    } else {
      errorList.personName = undefined;
    }
    if (!personTitle.ru || !personTitle.en) {
      errorList.personTitle = emptyfieldmsg;
    } else {
      errorList.personTitle = undefined;
    }
    setErrors({ ...errors, ...errorList });
    if (getObjLentgh(errorList) === 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append("screen_title", JSON.stringify(title));
      formData.append("points", JSON.stringify(points));
      pointIcons.map((p) => {
        if (p.newIcon) {
          formData.append(`point_${p.id}_icn`, p.newIcon);
        }
        return p;
      });
      formData.append("slogan_title", JSON.stringify(sloganTitle));
      formData.append("slogan_text", JSON.stringify(sloganText));
      formData.append("person_name", JSON.stringify(personName));
      formData.append("person_title", JSON.stringify(personTitle));
      formData.append("person_img", personPhoto);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const res = await axios.put(`/api/aboutscreen/${id}`, formData, config);
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
    <MainbarContentWrapper className="aboutscreen" img={instructionImg}>
      <h4 className="greeting">
        <span>Блок "О нас"</span>
        <LangSwitch lang={lang} setLang={setLang} />
      </h4>
      <Form
        classname="aboutscreen"
        onSubmit={handleSubmit}
        disabled={loading}
        submitLabel="Сохранить изменения"
      >
        <InputField
          classname={errors?.title ? "screen-title has-error" : "screen-title"}
          label={`Заголовок блока (${lang})`}
          type="text"
          value={title?.[lang]}
          onChange={(e) => setTitle({ ...title, [lang]: e.target.value })}
        />
        {errors?.title && <p className="text-danger">{errors?.title}</p>}
        <div className="points">
          {points?.map((item) => {
            return (
              <div className="point" key={`point-${item.id}`}>
                <h5>{`Пункт ${item.id}`}</h5>
                <FileUploadField
                  classname={
                    errors?.[`point_icon_${item.id}`]
                      ? "point-icon has-error"
                      : "point-icon"
                  }
                  name={`point-${item.id}-icon`}
                  label={`Иконка ${item.id} пункта`}
                  onChange={(e) => {
                    handlePointIconUpload(e, item.id);
                  }}
                />
                <IconImgSwapShow
                  oldImg={item.icon}
                  type="icon"
                  newImg={pointIcons[item.id - 1].newIconTempUrl}
                />
                {errors?.[`point_icon_${item.id}`] && (
                  <p className="text-danger">
                    {errors?.[`point_icon_${item.id}`]}
                  </p>
                )}
                <InputField
                  classname={
                    errors?.[`point_${item.id}_title`]
                      ? "point-title has-error"
                      : "point-title"
                  }
                  label={`Заголовок пункта ${item.id} (${lang})`}
                  type="text"
                  value={points?.[item.id - 1].title[lang]}
                  onChange={(e) => {
                    handlePointTitleChange(e, item.id);
                  }}
                />
                {errors?.[`point_${item.id}_title`] && (
                  <p className="text-danger">
                    {errors?.[`point_${item.id}_title`]}
                  </p>
                )}
                <TextArea
                  classname={
                    errors?.[`point_${item.id}_text`]
                      ? "point-text has-error"
                      : "point-text"
                  }
                  label={`Текст пункта ${item.id} (${lang})`}
                  value={points?.[item.id - 1].text[lang]}
                  onChange={(e) => {
                    handlePointTextChange(e, item.id);
                  }}
                />
                {errors?.[`point_${item.id}_text`] && (
                  <p className="text-danger">
                    {errors?.[`point_${item.id}_text`]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <InputField
          classname={
            errors?.sloganTitle ? "slogan-title has-error" : "slogan-title"
          }
          label={`Заголовок слогана (${lang})`}
          type="text"
          value={sloganTitle?.[lang]}
          onChange={(e) =>
            setSloganTitle({ ...sloganTitle, [lang]: e.target.value })
          }
        />
        {errors?.sloganTitle && (
          <p className="text-danger">{errors?.sloganTitle}</p>
        )}
        <TextArea
          classname={
            errors?.sloganText ? "slogan-text has-error" : "slogan-text"
          }
          label={`Текст слогана (${lang})`}
          value={sloganText?.[lang]}
          onChange={(e) => {
            setSloganText({ ...sloganText, [lang]: e.target.value });
          }}
        />
        {errors?.sloganText && (
          <p className="text-danger">{errors?.sloganText}</p>
        )}
        <InputField
          classname={
            errors?.personName ? "person-name has-error" : "person-name"
          }
          label={`Имя сотрудника (${lang})`}
          type="text"
          value={personName?.[lang]}
          onChange={(e) =>
            setPersonName({ ...personName, [lang]: e.target.value })
          }
        />
        {errors?.personName && (
          <p className="text-danger">{errors?.personName}</p>
        )}
        <InputField
          classname={
            errors?.personTitle ? "person-title has-error" : "person-title"
          }
          label={`Должность сотрудника (${lang})`}
          type="text"
          value={personTitle?.[lang]}
          onChange={(e) =>
            setPersonTitle({ ...personTitle, [lang]: e.target.value })
          }
        />
        {errors?.personTitle && (
          <p className="text-danger">{errors?.personTitle}</p>
        )}
        <FileUploadField
          classname={
            errors?.personPhoto ? "person-photo has-error" : "person-photo"
          }
          name={`person-photo`}
          label={`Фото сотрудника`}
          onChange={handlePersonPhotoUpload}
        />
        <IconImgSwapShow
          oldImg={personOldPhoto}
          type="img"
          newImg={personPhotoTempUrl}
        />
        {errors?.personPhoto && (
          <p className="text-danger">{errors?.personPhoto}</p>
        )}
      </Form>
    </MainbarContentWrapper>
  );
};

export default Aboutscreen;
