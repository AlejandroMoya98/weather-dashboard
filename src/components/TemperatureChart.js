import './TemperatureChart.css';
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function TemperatureChart({ chartData, chartTitle }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartData) {
      return; // Si chartData es null o undefined, no intentamos renderizar
    }

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.hours,
        datasets: [
          {
            label: "Temperatura (°C)",
            data: chartData.temperatures,
            fill: false,
            borderColor: "blue",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Hora del día",
            },
          },
          y: {
            title: {
              display: true,
              text: "Temperatura (°C)",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div>
      <h3>{chartTitle}</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default TemperatureChart;
