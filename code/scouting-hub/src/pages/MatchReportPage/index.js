import "./index.css";
import React, { useState } from "react";
import AlliancePie from "../../components/charts/AlliancePie";
import AllianceStackBar from "../../components/charts/AllianceStackBar";
import AllianceStackBarTeams from "../../components/charts/AllianceStackBarTeams";
import AllianceBar from "../../components/charts/AllianceBar";
import Navbar from "../../components/Navbar";
import MatchSelectionForm from "../../components/forms/MatchSelectionForm";
import TeamSelectionForm from "../../components/forms/TeamSelectionForm";
import SimpleTable from "../../components/tables/simpleTable";
import MatchTeamTable from "../../components/tables/matchTeamTable";

function MatchReportPage() {
  const [redAlliance, setRedAlliance] = useState([]);
  const [blueAlliance, setBlueAlliance] = useState([]);
  const [redData, setRedData] = useState([]);
  const [blueData, setBlueData] = useState([]);
  const [layout, setLayout] = useState(null);
  const [matchNumber, setMatchNumber] = useState(-1);
  const [eventCode, setEventCode] = useState("");

  return (
    <div className="page">
      <Navbar />
      <div>
        <div className="page-title no-print">
          <h2>Match Report</h2>
        </div>
        <div className="match-container no-print">
          <MatchSelectionForm
            setBlueAlliance={setBlueAlliance}
            setRedAlliance={setRedAlliance}
            setLayout={setLayout}
            setMatch={setMatchNumber}
            setEvent={setEventCode}
          />
        </div>
        <div className="no-print" style={{ display: "flex", gap: "1em" }}>
          <TeamSelectionForm
            name={"Red Alliance"}
            color={"#ED1C24"}
            teams={redAlliance}
            setAlliance={setRedAlliance}
            setData={setRedData}
            id={layout?.id}
            event={eventCode}
          />
          <TeamSelectionForm
            name={"Blue Alliance"}
            color={"#0066B3"}
            teams={blueAlliance}
            setAlliance={setBlueAlliance}
            setData={setBlueData}
            id={layout?.id}
            event={eventCode}
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
          <div
            className="top-table"
            style={{ display: "flex", flexGrow: "1", width: "100%" }}
          >
            <MatchTeamTable
              eventCode={eventCode}
              matchNumber={matchNumber}
              redData={redData || []}
              blueData={blueData || []}
            />
            <SimpleTable
              category={layout?.categories[0]}
              subCategories={layout?.subCategories0 || []}
              data={[
                redData[0]?.data0,
                redData[1]?.data0,
                redData[2]?.data0,
                blueData[0]?.data0,
                blueData[1]?.data0,
                blueData[2]?.data0,
              ]}
            />
            <SimpleTable
              category={layout?.categories[1]}
              subCategories={layout?.subCategories1 || []}
              data={[
                redData[0]?.data1,
                redData[1]?.data1,
                redData[2]?.data1,
                blueData[0]?.data1,
                blueData[1]?.data1,
                blueData[2]?.data1,
              ]}
            />
            <SimpleTable
              category={layout?.categories[2]}
              subCategories={layout?.subCategories2 || []}
              data={[
                redData[0]?.data2,
                redData[1]?.data2,
                redData[2]?.data2,
                blueData[0]?.data2,
                blueData[1]?.data2,
                blueData[2]?.data2,
              ]}
            />
            <SimpleTable
              category={layout?.categories[3]}
              subCategories={layout?.subCategories3 || []}
              data={[
                redData[0]?.data3,
                redData[1]?.data3,
                redData[2]?.data3,
                blueData[0]?.data3,
                blueData[1]?.data3,
                blueData[2]?.data3,
              ]}
            />
            <SimpleTable
              category={layout?.categories[4]}
              subCategories={layout?.subCategories4 || []}
              data={[
                redData[0]?.data4,
                redData[1]?.data4,
                redData[2]?.data4,
                blueData[0]?.data4,
                blueData[1]?.data4,
                blueData[2]?.data4,
              ]}
            />
          </div>
          <div className="area-one">
            <AlliancePie
              title={"Red Alliance"}
              teams={redAlliance}
              values={[
                redData[0]?.data0[0],
                redData[1]?.data0[0],
                redData[2]?.data0[0],
              ]}
            />
          </div>
          <div className="area-two">
            <AlliancePie
              title={"Blue Alliance"}
              teams={blueAlliance}
              values={[
                blueData[0]?.data0[0],
                blueData[1]?.data0[0],
                blueData[2]?.data0[0],
              ]}
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
              teams={[...redAlliance, ...blueAlliance]}
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
              teams={[...redAlliance, ...blueAlliance]}
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
              teams={[...redAlliance, ...blueAlliance]}
              values={[90, 80, 100, 83, 100, 100]}
            />
          </div>
          <div className="area-seven">
            <AllianceStackBar
              title={"Cone and Cube Percent"}
              teams={[...redAlliance, ...blueAlliance]}
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
              teams={[redAlliance, blueAlliance]}
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
