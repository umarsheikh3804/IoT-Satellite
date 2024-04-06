import React, { useState, useEffect } from "react";
import line from '../assets/line.svg';
import map from '../assets/map.svg';

const DateTimeDisplay = ({ currentTime }) => {
  const formatTime = (time) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(time);
  };

  const formatDate = (time) => {
    const options = {
      weekday: "short",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(time);
    
    // Split the formatted date by comma and space, then join the parts
    const dateParts = formattedDate.split(", ");
    const formattedParts = dateParts.filter(part => part !== undefined && part !== null);

    return formattedParts.join(" ");
  };

  return (
    <div className="dateTimeContainer">
      <div className="dateDisplay">
        <p className="currentDate">{formatDate(currentTime)}</p>
      </div>
      <div className="timeDisplay">
        <p className="currentTime">{formatTime(currentTime)}</p>
      </div>
    </div>
  );
};

export const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="homePage">
       {/*<img src={map} className="mapImage"/>*/}
      <div className="topWrapper">
        <div className="vehiclesBox">
          <div className="vehicleHeader">
            <p className="vehicleName">Vehicle</p>
            <div className="blueNotification">
              <p className="notificationText">241</p>
            </div>
          </div>
          <div className="vehicleStatus">
            <div className="statusContainer">
              <p className="statusType">Available</p>
              <div className="greenNotification">
                <p className="notificationText">59</p>
              </div>
            </div>
            <img src={line} className="vehicleLine" alt="Line" />
            <div className="statusContainer">
              <p className="statusType">Occupied</p>
              <div className="yellowNotification">
                <p className="notificationText">162</p>
              </div>
            </div>
            <img src={line} className="vehicleLine" alt="Line" />
            <div className="statusContainer">
              <p className="statusType">Away</p>
              <div className="redNotification">
                <p className="notificationText">20</p>
              </div>
            </div>
          </div>
        </div>
        <div className="timeBox">
          <div className="timeSection">
            <DateTimeDisplay currentTime={currentTime} />
          </div>
        </div>
      </div>
      <div className="allJobs">
        <div className="jobTitle">
          <p className="allJobsTitle">All Jobs</p>
          <div className="blueNotification">
            <p className="notificationText">65</p>
          </div>
        </div>
        <div className="jobInfo">
          <div className="jobContainer"></div>
          <img src={line} className="vehicleLine" alt="Line" />
          <div className="statusContainer">
            <p className="statusType">Occupied</p>
            <div className="yellowNotification">
              <p className="notificationText">162</p>
            </div>
          </div>
          <img src={line} className="vehicleLine" alt="Line" />
          <div className="statusContainer">
            <p className="statusType">Away</p>
            <div className="redNotification">
              <p className="notificationText">20</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
