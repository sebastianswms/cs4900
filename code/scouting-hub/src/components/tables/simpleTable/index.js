import React from "react";

function SimpleTable({ category, subCategories, data }) {
  const numberOfColumns = subCategories?.length;

  return (
    <table
      style={{
        border: "1px solid",
        borderCollapse: "collapse",
        flex: 1,
      }}
    >
      <thead>
        <tr>
          <th
            colSpan={numberOfColumns + 1}
            style={{
              fontSize: "0.8em",
              border: "1px solid black",
              borderCollapse: "collapse",
              textAlign: "center",
              padding: "0.5ch",
              whiteSpace: "nowrap",
              backgroundColor: "#4660af",
              color: "white",
            }}
          >
            {category}
          </th>
        </tr>
        <tr>
          {subCategories.map((label, index) => (
            <th
              key={index}
              style={{
                fontSize: "0.8em",
                border: "1px solid black",
                borderCollapse: "collapse",
                textAlign: "center",
                padding: "0.5ch",
                whiteSpace: "nowrap",
                backgroundColor: "#4660af",
                color: "white",
              }}
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((team, index) => (
          <tr key={index}>
            {team?.map((element, index) => (
              <td
                key={index}
                style={{
                  fontSize: "1em",
                  border: "1px solid black",
                  textAlign: "center",
                  padding: "0.5ch",
                }}
              >
                {element}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SimpleTable;
