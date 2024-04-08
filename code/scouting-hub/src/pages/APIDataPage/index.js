import "./index.css";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";

function APIDataPage() {
  const [matchScores, setMatchScores] = useState([]);
  const [eventCodes, setEventCodes] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [year, setYear] = useState("2022");
  const [district, setDistrict] = useState("FIM");
  const [eventCode, setEventCode] = useState("MIGUL");
  const [tournamentLevel, setTournamentLevel] = useState("Qualification");

  const [errorSchedule, setErrorSchedule] = useState(null);
  const [errorMatch, setErrorMatch] = useState(null);
  const [errorScore, setErrorScore] = useState(null);

  const districtCodes = [
    { code: "FIM", name: "FIRST in Michigan" },
    { code: "FIN", name: "FIRST Indiana Robotics" },
    { code: "FMA", name: "FIRST Mid-Atlantic" },
    { code: "PCH", name: "Peachtree" },
    { code: "FNC", name: "FIRST North Carolina" },
    { code: "FIT", name: "FIRST in Texas" },
    { code: "ISR", name: "FIRST Indiana Robotics" },
    { code: "NE", name: "New England" },
    { code: "ONT", name: "Ontario" },
    { code: "PNW", name: "Pacific Northwest" },
    { code: "CHS", name: "FIRST Chesapeake" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://frc-api.firstinspires.org/v3.0/${year}/scores/${eventCode}/${tournamentLevel}`;
      const scores = await window.api.get(url);
      setMatchScores(scores.MatchScores);
    } catch (err) {
      console.log(err.message);
    }

    try {
      const url = `https://frc-api.firstinspires.org/v3.0/${year}/schedule/${eventCode}?tournamentLevel=${tournamentLevel}`;
      const response = await window.api.get(url);
      setSchedule(response.Schedule);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getEvents = async (e) => {
    e.preventDefault();
    try {
      const url = `https://frc-api.firstinspires.org/v3.0/${year}/events?districtCode=${district}`;
      const response = await window.api.get(url);
      setEventCodes(response.Events);
      setErrorSchedule(null);
    } catch (err) {
      setErrorSchedule(err.message);
      console.log(err);
    }
  };

  const saveMatches = async (e) => {
    e.preventDefault();
    const matches = schedule.map((match) => {
      const data = {
        year,
        district,
        event_code: eventCode,
        tournament_level: tournamentLevel,
        match_number: match.matchNumber,
        red1: match.teams[0].teamNumber,
        red2: match.teams[1].teamNumber,
        red3: match.teams[2].teamNumber,
        blue1: match.teams[3].teamNumber,
        blue2: match.teams[4].teamNumber,
        blue3: match.teams[5].teamNumber,
      };

      return data;
    });
    matches.forEach((match) => window.database.insertMatch(match));
  };

  return (
    <div className="page">
      <Navbar />
      <div>
        <div className="page-title">
          <h2>API Data</h2>
        </div>

        <div className="api-container">
          <div className="api-title">
            <p>
              <b>Schedule</b>
            </p>
          </div>
          <div className="api-context">
            <p>
              <b>Instructions: </b>Select year and district to look up district
              schedule.
            </p>
          </div>
          <form className="api-context" onSubmit={getEvents}>
            <div>
              <div className="space-between">
                <label htmlFor="apiRequestYear">Year: </label>
                <input
                  type="text"
                  id="apiRequestYear"
                  name="apiRequestYear"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  style={{ textAlign: "right", width: "10ch" }}
                />
              </div>
              <div className="space-between">
                <label htmlFor="district">District: </label>
                <select
                  id="district"
                  name="DISTRICT"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  {districtCodes.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name} [{district.code}]
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button className="button--orange" type="submit">
                Get Events Schedule
              </button>
            </div>
          </form>
          <div className="api-footer">
            <p className="error-message">{errorSchedule || " "}</p>
          </div>
        </div>

        <div className="api-container">
          <div className="api-title">
            <p>
              <b>Event Codes</b>
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
              {eventCodes?.map((code) => {
                const dateString = code.dateStart;
                const date = new Date(dateString);
                return (
                  <div key={code.code}>
                    {code.code} - {date.getMonth() + 1}/{date.getDate()} -{" "}
                    {code.city}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="api-container">
          <div className="api-title">
            <p>
              <b>Event</b>
            </p>
          </div>
          <div className="api-context">
            <p>
              <b>Instructions: </b>Select Event and Level to pull data from API.
            </p>
          </div>
          <form className="api-context" onSubmit={handleSubmit}>
            <div>
              <div className="space-between">
                <label htmlFor="event-code">Selected Event Code: </label>
                <select
                  id="event-code"
                  name="CURRENT_EVENT_CODE"
                  value={eventCode}
                  onChange={(e) => setEventCode(e.target.value)}
                >
                  {eventCodes.map((event) => (
                    <option key={event.code} value={event.code}>
                      {event.code}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-between">
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
            <button className="button--orange" type="submit">
              Get Match Results
            </button>
          </form>
          <div className="api-footer">
            <p className="error-message">{errorMatch || " "}</p>
          </div>
        </div>

        <div className="api-container">
          <div className="api-title">
            <p>
              <b>Scores</b>
            </p>
          </div>
          <div className="api-context">
            <div>
              <div>
                <p>
                  <b>Instructions: </b>Saving scores will override data in that
                  event in the database.
                </p>
              </div>
              <div className="inline">
                <label htmlFor="internet"># of Matches:</label>
                <div id="internet" className="span--white">
                  {matchScores.length}
                </div>
              </div>
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
                {matchScores.map((element, index) => {
                  //const headers = Object.keys(element.alliances[0]);
                  return (
                    <div key={element.matchNumber}>
                      <h4>
                        Match Number: {element.matchNumber} Level:{" "}
                        {element.matchLevel}
                      </h4>
                      <div style={{ color: "red" }}>
                        <span>Red: </span>
                        <span>[{schedule[index]?.teams[0].teamNumber}]</span>
                        <span>[{schedule[index]?.teams[1].teamNumber}]</span>
                        <span>[{schedule[index]?.teams[2].teamNumber}]</span>
                      </div>
                      <div style={{ color: "blue" }}>
                        <span>Blue: </span>
                        <span>[{schedule[index]?.teams[3].teamNumber}]</span>
                        <span>[{schedule[index]?.teams[4].teamNumber}]</span>
                        <span>[{schedule[index]?.teams[5].teamNumber}]</span>
                      </div>
                    </div>
                  );
                })}
              </div>
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
            <button className="button--orange" onClick={saveMatches}>
              Save
            </button>
          </div>
          <div className="api-footer">
            <p className="error-message">{errorScore || " "}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default APIDataPage;
