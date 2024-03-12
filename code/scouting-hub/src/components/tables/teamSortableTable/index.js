import React from "react";
import "./index.css";

function TeamSortableTable({ teamData, group, category, sortTable, nameSort }) {
  const numberOfColumns = teamData[0][group]["labels"].length.toString();
  return (
    <table className="TeamSortableTable">
      <tr>
        <th colSpan={numberOfColumns + 1} className="TeamSortableTables">{category}</th>
      </tr>
      <tr>
        <th onClick={() => nameSort()} className="TeamSortableTables">Team</th>
        {teamData[0][group]["labels"].map((label, index) => {
          return <th onClick={() => sortTable(group, index)} className="TeamSortableTables">{label}</th>;
        })}
      </tr>
      {teamData.map((team) => {
        return (
          <tr>
            <td className="TeamSortableTables">{team.name}</td>
            {team[group]["data"].map((data) => {
              return <td className="TeamSortableTables">{data}</td>;
            })}
          </tr>
        );
      })}
    </table>
  );
}

export default TeamSortableTable;
