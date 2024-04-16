"use client";

import { useState, useEffect } from "react";
import React from "react";
import { db } from '../firebase';
import { onValue, ref } from "firebase/database";
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
}
