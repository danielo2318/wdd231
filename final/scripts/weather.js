document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "0d0f4282e303fa86fd88181a2e3eae2c"; // Replace with your actual API key
  const lat = 21.1167; // León, MX latitude
  const lon = -101.6833; // León, MX longitude
  const units = "metric";

  const tempEl = document.getElementById("temp");
  const descEl = document.getElementById("description");
  const windEl = document.getElementById("wind");
  const iconEl = document.getElementById("weather-icon");

  async function getWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      tempEl.textContent = `${Math.round(data.main.temp)}°C`;
      descEl.textContent = data.weather[0].description;
      windEl.textContent = data.wind.speed.toFixed(1);
      iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      iconEl.alt = data.weather[0].description;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      tempEl.textContent = "N/A";
      descEl.textContent = "Weather data unavailable";
    }
  }

  getWeather();
});
