import "./index.css";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import CategoryLayoutForm from "../../components/forms/CategoryLayoutForm";

export default function CSVDataPage() {
  const [filePath, setFilePath] = useState("");
  const [fileHeaders, setFileHeaders] = useState([]);
  const [fileRows, setFileRows] = useState([]);
  const [layouts, setLayouts] = useState([]);
  const [id, setID] = useState(-1);
  const [layoutName, setLayoutName] = useState("");
  const [year, setYear] = useState("");
  const [eventCode, setEventCode] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamNumber, setTeamNumber] = useState("");
  const [categories, setCategories] = useState(["", "", "", "", ""]);
  const [subCategories0, setSubCategories0] = useState([""]);
  const [subCategories1, setSubCategories1] = useState([""]);
  const [subCategories2, setSubCategories2] = useState([""]);
  const [subCategories3, setSubCategories3] = useState([""]);
  const [subCategories4, setSubCategories4] = useState([""]);
  const [headers0, setHeaders0] = useState([""]);
  const [headers1, setHeaders1] = useState([""]);
  const [headers2, setHeaders2] = useState([""]);
  const [headers3, setHeaders3] = useState([""]);
  const [headers4, setHeaders4] = useState([""]);

  const [teamData, setTeamData] = useState([]);

  const [error, setError] = useState(null);

  const hasEmptyStrings = (array) => array.some((item) => item === "");

  const stringifySpecificValues = async (obj, keys) => {
    const result = {};
    for (const property in obj) {
      if (!keys.includes(property)) {
        result[property] = JSON.stringify(obj[property]);
      } else {
        result[property] = obj[property];
      }
    }
    return result;
  };

  const parseSpecificValues = async (obj, keys) => {
    const result = {};
    for (const property in obj) {
      if (!keys.includes(property)) {
        result[property] = JSON.parse(obj[property]);
      } else {
        result[property] = obj[property];
      }
    }
    return result;
  };

  const isValidSubmission = () => {
    const hasInputEmpty = hasEmptyStrings([
      layoutName,
      year,
      eventCode,
      teamName,
      teamNumber,
    ]);
    const listValues = [
      categories,
      subCategories0,
      subCategories1,
      subCategories2,
      subCategories3,
      subCategories4,
      headers0,
      headers1,
      headers2,
      headers3,
      headers4,
    ];
    const hasListEmpty = listValues.map((arr) => hasEmptyStrings(arr));
    const isValid = !hasInputEmpty && !hasListEmpty.includes(true);
    return isValid;
  };

  const openFile = async () => {
    const response = await window.csv.loadFile();
    setFilePath(response);
    setError(undefined);
  };

  const readFile = async () => {
    if (filePath === "") {
      setError("Please select a file!!!");
      return;
    }
    setError(undefined);
    const result = await window.csv.readHeader(filePath);
    setFileHeaders(result);
    const data = await window.csv.readRows(filePath);
    setFileRows(data);
  };

  const fetchLayouts = async () => {
    try {
      const results = await window.database.readAllRows("layouts");
      setLayouts(results);
      setError(undefined);
    } catch (err) {
      setError(err.message);
    }
  };

  // const fetchSettings = async () => {
  //   try {
  //     const results = await window.envConfig.readConfig();
  //     console.log(results);
  //     setError(undefined);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const saveLayout = async () => {
    if (!isValidSubmission()) {
      setError((prev) => "Form has empty data!!!");
      return;
    }
    setError(undefined);
    const index = layouts.findIndex((layout) => layout.name === layoutName);
    const layout = await stringifySpecificValues(
      {
        id,
        name: layoutName,
        year,
        eventCode,
        teamNumber,
        teamName,
        categories,
        subCategories0,
        headers0,
        subCategories1,
        headers1,
        subCategories2,
        headers2,
        subCategories3,
        headers3,
        subCategories4,
        headers4,
      },
      ["id", "name", "year", "eventCode", "teamNumber", "teamName"]
    );
    const rowID = await window.database.saveLayout(layout);
    layout.id = rowID;

    if (index !== -1) {
      setLayouts((prev) => {
        prev[index] = { ...layout };
        return prev;
      });
      setID(rowID);
    } else {
      setLayouts((prev) => [...prev, layout]);
      setID(rowID);
    }
  };

  const loadLayout = async (name) => {
    if (name === "") {
      setError("Please select a layout!!!");
      return;
    }
    const index = layouts.findIndex((item) => item.name === name);
    const layout = await parseSpecificValues(layouts[index], [
      "id",
      "name",
      "year",
      "eventCode",
      "teamNumber",
      "teamName",
    ]);
    setID(layout.id);
    setLayoutName(layout.name);
    setYear(layout.year);
    setEventCode(layout.eventCode);
    setTeamNumber(layout.teamNumber);
    setTeamName(layout.teamName);
    setCategories(layout.categories);
    setSubCategories0(layout.subCategories0);
    setSubCategories1(layout.subCategories1);
    setSubCategories2(layout.subCategories2);
    setSubCategories3(layout.subCategories3);
    setSubCategories4(layout.subCategories4);
    setHeaders0(layout.headers0);
    setHeaders1(layout.headers1);
    setHeaders2(layout.headers2);
    setHeaders3(layout.headers3);
    setHeaders4(layout.headers4);
  };

  const resetLayout = async () => {
    setError(undefined);
    setID(-1);
    setLayoutName("");
    setYear("");
    setEventCode("");
    setTeamNumber("");
    setTeamName("");
    setCategories(["", "", "", "", ""]);
    setSubCategories0([""]);
    setSubCategories1([""]);
    setSubCategories2([""]);
    setSubCategories3([""]);
    setSubCategories4([""]);
    setHeaders0([""]);
    setHeaders1([""]);
    setHeaders2([""]);
    setHeaders3([""]);
    setHeaders4([""]);
  };

  const parseData = async () => {
    const parsedData = fileRows.map((row) => {
      const data = {
        teamNumber: row[teamNumber],
        teamName: row[teamName],
        layoutID: id,
        eventCode: row[eventCode].slice(4),
        year: year,
        data0: headers0.map((h) => row[h]),
        data1: headers1.map((h) => row[h]),
        data2: headers2.map((h) => row[h]),
        data3: headers3.map((h) => row[h]),
        data4: headers4.map((h) => row[h]),
      };

      return data;
    });
    setTeamData(parsedData);
  };

  const saveData = async () => {
    const scores = teamData.map((score) => {
      const data = {
        teamNumber: score.teamNumber,
        teamName: score.teamName,
        layoutID: score.layoutID,
        eventCode: score.eventCode,
        year: score.year,
        data0: JSON.stringify(score.data0),
        data1: JSON.stringify(score.data1),
        data2: JSON.stringify(score.data2),
        data3: JSON.stringify(score.data3),
        data4: JSON.stringify(score.data4),
      };
      return data;
    });
    scores.forEach((score) => window.database.upsertOne("scores", score));
  };

  useEffect(() => {
    fetchLayouts();
  }, []);

  return (
    <div className="page">
      <Navbar />
      <div>
        <div className="page-title">
          <h2>CSV Data</h2>
        </div>

        <div className="api-container">
          <div className="api-title">
            <p>
              <b>File</b>
            </p>
          </div>
          <div className="api-context">
            <div>
              <p>
                <b>Instructions: </b>Choose a file then read the file.
              </p>
              <button onClick={openFile}>Choose File</button>
              <p>
                <b>Path:</b>
              </p>
              <p>{filePath}</p>
            </div>
          </div>
          <div
            className="api-context"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "0.5em",
            }}
          >
            <button className="button--orange" onClick={readFile}>
              Read File
            </button>
          </div>
          <div className="api-footer">
            <p className="error-message">{error || " "}</p>
          </div>
        </div>

        <div className="api-container">
          <div className="api-title">
            <p>
              <b>CVS File Headers</b>
            </p>
          </div>
          <div className="api-context">
            <div
              style={{
                maxWidth: "350px",
                width: "100%",
                height: "100px",
                overflowY: "scroll",
                margin: "1em 0em",
                padding: "0em 0.5em",
                border: "1px solid black",
                backgroundColor: "whiteSmoke",
              }}
            >
              <ul>
                {fileHeaders.map((header, index) => (
                  <li key={index}>{header}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="api-container">
          <div className="api-title" style={{ backgroundColor: "#ed892c" }}>
            <p>
              <b>Select Layout</b>
            </p>
          </div>
          <div className="api-context">
            <div>
              <div className="space-between">
                <label htmlFor="layouts">Name: </label>
                <select
                  id="layouts"
                  name="layouts"
                  value={layoutName}
                  onChange={(e) => loadLayout(e.target.value)}
                >
                  <option value="">-- select layout --</option>
                  {layouts.map((layout, index) => (
                    <option key={layout.name} value={layout.name}>
                      {layout.name}
                    </option>
                  ))}
                </select>
                {/* TODO: add delete function for layout
          TODO: add find and delete data since the name might stay the same but the data might be different
          <button onClick={deleteLayout}>Delete</button> */}
              </div>
            </div>
          </div>
          <div className="api-footer">
            {/* TODO: add errors for this section */}
            <p className="error-message">{error || " "}</p>
          </div>
        </div>

        <div className="api-container">
          <div className="api-title">
            <p>
              <b>Layout Settings</b>
            </p>
          </div>
          <div className="api-context">
            <div>
              <div className="space-between">
                <label htmlFor="layout-name">Name: </label>
                <input
                  type="text"
                  id="layout-name"
                  name="layout-name"
                  value={layoutName}
                  onChange={(e) => setLayoutName(e.target.value)}
                />
              </div>
              <div className="space-between">
                <p>
                  <b>Key:</b>
                </p>
                <p> {id}</p>
              </div>
              <div className="space-between">
                <label htmlFor="year">Year: </label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              {/* this set the column to be read and the the value */}
              <div className="space-between">
                <label htmlFor="event-code">Event Code: </label>
                <select
                  id="event-code"
                  name="event-code"
                  value={eventCode}
                  onChange={(e) => setEventCode(e.target.value)}
                >
                  <option value="">-- select data --</option>
                  {fileHeaders.map((header) => (
                    <option key={header} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-between">
                <label htmlFor="team-number">Team Number: </label>
                <select
                  id="team-number"
                  name="team-number"
                  value={teamNumber}
                  onChange={(e) => setTeamNumber(e.target.value)}
                >
                  <option value="">-- select data --</option>
                  {fileHeaders.map((header) => (
                    <option key={header} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-between">
                <label htmlFor="team-name">Team Name: </label>
                <select
                  id="team-name"
                  name="team-name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                >
                  <option value="">-- select data --</option>
                  {fileHeaders.map((header) => (
                    <option key={header} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="api-footer">
            {/* TODO: add errors for this section */}
            <p className="error-message">{error || " "}</p>
          </div>
        </div>

        <div>
          <CategoryLayoutForm
            group={0}
            categories={categories}
            setCategories={setCategories}
            subCategories={subCategories0}
            setSubCategories={setSubCategories0}
            headers={fileHeaders}
            data={headers0}
            setData={setHeaders0}
          />
          <CategoryLayoutForm
            group={1}
            categories={categories}
            setCategories={setCategories}
            subCategories={subCategories1}
            setSubCategories={setSubCategories1}
            headers={fileHeaders}
            data={headers1}
            setData={setHeaders1}
          />
          <CategoryLayoutForm
            group={2}
            categories={categories}
            setCategories={setCategories}
            subCategories={subCategories2}
            setSubCategories={setSubCategories2}
            headers={fileHeaders}
            data={headers2}
            setData={setHeaders2}
          />
          <CategoryLayoutForm
            group={3}
            categories={categories}
            setCategories={setCategories}
            subCategories={subCategories3}
            setSubCategories={setSubCategories3}
            headers={fileHeaders}
            data={headers3}
            setData={setHeaders3}
          />
          <CategoryLayoutForm
            group={4}
            categories={categories}
            setCategories={setCategories}
            subCategories={subCategories4}
            setSubCategories={setSubCategories4}
            headers={fileHeaders}
            data={headers4}
            setData={setHeaders4}
          />
        </div>

        <div className="api-container">
          <div className="api-title">
            <p>
              <b>Process Layout</b>
            </p>
          </div>
          <div className="api-context">
            <div style={{ display: "flex", gap: "1em" }}>
              <button className="button--orange" onClick={resetLayout}>
                Reset Layout
              </button>
              <button className="button--orange" onClick={saveLayout}>
                Save Layout
              </button>
            </div>
          </div>
          <div className="api-footer">
            {/* TODO: add errors for this section */}
            <p className="error-message">{error || " "}</p>
          </div>
        </div>

        <div className="api-container">
          <div className="api-title">
            <p>
              <b>Prase Data</b>
            </p>
          </div>
          <div className="api-context">
            <div style={{ display: "flex", gap: "1em" }}>
              <button className="button--orange" onClick={parseData}>
                Parse Data
              </button>
              <button className="button--orange" onClick={saveData}>
                Save to Database
              </button>
            </div>
          </div>
          <div className="api-footer">
            {/* TODO: add errors for this section */}
            <p className="error-message">{error || " "}</p>
          </div>
        </div>

        <div className="api-container">
          <div className="api-title">
            <p>
              <b>Scoring data</b>
            </p>
          </div>
          <div className="api-context">
            <div
              style={{
                maxWidth: "800px",
                width: "100%",
                height: "200px",
                overflowY: "scroll",
                margin: "1em 0em",
                padding: "0em 0.5em",
                border: "1px solid black",
                backgroundColor: "whiteSmoke",
              }}
            >
              {teamData.map((team, index) => {
                return (
                  <div key={index}>
                    <p>
                      {team.teamNumber} : {team.teamName} : {team.year} :{" "}
                      {team.eventCode} :
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="api-footer">
            {/* TODO: add errors for this section */}
            <p className="error-message">{error || " "}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
