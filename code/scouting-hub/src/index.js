import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import AppStatusPage from "./pages/AppStatusPage";
import APIDataPage from "./pages/APIDataPage";
import CSVDataPage from "./pages/CSVDataPage";
import MatchReportPage from "./pages/MatchReportPage";
import AllianceSelectionPage from "./pages/AllianceSelectionPage";
import SettingsPage from "./pages/SettingsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AppStatusPage />} />
        <Route path="/api-data" element={<APIDataPage />} />
        <Route path="/csv-data" element={<CSVDataPage />} />
        <Route path="/match-report" element={<MatchReportPage />} />
        <Route path="/alliance-selection" element={<AllianceSelectionPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
