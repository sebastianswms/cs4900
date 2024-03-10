import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SortableTable from "../../components/tables/sortableTable";
import TeamSortableTable from "../../components/tables/teamSortableTable";
import { teamData as importedTeamData, labels } from "../../data/teamData";

export default function AllianceSelectionPage() {
  const [teamData, setTeamData] = useState(importedTeamData);
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
      <div>
        <h1>Alliance Selection</h1>
      </div>
      <div className="selection-container" style={{ display: "flex" }}>
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
    </div>
  );
}
