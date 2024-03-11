import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "./index.css";
import SortableTable from "../../components/tables/sortableTable";
import TeamSortableTable from "../../components/tables/teamSortableTable";
import AllianceSelectionForm from "../../components/forms/allianceSelectionForm";
import AllianceSelectionDisplay from "../../components/tables/allianceSelectionDisplay";
import { teamData as importedTeamData, labels } from "../../data/teamData";

export default function AllianceSelectionPage() {
  const [teamData, setTeamData] = useState(importedTeamData);
  const [optionsArray, setOptionsArray] = useState([]);
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
  return (
    <div className="page">
      <Navbar />
      <div className="page-container">
      <div className="box">
          <div className="header">
            <h1>Alliance Selection</h1>
          </div>
          <div className="divider"></div>
          <div className="forms-container" style={{ display: "flex" }}>
            <div className="header">
              <h2>Alliance Builder</h2>
            </div>
            <div className="divider"></div>
          <AllianceSelectionForm teamData={teamData} optionsArray={optionsArray} setOptionsArray={setOptionsArray} />
          </div>
          <div className="tables-container" style={{ display: "flex" }}>
            <TeamSortableTable
              teamData={teamData}
              group={"group0Data"}
              category={labels[0]}
              sortTable={sortTable}
              nameSort={nameSortTable}
            />
            <SortableTable
              teamData={teamData}
              group={"group1Data"}
              category={labels[1]}
              sortTable={sortTable}
            />
            <SortableTable
              teamData={teamData}
              group={"group2Data"}
              category={labels[2]}
              sortTable={sortTable}
            />
            <SortableTable
              teamData={teamData}
              group={"group3Data"}
              category={labels[3]}
              sortTable={sortTable}
            />
            <SortableTable
              teamData={teamData}
              group={"group3Data"}
              category={labels[4]}
              sortTable={sortTable}
            />
          </div>
          <div className="tables-container" style={{ display: "flex" }}>
            <AllianceSelectionDisplay optionsArray={optionsArray} setOptionsArray={setOptionsArray} />
          </div>
        </div>
      </div>
    </div>
  );
}
