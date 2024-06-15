import React, { useState, useEffect } from "react";
import style from "./Popular.module.css";
import axios from "axios";

function Popular() {
  const cities = [
    "Tokyo",
    "New York City",
    "Paris",
    "London",
    "Dubai",
    "Singapore",
    "Bangkok",
  ];
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const WEATHER_API_KEY = "893302e738e8a0d992f247454df446ba";

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        const data = [];
        for (const city of cities) {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${WEATHER_API_KEY}`
          );
          data.push(response.data);
        }
        setWeatherData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

  return (
    <div className={style.all}>
      <h3>Popular Cities</h3>
      <div className={style.anotherInfos}>
        {weatherData.map((data, index) => (
          <div className={style.info} key={index}>
            <div className={style.percity}>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt=''
              />
              <p>{cities[index]}</p>
            </div>
            <p>{data.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
