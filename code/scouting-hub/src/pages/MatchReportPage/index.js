import React from "react";
import AlliancePie from "../../components/charts/AlliancePie";
import Navbar from "../../components/Navbar";

function MatchReportPage() {
  return (
    <div className="page">
      <Navbar />
      <h1>Match Report</h1>
      <button>Print</button>
      <div style={{ display: "flex", gap: "5px" }}>
        <div style={{ width: 400, border: "solid 2px black", padding: "10px" }}>
          <AlliancePie
            title={"Red Alliance"}
            teams={["4779", "2054", "5675"]}
            values={[31.6, 33.5, 34.9]}
          />
        </div>
        <div style={{ width: 400, border: "solid 2px black", padding: "10px" }}>
          <AlliancePie
            title={"Blue Alliance"}
            teams={["3539", "3534", "5436"]}
            values={[38.2, 32.7, 29.1]}
          />
        </div>
      </div>
    </div>
  );
}

export default MatchReportPage;
