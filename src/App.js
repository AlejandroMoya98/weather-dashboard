import './App.css';
import React, {useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import TemperatureChart from './components/TemperatureChart';

function App() {

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [chartData, setChartData] = useState(null); 
  const [chartTitle, setChartTitle] = useState(''); // Estado para el título del gráfico
  const [error, setError] = useState('');
  const [message, setMessage] = useState('Obteniendo tu ubicación actual...');

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  // Función reutilizable para obtener clima y previsión
  const fetchWeatherAndForecast = async (params) => {
    const { city, lat, lon } = params;
    const apiUrlWeather = city
      ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`
      : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;

    const apiUrlForecast = city
      ? `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=es&appid=${apiKey}`
      : `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;

    try {
      const weatherResponse = await fetch(apiUrlWeather);
      const weatherData = await weatherResponse.json();

      if (weatherData.cod !== 200) {
        throw new Error('City not found');
      }

      setWeather(weatherData);

      const forecastResponse = await fetch(apiUrlForecast);
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);

      setError('');
      setMessage(
        city
          ? ''
          : 'Pronóstico de tu ubicación actual. Puedes buscar otra ciudad.'
      );
    } catch (err) {
      setWeather(null);
      setForecast(null);
      setError('No se pudo obtener los datos. Intenta nuevamente.');
      setMessage('');
    }
  };

  // Función para manejar la búsqueda por ciudad
  const handleSearch = (city) => {
    fetchWeatherAndForecast({ city });
  };

  // useEffect para geolocalización al cargar
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherAndForecast({ lat: latitude, lon: longitude });
        },
        () => {
          setError('No se pudo obtener tu ubicación. Por favor, busca una ciudad.');
          setMessage('');
        }
      );
    } else {
      setError('La geolocalización no está disponible en tu navegador.');
      setMessage('');
    }
  }, []); // `[]` garantiza que se ejecute una vez al cargar

  // Manejar clic en Weather o Forecast para mostrar el gráfico
  const handleCardClick = (data, title) => {
    setChartData(data);
    setChartTitle(title); // Actualizar el título del gráfico
  };
  
return (
  <div> 
    <Header />
    <Search onSearch={handleSearch} />
    {message && <p className="message">{message}</p>}
    {error && <p className="error">{error}</p>}
    <p className="hint">Pulsa en una tarjeta para ver el gráfico de temperaturas.</p>
    {weather && forecast && (
      <Weather
         data={weather}
         hourlyData={forecast.list.slice(0, 5)} 
         onCardClick={(chartData, title) => handleCardClick(chartData, title)}
      />
    )}

    {forecast && (
      <Forecast
        forecastData={forecast}
        onCardClick={(day, title) => handleCardClick(day, title)}
      />
    )}
    {chartData && (
      <div className="chart-container">
        <TemperatureChart chartData={chartData} chartTitle={chartTitle} />
      </div>
    )}
  </div>
  );
}

export default App;

