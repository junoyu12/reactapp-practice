import React from "react";

const FileUploader = ({ onFileUpload }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the first file from the FileList
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onFileUpload(event.target.result); // Call the parent handler with the file content
      };
      reader.readAsText(file); // Read the file as text
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploader;
