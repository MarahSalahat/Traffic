import '../styles/main.scss';  
import '../styles/dashboard.scss';  
import '../styles/navbar.scss';
import '../styles/textAnimation.scss';
import '../styles/footer.scss';
import '../styles/insights.scss';

import image from '../images/smartCity.png';
import iconImage from '../images/weather.png';
import { fetchWeatherData } from './tempChart';  

document.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData();  

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
});
