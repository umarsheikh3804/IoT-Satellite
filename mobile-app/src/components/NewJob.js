import { useState, useEffect } from "react";
import { APIProvider, Map, Marker, Pin, AdvancedMarker } from '@vis.gl/react-google-maps';
import policeImg from '../assets/police.png';

function NewJob(props) {
  const [position, setPosition] = useState({ lat: 30.28893526046258, lng: -97.74046586057841 });

  // Use useEffect to update the position state based on user interaction or other events
  useEffect(() => {
    // Your logic to update the position state goes here
  }, []);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map defaultZoom={14} defaultCenter={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
          {/* Add a marker for the specified position */}
          <Marker position={{ lat: 30.29069342671262, lng: -97.74467650290607 }} onClick={() => console.log("Marker clicked")}>
            <Pin
              color={'#000'}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </Marker>

        </Map>
        {/* Your other content goes here */}
        <div className="newJob page">
          <p>New Job</p>
          <p>{props.notification ? JSON.stringify(props.notification) : "no notification"}</p>
        </div>
        {/* Box with job information */}
        <div className="jobInfoBox">
          <p className="notifTitle">NEW JOB</p>
          <p className="notifInfo">2510 Rio Grande St</p>
          <p className="notifInfo">Aggravated Assault</p>
          <p className="notifInfo">0.2mi 3min away</p>
        </div>
      </div>
    </APIProvider>
  );
}

export default NewJob;
