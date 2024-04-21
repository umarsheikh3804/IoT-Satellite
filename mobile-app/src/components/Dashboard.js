import { db } from '../firebase';
import { onValue, ref, set } from "firebase/database";
import { useState, useEffect } from "react"
import DateTimeDisplay from './DateTimeDisplay';
import line from '../assets/line.svg';

const statuses = ["On Call", "Occupied", "Away"]

function Dashboard(props) {
  const [userID, setUserID] = useState("fakeUser")
  const [status, setStatus] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date());
  const [statusPopup, setStatusPopup] = useState(0)

  useEffect(() => {
    const query = ref(db, `/vehicles/${userID}/status`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (snapshot.exists()) {
        setStatus(data)
      }
    });
  }, [userID]);

  function updateStatus(newStatus) {
    const myRef = ref(db, `/vehicles/${userID}/status`)
    set(myRef, newStatus)
  }

  return (
    <div className="dashboard page">
      <DateTimeDisplay currentTime={currentTime} />
      <p className="dashboardTitle">Dashboard</p>

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
      </div>
      <p>{statuses[status]}</p>

      <button onClick={() => setStatusPopup(1)}>Show Status Popup</button>


      {statusPopup === 1 && <div className='statusPopup'>
        <p>Username</p>
        <p>Austin Police Department ID 817</p>
        <p>Car No. 1424</p>
        <div className="statusOption" onClick={() => setStatusPopup(2)}>{statuses[status]}</div>
      </div>}
      {statusPopup === 2 && <div className='statusPopup'>
        <div className="statusHeader" onClick={() => setStatusPopup(1)}> Change Status</div>
        {[...Array(3).keys()].map(i => <div key={i}
          className="statusOption" onClick={() => updateStatus(i)}
        >
          {statuses[i]}
        </div>)}
      </div>}

    </div>
  );
}

export default Dashboard;
