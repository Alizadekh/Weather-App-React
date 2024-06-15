import React, { createContext, useState } from "react";

const CityContext = createContext();

export function CityProvider({ children }) {
  const [city, setCity] = useState("");

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
}

export default CityContext;
