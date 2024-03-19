import "./index.css";
import React, { useState } from "react";
import AlliancePie from "../../components/charts/AlliancePie";
import AllianceStackBar from "../../components/charts/AllianceStackBar";
import AllianceStackBarTeams from "../../components/charts/AllianceStackBarTeams";
import AllianceBar from "../../components/charts/AllianceBar";
import Navbar from "../../components/Navbar";
import MatchSelectionForm from "../../components/forms/MatchSelectionForm";
import TeamSelectionForm from "../../components/forms/TeamSelectionForm";
import SortableTable from "../../components/tables/sortableTable";
import { teamData as importedTeamData, labels } from "../../data/teamData";
import MatchTeamTable from "../../components/tables/matchTeamTable";

function MatchReportPage() {
  const [redAlliance, setRedAlliance] = useState([]);
  const [blueAlliance, setBlueAlliance] = useState([]);
  const [teamData, setTeamData] = useState(importedTeamData.slice(0, 6));

  const sortTable = (group, index) => {
    const sorted = teamData.toSorted((a, b) => {
      const valA = a[group]["data"][index];
      const valB = b[group]["data"][index];
      return valB - valA;
    });
    setTeamData(sorted);
  };

  return (
    <div className="page">
      <Navbar />
      <div>
        <div className="page-title no-print">
          <h1>Match Report</h1>
        </div>
        <div className="match-container no-print">
          <MatchSelectionForm
            setBlueAlliance={setBlueAlliance}
            setRedAlliance={setRedAlliance}
          />
        </div>
        <div className="no-print" style={{ display: "flex", gap: "1em" }}>
          <TeamSelectionForm
            name={"Red Alliance"}
            teams={redAlliance}
            setAlliance={setRedAlliance}
            color={"#ED1C24"}
          />
          <TeamSelectionForm
            name={"Blue Alliance"}
            teams={blueAlliance}
            setAlliance={setBlueAlliance}
            color={"#0066B3"}
          />
        </div>
        <div className="print-button-container no-print">
          <button
            className="print-button no-print"
            onClick={() => window.print()}
          >
            Print
          </button>
        </div>
        <div className="match-report">
          <div className="top-table">
            <MatchTeamTable
              teamData={teamData}
              matchInfo={{ matchCode: "2023micmp", matchNumber: "45" }}
              redAlliance={redAlliance}
              blueAlliance={blueAlliance}
            />
            <SortableTable
              teamData={teamData}
              group={"group0Data"}
              category={labels[0]}
              sortTable={sortTable}
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
          <div className="area-one">
            <AlliancePie
              title={"Red Alliance"}
              teams={["4779", "2054", "5675"]}
              values={[31.6, 33.5, 34.9]}
            />
          </div>
          <div className="area-two">
            <AlliancePie
              title={"Blue Alliance"}
              teams={["3539", "3534", "5436"]}
              values={[38.2, 32.7, 29.1]}
            />
          </div>
          <div className="area-three">
            <h3>Notes:</h3>
            <p>________________________________________</p>
            <p>________________________________________</p>
            <p>________________________________________</p>
            <p>________________________________________</p>
            <p>________________________________________</p>
            <p>________________________________________</p>
          </div>
          <div className="area-four">
            <AllianceStackBar
              title={"Auto Charge Station"}
              teams={["4779", "2054", "5675", "3539", "3534", "5436"]}
              values={[
                [30, 40, 30],
                [10, 60, 30],
                [50, 20, 30],
                [25, 50, 25],
                [15, 10, 75],
                [30, 30, 40],
              ]}
              legend={["W", "D", "E"]}
            />
          </div>
          <div className="area-five">
            <AllianceStackBar
              title={"Tele Charge Station"}
              teams={["4779", "2054", "5675", "3539", "3534", "5436"]}
              values={[
                [25, 25, 25, 25],
                [20, 30, 25, 25],
                [10, 40, 30, 20],
                [35, 20, 25, 20],
                [15, 35, 20, 30],
                [30, 25, 25, 20],
              ]}
              legend={["W", "P", "D", "E"]}
            />
          </div>
          <div className="area-six">
            <AllianceBar
              title={"Mobility %"}
              teams={["4779", "2054", "5675", "3534", "3534", "5436"]}
              values={[90, 80, 100, 83, 100, 100]}
            />
          </div>
          <div className="area-seven">
            <AllianceStackBar
              title={"Cone and Cube Percent"}
              teams={["4779", "2054", "5675", "3539", "3534", "5436"]}
              values={[
                [50, 50],
                [60, 40],
                [70, 30],
                [80, 20],
                [90, 10],
                [75, 25],
              ]}
              legend={["Cubes", "Cones"]}
            />
          </div>
          <div className="area-eight">
            <AllianceStackBarTeams
              title="Average Points"
              teams={[
                ["4779", "2054", "5675"],
                ["3539", "3534", "5436"],
              ]}
              values={[
                [48, 48, 44],
                [55, 45, 55],
              ]}
              legend={["Red Alliance", "Blue Alliance"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchReportPage;
