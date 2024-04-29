import { db } from '../firebase';
import { onValue, ref, set } from "firebase/database";
import { useState, useEffect } from "react";
import DateTimeDisplay from './DateTimeDisplay';
import line from '../assets/line.svg';
import statusImage from '../assets/police.png';

const statuses = ["On Call", "Occupied", "Away"];

function Dashboard(props) {
  const [userID, setUserID] = useState("fakeUser");
  const [status, setStatus] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [statusPopup, setStatusPopup] = useState(0);
  const [userData, setUserData] = useState(null);
  const [vehiclesData, setVehiclesData] = useState({});

  const handleStatusPopup = () => {
    setStatusPopup((prevPopup) => {
      // Toggle the status popup
      if (prevPopup === 1) {
        // If the status popup is already open, close it and show the navbar
        return 0;
      } else {
        // If the status popup is closed, open it and hide the navbar
        return 1;
      }
    });
  };

  useEffect(() => {
    const query = ref(db, `/vehicles/${userID}/status`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setStatus(data);
      }
    });
  }, [userID]);

  useEffect(() => {
    const userRef = ref(db, `/users/${userID}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setUserData(userData);
    });
  }, [userID]);

  useEffect(() => {
    const query = ref(db, `/vehicles`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setVehiclesData(data);
      }
    });
  }, []);

  function updateStatus(newStatus) {
    const myRef = ref(db, `/vehicles/${userID}/status`);
    set(myRef, newStatus);
  }

  return (
    <div className="dashboard page">
      <DateTimeDisplay currentTime={currentTime} />

      <div className="dashboardHeader">
        <p className="dashboardTitle">Dashboard</p>
        <img className="policeImg" src={statusImage} alt="Status" onClick={() => setStatusPopup(1)} />
      </div>

      {userData && (
        <div className="userData">
          <p>Username: {userData.username}</p>
          <p>Austin Police Department ID: {userData.apdID}</p>
          <p>Car No.: {userData.carNumber}</p>
        </div>
      )}

      <div className="contentContainer">
        <div className="allJobs">
          <div className="jobTitle">
            <p className="allJobsTitle">Job History</p>
            <div className="blueNotification">
              <p className="notificationText">65</p>
            </div>
          </div>
          <div className="jobInfo">
            <div className="jobInfoSubtitles">
              <p className="prioritySubTitle">Priority</p>
              <p className="jobSubTitle">Job</p>
              <p className="addressSubTitle">Addresses</p>
            </div>
            <img src={line} className="subtitleLine" alt="Line" />
            <div className="jobContainer"></div>
          </div>

          <div className="jobStats">
            <div>
              {Object.keys(vehiclesData).map((vehicleID) => (
                <div key={vehicleID} className="vehicleContainer">
                  <div className="vehicleInfo">
                    <p>{vehiclesData[vehicleID].priority}</p>
                  </div>
                  <div className="vehicleInfo">
                    <p>{vehiclesData[vehicleID].job}</p>
                  </div>
                  <div className="vehicleInfo">
                    <p>{vehiclesData[vehicleID].address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status popup */}
        {statusPopup === 1 && (
          <div className='statusPopup'>
            <p>{userData && `Name: ${userData.name}`}</p>
            <p>{userData && `Austin Police Department ID: ${userData.apdID}`}</p>
            <p>{userData && `Car No.: ${userData.carNumber}`}</p>
            <div className="statusOption" onClick={() => setStatusPopup(2)}>{statuses[status]}</div>
          </div>
        )}

        {statusPopup === 2 && (
          <div className='statusPopup'>
            <div className="statusHeader" onClick={() => setStatusPopup(1)}>
              <span>&larr;</span> Change Status
            </div>
            {[...Array(3).keys()].map(i => (
              <div key={i} className="statusOption" onClick={() => updateStatus(i)}>
                {statuses[i]}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;
