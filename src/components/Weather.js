import React from 'react';
import './Weather.css';

function Weather({ data, hourlyData, onCardClick }) {
  const capitalizeDescription = (description) => {
    return description
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const hours = hourlyData.map((item) =>
    new Date(item.dt_txt).getHours() + ':00'
  );
  const temperatures = hourlyData.map((item) => item.main.temp);

  return (
    <div className="weather-container weather-clickable" onClick={() =>  onCardClick(
      {
        hours: hours,
        temperatures: temperatures,
      },
      'Temperaturas en las próximas horas'
    )}>
      <h2>{data.name}</h2>
      <img src={iconUrl} alt={data.weather[0].description} />
      <p><strong>{capitalizeDescription(data.weather[0].description)}</strong></p>
      <p><strong>Temperatura:</strong> {data.main.temp}°C</p>
      <p><strong>Sensación Térmica:</strong> {data.main.feels_like}°C</p>
      <p><strong>Humedad:</strong> {data.main.humidity}%</p>
    </div>
  );
}

export default Weather;
