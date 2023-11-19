import React, { useState } from "react";
import Navbar from "../../components/Navbar";

// temp values until configuration file is setup
const defaultYear = "2022";
const defaultEventCode = "migul";

function APIDataPage() {
  const [matchScores, setMatchScores] = useState([]);
  const [year, setYear] = useState(defaultYear);
  const [eventCode, setEventCode] = useState(defaultEventCode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://frc-api.firstinspires.org/v3.0/${year}/scores/${eventCode}/Qualification`;
      const scores = await window.api.get(url);
      setMatchScores(scores.MatchScores);
    } catch (err) {
      console.log(err.message);
    }

    try {
      const url = `https://frc-api.firstinspires.org/v3.0/${year}/schedule/${eventCode}?tournamentLevel=Qualification`;
      const schedule = await window.api.get(url);
      console.log(schedule);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <h1>API Data</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="apiRequestYear">Year: </label>
        <input
          type="text"
          id="apiRequestYear"
          name="apiRequestYear"
          value={defaultYear}
          onChange={(e) => setYear(e.target.value)}
        />
        <br />
        <label htmlFor="apiRequestEvent">Event Code: </label>
        <input
          type="text"
          id="apiRequestEvent"
          name="apiRequestEvent"
          value={defaultEventCode}
          onChange={(e) => setEventCode(e.target.value)}
        />
        <br />
        <button type="submit">Make API Request</button>
      </form>

      {matchScores.map((element) => {
        const headers = Object.keys(element.alliances[0]);
        return (
          <div key={element.matchNumber}>
            <h3>
              Match Number: {element.matchNumber} Level: {element.matchLevel}
            </h3>
            <table style={{ border: "1px solid" }}>
              <tbody>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} style={{ border: "1px solid" }}>
                      {header}
                    </th>
                  ))}
                </tr>
                {element.alliances.map((e, index) => {
                  return (
                    <tr key={index}>
                      {headers.map((header, index) => (
                        <td key={index} style={{ border: "1px solid" }}>
                          {e[header]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default APIDataPage;
