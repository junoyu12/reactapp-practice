import React from "react";
import pdfToText from "react-pdftotext";

const FileUploader = ({ title, onFileUpload }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    pdfToText(file)
      .then((text) => {
        console.log(text);
        onFileUpload(text);
      })
      .catch((error) => console.error("failed to extract text from pdf"));
  };

  return (
    <div>
      <p>{title}</p>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploader;
