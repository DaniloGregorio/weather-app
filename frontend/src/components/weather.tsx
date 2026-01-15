import React, { useState } from "react";
import { useWeather } from "../hooks/backendQuery";
import snowflake from "../assets/snowflake.svg";
import sun from "../assets/sun.svg";

export const WeatherComponent: React.FC = () => {
  const [inputPostalcode, setinputPostalcode] = useState("");

  const { climateST, loading, error, searchClimate } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchClimate(inputPostalcode);
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>Postal Code Termometer</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputPostalcode}
          onChange={(e) => setinputPostalcode(e.target.value)}
          placeholder="00000000"
          maxLength={8}
          style={{ padding: "8px", marginRight: "5px" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {climateST && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#3c5d7e",
            borderRadius: "8px",
          }}
        >
          <h4>{climateST.location}</h4>
          <p style={{ fontSize: "2rem", margin: "10px 0" }}>
            <div>
              {climateST.climate.temperature}
              {climateST.climate.unity}
              <div style={{ margin: "1px" }}></div>
              {climateST.climate.temperature < 17.0 ? (
                <img
                  src={snowflake}
                  style={{ width: "30px", height: "30px" }}
                ></img>
              ) : (
                <img src={sun} style={{ width: "30px", height: "30px" }}></img>
              )}
            </div>
          </p>
          <small>Wind: {climateST.climate.wind} km/h</small>
          <p>
            <div>
              <div style={{ margin: "1px" }}></div>
              {climateST.climate.temperature < 17.0 ? (
                <p>Maybe use some jacket!!</p>
              ) : (
                <p>Maybe use a sunscreen</p>
              )}
            </div>
          </p>
        </div>
      )}
    </div>
  );
};
