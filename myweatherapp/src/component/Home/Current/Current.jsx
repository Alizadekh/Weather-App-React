import React, { useContext, useEffect, useState } from "react";
import style from "./Current.module.css";
import axios from "axios";
import {
  TiWeatherWindy,
  TiWeatherDownpour,
  TiWeatherWindyCloudy,
  TiWeatherSunny,
} from "react-icons/ti";
import { PiCoffeeLight } from "react-icons/pi";
import { GiPressureCooker } from "react-icons/gi";
import CityContext from "../../../Context/CityContext";

function Current() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState("");
  const { city } = useContext(CityContext);

  // console.log(city);

  const WEATHER_API_KEY = "893302e738e8a0d992f247454df446ba";

  const fetchWeather = async (city) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  useEffect(() => {
    const getDate = () => {
      const date = new Date();
      setTime(date.getHours() + ":" + date.getMinutes());
    };
    const inter = setInterval(getDate, 1000);
    return () => clearInterval(inter);
  }, []);

  if (isLoading)
    return <h4>Please write the city that you want to search...</h4>;
  else {
    const celci = Math.round(weatherData.main.temp);
    return (
      <div className={style.all}>
        <h3>Current Weather</h3>
        <span>{time}</span>
        <div className={style.now}>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt=''
          />
          <h1>
            {celci}
            <span>°C</span> <br />
            <h3>{weatherData.weather[0].description}</h3>
          </h1>
        </div>
        <div className={style.anotherInfos}>
          <div className={style.info}>
            <div>
              <TiWeatherWindy />
            </div>
            <p>
              {weatherData.wind.speed}
              <span>km/s</span>
            </p>
          </div>
          <div className={style.info}>
            <div>
              <TiWeatherDownpour />
            </div>
            <p>
              <span>{weatherData.main.humidity}</span> %
            </p>
          </div>
          <div className={style.info}>
            <div>
              <GiPressureCooker />
            </div>
            <p>{weatherData.main.pressure}</p>
          </div>
          <div className={style.info}>
            <div>
              <PiCoffeeLight />
            </div>
            <p>{Math.round(weatherData.main.feels_like)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Current;
