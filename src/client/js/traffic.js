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