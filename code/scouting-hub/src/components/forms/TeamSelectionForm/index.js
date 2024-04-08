import "./index.css";
import React from "react";

function TeamSelectionForm({ name, teams, setAlliance, color }) {
  //todo: add functionality to pull team names
  //todo: add functionality to edit teams
  return (
    <form
      className="team-selection-form-container"
      style={{ backgroundColor: color }}
    >
      <h2>{name}</h2>
      <div className="station-div">Station #1: {teams[0]}</div>
      <div className="station-div">Station #2: {teams[1]}</div>
      <div className="station-div">Station #3: {teams[2]}</div>
    </form>
  );
}

export default TeamSelectionForm;
