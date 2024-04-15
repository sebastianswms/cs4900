import "./index.css";
import React, { useState, useEffect } from "react";

function MatchSelectionForm({
  setRedAlliance,
  setBlueAlliance,
  setLayout,
  setMatch,
  setEvent,
}) {
  const [year, setYear] = useState("");
  const [district, setDistrict] = useState("");
  const [eventCode, setEventCode] = useState("");
  const [matchNumber, setMatchNumber] = useState("");
  const [tournamentLevel, setTournamentLevel] = useState("Qualification");
  const [layoutID, setLayoutID] = useState(null);

  const [matchNumbers, setMatchNumbers] = useState([]);
  const [error, setError] = useState("");

  const getTeams = async (e) => {
    e.preventDefault();
    if (matchNumber === "" || tournamentLevel === "") {
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

  const fetchSettings = async () => {
    try {
      const settings = await window.envConfig.readConfig();
      setError(undefined);
      setYear(settings.CURRENT_YEAR);
      setDistrict(settings.DISTRICT);
      setEventCode(settings.CURRENT_EVENT_CODE);
      setEvent(settings.CURRENT_EVENT_CODE.toLowerCase());
      setLayoutID(settings.LAYOUT_ID);
    } catch (err) {
      setError(err.message);
    }
  };

  const getMatchNumbers = async (year, eventCode, tournamentLevel) => {
    function compareNumbers(a, b) {
      return Number(a) - Number(b);
    }
    try {
      const results = await window.database.findAllDistinctValues(
        "matches",
        "match_number",
        { year: year, event_code: eventCode, tournament_level: tournamentLevel }
      );
      if (results.length === 0) {
        setError("No matches found in Database");
        setMatchNumbers([]);
        return;
      }
      setError(undefined);
      setMatchNumbers(results.sort(compareNumbers));
    } catch (err) {
      setError(err.message);
    }
  };

  const getLayout = async (id) => {
    try {
      const results = await window.database.findByObject("layouts", {
        id,
      });
      if (results === undefined) {
        setError("Layout was not found in Database");
        setLayout(null);
        return;
      }
      const layout = await parseSpecificValues(results, [
        "id",
        "name",
        "year",
        "eventCode",
        "teamNumber",
        "teamName",
      ]);
      setLayout({ ...layout });
      setError(undefined);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    setMatch(matchNumber);
  }, [matchNumber]);

  useEffect(() => {
    if (year === "" || eventCode === "" || tournamentLevel === "") {
      setError("Invalid match configuration data!!!");
      return;
    }
    setError(undefined);
    setMatchNumber("");
    getMatchNumbers(year, eventCode, tournamentLevel);
  }, [year, eventCode, tournamentLevel]);

  useEffect(() => {
    if (layoutID === null || layoutID === "") {
      setError("Invalid layout configuration data!!!");
      return;
    }
    setError(undefined);
    getLayout(layoutID);
  }, [layoutID]);

  return (
    <form className="form-container" onSubmit={getTeams}>
      <div className="form-title">
        <h3>Match</h3>
      </div>
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
