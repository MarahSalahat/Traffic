const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../../dist')));


app.get('/data', (req, res) => {
  res.json({
    timestamps: ['2024-09-01', '2024-09-02', '2024-09-03'],
    congestionLevels: [5, 3, 8]
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
