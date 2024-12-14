
// project/
// ├── .env                    # Environment variables
// ├── package.json           # Project dependencies
// ├── mainserver.js             # Main server file
// ├── routes/               # Route handlers
// │   ├── users.js
// │   └── products.js
// ├── controllers/          # Business logic
// │   ├── userController.js
// │   └── productController.js
// ├── models/              # Data models
// │   ├── User.js
// │   └── Product.js
// └── middleware/          # Custom middleware
//     └── auth.js

// Essential imports
const express = require('express');           // Import Express framework
const cors = require('cors');                 // Import CORS middleware
const morgan = require('morgan');             // Import logging middleware
const helmet = require('helmet');             // Import security middleware
const dotenv = require('dotenv');             // Import environment variable handler
const mongoose = require('mongoose');
//require('dotenv').config();

// Load environment variables
dotenv.config();

// Initialize express application
const app = express();

// Define port
const PORT = process.env.PORT || 3000;        // Use environment port or default to 3000

// Middleware setup
app.use(cors());                              // Enable CORS for all routes
app.use(morgan('dev'));                       // Log HTTP requests
app.use(helmet());                            // Add security headers
app.use(express.json());                      // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Custom middleware example
const requestTime = (req, res, next) => {
    req.requestTime = Date.now();             // Add timestamp to request
    next();                                   // Pass control to next middleware
};
app.use(requestTime);

// Basic route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API',
        timestamp: req.requestTime
    });
});

// Route with path parameters
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;             // Get path parameter
    res.json({ userId });
});

// Route with query parameters
app.get('/search', (req, res) => {
    const query = req.query.q;                // Get query parameter
    res.json({ searchQuery: query });
});

// POST route example
app.post('/data', (req, res) => {
    const data = req.body;                    // Get request body
    res.status(201).json({                    // Send 201 Created status
        message: 'Data received',
        data
    });
});

// Import routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

// ... other middleware ...

// Use routes with prefix
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// MongoDB connection : Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);                 // Log error stack trace
    res.status(500).json({                    // Send 500 Internal Server Error
        error: 'Something broke!'
    });
});

// 404 handler (must be last)
app.use((req, res) => {
    res.status(404).json({                    // Send 404 Not Found
        error: 'Route not found'
    });
});