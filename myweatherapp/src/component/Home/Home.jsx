import React from "react";
import style from "./Home.module.css";
import Current from "./Current/Current";
import Popular from "./Popular/Popular";
import Map from "./Map/Map";
import Forecast from "./Forecast/Forecast";
import Summary from "./Summary/Summary";
function Home() {
  return (
    <div className={style.all}>
      <div className={style.home}>
        <Current />
        <Map />
        <Popular />
        <Forecast />
        <Summary />
      </div>
    </div>
  );
}

export default Home;
