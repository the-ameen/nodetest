const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const PORT = 3004;

// Create an Express app
const app = express();
// Enable CORS
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions)); // Enable CORS with the specified options



// Database connection configuration
const db = mysql.createConnection({
    host: '154.41.233.52',
    user: 'u878719688_daz',
    password: 'W1n&7p/=~b+',
    database: 'u878719688_daz'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return; // Exit the function if there is a connection error
    }
    console.log('Connected to the database');
});

// Define a route handler for GET requests to the root URL ('/')
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Define a route handler to get images from the 'gallery' table

app.get('/api/gallery', (req, res) => {

    const category = req.query.category; // Retrieve the category from the query string
    const sqlQuery = 'SELECT src FROM gallery WHERE category = ?';
    db.query(sqlQuery, [category], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error'); // Send a more generic error response to the client
            return; // Exit the function if there is a query error
        }
        res.json(results);
    });
});
// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
