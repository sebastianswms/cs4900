import React from "react";
import Navbar from "../../components/Navbar";

export default function SettingsPage() {
  return (
    <div className="page">
      <Navbar />
      <div>
        <div className="page-title">
          <h2>Settings</h2>
        </div>
        <form>
          <div>
            <label htmlFor="api-username">API Username</label>
            <input name="api-username" id="api-username" value=""></input>
          </div>
          <div>
            <label htmlFor="api-authorization-token">
              API Authorization token
            </label>
            <input
              name="api-authorization-token"
              id="api-username"
              value=""
            ></input>
          </div>
          <button>Save Changes</button>
        </form>
      </div>
    </div>
  );
}
