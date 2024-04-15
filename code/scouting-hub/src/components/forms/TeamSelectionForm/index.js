import "./index.css";
import React, { useState, useEffect } from "react";

function TeamSelectionForm({
  name,
  teams,
  setAlliance,
  color,
  id,
  setData,
  event,
}) {
  const [scores, setScores] = useState([{}, {}, {}]);

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
  const getScores = async (teams) => {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      try {
        const results = await window.database.findByObject("scores", {
          teamNumber: teams[i],
          layoutID: id,
          eventCode: event,
        });
        if (results === undefined) {
          return;
        }
        const score = await parseSpecificValues(results, [
          "id",
          "eventCode",
          "layoutID",
          "eventCode",
          "teamNumber",
          "teamName",
          "year",
        ]);
        arr.push(score);
      } catch (error) {}
    }
    setScores(arr);
    setData(arr);
  };

  useEffect(() => {
    getScores(teams);
  }, [teams]);

  return (
    <div
      className="team-selection-form-container"
      style={{ backgroundColor: color, flex: "1", width: "50%" }}
    >
      <h2>{name}</h2>
      <div className="station-div">
        Station #1: {teams[0] ? <b>[{teams[0]}]</b> : <></>}{" "}
        {scores[0].teamName}
      </div>
      <div className="station-div">
        Station #2: {teams[1] ? <b>[{teams[1]}]</b> : <></>}{" "}
        {scores[1].teamName}
      </div>
      <div className="station-div">
        Station #3: {teams[2] ? <b>[{teams[2]}]</b> : <></>}{" "}
        {scores[2].teamName}
      </div>
    </div>
  );
}

export default TeamSelectionForm;
