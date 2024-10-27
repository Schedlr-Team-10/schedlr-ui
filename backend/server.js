const express = require('express');
const cors = require('cors');
const descriptionRoute = require('./routes/descriptionRoute'); // Import the route

const app = express();
const PORT = process.env.PORT || 5000; // Backend runs on port 5000

app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request bodies

// Use the description route for API requests
app.use('/api', descriptionRoute);

// Start the backend server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
