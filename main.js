/*
 * -----------------------------------------------------------------------------
 * Main Application File - index.js
 * -----------------------------------------------------------------------------
 * This file sets up the Express server, configures middleware, and defines the
 * API routes for handling payment-related functionalities. It serves as the
 * entry point for the Node.js application.
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { logError, errorHandler, logRequest } = require('./middleware/errorHandler');
const paymentRoutes = require('./routes/paymentRoutes');

// Initialize Express app
const app = express();

// Security Middleware
app.use(helmet()); // Sets various HTTP headers for security
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Body Parsing Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Request Logging Middleware
app.use(logRequest);

// API Routes
app.use('/api/payments', paymentRoutes);

// Error Handling Middleware
app.use(logError);
app.use(errorHandler);

// Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});