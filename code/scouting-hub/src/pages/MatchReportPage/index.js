import React from "react";
import AlliancePie from "../../components/charts/AlliancePie";
import AllianceStackBarTwo from "../../components/charts/AllianceStackBarTwo";
import AllianceStackBarThree from "../../components/charts/AllianceStackBarThree";
import AllianceStackBarFour from "../../components/charts/AllianceStackBarFour";
import AllianceBar from "../../components/charts/AllianceBar";
import Navbar from "../../components/Navbar";

function MatchReportPage() {
  return (
    <div className="page">
      <Navbar />
      <h1>Match Report</h1>
      <button className="no-print" onClick={() => window.print()}>
        Print
      </button>
      <div id="div-to-print">
        <div style={{ display: "flex", gap: "5px" }}>
          <div
            style={{ width: 400, border: "solid 2px black", padding: "10px" }}
          >
            <AlliancePie
              title={"Red Alliance"}
              teams={["4779", "2054", "5675"]}
              values={[31.6, 33.5, 34.9]}
            />
          </div>
          <div
            style={{ width: 400, border: "solid 2px black", padding: "10px" }}
          >
            <AlliancePie
              title={"Blue Alliance"}
              teams={["3539", "3534", "5436"]}
              values={[38.2, 32.7, 29.1]}
            />
            </div>
         <div 
            style={{ width: 400, border: "solid 2px black", padding: "10px"  }}
         >
            <AllianceStackBarThree
                title={"Auto Charge Station"}
                teams={["4779", "2054", "5675", "3539","3534", "5436"]}
                values={[[30, 40, 30], [10, 60, 30], [50, 20, 30], [25, 50, 25], [15, 10, 75], [30,30,40]]}
                legend={["W","D","E"]}
          />
          </div>
          <div 
            style={{ width: 400, border: "solid 2px black", padding: "10px"  }}
         >
            <AllianceBar
                title={"Mobility %"}
                teams={["4779", "2054", "5675", "3534", "3534", "5436"]}
                values={[90, 80, 100, 83, 100, 100]}
          />
          </div>
          <div 
            style={{ width: 400, border: "solid 2px black", padding: "10px"  }}
         >
            <AllianceStackBarFour
                title={"Tele Charge Station"}
                teams={["4779", "2054", "5675", "3539","3534", "5436"]}
                values={[[25, 25, 25, 25], [20, 30, 25, 25], [10, 40, 30, 20], [35, 20, 25, 20], [15, 35, 20, 30], [30, 25, 25, 20]]}
                legend={["W", "P", "D","E"]}
          />
          </div>
          <div 
            style={{ width: 400, border: "solid 2px black", padding: "10px"  }}
         >
            <AllianceStackBarTwo
                title={"Tele Charge Station"}
                teams={["4779", "2054", "5675", "3539","3534", "5436"]}
                values={[ [50, 50], [60, 40], [70, 30], [80, 20], [90, 10], [75, 25]]}
                legend={["Cubes", "Cones"]}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchReportPage;
