import React from "react";

export const Nav = () => {
  const onSettingsClicked = () => {
    
  };
  return (
    <div className="top-navbar">
      <div className="ellipse" />
      <div>
        <div className="text-wrapper">FirstResponder</div>
        <div className="text-wrapper-2">Police Dispatch</div>
      </div>
      <div className="text-wrapper-3">Dashboard</div>
      <div className="text-wrapper-4">Notifications</div>
      <div className="text-wrapper-5" onClick={onSettingsClicked}>Settings</div>
      <div className="text-wrapper-6">Map</div>

    </div>
          /*<div className="overlap-group">
            <div className="rectangle" />
            <div className="ellipse" />
            <img className="vector" alt="Vector" src="vector-3.svg" />
            <div className="div" />
            <div className="text-wrapper">FirstResponder</div>
            <div className="text-wrapper-2">Police Dispatch</div>
            <div className="text-wrapper-3">Dashboard</div>
            <div className="text-wrapper-4">Notifications</div>
            <div className="text-wrapper-5" onClick={onSettingsClicked}>Settings</div>
            <div className="text-wrapper-6">Map</div>
            <div className="ellipse-2" />
            <img className="line" alt="Line" src="line-6.svg" />
            <div className="text-wrapper-7">2510 Rio Grande St</div>
            <div className="group">
              <div className="overlap-group-2">
                <div className="text-wrapper-8">John Smith</div>
                <img className="img" alt="Line" src="line-1.svg" />
              </div>
            </div>
            <div className="text-wrapper-9">Description</div>
            <div className="text-wrapper-10">Notes</div>
            <img className="line-2" alt="Line" src="image.svg" />
            <img className="line-3" alt="Line" src="line-2.svg" />
            <div className="overlap-group-wrapper">
              <div className="overlap-2">
                <div className="text-wrapper-8">7:06 PM</div>
                <img className="line-4" alt="Line" src="line-3.svg" />
              </div>
            </div>
            <div className="div-wrapper">
              <div className="overlap-3">
                <div className="text-wrapper-11">(512)647-3625</div>
                <img className="line-5" alt="Line" src="line-2-2.svg" />
              </div>
            </div>
            <div className="group-2">
              <div className="overlap-4">
                <div className="group-3">
                  <div className="overlap-group-3">
                    <div className="text-wrapper-8">Urgent</div>
                    <img className="line-6" alt="Line" src="line-4.svg" />
                  </div>
                </div>
                <img className="vector-2" alt="Vector" src="vector-2.svg" />
              </div>
            </div>
            <div className="group-4">
              <div className="overlap-5">
                <div className="group-5">
                  <div className="overlap-group-4">
                    <div className="text-wrapper-8">Ambulance</div>
                    <img className="line-7" alt="Line" src="line-5.svg" />
                  </div>
                </div>
                <img className="vector-3" alt="Vector" src="vector-3-2.svg" />
              </div>
            </div>
            <div className="rectangle-2" />
            <div className="rectangle-3" />
            <div className="text-wrapper-12">Save</div>
            <div className="text-wrapper-13">Cancel</div>
          </div>
          <div className="ellipse-3" />
          <div className="ellipse-4" />
          <div className="ellipse-5" />
          <div className="ellipse-6" />
          <div className="overlap-6">
            <div className="ellipse-7" />
            <div className="ellipse-8" />
            <img className="color" alt="Color" src="color.svg" />
          </div>
        </div>
      </div>
    </div>*/
  );
};

export default Nav;
