import React from "react";
import './Forecast.css';

function Forecast({ forecastData, onCardClick }) {
  if (!forecastData || !forecastData.list) {
    return null;
  }

  const dailyForecasts = forecastData.list.filter((entry) =>
    entry.dt_txt.includes("12:00:00")
  );

  const translations = {
    clear: "Despejado",
    clouds: "Nublado",
    rain: "Lluvia",
    snow: "Nieve",
  };

  const translateDescription = (desc) => translations[desc.toLowerCase()] || desc;

  const getDayDetails = (dateString) => {
    const dayEntries = forecastData.list.filter((entry) =>
      entry.dt_txt.startsWith(dateString)
    );

    const hours = dayEntries.map((entry) => {
      const hour = new Date(entry.dt_txt).getHours();
      return `${hour}:00`;
    });

    const temperatures = dayEntries.map((entry) => entry.main.temp);

    return { hours, temperatures };
  };

  return (
    <div className="forecast-container">
      <h3 className="text-center">Previsión para los próximos 5 días</h3>
      <div className="forecast-grid">
        {dailyForecasts.map((day) => {
          const date = new Date(day.dt_txt).toLocaleDateString(); // Formato legible del día
          const { hours, temperatures } = getDayDetails(day.dt_txt.split(" ")[0]);

          return (
            <div
              key={day.dt}
              className="forecast-card"
              onClick={() =>
                onCardClick(
                  { hours, temperatures },
                  `Temperaturas del ${date}` // Título del gráfico
                )
              }
            >
              <p>{date}</p>
              <p><strong>{translateDescription(day.weather[0].main)}</strong></p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="weather-icon"
              />
              <p><strong>Mínima:</strong> {day.main.temp_min}°C</p>
              <p><strong>Máxima:</strong> {day.main.temp_max}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
