import { db } from '../firebase';
import { onValue, ref, set } from "firebase/database";
import { useState, useEffect } from "react";
import DateTimeDisplay from './DateTimeDisplay';
import line from '../assets/line.svg';
import statusImage from '../assets/police.png';

const statuses = ["On Call", "Occupied", "Away"];

function Dashboard(props) {
  const [userID, setUserID] = useState("id");
  const [status, setStatus] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [statusPopup, setStatusPopup] = useState(0);
  const [userData, setUserData] = useState(null);
  const [vehiclesData, setVehiclesData] = useState({});
  const [selectedStatus, setSelectedStatus] = useState(0); // New state to store the selected status

  const handleStatusPopup = () => {
    setStatusPopup((prevPopup) => {
      if (prevPopup === 1) {
        return 0;
      } else {
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
    const query = ref(db, `/vehicles/${userID}`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setVehiclesData(data);
      }
    });
  }, []);


  function showLocation() {
    const myRef = ref(db, `/vehicles/${userID}/coords`);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords)
      set(myRef, { latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
  }

  function updateStatus(newStatus) {
    const myRef = ref(db, `/vehicles/${userID}/status`);
    set(myRef, newStatus);
    // Update the selected status when a status option is clicked in the second popup
    setSelectedStatus(newStatus);
    // Close the second popup
    setStatusPopup(1);
  }

  return (
    <div className="dashboard page">
      <DateTimeDisplay currentTime={currentTime} />

      <div className="dashboardHeader">
        <p className="dashboardTitle">Dashboard</p>
        <img className="policeImg" src={statusImage} alt="Status" onClick={() => setStatusPopup(1)} />
      </div>

      <div className="contentContainer">
        <div className="allJobs">
          <div className="jobTitle">
            <p className="allJobsTitle">Job History</p>
            <div className="blueNotification">
              <p className="notificationText">0</p>
            </div>
          </div>
          <div className="jobInfo">
            <div className="jobInfoSubtitles">
              <p className="prioritySubTitle">Priority</p>
              <p className="jobSubTitle">Job</p>
              <p className="addressSubTitle">Addresses</p>
            </div>
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
            {userData && (
              <div className="userData">
                <p className="policeName">{userData.name}</p>
                <p className="deptInfo">Austin Police Department ID {userData.policeID}</p>
                <p className="deptInfo">Car No. {userData.carNum}</p>
              </div>
            )}
             <div className="statusOption" onClick={() => setStatusPopup(2)}>{statuses[selectedStatus]}</div>
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
