import React, { useState } from "react";
import Navbar from "../../components/Navbar";

export default function CSVDataPage() {
  const [filePath, setFilePath] = useState("");
  const [fileHeaders, setFileHeaders] = useState([]);

  const openFile = async () => {
    const response = await window.csv.loadFile();
    setFilePath(response);
  };

  const readHeader = async () => {
    const response = await window.csv.readHeader(filePath);
    setFileHeaders(response);
  };

  return (
    <div className="page">
      <Navbar />
      <div>
        <div className="page-title">
          <h2>CSV Data</h2>
        </div>
        <div>
          <button onClick={() => openFile()}>Choose File</button>
          <p>{filePath}</p>
        </div>
        <div>
          <button onClick={() => readHeader()}>Read headers</button>
          <ul>
            {fileHeaders.map((header, index) => {
              return <li key={index}>{header}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
