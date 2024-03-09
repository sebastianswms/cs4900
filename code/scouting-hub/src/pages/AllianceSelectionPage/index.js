import React from 'react';
import Navbar from "../../components/Navbar";
import TeamTable from '../../components/tables/allienceSelection';

const labels = [
  "Overall",
  "Average Auto Scores",
  "Average Tele Scores",
  "Auto Charge",
  "Tele Charge",
];

const group0Labels = ["Avg Pts", "Size DT", "95% CI"];
const group1Labels = ["Cone", "Cube"];
const group2Labels = ["Cone", "Cube"];
const group3Labels = ["Avg Pts", "W", "D", "E"];
const group4Labels = ["Avg Pts", "W", "P", "D", "E"];

const groupLabels =[group0Labels, group1Labels, group2Labels, group3Labels, group4Labels];

export const teamData = [
  {
    team: "4479",
    name: "RoboSapiens",
    group0Label: labels[0],
    group0Data: { labels: group0Labels, data: ["47.2", "", "32-47"] },
    group1Label: labels[1],
    group1Data: { labels: group1Labels, data: ["3.3", "3.3"] },
    group2Label: labels[2],
    group2Data: { labels: group2Labels, data: ["12.0", "2.9"] },
    group3Label: labels[3],
    group3Data: { labels: group3Labels, data: ["1.11", "4", "0", "7"] },
    group4Label: labels[4],
    group4Data: { labels: group4Labels, data: ["6.66", "1", "0", "2", "8"] },
  },
  {
    team: "2054",
    name: "Tech Vikes",
    group0Label: labels[0],
    group0Data: { labels: group0Labels, data: ["49.9", "", "20-49"] },
    group1Label: labels[1],
    group1Data: { labels: group1Labels, data: ["2.5", "4.0"] },
    group2Label: labels[2],
    group2Data: { labels: group2Labels, data: ["18.7", "3.2"] },
    group3Label: labels[3],
    group3Data: { labels: group3Labels, data: ["2.22", "6", "0", "6"] },
    group4Label: labels[4],
    group4Data: { labels: group4Labels, data: ["5.55", "2", "4", "1", "5"] },
  },
  {
    team: "5675",
    name: "WiredCats",
    group0Label: labels[0],
    group0Data: { labels: group0Labels, data: ["52.1", "", "10-52"] },
    group1Label: labels[1],
    group1Data: { labels: group1Labels, data: ["6.0", "0.0"] },
    group2Label: labels[2],
    group2Data: { labels: group2Labels, data: ["5.1", "13.5"] },
    group3Label: labels[3],
    group3Data: { labels: group3Labels, data: ["3.33", "1", "1", "9"] },
    group4Label: labels[4],
    group4Data: { labels: group4Labels, data: ["4.44", "1", "4", "1", "5"] },
  },
  {
    team: "3539",
    name: "Byting Bulld",
    group0Label: labels[0],
    group0Data: { labels: group0Labels, data: ["53.5", "", "50-53"] },
    group1Label: labels[1],
    group1Data: { labels: group1Labels, data: ["5.8", "4.4"] },
    group2Label: labels[2],
    group2Data: { labels: group2Labels, data: ["15.1", "7.6"] },
    group3Label: labels[3],
    group3Data: { labels: group3Labels, data: ["4.44", "10", "0", "1"] },
    group4Label: labels[4],
    group4Data: { labels: group4Labels, data: ["3.33", "0", "01", "1", "9"] },
  },
  {
    team: "3534",
    name: "House of Cars",
    group0Label: labels[0],
    group0Data: { labels: group0Labels, data: ["45.8", "", "45-60"] },
    group1Label: labels[1],
    group1Data: { labels: group1Labels, data: ["3.2", "1.9"] },
    group2Label: labels[2],
    group2Data: { labels: group2Labels, data: ["11.7", "4.0"] },
    group3Label: labels[3],
    group3Data: { labels: group3Labels, data: ["5.55", "7", "0", "6"] },
    group4Label: labels[4],
    group4Data: { labels: group4Labels, data: ["2.22", "1", "3", "0", "9"] },
  },
  {
    team: "5436",
    name: "Cyber Cats",
    group0Label: labels[0],
    group0Data: { labels: group0Labels, data: ["40.7", "", "55-60"] },
    group1Label: labels[1],
    group1Data: { labels: group1Labels, data: ["5.8", "0.0"] },
    group2Label: labels[2],
    group2Data: { labels: group2Labels, data: ["10.4", "6.2"] },
    group3Label: labels[3],
    group3Data: { labels: group3Labels, data: ["16.66", "8", "2", "1"] },
    group4Label: labels[4],
    group4Data: { labels: group4Labels, data: ["1.11", "2", "3", "1", "5"] },
  },
];

export default function AllianceSelectionPage() {
  return (
    <div className="page">
      <Navbar />
      <div className="page-container">
        <div className="box">
          <div className="header">
            <h1>Alliance Selection</h1>
          </div>
          <div className="divider"></div>
          <div className="tables-container">
            {labels.map((label, index) => (
              <TeamTable
                key={index}
                label={label}
                groupXLabels={groupLabels[index]}
                teamData={teamData}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}