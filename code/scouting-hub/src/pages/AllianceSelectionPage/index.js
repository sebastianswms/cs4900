import "./index.css";
import React from "react";
import Navbar from "../../components/Navbar";
import ScrollableTable from "../../components/tables/allienceSelection";

const testData = [
  ['Rank', 'Team', 'weight 2', 'weight 3', 'weight 4', 'weight 5', 'weight 6'],
  [1, 1001, 3, 7, 2, 5, 9],
  [2, 1002, 6, 1, 8, 4, 2],
  [3, 1003, 4, 9, 3, 7, 6],
  [4, 1004, 2, 5, 1, 9, 3],
  [5, 1005, 8, 3, 7, 1, 4],
  [6, 1006, 5, 8, 6, 3, 7],
  [7, 1007, 1, 6, 9, 2, 8],
  [8, 1008, 9, 2, 4, 8, 1],
  [9, 1009, 7, 4, 5, 6, 2],
  [10, 1010, 3, 7, 2, 5, 9],
  [11, 1011, 6, 1, 8, 4, 2],
  [12, 1012, 4, 9, 3, 7, 6],
  [13, 1013, 2, 5, 1, 9, 3],
  [14, 1014, 8, 3, 7, 1, 4],
  [15, 1015, 5, 8, 6, 3, 7],
  [16, 1016, 1, 6, 9, 2, 8],
  [17, 1017, 9, 2, 4, 8, 1],
  [18, 1018, 7, 4, 5, 6, 2],
  [19, 1019, 3, 7, 2, 5, 9],
  [20, 1020, 6, 1, 8, 4, 2],
  [21, 1021, 4, 9, 3, 7, 6],
  [22, 1022, 2, 5, 1, 9, 3],
  [23, 1023, 8, 3, 7, 1, 4],
  [24, 1024, 5, 8, 6, 3, 7],
  [25, 1025, 1, 6, 9, 2, 8],
  [26, 1026, 9, 2, 4, 8, 1],
  [27, 1027, 7, 4, 5, 6, 2],
  [28, 1028, 3, 7, 2, 5, 9],
  [29, 1029, 6, 1, 8, 4, 2],
  [30, 1030, 4, 9, 3, 7, 6],
];


const Headers = [
  'Rank',
  'Team',
  'weight 2',
  'weight 3',
  'weight 4',
  'weight 5',
  'weight 6'
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
        <div>
          <ScrollableTable data={testData} headers={Headers}/>
        </div>
        </div>
      </div>
    </div>
  );
}
