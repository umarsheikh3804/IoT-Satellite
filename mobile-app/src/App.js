import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings'
import Navbar from './components/Navbar';
import {useState, useEffect} from "react";

function App() {
  const [page, setPage] = useState("dashboard")

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => console.log(pos.coords));
    } else { 
      console.log("Geolocation is not supported by this browser.")
    }
  }

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [])


  const router = {
    "dashboard": <Dashboard setPage={setPage}/>,
    "settings": <Settings setPage={setPage}/>,
  }
  
  return <div className='App flexCol'>
    {router[page]}
    {(page === "dashboard" || page === "settings") && <Navbar/>}
  </div>
}

export default App;
