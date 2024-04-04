import React from "react";
import { Link, useLocation } from "react-router-dom";
import house from '../assets/navbar-house.png';
import plus from '../assets/Shape.png';
import settings from '../assets/navbar-settings.png';
import notifications from'../assets/navbar-notification.png';
import emptyhouse from '../assets/emptyhouse.png';

export const Nav = () => {
  const location = useLocation()
  const pageName = location?.pathname ?? "/"

  return (
    <div className="sideNavbar">
      <Link to="" className="navImageLink">
        <img src={pageName === "/" ? house : emptyhouse} className="navImage"/>
      </Link>

      <Link to="NewJob" className="navImageLink">
        <img src={plus} className="navImage"/>
      </Link>
      <Link to="" className="navImageLink">
        <img src={notifications} className="navImage"/>
      </Link>
      <Link to="" className="navImageLink">
        <img src={settings} className="navImage"/>
      </Link>
    </div>   
  );
};

export default Nav;
