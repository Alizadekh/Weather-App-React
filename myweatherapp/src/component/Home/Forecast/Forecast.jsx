import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from "./Forecast.module.css";
import CityContext from "../../../Context/CityContext";

function Forecast() {
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { city } = useContext(CityContext);
  const API_KEY = "6dac8d169c854c309dd150312242104";

  useEffect(() => {
    const fetchWeather = async (city) => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
        );

        console.log("Weather API Response:", response.data);
        setForecastData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (city) {
      fetchWeather(city);
    }
  }, [city, API_KEY]);

  console.log(forecastData, "Forecast data");

  if (!city || (!isLoading && !forecastData)) {
    return null;
  }

  return (
    <div className={style.all}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={style.block}>
          {forecastData &&
            forecastData.forecast.forecastday.map((day, index) => (
              <div key={index} className={style.card}>
                <p>{day.date}</p>
                <img src={day.day.condition.icon} alt='' />
                <h1>{Math.round(day.day.avgtemp_c)} °C</h1>
                <p>{day.day.condition.text}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Forecast;
