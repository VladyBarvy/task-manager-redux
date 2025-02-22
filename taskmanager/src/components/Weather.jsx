import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../features/weather/weatherSlice.js';

const Weather = () => {
  const dispatch = useDispatch();
  const { temperature, condition, status } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Weather in Tokyo</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <div>
          <p>Temperature: {temperature}°C</p>
          <p>Condition: {condition}</p>
        </div>
      )}
      {status === "failed" && <p>Failed to load weather data.</p>}
    </div>
  );
};

export default Weather;
