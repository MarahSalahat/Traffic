async function getWeatherData() {
    const location = document.getElementById('location').value;

    // Example: Using OpenWeatherMap API to fetch weather data
    const apiKey = 'YOUR_API_KEY';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();

        // Extract necessary weather data
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const precipitation = data.weather[0].description; // Simplified for demo

        // Display the weather data
        document.getElementById('temp').innerText = `Temperature: ${temp} °C`;
        document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
        document.getElementById('wind_speed').innerText = `Wind Speed: ${windSpeed} m/s`;
        document.getElementById('precipitation').innerText = `Precipitation: ${precipitation}`;

        // Prepare data for AI model
        const weatherData = {
            temp: temp,
            humidity: humidity,
            windSpeed: windSpeed,
            precipitation: precipitation,
            time: new Date().toISOString() // Current timestamp
        };

        // Call AI model prediction function
        predictCongestionLevel(weatherData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Example AI model function
async function predictCongestionLevel(weatherData) {
    // Assuming you have an AI model endpoint set up for prediction
    const aiModelUrl = 'http://your-ai-model-url/predict';
    
    try {
        const response = await fetch(aiModelUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(weatherData)
        });
        
        const result = await response.json();
        
        // Display congestion prediction
        document.getElementById('congestion').innerText = `Congestion Level: ${result.congestion_level}`;
        
    } catch (error) {
        console.error('Error predicting congestion:', error);
    }
}
