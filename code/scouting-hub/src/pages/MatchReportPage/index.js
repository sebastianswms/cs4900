import "./index.css";
import React from "react";
import AlliancePie from "../../components/charts/AlliancePie";
import AllianceStackBar from "../../components/charts/AllianceStackBar";
import AllianceStackBarTeams from "../../components/charts/AllianceStackBarTeams";
import AllianceBar from "../../components/charts/AllianceBar";
import MatchReport from "../../components/tables/matchReport";
import Navbar from "../../components/Navbar";

function MatchReportPage() {
  return (
    <div className="page">
      <Navbar />
      <div className="page-container">
        <div className="match-container no-print">
          <h1>Match Report</h1>
          <form>
            <label for="match-code">Match Code</label>
            <input type="text" id="match-code" value="" />
            <label for="team-number">Team Number</label>
            <input type="text" id="team-number" value="" />
            <label for="match-number">Match Number</label>
            <input type="text" id="match-number" value="" />
            <button>Find Match</button>
          </form>
        </div>
        <div className="red-team-container no-print">
          <h1>Red Alliance</h1>
        </div>
        <div className="blue-team-container no-print">
          <h1>Blue Alliance</h1>
        </div>
        <div className="no-print">
          <button onClick={() => window.print()}>Print</button>
        </div>
        <div className="match-report">
          <div className="top-table">
            <MatchReport />
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
