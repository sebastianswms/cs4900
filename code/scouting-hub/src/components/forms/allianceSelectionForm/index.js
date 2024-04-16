import React, { useState, useEffect } from 'react';
import './index.css';

const AllianceSelectionForm = ({ teamNumbers, optionsArray, setOptionsArray }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    selector1: '',
    selector2: '',
    selector3: ''
  });
  const [showWarning, setShowWarning] = useState(false);
  const [conflictingTeams, setConflictingTeams] = useState([]);

  useEffect(() => {
    // Reset warning when the optionsArray changes
    setShowWarning(false);
  }, [optionsArray]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions({
      ...selectedOptions,
      [name]: value
    });
  };

  const handleCreate = () => {
    const newTeamArray = [selectedOptions.selector1, selectedOptions.selector2, selectedOptions.selector3];
    if (!isTeamArrayDuplicate(newTeamArray)) {
      setOptionsArray([...optionsArray, newTeamArray]);
    } else {
      const conflicting = findConflictingTeams(newTeamArray);
      setConflictingTeams(conflicting);
      setShowWarning(true);
      // Flash warning for 2 seconds
      setTimeout(() => setShowWarning(false), 2000);
    }
    setSelectedOptions({
      selector1: '',
      selector2: '',
      selector3: ''
    });
  };

  const isTeamArrayDuplicate = (newTeamArray) => {
    // Check if any value in the new team array matches any value in any existing team array
    return optionsArray.some(teamArray => {
      return newTeamArray.some(team => teamArray.includes(team));
    });
  };

  const findConflictingTeams = (newTeamArray) => {
    // Find all conflicting teams in the new team array
    return newTeamArray.filter(team => optionsArray.flat().includes(team));
  };

  return (
    <div className="alliance-form-container">
      <select
        name="selector1"
        value={selectedOptions.selector1}
        onChange={handleInputChange}
        className="alliance-form-input alliance-form-select"
      >
        <option value="" disabled>Select Team Captain</option>
        {teamNumbers.map(teamNumber => (
          <option key={teamNumber} value={teamNumber}>{teamNumber}</option>
        ))}
      </select>
      <select
        name="selector2"
        value={selectedOptions.selector2}
        onChange={handleInputChange}
        className="alliance-form-input alliance-form-select"
      >
        <option value="" disabled>Select Team 2</option>
        {teamNumbers.map(teamNumber => (
          <option key={teamNumber} value={teamNumber}>{teamNumber}</option>
        ))}
      </select>
      <select
        name="selector3"
        value={selectedOptions.selector3}
        onChange={handleInputChange}
        className="alliance-form-input alliance-form-select"
      >
        <option value="" disabled>Select Team 3</option>
        {teamNumbers.map(teamNumber => (
          <option key={teamNumber} value={teamNumber}>{teamNumber}</option>
        ))}
      </select>
      <button onClick={handleCreate} className="alliance-form-create-button">Create</button>
      <div className="form-footer">
        <p className="error-message">
          <b>
            {conflictingTeams.length > 0 &&
              `Team${conflictingTeams.length > 1 ? 's' : ''} ${conflictingTeams.join(', ')} ${conflictingTeams.length > 1 ? 'are' : 'is'} already in an alliance`
            }
          </b>
        </p>
      </div>
    </div>
  );
};

export default AllianceSelectionForm;
