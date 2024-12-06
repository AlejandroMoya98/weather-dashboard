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

  const getBackgroundStyle = (mainWeather) => {
    switch (mainWeather) {
      case 'Clear':
        return { background: 'linear-gradient(to right, #f6d365, #fda085)', color: 'black' };
      case 'Clouds':
        return { background: 'linear-gradient(to right, #bdc3c7, #2c3e50)', color: 'white' };
      case 'Rain':
        return { background: 'linear-gradient(to right, #3a7bd5, #3a6073)', color: 'white' };
      default:
        return { background: 'white', color: 'black' };
    }
  };
  
  const appStyle = weather ? getBackgroundStyle(weather.weather[0].main) : {};
  
  
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

