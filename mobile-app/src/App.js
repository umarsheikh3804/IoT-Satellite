import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings'
import Navbar from './components/Navbar';
import NewJob from './components/NewJob';
import {useState, useEffect} from "react";

import { ref, set, onValue } from "firebase/database";
import { db } from './firebase';

const userID = "id"

function App() {

  useEffect(() => {

    function getLocation() {
      const myRef = ref(db, `/vehicles/${userID}/coords`);
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords)
        set(myRef, {latitude: position.coords.latitude, longitude: position.coords.longitude});
      });
    }

    let intervalId = setInterval(getLocation, 5000)
    
    return () => {
      clearInterval(intervalId)
    }

  },[])

  const [page, setPage] = useState("dashboard");
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const userRef = ref(db, `/vehicles/${userID}/notification`);
    return onValue(userRef, (snapshot) => {
      const notificationData = snapshot.val();
      console.log(notificationData)
      if (snapshot.exists() && notificationData) {
        setPage("newJob")
        setNotification(notificationData)
        console.log("going to new job")
      } else {
        setPage("dashboard")
        console.log("going home")
      }
     
    });
  }, [userID]);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  const router = {
    "dashboard": <Dashboard setPage={setPage}/>,
    "settings": <Settings setPage={setPage}/>,
    "newJob": <NewJob setPage={setPage}/>
  };
  
  return (
    <div className='App flexCol'>
      {router[page]}
      {(page === "dashboard" || page === "settings") && <Navbar setPage={setPage} notification={notification}/>}
    </div>
  );
}

export default App;
