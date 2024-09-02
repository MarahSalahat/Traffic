const express = require('express');
const path = require('path');
const app = express();

// Serve static files
// app.use(express.static(path.join(__dirname, '../../dist')));
///////////////////
app.use(express.static(path.join(__dirname, 'dist')));

// Default route for serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// Route for serving forum.html
app.get('/forum', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'forum.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
////////////////////////
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
