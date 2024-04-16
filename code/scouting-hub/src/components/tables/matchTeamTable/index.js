import "./index.css";
import React from "react";

function MatchTeamTable({ eventCode, matchNumber, redData, blueData }) {
  return (
    <table
      className="table--blue"
      style={{
        border: "1px solid black",
        borderCollapse: "collapse",
        flex: 1,
      }}
    >
      <thead>
        <tr>
          <th className="table--blue">{eventCode}</th>
          <th className="table--blue" colSpan={2}>
            TEAM INFO
          </th>
        </tr>
        <tr>
          <th
            className="table--blue"
            style={{ width: "10ch", textAlign: "left" }}
          >
            Match: {matchNumber}
          </th>
          <th className="table--blue">#</th>
          <th className="table--blue">Name</th>
        </tr>
      </thead>
      <tbody>
        {redData.map((team, index) => {
          return (
            <tr className="table--blue" key={index}>
              <td style={{ color: "red" }}>{`Red ${index + 1}`}</td>
              <td>{team.teamNumber}</td>
              <td
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "0.75em",
                  overflow: "hidden",
                }}
              >
                {team.teamName}
              </td>
            </tr>
          );
        })}
        {blueData.map((team, index) => {
          return (
            <tr className="table--blue" key={index}>
              <td style={{ color: "blue" }}>{`Blue ${index + 1}`}</td>
              <td>{team.teamNumber}</td>
              <td
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "0.75em",
                  overflow: "hidden",
                }}
              >
                {team.teamName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default MatchTeamTable;
