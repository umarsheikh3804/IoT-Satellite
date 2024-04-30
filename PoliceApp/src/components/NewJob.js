"use client";
import axios from 'axios';
import { useState, useEffect } from "react";
import React from "react";
import { db } from '../firebase';
import line from '../assets/line.svg';
import police from '../assets/police.png';
import { onValue, ref,push,update } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom';
import {
  APIProvider,
  Map,
  Marker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';

const statuses = ["On Call", "Occupied", "Away"];

export default function Intro() {
  const navigate = useNavigate()
  const [position, setPosition] = useState({ lat: 30.2672, lng: -97.74711985445532 }); // Default position
  const incident = {
    position: { lat: 30.2672, lng: -97.74711985445532 },
    address: "2510 Rio Grande St",
    number: "512-738-1937",
    callTime: "7:06 PM"
  }

  const [open, setOpen] = useState(false);
  const [vehicles, setVehicles] = useState([])
  const [section, setSection] = useState(0)
  const [priority, setPriority] = useState(0)
  const [vehiclesDropdown, setVehiclesDropdown] = useState(0)
  const [caller, setCaller] = useState('');
  const [job, setJob] = useState('');
  const [notes, setNotes] = useState('');
  const [address, setAddress] = useState('');
const [number, setNumber] = useState('');
const [callTime, setCallTime] = useState(new Date().toLocaleTimeString());





const getCoordinates = async (address) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: address,
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }
    });
    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error('Error during geocoding:', error);
    return null;
  }
};




  useEffect(() => {
    setCallTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    const query = ref(db, `/vehicles`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (snapshot.exists()) {
        setVehicles(Object.values(data))
      }
    });
    
  }, []);

  
useEffect(() => {
  if (address) { // Ensure there is an address to geocode
    const updatePosition = async () => {
      const coords = await getCoordinates(address);
      if (coords) {
        setPosition(coords);
      }
    };
    updatePosition();
  }
}, [address]); // Run this effect when 'address' changes

  function firstSectionNext() {
    if (priority > 0 && vehiclesDropdown > 0) {
      const jobData = {
        caller,
        job,
        notes,
        address,
        number,
        callTime,
        priority: parseInt(priority, 10), 
        vehicleType: vehiclesDropdown, 
      };
  
      
      const newJobRef = ref(db, 'jobs/');
      const newJobKey = push(newJobRef).key;
      const updates = {};
      updates['/jobs/' + newJobKey] = jobData;
  
      update(ref(db), updates).then(() => {
        setSection(1); 
        
      }).catch(error => {
        alert('Failed to submit job: ' + error.message);
      });
    } else {
      alert("Missing Information");
    }
  }

 

  const firstSection = <div className="rectangle">
    <div className="newJob">
      <p className="newJobt">New Job</p>
    </div>
    <div className = 'jobInfo'>
    <div className='jobInfoDesc'>
      <input
        className='addressName'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <input
        className='numberName'
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Phone Number"
      />
      <div className='callTime'>
        {callTime}
      </div>
    </div>
  
      
      <div className = 'tag1'>
      <input className='callerTag' placeholder="Caller" value={caller} onChange={e => setCaller(e.target.value)} />
        
        <select className="priorityInput" value={priority} onChange={e => setPriority(e.target.value)}>
          <option value={0}>Priority</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
        
       

        <select className="vehicleInput" value = {vehiclesDropdown} onChange={e => setVehiclesDropdown(e.target.value)}>
          <option value={0}>Vehicles</option>
          <option value={1}>Cars</option>
          <option value={2}>Ambulances</option>
          <option value={3}>Firetrucks</option>
          
        </select>
      </div>
      <div className='tag2'>
      <input className='jobTag' placeholder="Job" value={job} onChange={e => setJob(e.target.value)} />
      <input className='notesTag' placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
      </div>
      <div className='tag3'>
        <button className="nextTag cancel" onClick={() => navigate("/")}>Cancel</button>
        <button className="nextTag confirm" onClick={firstSectionNext}>Next</button>
      </div>
    </div>
  </div>

  const secondSection = <div className="rectangle">
    <div className="newJob">
      <p className="newJobt">Suggested Units</p>
    </div>
      {/*{vehicles && vehicles.map((vehicle, i) => <div>
        {vehicle.coords ? JSON.stringify(vehicle.coords) : ""}
      </div>)} */ }
      <img src={police} alt="Descriptive Alt Text" style={{ width: '60%', height: 'auto', marginLeft: 100, marginTop:100}} />
      <div className= 'policeInfo'>
        <p className ='policeNum'>Police Car 1234</p>
        <p className ='policeDist'>0.2 mi • 3 min away</p>
        <p className ='policeStatus'>Status: Active</p>
      </div>
      <button className="nextTag" onClick={() => navigate("/")}>Confirm</button>
    </div>
    
  
  const pages = [firstSection, secondSection]

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        {pages[section]}
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





