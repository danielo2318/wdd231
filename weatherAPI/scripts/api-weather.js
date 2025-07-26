const tempEl = document.getElementById("temp");
const descriptionEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("weather-icon");

const forecast1 = document.getElementById("forecast1");
const forecast2 = document.getElementById("forecast2");
const forecast3 = document.getElementById("forecast3");

const apiKey = "e9a30d8465f9ff1e0ab09a5f0c3c0932"; // ← Reemplaza con tu clave personal
const lat = 21.11;
const lon = -101.7;
const units = "metric";

async function getWeather() {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  try {
    // Clima actual
    const response = await fetch(weatherURL);
    const data = await response.json();

    const temp = data.main.temp.toFixed(1);
    const humidity = data.main.humidity;
    const wind = data.wind.speed.toFixed(1);
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const description = data.weather[0].description;

    tempEl.textContent = `Temp: ${temp} °C`;
    descriptionEl.textContent = `Conditions: ${description}`;
    humidityEl.textContent = `${humidity}%`;
    windEl.textContent = `${wind}`;
    iconEl.setAttribute("src", icon);
    iconEl.setAttribute("alt", description);

    // Pronóstico
    const forecastRes = await fetch(forecastURL);
    const forecastData = await forecastRes.json();

    const dailyForecasts = forecastData.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    const formatForecast = (forecast) => {
      const day = new Date(forecast.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const temp = forecast.main.temp.toFixed(1);
      const desc = forecast.weather[0].main;
      return `${day}: ${temp} °C - ${desc}`;
    };

    forecast1.textContent = formatForecast(dailyForecasts[0]);
    forecast2.textContent = formatForecast(dailyForecasts[1]);
    forecast3.textContent = formatForecast(dailyForecasts[2]);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

getWeather();
