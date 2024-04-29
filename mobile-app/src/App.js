import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings'
import Navbar from './components/Navbar';
import {useState, useEffect} from "react";

function App() {
  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  const router = {
    "dashboard": <Dashboard setPage={setPage}/>,
    "settings": <Settings setPage={setPage}/>,
  };
  
  return (
    <div className='App flexCol'>
      {router[page]}
      {(page === "dashboard" || page === "settings") && <Navbar setPage={setPage}/>}
    </div>
  );
}

export default App;
