import "./index.css";
import React, { useState, useEffect } from "react";

//fake data

const fakeDefaultMatchInfo = {
  matchCode: "",
  teamNumber: "",
  matchNumber: "",
};

const fakeMatchCodes = [
  "Qualification 1",
  "Qualification 2",
  "Qualification 3",
];
const fakeTeams = ["5535", "6152", "3333", "3538", "7220", "6666", "4381"];
const fakeMatches = ["1", "22", "3", "4", "5", "6", "45"];

//fake data

function MatchSelectionForm({ setRedAlliance, setBlueAlliance }) {
  const [matchInfo, setMatchInfo] = useState(fakeDefaultMatchInfo);
  const [matchCodes, setMatchCodes] = useState(fakeMatchCodes);
  const [teams, setTeams] = useState(fakeTeams);
  const [matchNumbers, setMatchNumbers] = useState(fakeMatches);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    //todo: on component load
    //todo: get teams that are in database, matchCodes, matchNumbers
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMatchInfo({
      ...matchInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(matchInfo);
    if (
      matchInfo.matchCode === "" &&
      (matchInfo.teamNumber === "" || matchInfo.matchNumber === "")
      //todo: add for all values true to prevent bad searches
    ) {
      setErrorMessage(
        "Please select a <Match Code> or select a <Team Number> and <Match Number>"
      );
      setRedAlliance([]);
      setBlueAlliance([]);
    } else {
      setErrorMessage("");
      setRedAlliance(["4779", "2054", "5675"]);
      setBlueAlliance(["3539", "3534", "5436"]);
    }
    //find match schedule in DB , if error don't set team.
    //print error if team not found, or non valid form submit
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Report Selection</h2>
      <div>
        <span>
          <label htmlFor="match-code">Match Code</label>
          <select
            name="matchCode"
            id="match-code"
            value={matchInfo.matchCode}
            onChange={handleInputChange}
          >
            <option key="blank" value="">
              -- Select a Code --
            </option>
            {matchCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </span>
        <span>or</span>
      </div>
      <div>
        <span>
          <label htmlFor="team-number">Team Number</label>
          <select
            name="teamNumber"
            id="team-number"
            value={matchInfo.teamNumber}
            onChange={handleInputChange}
          >
            <option key="blank" value="">
              -- Select a Team --
            </option>
            {teams.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </span>
        <span>and</span>
        <span>
          <label htmlFor="match-number">Match Number</label>
          <select
            name="matchNumber"
            id="match-number"
            value={matchInfo.matchNumber}
            onChange={handleInputChange}
          >
            <option key="blank" value="">
              -- Select a Match --
            </option>
            {matchNumbers.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </span>
      </div>
      <div>
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          <p></p>
        )}
      </div>
      <div className="action-button-container">
        <button type="submit">Find Match</button>
      </div>
    </form>
  );
}

export default MatchSelectionForm;
