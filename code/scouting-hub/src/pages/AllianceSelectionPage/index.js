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
  const [settings, setSettings] = useState(null);
  const [scoresArray, setScoresArray] = useState([]);

  const fetchConfig = async () => {
    try {
      const results = await window.envConfig.readConfig();
      setSettings({ ...results });
    } catch (err) {
      //setError(err.message);
      console.log(err);
    }
    return settings;
  };

  useEffect(() => {
    if (layout?.id === undefined) {
      return;
    }
    const fetchScores = async () => {
      try {
        const id = { layoutID: layout.id };
        const results = await window.database.findAllByObject("scores", id);
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
      try {
        const name = { name: settings?.LAYOUT };
        const results = await window.database.findByObject("layouts", name);
        setLayout({ ...results });
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

return (
  <div className="page">
    <div>
      <Navbar />
    </div>
    <div className="page-container">
      <div className="container">
      <div>
      <h2>Settings:</h2>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
      <h2>Layout:</h2>
      <pre>{JSON.stringify(layout, null, 2)}</pre>
      <h2>Scores:</h2>
      <pre>{JSON.stringify(scoresArray, null, 2)}</pre>
    </div>
      </div>
    </div>
  </div>
);

}

// const sortTable = (group, index) => {
//   const sorted = teamData.toSorted((a, b) => {
//     const valA = a[group]["data"][index];
//     const valB = b[group]["data"][index];
//     return valB - valA;
//   });
//   setTeamData(sorted);
// };

// const nameSortTable = () => {
//   const sorted = teamData.toSorted((a, b) => {
//     const nameA = a.name.toUpperCase();
//     const nameB = b.name.toUpperCase();
//     if (nameA < nameB) {
//       return -1;
//     }
//     if (nameA > nameB) {
//       return 1;
//     }
//     return 0;
//   });
//   setTeamData(sorted);
// };

// // Function to parse the layout object
// function parseLayout(layout) {
// const parsedLayout = { categories: [] };

// Object.keys(layout).forEach((key) => {
//   if (key === "categories") {
//     parsedLayout.categories = JSON.parse(layout[key]);
//   } else if (key.startsWith("subCategories") || key.startsWith("headers")) {
//     parsedLayout[key] = JSON.parse(layout[key]);
//   }
// });

// return parsedLayout;
// }

// // Function to parse scores objects
// function parseScores(scores) {
// return scores.map((score) => {
//   const parsedScore = {};

//   Object.keys(score).forEach((key) => {
//     if (key.startsWith("data")) {
//       parsedScore[key] = JSON.parse(score[key]);
//     } else {
//       parsedScore[key] = score[key];
//     }
//   });

//   return parsedScore;
// });
// }

// function mergeLayoutAndScores(layout, scores) {
// // Parse the layout
// const parsedLayout = parseLayout(layout);

// // Parse the scores
// const parsedScores = parseScores(scores);

// // Initialize the result array
// const mergedData = [];

// // Iterate through each score
// parsedScores.forEach((score) => {
//   // Initialize an object for the merged data
//   const mergedObject = {
//     team: score.teamNumber,
//     name: score.teamName,
//   };

//   // Iterate through each group in the layout
//   for (let i = 0; i < 5; i++) {
//     // Get the group label and data for this group from the layout
//     const groupLabel = parsedLayout[`subCategories${i}`];
//     const groupDataKey = `data${i}`;

//     // If the group data exists in the score, add it to the merged object
//     if (score.hasOwnProperty(groupDataKey)) {
//       mergedObject[`group${i}Label`] = groupLabel;
//       mergedObject[`group${i}Data`] = {
//         labels: parsedLayout[`headers${i}`],
//         data: JSON.parse(score[groupDataKey]),
//       };
//     } else {
//       // If the group data doesn't exist, add empty arrays
//       mergedObject[`group${i}Label`] = "";
//       mergedObject[`group${i}Data`] = { labels: [], data: [] };
//     }
//   }

//   // Add the merged object to the result array
//   mergedData.push(mergedObject);
// });

// return mergedData;
// }

// return (
// <div className="page">
//   <div>
//     <Navbar />
//   </div>
//   <div className="page-container">
//     <div className="container">
//       <div className="header">
//         <h1>Alliance Selection</h1>
//       </div>
//     </div>
//     <div className="team-table-container">
//       <TeamSortableTable
//         teamData={teamData}
//         group={"group0Data"}
//         category={layout.categories[0]}
//         sortTable={sortTable}
//         nameSort={nameSortTable}
//       />
//       <SortableTable
//         teamData={teamData}
//         group={"group1Data"}
//         category={layout.categories[1]}
//         sortTable={sortTable}
//       />
//       <SortableTable
//         teamData={teamData}
//         group={"group2Data"}
//         category={layout.categories[2]}
//         sortTable={sortTable}
//       />
//       <SortableTable
//         teamData={teamData}
//         group={"group3Data"}
//         category={layout.categories[3]}
//         sortTable={sortTable}
//       />
//       <SortableTable
//         teamData={teamData}
//         group={"group4Data"}
//         category={layout.categories[4]}
//         sortTable={sortTable}
//       />
//     </div>
//     <div className="print-button-container">
//       <button className="print-button" onClick={() => window.print()}>Print</button>
//     </div>
//     <div className="container" style={{ minHeight: '160px' }}>
//       <div className="header">
//         <h2>Alliance Builder</h2>
//       </div>
//       <div className="alliance-builder-container">
//         <div className="center">
//           <div className="forms-container">
//             <AllianceSelectionForm
//               teamData={teamData}
//               optionsArray={optionsArray}
//               setOptionsArray={setOptionsArray}
//             />
//           </div>
//         </div>
//         <div className="center">
//           <div className="alliance-container">
//             <AllianceSelectionDisplay
//               optionsArray={optionsArray}
//               setOptionsArray={setOptionsArray}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// );

// }