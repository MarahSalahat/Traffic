import './styles/main.scss';  
import './styles/dashboard.scss';  
import './styles/navbar.scss';
import './styles/textAnimation.scss';
import './styles/footer.scss';
import './styles/insights.scss';

import image from './images/smartCity.png';
import iconImage from './images/weather.png';
import { fetchWeatherData } from './js/tempChart'; 
import { loadModel, predictCongestion} from './js/predict.js';
import {getWeatherData} from './js/getWeatherData.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData(); 
  let model;
  async function initializeModel() {
    model = await loadModel();
  }
  initializeModel();

  // Set the congestion image
  const congestionImgElement = document.querySelector('.congestion-image');
  if (congestionImgElement) {
    congestionImgElement.src = image;
  }

  // Set the icon image
  const iconImgElement = document.querySelector('.icon');
  if (iconImgElement) {
    iconImgElement.src = iconImage;
  }

  // Handle form submission for congestion prediction
  document.getElementById('predictionForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Get location from input field
    const location = document.getElementById('location').value;
    
    // Fetch weather data for the given location
    const weatherData = await getWeatherData(location);
    
    // Prepare input data for prediction
    const inputData = {
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      wind_speed: weatherData.wind_speed,
      hour: new Date().getHours(), 
      isWeekend: [new Date().getDay() === 0 || new Date().getDay() === 6 ? 1 : 0]
    };

    // Predict congestion level using the TensorFlow.js model
    const congestionLevel = await predictCongestion(inputData, model);

    // Display the predicted congestion level on the page
    document.getElementById('predictionResult').innerText = `Predicted Congestion Level: ${congestionLevel}`;
  });
});
