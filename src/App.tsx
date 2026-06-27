import { useState } from "react";

interface WeatherData {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
  };
}

function App() {
  const [weather, setWeather] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [cityName, setCityName] = useState("");

  async function fetchWeather() {
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1&language=en&format=json`,
      );
      const geoData = await geoResponse.json();

      const latitude = geoData.results[0].latitude;
      const longitude = geoData.results[0].longitude;
      setCityName(geoData.results[0].name);
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`,
      );
      const weatherData = await response.json();
      setWeather(weatherData);
      console.log(weatherData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>Hello</div>
      <input
        type="text"
        value={cityInput}
        onChange={(event) => setCityInput(event.target.value)}
      />
      <button onClick={fetchWeather}>Serch</button>
      <div>
        {weather && (
          <div>
            <h1>Search result</h1>
            <p>City: {cityName}</p>
            <p>Temperature: {weather.current.temperature_2m}</p>
            <p>Wind speed: {weather.current.wind_speed_10m}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
