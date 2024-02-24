import React from 'react';
import './index.css'; // Import the CSS file

const ScrollableTable = ({ data }) => {
  return (
    <div className="scrollable-table-container">
      <table className="scrollable-table">
        <thead>
          <tr>
            {data.length > 0 && data[0].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrollableTable;
