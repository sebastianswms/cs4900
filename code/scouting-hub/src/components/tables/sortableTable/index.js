import React from "react";

function SortableTable({ teamData, group, category, sortTable }) {
  const numberOfColumns = teamData[0][group]["labels"].length.toString();
  return (
    <table>
      <tr>
        <th colSpan={numberOfColumns}>{category}</th>
      </tr>
      <tr>
        {teamData[0][group]["labels"].map((label, index) => {
          return (
            <th key={index} onClick={() => sortTable(group, index)}>
              {label}
            </th>
          );
        })}
      </tr>
      {teamData.map((team) => {
        return (
          <tr key={team.team}>
            {team[group]["data"].map((data) => {
              return <td>{data}</td>;
            })}
          </tr>
        );
      })}
    </table>
  );
}

export default SortableTable;
