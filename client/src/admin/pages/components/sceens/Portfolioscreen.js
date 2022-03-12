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
import { RiFileAddLine } from "react-icons/ri";
import { RiFileEditLine } from "react-icons/ri";
import { TiDocumentDelete } from "react-icons/ti";
import axios from "axios";

const Portfolioscreen = () => {
  const [lang, setLang] = useState("ru");
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingWork, setEditingWork] = useState(null);

  const data = useFetch("/api/portfolioscreen");

  const [id, setId] = useState(null);
  const [title, setTitle] = useState({});
  const [works, setWorks] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setId(data?._id);
    setTitle(data?.title);
    setWorks(data?.works);
    setLoading(false);
  }, [data]);

  const handleDelete = async (e, workid) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const res = await axios.delete(
        `/api/portfolioscreen/${id}/work/${workid}`,
        config
      );
      if (res.data.status === "success") {
        setLoading(false);
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorList = errors;
    if (!title.ru || !title.en) {
      errorList.title = "Заполните поле на обоих языках!";
    } else errorList.title = undefined;
    setErrors({ ...errors, errorList });
    if (getObjLentgh(errorList) === 0) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const res = await axios.put(
          `/api/portfolioscreen/${id}`,
          { title },
          config
        );
        if (res.data.status === "success") {
          setLoading(false);
          // window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <MainbarContentWrapper className="portfolioscreen">
      <h4 className="greeting">
        <span>Блок "услуги"</span>
        <LangSwitch lang={lang} setLang={setLang} />
      </h4>
      <Form
        classname="portfolioscreen"
        disabled={loading}
        onSubmit={handleSubmit}
        submitLabel="Сохранить изменения"
        submitHidden={isAdding || isEditing}
      >
        {!isAdding && !isEditing && (
          <InputField
            classname={
              errors?.title ? "screen-title has-error" : "screen-title"
            }
            label={`Заголовок блока (${lang})`}
            type="text"
            value={title?.[lang]}
            onChange={(e) => setTitle({ ...title, [lang]: e.target.value })}
          />
        )}
        {!isAdding && errors?.title && (
          <p className="text-danger">{errors?.title}</p>
        )}
        <div className="points works">
          <div
            className="point table"
            style={
              isAdding || isEditing
                ? { width: "0", padding: "0", height: "0" }
                : { width: "100%" }
            }
          >
            <h5>Работы</h5>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "40px" }}>#</th>
                  <th>Название работы ({lang})</th>
                  <th style={{ width: "80px" }}>Год</th>
                  <th style={{ width: "200px" }}>Изображение</th>
                  <th style={{ width: "200px" }}>
                    <button
                      className="btn add"
                      onClick={() => {
                        setIsAdding(true);
                        setIsEditing(false);
                        setEditingWork(null);
                      }}
                    >
                      <RiFileAddLine className="icon" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {works?.map((w, n) => {
                  const { work_title, year, img } = w;
                  return (
                    <tr key={`work-row-${n + 1}`}>
                      <td>{n + 1}</td>
                      <td>{work_title[lang]}</td>
                      <td>{year}</td>
                      <td>
                        <img src={img} alt="work-img" />
                      </td>
                      <td>
                        <button
                          className="btn edit"
                          onClick={() => {
                            setEditingWork(w);
                            setIsEditing(true);
                          }}
                        >
                          <RiFileEditLine className="icon" />
                        </button>
                        <button
                          className="btn delete"
                          onClick={(e) => {
                            handleDelete(e, w._id);
                          }}
                        >
                          <TiDocumentDelete className="icon" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <NewWork
            isAdding={isAdding}
            lang={lang}
            setIsAdding={setIsAdding}
            loading={loading}
            setLoading={setLoading}
            id={id}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editingWork={editingWork}
            setEditingWork={setEditingWork}
          />
        </div>
      </Form>
    </MainbarContentWrapper>
  );
};

const NewWork = ({
  isAdding,
  setIsAdding,
  lang,
  loading,
  setLoading,
  id,
  isEditing,
  setIsEditing,
  editingWork,
  setEditingWork,
}) => {
  const [newWorkTitle, setNewWorkTitle] = useState({});
  const [newWorkYear, setNewWorkYear] = useState("");
  const [newWorkImg, setNewWorkImg] = useState(null);
  const [newWorkImgTempUrl, setNewWorkImgTempUrl] = useState(null);
  const [editingWorkOldImg, setEditingWorkOldImg] = useState(null);

  const [newWorkErrors, setNewWorkErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      setNewWorkTitle(editingWork.work_title);
      setNewWorkYear(editingWork.year);
      setEditingWorkOldImg(editingWork.img);
    }
  }, [isEditing, editingWork]);

  const handleImageUpload = (e) => {
    const validate = validateImgs(e.target.files[0]);
    if (!e.target.files[0] && isAdding) {
      setNewWorkErrors({
        ...newWorkErrors,
        newWorkImg: "Загрузите изображение!",
      });
    } else {
      if (validate.valid) {
        setNewWorkImg(e.target.files[0]);
        setNewWorkImgTempUrl(URL.createObjectURL(e.target.files[0]));
        setNewWorkErrors({ ...newWorkErrors, newWorkImg: undefined });
      } else {
        setNewWorkImg(null);
        setNewWorkImgTempUrl(null);
        setNewWorkErrors({ ...newWorkErrors, newWorkImg: validate.msg });
      }
    }
  };

  const handleSave = async () => {
    let errorList = newWorkErrors;
    if (!newWorkTitle.ru || !newWorkTitle.en) {
      errorList.title = "Заполните поле на обоих языках!";
    } else errorList.title = undefined;
    if (!newWorkYear) {
      errorList.year = "Заполните поле!";
    } else errorList.year = undefined;
    if (!newWorkImg && !isEditing) {
      errorList.newWorkImg = "Загрузите изображение!";
    } else {
      errorList.newWorkImg = undefined;
    }
    setNewWorkErrors({ ...newWorkErrors, ...errorList });
    const editing_work_id = editingWork?._id || null;
    const oldImg = editingWork?.img || null;
    if (getObjLentgh(errorList) === 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append("work_title", JSON.stringify(newWorkTitle));
      formData.append("year", newWorkYear);
      formData.append("img", newWorkImg);
      formData.append("oldImg", oldImg);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const res = await axios.put(
          `/api/portfolioscreen/${id}/work/${editing_work_id}`,
          formData,
          config
        );
        if (res.status === "success") {
          setLoading(false);
          // window.location.reload();
        }
      } catch (error) {
        console.error(error.response);
      }
    }
  };

  const handleClear = () => {
    setNewWorkTitle({});
    setNewWorkYear("");
    setNewWorkImg(null);
    setNewWorkImgTempUrl(null);
    setNewWorkErrors({});
  };

  const handleBack = () => {
    handleClear();
    setIsAdding(false);
    setIsEditing(false);
    setEditingWork(null);
    setEditingWorkOldImg(null);
  };

  return (
    <div
      className="point new"
      style={isAdding || isEditing ? { width: "100%" } : { width: "0" }}
    >
      <h5>{isEditing ? "Редактировать работу" : "Новая работа"}</h5>
      <InputField
        label={`Название работы (${lang})`}
        classname={
          newWorkErrors?.title ? "new-work-title has-error" : "new-work-title"
        }
        type="text"
        value={newWorkTitle[lang]}
        onChange={(e) =>
          setNewWorkTitle({ ...newWorkTitle, [lang]: e.target.value })
        }
      />
      {newWorkErrors?.title && (
        <p className="text-danger">{newWorkErrors.title}</p>
      )}
      <InputField
        label="Год работы"
        classname={
          newWorkErrors?.year ? "new-work-year has-error" : "new-work-year"
        }
        type="text"
        value={newWorkYear}
        onChange={(e) => setNewWorkYear(e.target.value)}
      />
      {newWorkErrors?.year && (
        <p className="text-danger">{newWorkErrors.year}</p>
      )}
      <FileUploadField
        classname={
          newWorkErrors?.newWorkImg ? "new-work-img has-error" : "new-work-img"
        }
        name="new-work-img"
        label="Изображение работы"
        onChange={handleImageUpload}
      />
      <IconImgSwapShow
        oldImg={editingWorkOldImg}
        type="img"
        newImg={newWorkImgTempUrl}
      />
      {newWorkErrors?.newWorkImg && (
        <p className="text-danger">{newWorkErrors.newWorkImg}</p>
      )}
      <div className="control">
        <button className="btn save" onClick={handleSave} disabled={loading}>
          {isEditing ? "Сохранить изменения" : "Добавить работу"}
        </button>
        <button className="btn clear" onClick={handleClear} disabled={loading}>
          Очистить
        </button>
        <button className="btn back" onClick={handleBack} disabled={loading}>
          {"<"} Назад
        </button>
      </div>
    </div>
  );
};

export default Portfolioscreen;
