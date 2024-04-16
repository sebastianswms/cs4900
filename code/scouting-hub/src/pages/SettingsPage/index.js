import "./index.css";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function SettingsPage() {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;

    setData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await window.envConfig.writeConfig(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    try {
      window.envConfig.readConfig().then((data) => {
        setData({ ...data });
      });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <div className="page">
      <Navbar />
      <div>
        <div className="page-title">
          <h2>Settings</h2>
        </div>
        <form
          className="settings-container"
          style={{ width: "460px" }}
          onSubmit={handleSubmit}
        >
          <div className="settings-title">
            <h3>Configuration File</h3>
          </div>
          <div className="settings-context">
            <div className="space-between">
              <label htmlFor="api-username">API Username</label>
              <input
                id="api-username"
                name="API_USERNAME"
                value={data.API_USERNAME || ""}
                onChange={handleChange}
              ></input>
            </div>
            <div className="space-between">
              <label htmlFor="api-authorization-token">
                API Authorization Token
              </label>
              <input
                id="api-authorization-token"
                name="API_AUTHORIZATION_TOKEN"
                value={data.API_AUTHORIZATION_TOKEN || ""}
                onChange={handleChange}
                style={{ width: "30ch" }}
              ></input>
            </div>
            <div className="space-between">
              <label htmlFor="current-year">Current Year</label>
              <input
                id="current-year"
                name="CURRENT_YEAR"
                value={data.CURRENT_YEAR || ""}
                onChange={handleChange}
              ></input>
            </div>
            <div className="space-between">
              <label htmlFor="district">District</label>
              <input
                id="district"
                name="DISTRICT"
                value={data.DISTRICT || ""}
                onChange={handleChange}
              ></input>
            </div>
            <div className="space-between">
              <label htmlFor="current-event-code">Current Event Code</label>
              <input
                id="current-event-code"
                name="CURRENT_EVENT_CODE"
                value={data.CURRENT_EVENT_CODE || ""}
                onChange={handleChange}
              ></input>
            </div>
            <div className="space-between">
              <label htmlFor="layout">Layout</label>
              <input
                id="layout"
                name="LAYOUT"
                value={data.LAYOUT || ""}
                onChange={handleChange}
              ></input>
            </div>
            <div className="space-between">
              <label htmlFor="layout-id">Layout ID</label>
              <input
                id="layout-id"
                name="LAYOUT_ID"
                value={data.LAYOUT_ID || ""}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div style={{ alignSelf: "flex-end", margin: "0.25em 1em 1em 0em" }}>
            <button className="button--orange" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
