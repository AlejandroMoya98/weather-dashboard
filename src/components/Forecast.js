import React from "react";
import './Forecast.css';

function Forecast({ forecastData }) {
  if (!forecastData || !forecastData.list) {
    return null;
  }

  // Filtrar para obtener solo la previsión de cada día a las 12:00
  const dailyForecasts = forecastData.list.filter((entry) =>
    entry.dt_txt.includes("12:00:00")
  );

  const translations = {
    clear: "Despejado",
    clouds: "Nublado",
    rain: "Lluvia",
    snow: "Nieve",
    // Agrega más traducciones según sea necesario
  };
  
  const translateDescription = (desc) => translations[desc.toLowerCase()] || desc;
  

  return (
    <div className="forecast-container">
      <h3 className="text-center">Previsión para los próximos 5 días</h3>
      <div className="forecast-grid">
        {dailyForecasts.map((day) => (
          <div key={day.dt} className="forecast-card">
            <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
            <p>{translateDescription(day.weather[0].main)}</p>
            <p>Temperatura: {day.main.temp}°C</p>
            <p>Humedad: {day.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
