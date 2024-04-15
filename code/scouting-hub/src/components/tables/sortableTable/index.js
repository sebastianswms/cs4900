import React from "react";
import "./index.css";

function SortableTable({ teamData, group, category, sortTable }) {
  const numberOfColumns = teamData[0][group]["labels"].length.toString();

  return (
    <table className="SortableTables">
      <thead>
        <tr>
          <th colSpan={numberOfColumns + 1} className="SortableTables">
            {category}
          </th>
        </tr>
        <tr>
          {teamData[0][group]["labels"].map((label, index) => (
            <th
              key={index}
              className="SortableTables"
              data-testid="sort-button"
              onClick={() => sortTable(group, index)}
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {teamData.map((team, rowIndex) => (
          <tr key={rowIndex} data-testid="table-row">
            {team[group]["data"].map((data, cellIndex) => (
              <td key={cellIndex} className="SortableTables">
                {data}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SortableTable;
