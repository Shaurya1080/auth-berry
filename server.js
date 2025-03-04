
// Entry point for production deployment
// Import required dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Import the API routes
const apiRoutes = require('./server/index.js');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Serve API routes
app.use('/api', apiRoutes);

// Serve static files from the React app in production
app.use(express.static(path.join(__dirname, 'dist')));

// For any request that doesn't match an API route, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
