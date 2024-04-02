import React from "react";
import plus from '../assets/plus.png';

export const Home = () => {
  return (
    <div className="homePage">
      <div className = "allJobs">
        <div className ="jobTitle">
          <p className = "allJobsTitle">All Jobs</p>
          <img src={plus} className="jobNotification"/>
          </div>

      </div>

    </div>
  );
};

export default Home;
