import React from "react";
import "./index.css";

function TeamSortableTable({ teamData, group, category, sortTable, nameSort }) {
  const numberOfColumns = teamData[0][group]["labels"].length.toString();

  return (
    <table className="TeamSortableTable">
      <thead>
        <tr>
          <th colSpan={numberOfColumns + 1} className="TeamSortableTables" onClick={() => sortTable(group, -1)}>
            {category}
          </th>
        </tr>
        <tr>
          <th className="TeamSortableTables" onClick={() => nameSort()}>
            Team
          </th>
          {teamData[0][group]["labels"].map((label, index) => (
            <th key={index} className="TeamSortableTables" onClick={() => sortTable(group, index)}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {teamData.map((team, rowIndex) => (
          <tr key={rowIndex} data-testid={`team-row-${rowIndex}`}>
            <td className="TeamSortableTables" data-testid={`team-name-${rowIndex}`}>
              {team.name}
            </td>
            {team[group]["data"].map((data, cellIndex) => (
              <td key={cellIndex} className="TeamSortableTables" data-testid={`team-cell-${rowIndex}-${cellIndex}`}>
                {data}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamSortableTable;
