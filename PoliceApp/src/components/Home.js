import React from "react";


export const Home = () => {
  return (
    <div className="homePage">
      <div className = "vehiclesBox">
        <div className="vehicleHeader">
          <p className = "vehicleName">Vehicle</p>
          <div className="blueNotification"></div>
          </div>
        </div>
      <div className = "allJobs">
        
        <div className ="jobTitle">
          
          <p className = "allJobsTitle">All Jobs</p> 
          <div className="blueNotification"></div>
        </div>
          <div className = "jobInfo">
            <p className = "jobHeaderText">Priority</p>
          </div>
        
      </div>

    </div>
  );
};

export default Home;
