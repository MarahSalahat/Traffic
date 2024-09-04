import Chart from 'chart.js/auto';

// Get the context for the temperature chart
const ctx = document.getElementById('tempChart').getContext('2d');

// OpenWeatherMap API key and city
const apiKey = '7d2a8ee879839efcbb361ff66393dfb2'; 
const city = 'London';

// Variable to store the chart instance
let chart;

// Function to fetch weather data
export const fetchWeatherData = async () => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (response.ok) {
      const temperature = data.main.temp;
      const time = new Date().toLocaleTimeString();

      // Update the temperature text in the UI
      document.getElementById('temp').textContent = `${temperature} °C`;
      document.getElementById('conditions').textContent = data.weather[0].description;

      // Check if the chart is already initialized
      if (!chart) {
        // Initialize the chart
        chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [time],
            datasets: [{
              label: 'Temperature',
              data: [temperature],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              fill: false,
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: false, 
              }
            }
          }
        });
      } else {
        // Update the chart with new data
        chart.data.labels.push(time);
        chart.data.datasets[0].data.push(temperature);
        
        // Keep the last 20 data points in the chart
        if (chart.data.labels.length > 15) {
          chart.data.labels.shift();
          chart.data.datasets[0].data.shift();
        }

        chart.update();
      }
    } else {
      console.error('Failed to fetch weather data:', data.message);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

// Fetch weather data immediately on page load
fetchWeatherData();

setInterval(fetchWeatherData, 2000);
