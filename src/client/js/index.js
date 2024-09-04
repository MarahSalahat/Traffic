import '../styles/main.scss';  
import '../styles/dashboard.scss';  
import '../styles/navbar.scss';
import '../styles/textAnimation.scss';
import '../styles/footer.scss';

import  image  from '../images/smartCity.png';
import { fetchWeatherData } from './tempChart';  

document.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData();  
});
// Load the smart city image dynamically at runtime
document.addEventListener('DOMContentLoaded', function() {
    const imgElement = document.querySelector('.congestion-image');
    imgElement.src = image;
});
