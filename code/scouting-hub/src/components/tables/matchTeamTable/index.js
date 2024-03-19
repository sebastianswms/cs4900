import React from "react";

function MatchTeamTable({ matchInfo, teamData, redAlliance, blueAlliance }) {
  return (
    <table className="SortableTables">
      <tr>
        <th className="SortableTables">{matchInfo.matchCode}</th>
        <th className="SortableTables" colSpan={2}>
          TEAM INFO
        </th>
      </tr>
      <tr>
        <th className="SortableTables">Match #{matchInfo.matchNumber}</th>
        <th className="SortableTables">Team #</th>
        <th className="SortableTables">Team Name</th>
      </tr>
      {teamData.map((team) => {
        console.log(team.team, redAlliance);
        const onRed = redAlliance.indexOf(team.team);
        console.log(onRed);
        let position = "";
        if (onRed === -1) {
          position = "Blue " + (blueAlliance.indexOf(team.team) + 1);
        } else {
          position = "Red " + (onRed + 1);
        }
        return (
          <tr>
            <td className="SortableTables">{position}</td>
            <td className="SortableTables">{team.team}</td>
            <td className="SortableTables" style={{ whiteSpace: "nowrap" }}>
              {team.name}
            </td>
          </tr>
        );
      })}
    </table>
  );
}

export default MatchTeamTable;
