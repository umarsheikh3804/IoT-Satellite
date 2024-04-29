import React from 'react';
import { FaHome, FaCog } from 'react-icons/fa'; // Importing icons from react-icons library

function Navbar({ setPage }) {
  return (
    <div className="navbar">
      {/* Home Icon */}
      <div className="navIcon" onClick={() => setPage("dashboard")}>
        <FaHome />
      </div>
      {/* Settings Icon */}
      <div className="navIcon" onClick={() => setPage("settings")}>
        <FaCog />
      </div>
    </div>
  );
}

export default Navbar;
