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
  const [scores, setScores] = useState(null);
  const [optionsArray, setOptionsArray] = useState([]);
  const [layout, setLayout] = useState({ categories: ["", "", "", "", ""], subCategories0: [], subCategories1: [], subCategories2: [], subCategories3: [], subCategories4: [] });
  const [settings, setSettings] = useState(null);
  const [teamNumbers, setTeamNumbers] = useState([]);

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
        const results = await window.database.findAllByObject("scores", { layoutID: layout.id, eventCode: "misjo" });
        const parsedResults = parseScores(results);
        setScores(parsedResults);
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
        const results = await window.database.findByObject("layouts", { name: settings?.LAYOUT });
        const parsedResults = parseLayout(results);
        setLayout(parsedResults);
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

  useEffect(() => {
    console.log("label", layout, scores);
    if (scores === null) {
      return;
    }
    const mergedData = mergeData(layout, scores);
    setTeamData(mergedData);
    setTeamNumbers(mergedData.map(item => item.team)); // Calculate team numbers here
  }, [scores]);

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
    const parsedLayout = {
      id: layout.id,
      name: layout.name,
      eventCode: layout.eventCode,
      teamNumber: layout.teamNumber,
      teamName: layout.teamName,
      categories: JSON.parse(layout.categories),
      subCategories0: JSON.parse(layout.subCategories0),
      subCategories1: JSON.parse(layout.subCategories1),
      subCategories2: JSON.parse(layout.subCategories2),
      subCategories3: JSON.parse(layout.subCategories3),
      subCategories4: JSON.parse(layout.subCategories4),
    };
    return parsedLayout;
  }

  function parseScores(inputList) {
    const parsedScores = inputList.map(item => ({
      id: item.id,
      layoutID: item.layoutID,
      year: item.year,
      eventCode: item.eventCode,
      teamNumber: parseInt(item.teamNumber),
      teamName: item.teamName,
      data0: JSON.parse(item.data0),
      data1: JSON.parse(item.data1),
      data2: JSON.parse(item.data2),
      data3: JSON.parse(item.data3),
      data4: JSON.parse(item.data4),
    }));

    return parsedScores;
  }

  function mergeData(parsedLayout, parsedScores) {
    console.log("Parsed Layout:", parsedLayout);
    if (parsedScores === undefined) {
      return;
    }
    const mergedData = [];

    parsedScores.forEach(score => {
      console.log("Score:", score);
      console.log("Parsed Layout:", parsedLayout);
      const mergedItem = {
        team: score.teamNumber,
        name: score.teamName,
      };

      for (let i = 0; i < parsedLayout.categories.length; i++) {
        const category = parsedLayout.categories[i];
        const subCategories = parsedLayout[`subCategories${i}`];
        const data = score[`data${i}`];

        mergedItem[`group${i}Label`] = category;
        mergedItem[`group${i}Data`] = {
          labels: subCategories,
          data: data,
        };
      }

      mergedData.push(mergedItem);
    });
    return mergedData;
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
        {layout?.name ?
          <div className="team-table-container">
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
              group={"group4Data"}
              category={layout.categories[4]}
              sortTable={sortTable}
            />
          </div>
          : <></>}
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
                  teamNumbers={teamNumbers} // Pass teamNumbers here
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
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}
