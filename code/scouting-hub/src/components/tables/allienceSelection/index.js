import React from 'react';
import './index.css';

const TeamTable = ({ label, groupXLabels, teamData }) => {
  const findGroupData = (team, labels) => {
    for (const data of teamData) {
      if (data.name === team.name && data.team === team.team) {
        for (let i = 0; i < labels.length; i++) {
          const label = labels[i];
          const groupLabel = `group${i}Label`;
          const groupData = `group${i}Data`;
          if (data[groupLabel] === label) {
            return data[groupData];
          }
        }
      }
    }
    return null;
  };

  return (
    <div className="team-table-container">
      <h2>{label}</h2>
      <div className="team-tables">
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Number</th>
              {groupXLabels.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {teamData.map((team, teamIndex) => (
            <tr key={teamIndex}>
              <td>{team.name}</td>
              <td>{team.team}</td>
              {groupXLabels.map((label, index) => {
                const groupData = findGroupData(team, label);
                const rowData = groupData ? groupData.data[index] : '';
                return (
                  <td key={index}>{rowData}</td>
                );
              })}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTable;
