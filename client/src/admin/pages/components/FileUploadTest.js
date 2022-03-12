import React, { useState } from "react";
import axios from "axios";

const FileUploadTest = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("choose file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(
          parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total)
        );

        setTimeout(() => setUploadPercentage(0), 10000);
      },
    };
    try {
      const res = await axios.post("api/private/upload", formData, config);
      console.log(res);
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      console.log(uploadedFile);
      setMessage("fileUplodaded");
    } catch (error) {
      if (error.response.status === 500) {
        setMessage("there was a problem with the server");
      } else {
        setMessage(error.response.data.error);
      }
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {message && <p>{message}</p>}
      {uploadPercentage > 0 && <p>...loading {uploadPercentage}%</p>}
      <label htmlFor="file">{filename}</label>

      <input
        type="file"
        name="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setFilename(e.target.files[0].name);
        }}
      />
      <button type="submit">submit</button>
      {uploadedFile ? (
        <div>
          <label>{uploadedFile.fileName}</label>
          <img alt="img" src={uploadedFile.filePath} />
        </div>
      ) : undefined}
    </form>
  );
};

export default FileUploadTest;
