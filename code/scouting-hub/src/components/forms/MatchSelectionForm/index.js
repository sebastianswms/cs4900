import "./index.css";
import React, { useState, useEffect } from "react";

function MatchSelectionForm({ setRedAlliance, setBlueAlliance }) {
  const [year, setYear] = useState("");
  const [district, setDistrict] = useState("");
  const [eventCode, setEventCode] = useState("");
  const [matchNumber, setMatchNumber] = useState("");
  const [tournamentLevel, setTournamentLevel] = useState("Qualification");

  const [matchNumbers, setMatchNumbers] = useState([]);
  const [error, setError] = useState("");

  const getTeams = async (e) => {
    e.preventDefault();
    if (matchNumber === "" || tournamentLevel === "") {
      //todo: add for all values true to prevent bad searches
      setError("Please select a <Match Number> and <Tournament Level>");
      setRedAlliance([]);
      setBlueAlliance([]);
    } else {
      setError(null);
      try {
        const results = await window.database.findByObject("matches", {
          year,
          district,
          event_code: eventCode,
          tournament_level: tournamentLevel,
          match_number: matchNumber,
        });
        setRedAlliance([results.red1, results.red2, results.red3]);
        setBlueAlliance([results.blue1, results.blue2, results.blue3]);
      } catch (err) {
        setError(err);
        setRedAlliance([]);
        setBlueAlliance([]);
      }
    }
    //find match schedule in DB , if error don't set team.
    //print error if team not found, or non valid form submit
  };

  const fetchSettings = async () => {
    try {
      const settings = await window.envConfig.readConfig();
      setError(undefined);
      setYear(settings.CURRENT_YEAR);
      setDistrict(settings.DISTRICT);
      setEventCode(settings.CURRENT_EVENT_CODE);
    } catch (err) {
      setError(err.message);
    }
  };

  const getMatchNumbers = async () => {
    try {
      const results = await window.database.findAllDistinct(
        "matches",
        "match_number"
      );

      setError(undefined);
      setMatchNumbers(results);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSettings();
    getMatchNumbers();
  }, []);

  return (
    <form className="form-container" onSubmit={getTeams}>
      <div className="form-title">
        <h3>Report Selection</h3>
      </div>
      <form onSubmit={getTeams}></form>
      <div className="form-context">
        <div>
          <div className="inline">
            <label htmlFor="year">Year:</label>
            <div id="year" className="span--white">
              {year}
            </div>
            <label htmlFor="district">District:</label>
            <div id="district" className="span--white">
              {district}
            </div>
            <label htmlFor="event-code">Event Code:</label>
            <div id="event-code" className="span--white">
              {eventCode}
            </div>
          </div>
          <div className="inline">
            <label htmlFor="match-number">Match Number:</label>
            <select
              name="matchNumber"
              id="match-number"
              value={matchNumber}
              onChange={(e) => setMatchNumber(e.target.value)}
            >
              <option key="blank" value="">
                Select
              </option>
              {matchNumbers.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <label htmlFor="tournament-level">Tournament Level: </label>
            <select
              id="tournament-level"
              name="tournamentLevel"
              value={tournamentLevel}
              onChange={(e) => setTournamentLevel(e.target.value)}
            >
              {/* <option key="none" value="none">
                None
              </option>
              <option key="Practice" value="Practice">
                Practice
              </option> */}
              <option key="Qualification" value="Qualification">
                Qualification
              </option>
              <option key="Playoff" value="Playoff">
                Playoff
              </option>
            </select>
          </div>
        </div>
        <div>
          <button className="button--orange" type="submit">
            Find Match
          </button>
        </div>
      </div>
      <div className="form-footer">
        <p className="error-message">
          <b>{error || " "}</b>
        </p>
      </div>
    </form>
  );
}

export default MatchSelectionForm;
