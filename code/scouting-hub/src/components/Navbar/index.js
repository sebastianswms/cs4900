import "./index.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.webp";
export default function Navbar() {
  const [isActive, setisActive] = useState(false);


  return (
    <div className={`nav ${isActive ? "active" : ""} no-print`}>
      <ul>
        <li onClick={ () => setisActive(!isActive)}>
        <img src={logo} alt="Logo" width="80px" className={`logo ${isActive ? "active" : ""}`} />
        <div className="svg_container"><svg className={`menu ${isActive ? "active" : ""}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
        <svg className={`menu_close ${isActive ? "active" : ""}`} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-4.793 9.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path></svg>
        </div>
        </li>
        <li>
          {/* <Link to="/">App Status</Link> */}
          {/* <img src={statusbttn} alt="App Status" width="24px" /> */}
          <Link to="/" className="nav_svg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.488 21.754c.294.157.663.156.957-.001 8.012-4.304 8.581-12.713 8.574-15.104a.988.988 0 0 0-.596-.903l-8.05-3.566a1.005 1.005 0 0 0-.813.001L3.566 5.747a.99.99 0 0 0-.592.892c-.034 2.379.445 10.806 8.514 15.115zM8.674 10.293l2.293 2.293 4.293-4.293 1.414 1.414-5.707 5.707-3.707-3.707 1.414-1.414z"/>
          </svg><span className={`active_text ${isActive ? "active" : ""}`}>App Status</span></Link>
          <span className={`tooltip ${isActive ? "active" : ""}`}>App Status</span>
        </li>
        <li>
          {/* <Link to="/api-data">API Data</Link> */}
          <Link to="/" className="nav_svg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 6c0-2.168-3.663-4-8-4S4 3.832 4 6v2c0 2.168 3.663 4 8 4s8-1.832 8-4V6zm-8 13c-4.337 0-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4v-3c0 2.168-3.663 4-8 4z"/>
          <path d="M20 10c0 2.168-3.663 4-8 4s-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4v-3z"/>
          </svg><span className={`active_text ${isActive ? "active" : ""}`}>API Data</span></Link>
          <span className={`tooltip ${isActive ? "active" : ""}`}>API Data</span>
        </li>
        <li>
          {/* <Link to="/csv-data">CSV Data</Link> */}
          <Link to="/" className="nav_svg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zm7 2h8v2h-8V7zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2zM6 7h2v2H6V7zm0 4h2v2H6v-2zm0 4h2v2H6v-2z"/>
          </svg><span className={`active_text ${isActive ? "active" : ""}`}>CSV Data</span></Link>
          <span className={`tooltip ${isActive ? "active" : ""}`}>CSV Data</span>
        </li>
        <li>
          {/* <Link to="/match-report">Match Report</Link> */}
          <Link to="/match-report" className="nav_svg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m20 8-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM9 19H7v-9h2v9zm4 0h-2v-6h2v6zm4 0h-2v-3h2v3zM14 9h-1V4l5 5h-4z"/>
          </svg><span className={`active_text ${isActive ? "active" : ""}`}>Match Report</span></Link>
          <span className={`tooltip ${isActive ? "active" : ""}`}>Match Report</span>
        </li>
        <li>
          {/* <Link to="/alliance-selection">Alliance Selection</Link> */}
          <Link to="/alliance-selection" className="nav_svg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm1.5 1H8c-3.309 0-6 2.691-6 6v1h15v-1c0-3.309-2.691-6-6-6z"/>
          <path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"/>
          </svg><span className={`active_text ${isActive ? "active" : ""}`}>Alliance Selection</span></Link>
          <span className={`tooltip ${isActive ? "active" : ""}`}>Alliance Selection</span>
        </li>
        <li>
          {/* <Link to="/settings">Settings</Link> */}
          <Link to="/settings" className="nav_svg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"/>
          </svg><span className={`active_text ${isActive ? "active" : ""}`}>Settings</span></Link>
          <span className={`tooltip ${isActive ? "active" : ""}`}>Settings</span>
        </li>
      </ul>
    </div>
  );
}
