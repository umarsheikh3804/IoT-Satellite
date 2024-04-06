import React from "react";
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div
  className="mapMarker"
>{text}</div>;

export const NewJob = () => {
  const defaultProps = {
    center: {
      lat: 59.95, 
      lng: 30.33
    },
    zoom: 11
  };
  return (
    <div style={{ height: '93vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={59.955413} 
          lng={30.337844} 
          text={'Kreyser Avrora'} 
        />
      </GoogleMapReact>
    </div>
  );
};

export default NewJob;
