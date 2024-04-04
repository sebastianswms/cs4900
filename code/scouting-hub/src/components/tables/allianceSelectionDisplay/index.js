import React from 'react';
import "./index.css";

const AllianceSelectionDisplay = ({ optionsArray, setOptionsArray }) => {
  const handleDeleteRow = (index) => {
    setOptionsArray(optionsArray.filter((_, i) => i !== index));
  };

  return (
    <div data-testid="alliance-display">
      <table className="AllianceSelectionDisplay">
        <thead>
          <tr>
            <th>Team Captain</th>
            <th>Team 2</th>
            <th>Team 3</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {optionsArray.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td><button data-testid="delete-button" onClick={() => handleDeleteRow(index)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllianceSelectionDisplay;
