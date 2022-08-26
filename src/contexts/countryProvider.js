import React, { useState, useEffect } from "react";
import { getLocalUserCountry } from "../commons/localstorage";

const countryContext = React.createContext();

const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState("");

  const getCountry = async () => {
    const userCountry = await getLocalUserCountry();
    setCountry(userCountry);
  };

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <countryContext.Provider
      value={{
        country,
        getCountry,
      }}
    >
      {children}
    </countryContext.Provider>
  );
};

export { CountryProvider, countryContext };
