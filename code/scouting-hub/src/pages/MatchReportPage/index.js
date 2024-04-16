import "./index.css";
import React, { useEffect, useState } from "react";
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
  const [matchNumber, setMatchNumber] = useState("");
  const [eventCode, setEventCode] = useState("");

  const [areaFour, setAreaFour] = useState([""]);
  const [areaFive, setAreaFive] = useState([""]);
  const [areaSix, setAreaSix] = useState([""]);
  const [areaSeven, setAreaSeven] = useState([""]);

  function calculatePercentages(numbers) {
    if (numbers.length === 0) {
      return [];
    }
    const total = numbers.reduce((acc, num) => acc + Number(num), 0);
    return numbers.map((num) => (Number(num) / total) * 100);
  }

  const updateAreaFour = async () => {
    let data = [];
    redData.forEach((team) => {
      data.push(calculatePercentages(team.data3.slice(1)));
    });
    blueData.forEach((team) => {
      data.push(calculatePercentages(team.data3.slice(1)));
    });
    setAreaFour(data);
  };

  const updateAreaFive = async () => {
    let data = [];
    redData.forEach((team) => {
      data.push(calculatePercentages(team.data4.slice(1)));
    });
    blueData.forEach((team) => {
      data.push(calculatePercentages(team.data4.slice(1)));
    });
    setAreaFive(data);
  };

  const updateAreaSix = async () => {
    let data = [];
    redData.forEach((team) => {
      data.push(Number(team.data0[3].slice(0, -1)));
    });
    blueData.forEach((team) => {
      data.push(Number(team.data0[3].slice(0, -1)));
    });
    setAreaSix(data);
  };

  const updateAreaSeven = async () => {
    let data = [];
    redData.forEach((team) => {
      data.push(calculatePercentages(team.data0.slice(1, -1)));
    });
    blueData.forEach((team) => {
      data.push(calculatePercentages(team.data0.slice(1, -1)));
    });
    setAreaSeven(data);
  };

  useEffect(() => {
    if (redData.length === 0 || blueData.length === 0) {
      return;
    }
    updateAreaFour();
    updateAreaFive();
    updateAreaSix();
    updateAreaSeven();
  }, [redData, blueData]);

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
            layout={layout}
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
        {redData.length !== 0 || matchNumber !== "" ? (
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
                values={areaFour}
                legend={["W", "D", "E"]}
              />
            </div>
            <div className="area-five">
              <AllianceStackBar
                title={"Tele Charge Station"}
                teams={[...redAlliance, ...blueAlliance]}
                values={areaFive}
                legend={["W", "P", "D", "E"]}
              />
            </div>
            <div className="area-six">
              <AllianceBar
                title={"Mobility %"}
                teams={[...redAlliance, ...blueAlliance]}
                values={areaSix}
              />
            </div>
            <div className="area-seven">
              <AllianceStackBar
                title={"Cone and Cube Percent"}
                teams={[...redAlliance, ...blueAlliance]}
                values={areaSeven}
                legend={["Cubes", "Cones"]}
              />
            </div>
            <div className="area-eight">
              <AllianceStackBarTeams
                title="Average Points"
                teams={[redAlliance, blueAlliance]}
                values={[
                  [redData[0]?.data0, redData[1]?.data0, redData[2]?.data0],
                  [blueData[0]?.data0, blueData[1]?.data0, blueData[2]?.data0],
                ]}
                legend={["Red Alliance", "Blue Alliance"]}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default MatchReportPage;
