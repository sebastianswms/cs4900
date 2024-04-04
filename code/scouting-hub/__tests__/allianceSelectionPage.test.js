import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AllianceSelectionPage from '../src/pages/AllianceSelectionPage/index';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

jest.mock('react-router-dom');

describe('Alliance Selection Page', () => {

  it('renders without crashing', () => {
    render(<AllianceSelectionPage />);
  });

  it('sorts table by team name when nameSortTable is called', () => {
    const { getByText, getAllByTestId } = render(<AllianceSelectionPage />);
    const nameSortButton = getByText('Team');
    fireEvent.click(nameSortButton);
    const tableRows = getAllByTestId('table-row');
    const teamNames = tableRows
      .map(row => {
        const teamNameElement = row.querySelector('[data-testid="team-name"]');
        return teamNameElement ? teamNameElement.textContent : null;
      })
      .filter(teamName => teamName !== null);
    const sortedTeamNames = [...teamNames].sort();
    expect(teamNames).toEqual(sortedTeamNames);
  });

  it('sorts table by team name when nameSortTable is called', async () => {
    const { getByText, getAllByTestId } = render(<AllianceSelectionPage />);
    const sortButtons = getAllByTestId('sort-button');
    sortButtons.forEach(button => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      const tableRows = getAllByTestId('table-row');
      const teamData = tableRows.map(row => {
        const cells = row.querySelectorAll('[data-testid^="team-cell"]');
        return Array.from(cells).map(cell => parseFloat(cell.textContent));
      });
      teamData.forEach((rowData, rowIndex) => {
        for (let i = 1; i < rowData.length; i++) {
          expect(rowData[i]).toBeGreaterThanOrEqual(rowData[i - 1]);
        }
      });
    });
  });

  it('adds teams to optionsArray when create button is clicked', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<AllianceSelectionPage />);
    const team1Input = getByPlaceholderText('Select Team Captain');
    const team2Input = getByPlaceholderText('Select Team 2');
    const team3Input = getByPlaceholderText('Select Team 3');
    fireEvent.change(team1Input, { target: { value: '4479' } });
    fireEvent.change(team2Input, { target: { value: '2054' } });
    fireEvent.change(team3Input, { target: { value: '5675' } });
    const createButton = getByText('Create');
    fireEvent.click(createButton);
    const allianceDisplay = getByTestId('alliance-display');
    expect(allianceDisplay.textContent).toContain('4479');
    expect(allianceDisplay.textContent).toContain('2054');
    expect(allianceDisplay.textContent).toContain('5675');
  });
  
  it('deletes teams from optionsArray when delete button is clicked', () => {
    const { queryAllByTestId, getByTestId } = render(<AllianceSelectionPage />);
    const deleteButtons = queryAllByTestId('delete-button');
    deleteButtons.forEach(deleteButton => {
      fireEvent.click(deleteButton);
    });
    const allianceDisplay = getByTestId('alliance-display');
    expect(allianceDisplay.textContent).not.toContain('4479');
  });
});
