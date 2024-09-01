import Chart from 'chart.js/auto';
import '../styles/main.scss';
const API_KEY= '7d2a8ee879839efcbb361ff66393dfb2';

// Fetch current weather from OpenWeatherMap API
async function fetchWeather() {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`);
  const data = await response.json();
  document.getElementById("temp").innerText = `${data.main.temp} °C`;
  document.getElementById("conditions").innerText = data.weather[0].description;
}


async function fetchTrafficData() {
  const response = await fetch('/data');
  const trafficData = await response.json();

  const ctx = document.getElementById('trafficChart').getContext('2d');
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
}


fetchWeather();
fetchTrafficData();
