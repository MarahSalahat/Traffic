import "./styles/main.scss";
import "./styles/dashboard.scss";
import "./styles/navbar.scss";
import "./styles/textAnimation.scss";
import "./styles/footer.scss";
import "./styles/insights.scss";
import "./styles/all.min.scss";

import image from "./images/smartCity.png";
import { fetchWeatherData } from "./js/tempChart";
import { loadModel, predictCongestion } from "./js/predict.js";
import { getWeatherData } from "./js/getWeatherData.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Fetch the weather data for charting or other use
  const fetchWeather = await fetchWeatherData();

  // Set the congestion image
  const congestionImgElement = document.querySelector(".congestion-image");
  if (congestionImgElement) {
    congestionImgElement.src = image;
  }
  // Initialize the model on page load
  async function initializeModel() {
    await loadModel();
  }

  initializeModel(); // Load the model once

  // Event listener for the form submission to predict congestion
  document
    .getElementById("predictionForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const location = document.getElementById("location").value;
      const weatherData = await getWeatherData(location);

      // Prepare input data for prediction
      const inputData = {
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        wind_speed: weatherData.wind_speed,
        hour: new Date().getHours(),
        isWeekend: [0, 6].includes(new Date().getDay()) ? 1 : 0,
      };

      // Predict congestion level
      const congestionLevel = await predictCongestion(inputData);
      console.log(congestionLevel);
      // Display the result
      document.getElementById(
        "predictionResult"
      ).innerHTML = `Predicted Congestion Level: ${congestionLevel}`;
    });
});
