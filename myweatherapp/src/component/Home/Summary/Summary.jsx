import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import style from "./Summary.module.css";
import CityContext from "../../../Context/CityContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Summary() {
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const prepareChartData = (data) => {
    if (!data) return {};

    const labels = data.forecast.forecastday[0].hour.map((hour) =>
      hour.time.slice(11, 16)
    );

    const temperatures = data.forecast.forecastday[0].hour.map((hour) =>
      Math.round(hour.temp_c)
    );

    return {
      labels: labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatures,
          borderColor: "white",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: `Hourly Temperature Forecast for ${city}`,
      },
    },
    scales: {
      x: {
        type: "category",
        display: true,
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        type: "linear",
        display: true,
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        suggestedMin: 0,
        suggestedMax: 40,
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0,
      },
    },
  };

  if (!city || (!isLoading && !forecastData)) {
    return null;
  }

  return (
    <div className={style.all}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={style.block}>
          <Line data={prepareChartData(forecastData)} options={chartOptions} />
        </div>
      )}
    </div>
  );
}

export default Summary;
