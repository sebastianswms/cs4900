import React, { useState } from 'react';
import './index.css';

const ScrollableTable = ({ data, columnLabels }) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (header) => {
    if (sortBy === header) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(header);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortBy) return 0;

    const getValue = (obj, keys) => keys.reduce((acc, key) => acc[key], obj);
    const valueA = parseFloat(getValue(a, sortBy.split('.')));
    const valueB = parseFloat(getValue(b, sortBy.split('.')));

    if (isNaN(valueA) || isNaN(valueB)) {
      return getValue(a, sortBy.split('.'))?.localeCompare(getValue(b, sortBy.split('.')));
    }

    if (valueA === valueB) return 0;

    if (sortDirection === 'asc') {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });

  const renderSortingButton = (header) => {
    if (sortBy === header) {
      return sortDirection === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  return (
    <div className="scrollable-table-container">
      <table className="scrollable-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Name</th>
            {columnLabels.map((groupLabels, groupIndex) => (
              groupLabels.map((label, index) => (
                <th key={index}>
                  {label}
                  <button onClick={() => handleSort(`group${groupIndex}Data.data.${index}`)}>
                    {renderSortingButton(`group${groupIndex}Data.data.${index}`)}
                  </button>
                </th>
              ))
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((team) => (
            <tr key={team.team}>
              <td>{team.team}</td>
              <td>{team.name}</td>
              {columnLabels.map((groupLabels, groupIndex) => (
                groupLabels.map((label, index) => (
                  <td key={index}>{team[`group${groupIndex}Data`]?.data[index]}</td>
                ))
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrollableTable;
