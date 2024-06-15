import React, { useContext, useEffect, useState } from "react";
import style from "./Map.module.css";
import axios from "axios";
import CityContext from "../../../Context/CityContext";

function Map() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const GEOCODING_API_KEY = "AIzaSyADq1g-yroUGqaKL3Xd1UgxaDAkU3JCgcg";
  const { city } = useContext(CityContext);

  const fetchCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GEOCODING_API_KEY}`
      );
      const location = response.data.results[0].geometry.location;
      setLat(location.lat);
      setLng(location.lng);
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCoordinates();
  }, [city]);
  // console.log(lat);
  return (
    <div>
      {lat && lng && (
        <iframe
          title='map'
          src={`https://www.google.com/maps/embed/v1/view?key=${GEOCODING_API_KEY}&center=${lat},${lng}&zoom=12`}
          width='600'
          height='490'
          allowFullScreen
          loading='lazy'></iframe>
      )}
    </div>
  );
}

export default Map;
