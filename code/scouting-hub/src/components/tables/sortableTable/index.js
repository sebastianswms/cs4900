import React from "react";

function SortableTable({ teamData, group, category, sort }) {
  const numberOfColumns = teamData[0][group]["labels"].length.toString();
  return (
    <table>
      <tr>
        <th colSpan={numberOfColumns}>{category}</th>
      </tr>
      <tr>
        {teamData[0][group]["labels"].map((label) => {
          return <th onClick={() => sort(category, label)}>{label}</th>;
        })}
      </tr>
      {teamData.map((team) => {
        return (
          <tr>
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
