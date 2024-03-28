import React from "react";
import Home from "./components/Home"
import Nav from "./components/Nav"
import "./App.css";

export const App = () => {
  const onSettingsClicked = () => {
    
  };
  return (
    <div className="wrapper">
      <Nav/>
      <Home/>
    </div>
  );
};

export default App;
