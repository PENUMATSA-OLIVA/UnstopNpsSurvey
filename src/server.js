const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Set up MongoDB connection (replace 'your_db_connection_string' with your actual MongoDB connection string)
mongoose.connect('your_db_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple survey model
const Survey = mongoose.model('Survey', { score: Number, feedback: String });

// Endpoint to submit survey responses
app.post('/api/surveys', async (req, res) => {
  try {
    const { score, feedback } = req.body;
    const survey = new Survey({ score, feedback });
    await survey.save();
    res.status(201).json({ message: 'Survey submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
