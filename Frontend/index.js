const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load Google Drive credentials from file
const CREDENTIALS_PATH = path.join(__dirname, 'creds.json');
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));

// Create OAuth2 client with Google Drive credentials
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
);

// Set the scope for the Google Drive API
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Create a new server instance
const app = express();

// Set the port to listen on
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Enable parsing of JSON request bodies
app.use(express.json());

// Define a list of users with email addresses and hashed passwords
const users = [
    { id: 1, email: 'user1@example.com', password: '$2b$10$3ZO0vPJ2QMF9sJPOEkfEieI8b/m0.SzZG7H2CwQlcW8VvS/w61y9i' },
    { id: 2, email: 'user2@example.com', password: '$2b$10$3ZO0vPJ2QMF9sJPOEkfEieI8b/m0.SzZG7H2CwQlcW8VvS/w61y9i' },
    { id: 3, email: 'user3@example.com', password: '$2b$10$3ZO0vPJ2QMF9sJPOEkfEieI8b/m0.SzZG7H2CwQlcW8VvS/w61y9i' }
];

// Define a function to generate a JWT token for a given user
function generateToken(user) {
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    return token;
}

// Define a middleware function to authenticate requests with JWT tokens
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
	return res.sendStatus(401);
    }

    jwt.verify(token, 'secret', (err, user) => {
	if (err) {
	    return res.sendStatus(403);
	}

	req.user = user;
	next();
    });
}

// Define a route to handle user login requests
app.post('/login', async (req, res) => {
    // Find the user with the given email address
    const user = users.find(u => u.email === req.body.email);

    if (user == null) {
	return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the given password with the user's hashed password
    try {
	if (await bcrypt.compare(req.body.password, user.password)) {
	    // Passwords match - generate a JWT token for the user and return it
	    const token = generateToken(user);
	    res.status(200).json({ token });
	} else {
	    // Passwords do not match
	    return res.status(400).json({ error: 'Invalid email or password' });
	}} catch {
	    // An error occurred while comparing passwords
	    return res.status(500).json({ error: 'Internal server error' });
	}
});

// Define a route to handle user signup requests
app.post('/signup', async (req, res) => {
    // Check if the email address is already taken
    if (users.some(u => u.email === req.body.email)) {
	return res.status(400).json({ error: 'Email address is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user with the given email address and hashed password
    const user = {
	id: users.length + 1,
	email: req.body.email,
	password: hashedPassword
    };

    // Add the new user to the list of users
    users.push(user);

    // Generate a JWT token for the new user and return it
    const token = generateToken(user);
    res.status(201).json({ token });
});

// Define a route to handle authenticated requests
app.get('/protected', authenticateToken, (req, res) => {
    res.send('Hello, user ${req.user.id}');
});

// Start the server
app.listen(port, () => {
    console.log('Server listening on port ${port}');
});
