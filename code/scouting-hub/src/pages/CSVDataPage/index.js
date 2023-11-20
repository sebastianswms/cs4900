import React, { useState } from "react";
import Navbar from "../../components/Navbar";

export default function CSVDataPage() {
  const [myfile, setMyFile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(myfile);
  };
  return (
    <div>
      <Navbar />
      <h1>CSV Data</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="myFile"
          name="myFile"
          onChange={(e) => setMyFile(e.target.value)}
        ></input>
        <br />
        <button type="submit">Read CVS Data</button>
      </form>
      <p>{myfile}</p>
    </div>
  );
}
