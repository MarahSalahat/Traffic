import '../styles/main.scss';  
import { fetchWeatherData } from './tempChart';  

document.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData();  
});
