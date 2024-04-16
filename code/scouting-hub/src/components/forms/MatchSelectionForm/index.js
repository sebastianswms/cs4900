import "./index.css";
import React, { useState, useEffect } from "react";

function MatchSelectionForm({
  setRedAlliance,
  setBlueAlliance,
  layout,
  setLayout,
  setMatch,
  setEvent,
}) {
  //state need year, district, event code
  const [settings, setSettings] = useState(null);
  //user input state
  const [matchNumber, setMatchNumber] = useState("");
  const [tournamentLevel, setTournamentLevel] = useState("Qualification");
  const [layoutID, setLayoutID] = useState(null);
  //selector state
  const [matchNumbers, setMatchNumbers] = useState([]);
  const [layouts, setLayouts] = useState([]);

  const [error, setError] = useState("");

  const getTeams = async (e) => {
    if (
      matchNumber === "" ||
      tournamentLevel === "" ||
      layout?.name === undefined
    ) {
      setError("Please select a both <Match Number> and <Layout>");
      setRedAlliance([]);
      setBlueAlliance([]);
      setMatch("");
    } else {
      setError(null);
      try {
        const results = await window.database.findByObject("matches", {
          year: settings?.CURRENT_YEAR,
          district: settings?.DISTRICT,
          event_code: settings?.CURRENT_EVENT_CODE,
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

  const fetchLayouts = async () => {
    try {
      const results = await window.database.readAllRows("layouts");
      setLayouts(results);
      setError(undefined);
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
        {
          year: settings?.CURRENT_YEAR,
          event_code: settings?.CURRENT_EVENT_CODE,
          tournament_level: tournamentLevel,
        }
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

  const updateMatchNumber = async (match) => {
    setMatch(match);
    setMatchNumber(match);
  };

  const updateLayout = async (id) => {
    const result = layouts.find((object) => object["id"] === id);
    const layout = await parseSpecificValues(result, [
      "id",
      "name",
      "year",
      "eventCode",
      "teamNumber",
      "teamName",
    ]);
    setLayout(layout);
  };

  const fetchSettings = async () => {
    try {
      const settings = await window.envConfig.readConfig();
      setError(undefined);
      setSettings(settings);
      setEvent(settings.CURRENT_EVENT_CODE.toLowerCase());
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (
      settings?.CURRENT_YEAR === undefined ||
      settings?.CURRENT_EVENT_CODE === undefined ||
      tournamentLevel === ""
    ) {
      setError("Invalid match configuration data!!!");
      return;
    }
    setError(undefined);
    setMatchNumber("");
    getMatchNumbers(
      settings?.CURRENT_YEAR,
      settings?.CURRENT_EVENT_CODE,
      tournamentLevel
    );
  }, [settings?.CURRENT_YEAR, settings?.CURRENT_EVENT_CODE, tournamentLevel]);

  useEffect(() => {
    getTeams();
  }, [matchNumber, layout?.id]);

  useEffect(() => {
    fetchSettings();
    fetchLayouts();
  }, []);

  return (
    <form className="form-container">
      <div className="form-title">
        <h3>Match</h3>
      </div>
      <div className="form-context">
        <div>
          <div className="inline">
            <label htmlFor="year">Year:</label>
            <div id="year" className="span--white">
              {settings?.CURRENT_YEAR}
            </div>
            <label htmlFor="district">District:</label>
            <div id="district" className="span--white">
              {settings?.DISTRICT}
            </div>
            <label htmlFor="event-code">Event Code:</label>
            <div id="event-code" className="span--white">
              {settings?.CURRENT_EVENT_CODE}
            </div>
          </div>
          <div className="inline">
            <label htmlFor="match-number">Match Number:</label>
            <select
              name="matchNumber"
              id="match-number"
              value={matchNumber}
              onChange={(e) => updateMatchNumber(e.target.value)}
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
            <label htmlFor="layout">Layout: </label>
            <select
              name="layout"
              id="layout"
              value={layout?.id}
              onChange={(e) => updateLayout(e.target.value)}
            >
              <option key="blank" value="">
                Select
              </option>
              {layouts.map((layout) => (
                <option key={layout.name} value={layout?.id}>
                  {layout.name}
                </option>
              ))}
            </select>
            <label>LayoutID:</label>
            <div>{layout?.id}</div>
          </div>
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
