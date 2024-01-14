// Import required modules
const express = require('express');
const fetch = require('node-fetch-2');

// Create an Express.js app
const app = express();
const port = process.env.PORT || 5000;

// Define the API URL
const apiUrl = 'https://services.isrostats.in/api/launches';

// Set up a route to fetch and display the data
app.get('/', async (req, res) => {
    try {
        // Fetch data from the ISRO API
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Render the data in a row-wise format
        res.send(`
            <html>
            <head>
                <title>ISRO Launch Data</title>
            </head>
            <body>
                <h1>ISRO Launch Data</h1>
                <table>
                    <tr>
                        <th>Mission</th>
                        <th>Launch Date</th>
                        <th>Launch Vehicle</th>
                        <th>Payload</th>
                    </tr>
                    ${data.map(entry => `
                        <tr>
                            <td>${entry.mission}</td>
                            <td>${entry.launch_date}</td>
                            <td>${entry.launch_vehicle}</td>
                            <td>${entry.payload}</td>
                        </tr>
                    `).join('')}
                </table>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching data.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
