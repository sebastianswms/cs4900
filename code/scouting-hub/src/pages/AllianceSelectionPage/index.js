import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SortableTable from "../../components/tables/sortableTable";
import TeamSortableTable from "../../components/tables/teamSortableTable";
import { teamData as importedTeamData, labels } from "../../data/teamData";

export default function AllianceSelectionPage() {
  const [teamData, setTeamData] = useState(importedTeamData);
  function sortTable(category, label) {
    console.log(`Sorting data by: ${category}:${label}`);
  }
  function nameSortTable() {
    console.log("Sorting data by: name");
  }
  return (
    <div className="page">
      <Navbar />
      <div>
        <h1>Alliance Selection</h1>
      </div>
      <div className="selection-container" style={{ display: "flex" }}>
        <TeamSortableTable
          teamData={teamData}
          group={"group0Data"}
          category={labels[0]}
          sort={sortTable}
          nameSort={nameSortTable}
        />
        <SortableTable
          teamData={teamData}
          group={"group1Data"}
          category={labels[1]}
          sort={sortTable}
        />
        <SortableTable
          teamData={teamData}
          group={"group2Data"}
          category={labels[2]}
          sort={sortTable}
        />
        <SortableTable
          teamData={teamData}
          group={"group3Data"}
          category={labels[3]}
          sort={sortTable}
        />
        <SortableTable
          teamData={teamData}
          group={"group3Data"}
          category={labels[4]}
          sort={sortTable}
        />
      </div>
    </div>
  );
}
