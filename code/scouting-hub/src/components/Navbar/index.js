import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.webp";

export default function Navbar() {
  return (
    <div className="nav no-print">
      <img src={logo} alt="Logo" width="90px" />
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
