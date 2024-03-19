import React from "react";

function TeamSelectionForm({ name, teams, setAlliance, color }) {
  //todo: add functionality to pull team names
  //todo: add functionality to edit teams
  return (
    <form
      className="form-container"
      style={{ backgroundColor: color, flexGrow: "1" }}
    >
      <h2>{name}</h2>
      <div>Station #1: {teams[0]}</div>
      <div>Station #2: {teams[1]}</div>
      <div>Station #3: {teams[2]}</div>
    </form>
  );
}

export default TeamSelectionForm;
