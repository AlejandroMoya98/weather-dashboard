import './App.css';
import React, {useState} from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Weather from './components/Weather';
import Forecast from './components/Forecast';

function App() {

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  /*const getBackgroundStyle = (mainWeather) => {
    switch (mainWeather) {
      case 'Clear':
        return 'linear-gradient(to bottom, #87CEEB, #fff)'; // Azul cielo
      case 'Clouds':
        return 'linear-gradient(to bottom, #bdc3c7, #2c3e50)'; // Gris nublado
      case 'Rain':
        return 'linear-gradient(to bottom, #3a6073, #16222A)'; // Azul oscuro lluvioso
      case 'Snow':
        return 'linear-gradient(to bottom, #d7d2cc, #304352)'; // Blanco y gris
      case 'Thunderstorm':
        return 'linear-gradient(to bottom, #232526, #414345)'; // Gris tormentoso
      default:
        return 'linear-gradient(to bottom, #8e9eab, #eef2f3)'; // Neutro
    }
  }; */
  
  const handleSearch = async (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`;
    const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    

    try {
      const weatherResponse = await fetch(apiUrlWeather);
      const weatherData = await weatherResponse.json();

      if (weatherData.cod !== 200) {
        throw new Error("City not found");
      }

      setWeather(weatherData);

      const forecastResponse = await fetch(apiUrlForecast);
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);

      setError("");

    } catch (err) {
      setWeather(null);
      setForecast(null);
      setError("City not found. Please try again.");
    }

  };
  
return (
  <div> 
    <Header />
    <Search onSearch={handleSearch} />
    {error && <p className="error">{error}</p>}
    {weather && <Weather data={weather} />}
    {forecast && <Forecast forecastData={forecast} />}
  </div>
  );
}

export default App;

