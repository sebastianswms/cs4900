import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="no-print">
      <ul>
        <li>
          <Link to="/">App Status</Link>
        </li>
        <li>
          <Link to="/api-data">API Data</Link>
        </li>
        <li>
          <Link to="/csv-data">CSV Data</Link>
        </li>
        <li>
          <Link to="/match-report">Match Report</Link>
        </li>
        <li>
          <Link to="/alliance-selection">Alliance Selection</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
