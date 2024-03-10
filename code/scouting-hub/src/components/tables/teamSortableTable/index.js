import React from "react";

function TeamSortableTable({ teamData, group, category, sortTable, nameSort }) {
  const numberOfColumns = teamData[0][group]["labels"].length.toString();
  return (
    <table>
      <tr>
        <th colSpan={numberOfColumns + 1}>{category}</th>
      </tr>
      <tr>
        <th onClick={() => nameSort()}>Team</th>
        {teamData[0][group]["labels"].map((label, index) => {
          return <th onClick={() => sortTable(group, index)}>{label}</th>;
        })}
      </tr>
      {teamData.map((team) => {
        return (
          <tr>
            <td>{team.name}</td>
            {team[group]["data"].map((data) => {
              return <td>{data}</td>;
            })}
          </tr>
        );
      })}
    </table>
  );
}

export default TeamSortableTable;
