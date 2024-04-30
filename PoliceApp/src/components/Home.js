import React, { useState, useEffect } from "react";
import line from '../assets/line.svg';
import map from '../assets/map.svg';
import { db } from '../firebase';
import { onValue, ref } from "firebase/database";



const vechicleTypes = {
  1: "Cars",
  2: "Ambulances",
  3: "Firetrucks"
}



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

    return formattedParts.join(" ").toUpperCase();
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
  const [vehicleStats, setVehicleStats] = useState({available: 0, occupied: 0, away: 0})
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const query = ref(db, `/vehicleStats`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (snapshot.exists()) {
        setVehicleStats(data)
      }
    });
  }, []);

  useEffect(() => {
    const query = ref(db, `/jobs`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (snapshot.exists()) {
        setJobs(Object.values(data))
      }
    });
  }, []);



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
              <p className="notificationText">{vehicleStats.available + vehicleStats.occupied + vehicleStats.away}</p>
            </div>
          </div>
          <div className="vehicleStatus">
            <div className="statusContainer">
              <p className="statusType">Available</p>
              <div className="greenNotification vsNotification">
                <p className="notificationText">{vehicleStats.available}</p>
              </div>
            </div>
            <img src={line} className="vehicleLine" alt="Line" />
            <div className="statusContainer">
              <p className="statusType">Occupied</p>
              <div className="yellowNotification vsNotification">
                <p className="notificationText">{vehicleStats.occupied}</p>
              </div>
            </div>
            <img src={line} className="vehicleLine" alt="Line" />
            <div className="statusContainer">
              <p className="statusType">Away</p>
              <div className="redNotification vsNotification">
                <p className="notificationText">{vehicleStats.away}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="timeBox">
          <div className="timeSection">
            <DateTimeDisplay currentTime={currentTime} />
          </div>
          <div className = 'newsBox'>
            <p className = 'recent'>Recent Road Closures</p>
            <p className = 'recentStreet1'>N Main Blvd</p>
            <p className = 'recentTime'>End: March 23 - 00:00</p>
            <p className = 'recentStreet2'>Guadalupe St</p>
            <p className = 'recentTime2'>Mar 22 - 6:00</p>
          </div>
        </div>
      </div>
      <div className="allJobs">
        <div className="jobTitle">
          <p className="allJobsTitle">All Jobs</p>
          <div className="blueNotification">
            <p className="notificationText">{jobs.length}</p>
          </div>
        </div>
        <div className="jobContainer">
          <div className="jobHeader jobRow">
            <p>Priority</p>
            <p>Job</p>
            <p>Address</p>
            <p>Vehicles</p>
            <p>Time</p>
          </div>
          <div className="jobList">
            {jobs && jobs.map((job, index) => <div className="jobRow listItem" key={index}>
              <p>{job.priority}</p>
              <p>{job.job}</p>
              <p>{job.address}</p>
              <p>{vechicleTypes[job.vehicleType]}</p>
              <p>{job.callTime}</p>

            </div>)}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Home;