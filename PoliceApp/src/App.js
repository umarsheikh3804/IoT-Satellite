import React from "react";
import Home from "./components/Home"
import Nav from "./components/Nav"
import NewJob from "./components/NewJob";
import VoiceBar from "./components/VoiceBar";
import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"

export const App = () => {
  
  const layout = <div className="wrapper">
    <div className="navPage">
      <Nav/>
      <Outlet/>
    </div>
    <VoiceBar/>
  </div>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={layout}>
          <Route path="" element={<Home/>}/>
          <Route path="newJob" element={<NewJob/>}/>
          
        </Route>

        
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;
