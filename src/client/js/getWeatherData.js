
const apiKey = '7d2a8ee879839efcbb361ff66393dfb2'; 
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data
export const getWeatherData = async (location) => {
  try {
    const response = await fetch(`${apiEndpoint}?q=${location}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (response.ok) {
      
      return {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed
      };
    } else {
      console.error('Failed to fetch weather data:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
