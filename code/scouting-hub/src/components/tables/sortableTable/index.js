import React from "react";
import "./index.css";

function SortableTable({ teamData, group, category, sortTable }) {
  const numberOfColumns = teamData[0][group]["labels"].length.toString();
  return (
    <table className="SortableTables">
      <tr>
        <th colSpan={numberOfColumns + 1} className="SortableTables">{category}</th>
      </tr>
      <tr>
        {teamData[0][group]["labels"].map((label, index) => {
          return (
            <th key={index} onClick={() => sortTable(group, index)} className="SortableTables">{label}</th>
          );
        })}
      </tr>
      {teamData.map((team) => {
        return (
          <tr key={team.team}>
            {team[group]["data"].map((data, index) => {
              return <td key={index} className="SortableTables">{data}</td>;
            })}
          </tr>
        );
      })}
    </table>
  );
}

export default SortableTable;
