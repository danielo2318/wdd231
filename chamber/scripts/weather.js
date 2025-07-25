// API configuration
const apiKey = "0d0f4282e303fa86fd88181a2e3eae2c";
const lat = 21.11;
const lon = -101.7;
const units = "metric";

// DOM elements
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("weather-icon");
const forecast1 = document.getElementById("forecast1");
const forecast2 = document.getElementById("forecast2");
const forecast3 = document.getElementById("forecast3");

async function fetchWeather() {
  try {
    // current weather
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
    );
    const weatherData = await weatherRes.json();

    // update current weather
    tempEl.textContent = `${weatherData.main.temp.toFixed(1)}°C`;
    descEl.textContent = weatherData.weather[0].description;
    humidityEl.textContent = weatherData.main.humidity;
    windEl.textContent = weatherData.wind.speed.toFixed(1);
    iconEl.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    iconEl.alt = weatherData.weather[0].description;

    // forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
    );
    const forecastData = await forecastRes.json();

    // filter for midday forecasts
    const dailyForecasts = forecastData.list
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    // update Forecast
    dailyForecasts.forEach((forecast, index) => {
      const day = new Date(forecast.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const temp = forecast.main.temp.toFixed(1);
      const desc = forecast.weather[0].main;
      document.getElementById(
        `forecast${index + 1}`
      ).textContent = `${day}: ${temp}°C, ${desc}`;
    });
  } catch (error) {
    console.error("Weather API error:", error);
    document.getElementById("forecast-container").innerHTML =
      "<p>Weather data unavailable</p>";
  }
}


document.addEventListener("DOMContentLoaded", fetchWeather);
