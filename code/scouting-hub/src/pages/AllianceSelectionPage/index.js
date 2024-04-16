import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "./index.css";
import SortableTable from "../../components/tables/sortableTable";
import TeamSortableTable from "../../components/tables/teamSortableTable";
import AllianceSelectionForm from "../../components/forms/allianceSelectionForm";
import AllianceSelectionDisplay from "../../components/tables/allianceSelectionDisplay";

const blankTeam = [
  {
    team: "",
    name: "",
    group0Label: "",
    group0Data: { labels: [], data: [] },
    group1Label: "",
    group1Data: { labels: [], data: [] },
    group2Label: "",
    group2Data: { labels: [], data: [] },
    group3Label: "",
    group3Data: { labels: [], data: [] },
    group4Label: "",
    group4Data: { labels: [], data: [] },
  },
];

export default function AllianceSelectionPage() {
  const [teamData, setTeamData] = useState(blankTeam);
  const [optionsArray, setOptionsArray] = useState([]);
  const [layout, setLayout] = useState({ categories: ["", "", "", "", ""] });
  const [settings, setSettings] = useState({});

  const fetchConfig = async () => {
    try {
      const results = await window.envConfig.readConfig();
      setSettings({ ...results });
    } catch (err) {
      //setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    if (layout?.id === undefined) {
      return;
    }
    const fetchScores = async () => {
      try {
        const results = await window.database.findAllByObject("scores", {
          layoutID: layout.id,
        });
        console.log(results); //*****remove*****
      } catch (err) {
        //setError(err.message);
        console.log(err);
      }
    };
    fetchScores();
  }, [layout]);

  useEffect(() => {
    if (settings?.LAYOUT === undefined) {
      return;
    }
    const fetchLayout = async () => {
      console.log(settings.LAYOUT);
      try {
        const results = await window.database.findByObject("layouts", {
          name: settings?.LAYOUT,
        });
        setLayout({ ...results });
        console.log(layout);
      } catch (err) {
        //setError(err.message);
        console.log(err);
      }
    };

    fetchLayout();
  }, [settings]);

  useEffect(() => {
    fetchConfig();
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
    return scores.map((score) => {
      Object.keys(score).forEach((key) => {
        if (Array.isArray(score[key]) && typeof score[key][0] === "string") {
          score[key] = score[key].map((value) => JSON.parse(value));
        }
      });
      return score;
    });
  }

  function parseTeamData(parsedScores, parsedLayout) {
    return parsedScores.map((score) => {
      const teamData = {};

      Object.keys(parsedLayout).forEach((key) => {
        if (key !== "tableName" && key !== "columns") {
          teamData[key] = parsedLayout[key];
        }
      });

      parsedLayout.columns.forEach((column) => {
        if (column.name.startsWith("data")) {
          const groupIndex = parseInt(column.name.substring(4));
          const groupLabel = parsedLayout.categories[groupIndex];
          const groupData = score[column.name];

          teamData[`group${groupIndex}Label`] = groupLabel;
          teamData[`group${groupIndex}Data`] = {
            labels: groupData.labels,
            data: groupData.data,
          };
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
      <div className="page-container">
        <div className="container">
          <div className="header">
            <h1>Alliance Selection</h1>
          </div>
        </div>
        {/* <div className="team-table-container">
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
          <button className="print-button" onClick={() => window.print()}>
            Print
          </button>
        </div>
        <div className="container" style={{ minHeight: "160px" }}>
          <div className="header">
            <h2>Alliance Builder</h2>
          </div>
          <div className="alliance-builder-container">
            <div className="center">
              <div className="forms-container">
                <AllianceSelectionForm
                  teamData={teamData}
                  optionsArray={optionsArray}
                  setOptionsArray={setOptionsArray}
                />
              </div>
            </div>
            <div className="center">
              <div className="alliance-container">
                <AllianceSelectionDisplay
                  optionsArray={optionsArray}
                  setOptionsArray={setOptionsArray}
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
