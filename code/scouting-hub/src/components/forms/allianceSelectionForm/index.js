import React, { useState, useEffect } from 'react';
import './index.css';

const AllianceSelectionForm = ({ teamData, optionsArray, setOptionsArray }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    selector1: '',
    selector2: '',
    selector3: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions({
      ...selectedOptions,
      [name]: value
    });
  };

  const handleCreate = () => {
    setOptionsArray([...optionsArray, [selectedOptions.selector1, selectedOptions.selector2, selectedOptions.selector3]]);
    setSelectedOptions({
      selector1: '',
      selector2: '',
      selector3: ''
    });
  };

  const filterSelectedTeams = () => {
    const selectedTeams = optionsArray.flat();
    return teamData.filter(team => !selectedTeams.includes(team.team));
  };

  return (
    <div className="alliance-form-container">
      <input
        type="text"
        name="selector1"
        value={selectedOptions.selector1}
        onChange={handleInputChange}
        className="alliance-form-input"
        list="teamNames1"
        placeholder="Select Team Captain"
      />
      <datalist id="teamNames1">
        {filterSelectedTeams().map((team) => (
          <option key={team.team} value={team.team} />
        ))}
      </datalist>
      <input
        type="text"
        name="selector2"
        value={selectedOptions.selector2}
        onChange={handleInputChange}
        className="alliance-form-input"
        list="teamNames2"
        placeholder="Select Team 2"
      />
      <datalist id="teamNames2">
        {filterSelectedTeams().map((team) => (
          <option key={team.team} value={team.team} />
        ))}
      </datalist>
      <input
        type="text"
        name="selector3"
        value={selectedOptions.selector3}
        onChange={handleInputChange}
        className="alliance-form-input"
        list="teamNames3"
        placeholder="Select Team 3"
      />
      <datalist id="teamNames3">
        {filterSelectedTeams().map((team) => (
          <option key={team.team} value={team.team} />
        ))}
      </datalist>
      <button onClick={handleCreate} className="alliance-form-create-button">Create</button>
    </div>
  );
};

export default AllianceSelectionForm;
