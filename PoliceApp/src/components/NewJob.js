"use client";

import { useState } from "react";
import React from "react";
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

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map defaultZoom={13} defaultCenter={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
          <Marker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"grey"}
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






