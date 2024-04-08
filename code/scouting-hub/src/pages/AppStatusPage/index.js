import "./index.css";
import React from "react";
import Navbar from "../../components/Navbar";

export default function AppStatusPage() {
  return (
    <div className="page">
      <Navbar />
      <div>
        <div className="page-title">
          <h2>Application Status</h2>
        </div>
        <div style={{ width: "350px" }}>
          <div className="status-container">
            <div className="status-title">
              <h3>Settings</h3>
            </div>
            <div className="status-context">
              <div className="space-between">
                <label htmlFor="internet">Current Year:</label>
                <div id="internet" className="span--white">
                  2023
                </div>
              </div>
              <div className="space-between">
                <label htmlFor="internet">Current District:</label>
                <div id="internet" className="span--white">
                  FIM
                </div>
              </div>
              <div className="space-between">
                <label htmlFor="internet">Current Event:</label>
                <div id="internet" className="span--white">
                  MIGEL
                </div>
              </div>
            </div>
          </div>

          <div className="status-container">
            <div className="status-title">
              <h3>Api</h3>
            </div>
            <div className="status-context">
              <div className="space-between">
                <label htmlFor="internet">Internet Connection:</label>
                <div id="internet" className="span--white">
                  {window.navigator.onLine ? <span>✔️</span> : <span>❌</span>}
                </div>
              </div>
              <div className="space-between">
                <label htmlFor="internet">First Robotics API:</label>
                <div id="internet" className="span--white">
                  {window.navigator.onLine ? <span>✔️</span> : <span>❌</span>}
                </div>
              </div>
              <div className="space-between">
                <label htmlFor="internet">FRC API Username/Token:</label>
                <div id="internet" className="span--white">
                  {window.navigator.onLine ? <span>✔️</span> : <span>❌</span>}
                </div>
              </div>
              <div className="space-between">
                <label htmlFor="internet">Current Year:</label>
                <div id="internet" className="span--white">
                  {window.navigator.onLine ? <span>✔️</span> : <span>❌</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="status-container">
            <div className="status-title">
              <h3>Database</h3>
            </div>
            <div className="status-context">
              <div className="space-between">
                <label htmlFor="internet">Database File available:</label>
                <div id="internet" className="span--white">
                  {window.navigator.onLine ? <span>✔️</span> : <span>❌</span>}
                </div>
              </div>
              <div className="space-between">
                <label htmlFor="internet"># of Events in DB:</label>
                <div id="internet" className="span--white">
                  1
                </div>
              </div>
              <div className="space-between">
                <label htmlFor="internet"># of Teams in DB:</label>
                <div id="internet" className="span--white">
                  90
                </div>
              </div>
              <div className="space-between">
                <label htmlFor="internet"># of Records in DB:</label>
                <div id="internet" className="span--white">
                  1337
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
