import React, { useState, useEffect } from "react";
import MainbarContentWrapper from "../MainbarContentWrapper";
import LangSwitch from "../utils/LangSwitch";
import Form from "../formComponents/Form";
import InputField from "../formComponents/InputField";
import TextArea from "../formComponents/TextArea";
import FileUploadField from "../formComponents/FileUploadField";
import IconImgSwapShow from "../formComponents/IconImgSwapShow";
import { validateImgs, validatePdf } from "../../../common/validate";
import { getObjLentgh } from "../../../common/utils";
import { useFetch } from "../../../hooks/useFetch";
import instructionImg from "../../../common/imgs/services_instructions.jpg";
import axios from "axios";

const Servicesscreen = () => {
  const [lang, setLang] = useState("ru");
  const [loading, setLoading] = useState(true);

  const data = useFetch("/api/servicesscreen");

  const [id, setId] = useState(null);
  const [title, setTitle] = useState({});
  const [description, setDescription] = useState({});
  const [points, setPoints] = useState([]);
  const [pointImgs, setPointImgs] = useState([]);
  const [catalog, setCatalog] = useState(null);
  const [bottomImg, setBottomImg] = useState(null);
  const [bottomImgOld, setBottomImgOld] = useState("");
  const [bottomImgUploadTempUrl, setBottomImgUploadTempUrl] = useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setId(data?._id);
    setTitle(data?.title);
    setDescription(data?.description);
    setPoints(data?.services);
    setPointImgs(
      data?.services.map((p) => {
        return { id: p.id };
      })
    );
    setBottomImgOld(data?.footer_right_img);
    setLoading(false);
  }, [data]);

  const handlePointTextChange = (e, id) => {
    let newPoint = points[id - 1];
    newPoint.text[lang] = e.target.value;
    let newArray = points.filter((point) => point.id !== id);
    newArray.splice(id - 1, 0, newPoint);
    setPoints(newArray);
  };

  const handleServicesImgChange = (e, id) => {
    const validate = validateImgs(e.target.files[0]);
    let newPoint = pointImgs[id - 1];
    if (validate.valid) {
      newPoint.id = id;
      newPoint.newIcon = e.target.files[0];
      newPoint.newIconTempUrl = URL.createObjectURL(e.target.files[0]);
      setErrors({ ...errors, [`point_img_${id}`]: undefined });
    } else {
      newPoint.id = id;
      newPoint.newIcon = null;
      newPoint.newIconTempUrl = null;
      setErrors({ ...errors, [`point_img_${id}`]: validate.msg });
    }
    let newArray = pointImgs.filter((point) => point.id !== id);
    newArray.splice(id - 1, 0, newPoint);
    setPointImgs(newArray);
  };

  const handlePdfChange = (e) => {
    const validate = validatePdf(e.target.files[0]);
    if (validate.valid) {
      setCatalog(e.target.files[0]);
      setErrors({ ...errors, catalog: undefined });
    } else {
      setCatalog(null);
      setErrors({ ...errors, catalog: validate.msg });
    }
  };

  const handleBottomImgUpload = (e) => {
    const validate = validateImgs(e.target.files[0]);
    if (validate.valid) {
      setBottomImg(e.target.files[0]);
      setBottomImgUploadTempUrl(URL.createObjectURL(e.target.files[0]));
      setErrors({ ...errors, bottomImg: undefined });
    } else {
      setBottomImg(null);
      setBottomImgUploadTempUrl(null);
      setErrors({ ...errors, bottomImg: validate.msg });
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
    if (!description.ru || !description.en) {
      errorList.description = emptyfieldmsg;
    } else {
      errorList.description = undefined;
    }
    points.map((i) => {
      if (!i.text.ru || !i.text.en) {
        errorList[`point_${i.id}_text`] = emptyfieldmsg;
      } else {
        errorList[`point_${i.id}_text`] = undefined;
      }
      return i;
    });
    setErrors({ ...errors, ...errorList });

    if (getObjLentgh(errorList) === 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", JSON.stringify(title));
      formData.append("description", JSON.stringify(description));
      formData.append("services", JSON.stringify(points));
      pointImgs.map((p) => {
        if (p.newIcon) {
          formData.append(`service_${p.id}_img`, p.newIcon);
        }
        return p;
      });
      formData.append("catalog", catalog);
      formData.append("footer_right_img", bottomImg);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const res = await axios.put(
          `/api/servicesscreen/${id}`,
          formData,
          config
        );
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
    <MainbarContentWrapper className="servicesscreen" img={instructionImg}>
      <h4 className="greeting">
        <span>Блок "услуги"</span>
        <LangSwitch lang={lang} setLang={setLang} />
      </h4>
      <Form
        classname="servicesscreen"
        disabled={loading}
        onSubmit={handleSubmit}
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
        <TextArea
          classname={
            errors?.description
              ? "description-text has-error"
              : "description-text"
          }
          label={`Описание блока(${lang})`}
          value={description?.[lang]}
          onChange={(e) =>
            setDescription({ ...description, [lang]: e.target.value })
          }
        />
        {errors?.description && (
          <p className="text-danger">{errors?.description}</p>
        )}
        <div className="points">
          {points?.map((item) => {
            return (
              <div className="point" key={`point-${item.id}`}>
                <h5>{`Сервис ${item.id}`}</h5>
                <TextArea
                  classname={
                    errors?.[`point_${item.id}_text`]
                      ? "point-text has-error"
                      : "point-text"
                  }
                  label={`Текст сервиса ${item.id} (${lang})`}
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
                <FileUploadField
                  classname={
                    errors?.[`point_img_${item.id}`]
                      ? "point-icon has-error"
                      : "point-icon"
                  }
                  name={`point-${item.id}-img`}
                  label={`Фон ${item.id} сервиса`}
                  onChange={(e) => {
                    handleServicesImgChange(e, item.id);
                  }}
                />
                <IconImgSwapShow
                  oldImg={item.img}
                  type="img"
                  newImg={pointImgs[item.id - 1].newIconTempUrl}
                />
                {errors?.[`point_img_${item.id}`] && (
                  <p className="text-danger">
                    {errors?.[`point_img_${item.id}`]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <FileUploadField
          classname={
            errors?.catalog ? "catalog-file has-error" : "catalog-file"
          }
          name="catalog"
          label="PDF файл каталога"
          onChange={handlePdfChange}
        />
        {errors?.catalog && <p className="text-danger">{errors?.catalog}</p>}
        <FileUploadField
          classname={errors?.bottomImg ? "bottom-img has-error" : "bottom-img"}
          name={`bottom-img`}
          label="Изображение в конце блока"
          onChange={handleBottomImgUpload}
        />
        <IconImgSwapShow
          oldImg={bottomImgOld}
          type="img"
          newImg={bottomImgUploadTempUrl}
        />
        {errors?.bottomImg && (
          <p className="text-danger">{errors?.bottomImg}</p>
        )}
      </Form>
    </MainbarContentWrapper>
  );
};

export default Servicesscreen;
