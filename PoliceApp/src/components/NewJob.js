"use client";

import { useState, useEffect } from "react";
import React from "react";
import { db } from '../firebase';
import line from '../assets/line.svg';
import { onValue, ref } from "firebase/database";
import { Link } from 'react-router-dom';
import {
  APIProvider,
  Map,
  Marker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';

export default function Intro() {
  const position = { lat: 30.2672, lng: -97.74711985445532 };
  const [open, setOpen] = useState(false);
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    const query = ref(db, `/vehicles`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (snapshot.exists()) {
        setVehicles(Object.values(data))
      }
    });
  }, []);


  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <div className="rectangle">
          <div className="newJob">
            <p className="newJobt">New Job</p>
          </div>
            <div className = 'jobInfo'>
              <p className ='addressName'>2510 Rio Grande St</p>
              <p className = 'numberName'>512-738-1937</p>
              <p className = 'callTime'>7:06 PM</p>
            
            <div className = 'tag1'>
              <p className = 'callerTag'>Caller</p>
              <p className = 'priorityTag'>Priority</p>
              <p className = 'vehicleTag'>Vehicles</p>
            </div>
            <div className = 'tag2'>
              <p className = 'jobTag'>Job</p>
              <p className = 'notesTag'>Notes</p>
            </div>
            <div classname = 'tag3'>
             
              <Link to="/Home" className="nextTag">Next</Link>
            </div>
          </div>
        </div>
        <Map defaultZoom={13} defaultCenter={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
          {
            vehicles.map((vehicle, index) =>
              <Marker position={vehicle.location} key={index} onClick={() => setOpen(true)}>
                <Pin
                  color={"blue"}
                  borderColor={"green"}
                  glyphColor={"purple"}
                />
              </Marker>)
          }
          <Marker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"red"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </Marker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Austin</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};





