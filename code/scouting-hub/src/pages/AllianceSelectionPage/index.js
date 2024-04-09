import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "./index.css";
import SortableTable from "../../components/tables/sortableTable";
import TeamSortableTable from "../../components/tables/teamSortableTable";
import AllianceSelectionForm from "../../components/forms/allianceSelectionForm";
import AllianceSelectionDisplay from "../../components/tables/allianceSelectionDisplay";

export default function AllianceSelectionPage() {
  const [teamData, setTeamData] = useState([]);
  const [optionsArray, setOptionsArray] = useState([]);
  const [layout, setLayout] = useState(null);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    async function fetchData() {
      
      await window.evnConfig.readConfig().then((data)=> {
            console.log(data); 
            setSettings(data)
      });

      await window.database.findByObject("layouts", { name: settings.LAYOUT }.then((layout)=> {
            console.log(layout);
            const parsedLayout = parseLayout(layout);
            setLayout(parsedLayout);
      }));
      
      await window.database.findByObject("scores", { layoutID: layout }.then((scores)=> {
            console.log(scores);
            const parsedScores = parseScores(scores);
            setTeamData(parsedScores);

      }));

      const teamData = parseTeamData(teamData, layout);
      
    }

    fetchData();
  }, []);

  const sortTable = (group, index) => {
    const sorted = teamData.toSorted((a, b) => {
      const valA = a[group]["data"][index];
      const valB = b[group]["data"][index];
      return valB - valA;
    });
    setTeamData(sorted);
  };

  const nameSortTable = () => {
    const sorted = teamData.toSorted((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setTeamData(sorted);
  };

  function parseLayout(layout) {
    layout.categories = JSON.parse(layout.categories);

    for (let i = 0; i < 5; i++) {
        const subCategoryKey = `subCategories${i}`;
        if (layout.hasOwnProperty(subCategoryKey) && layout[subCategoryKey]) {
            layout[subCategoryKey] = JSON.parse(layout[subCategoryKey]);
        }
    }

    for (let i = 0; i < 5; i++) {
        const headerKey = `headers${i}`;
        if (layout.hasOwnProperty(headerKey) && layout[headerKey]) {
            layout[headerKey] = JSON.parse(layout[headerKey]);
        }
    }

    return layout;
}

function parseScores(scores) {
  return scores.map(score => {
      Object.keys(score).forEach(key => {
          if (Array.isArray(score[key]) && typeof score[key][0] === 'string') {
              score[key] = score[key].map(value => JSON.parse(value));
          }
      });
      return score;
  });
}

function parseTeamData(parsedScores, parsedLayout) {
  return parsedScores.map(score => {
      const teamData = {};
      
      Object.keys(parsedLayout).forEach(key => {
          if (key !== 'tableName' && key !== 'columns') {
              teamData[key] = parsedLayout[key];
          }
      });
      
      parsedLayout.columns.forEach(column => {
          if (column.name.startsWith('data')) {
              const groupIndex = parseInt(column.name.substring(4));
              const groupLabel = parsedLayout.categories[groupIndex];
              const groupData = score[column.name];
              
              teamData[`group${groupIndex}Label`] = groupLabel;
              teamData[`group${groupIndex}Data`] = { labels: groupData.labels, data: groupData.data };
          }
      });
      
      return teamData;
  });
}

  return (
    <div className="page">
      <div>
        <Navbar />
      </div>
      <div class="page-container">
        <div class="container">
          <div class="header">
            <h1>Alliance Selection</h1>
          </div>
        </div>
        <div class="team-table-container">
          <TeamSortableTable
            teamData={teamData}
            group={"group0Data"}
            category={layout.categories[0]}
            sortTable={sortTable}
            nameSort={nameSortTable}
          />
          <SortableTable
            teamData={teamData}
            group={"group1Data"}
            category={layout.categories[1]}
            sortTable={sortTable}
          />
          <SortableTable
            teamData={teamData}
            group={"group2Data"}
            category={layout.categories[2]}
            sortTable={sortTable}
          />
          <SortableTable
            teamData={teamData}
            group={"group3Data"}
            category={layout.categories[3]}
            sortTable={sortTable}
          />
          <SortableTable
            teamData={teamData}
            group={"group3Data"}
            category={layout.categories[4]}
            sortTable={sortTable}
          />
        </div>
        <div className="print-button-container">
          <button className="print-button" onClick={() => window.print()}>Print</button>
        </div>
        <div class="container" style={{ minHeight: '160px' }}>
          <div className="header">
            <h2>Alliance Builder</h2>
          </div>
          <div class="alliance-builder-container">
            <div class="center">
              <div className="forms-container">
                <AllianceSelectionForm
                  teamData={teamData}
                  optionsArray={optionsArray}
                  setOptionsArray={setOptionsArray}
                />
              </div>
            </div>
            <div class="center">
              <div className="alliance-container">
                <AllianceSelectionDisplay
                  optionsArray={optionsArray}
                  setOptionsArray={setOptionsArray}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
