import Chart from 'chart.js/auto';
import '../styles/main.scss';
const API_KEY= '7d2a8ee879839efcbb361ff66393dfb2';

// Fetch weather and traffic data and update the charts
document.addEventListener('DOMContentLoaded', function() {
  fetchWeather();
  fetchTrafficData();
});

// Fetch current weather from OpenWeatherMap API
async function fetchWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error('Network response was not ok.');
    const data = await response.json();
    const tempElement = document.getElementById("temp");
    const conditionsElement = document.getElementById("conditions");
    
    if (tempElement && conditionsElement) {
      tempElement.innerText = `${data.main.temp} °C`;
      conditionsElement.innerText = data.weather[0].description;
    } else {
      console.error('Temperature or conditions element not found.');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

async function fetchTrafficData() {
  try {
    const response = await fetch('/data');
    if (!response.ok) throw new Error('Network response was not ok.');
    const trafficData = await response.json();

    const ctx = document.getElementById('trafficChart').getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: trafficData.timestamps,
          datasets: [{
            label: 'Congestion Level',
            data: trafficData.congestionLevels,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });
    } else {
      console.error('Canvas element not found.');
    }
  } catch (error) {
    console.error('Error fetching traffic data:', error);
  }
}