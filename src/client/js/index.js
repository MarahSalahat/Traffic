import '../styles/main.scss';  
import '../styles/dashboard.scss';  
import smartCity from '../images/smartCity.png';
import { fetchWeatherData } from './tempChart';  

document.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData();  
});
