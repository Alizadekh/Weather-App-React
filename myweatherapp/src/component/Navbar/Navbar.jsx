import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import CityContext from "../../Context/CityContext";

function Navbar() {
  const { setCity } = useContext(CityContext);
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const change = () => {
    setCity(input);
  };
  return (
    <div className={style.allNav}>
      <div className={style.navContent}>
        <div>
          <h2>Weather App</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={style.search}>
        <input type='text' onChange={handleChange} />
        <button onClick={change}>Search</button>
      </div>
    </div>
  );
}

export default Navbar;
