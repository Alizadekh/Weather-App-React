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
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.52377600502!2d49.69014863755424!3d40.39447550862524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2zQmFrxLE!5e0!3m2!1saz!2saz!4v1734016294481!5m2!1saz!2saz"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Map;
