/*
 * -----------------------------------------------------------------------------
 * API Service - services/equalsMoneyService.js
 * -----------------------------------------------------------------------------
 * This service encapsulates all interactions with the Equals Money API. It
 * handles API client setup, authentication, and provides methods for various
 * payment operations.
 */
const axios = require('axios');
const crypto = require('crypto');

// API Configuration
const API_BASE_URL = process.env.EQUALS_MONEY_API_URL || 'https://api-sandbox.equalsmoney.com';
const API_KEY = process.env.EQUALS_MONEY_API_KEY;
const API_SECRET = process.env.EQUALS_MONEY_API_SECRET;

// Create an Axios instance for authenticated API requests
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `ApiKey ${API_KEY}`
  }
});

/**
 * Generates the required HMAC-SHA256 signature for API authentication.
 * @param {string} timestamp - The current timestamp in milliseconds.
 * @param {object} [body] - The request body (for POST/PUT requests).
 * @returns {string} The generated signature.
 */
const generateSignature = (timestamp, body = null) => {
  const stringToSign = `${API_KEY}:${timestamp}:1:${body ? JSON.stringify(body) : ''}`;
  return crypto.createHmac('sha256', API_SECRET).update(stringToSign).digest('hex');
};

// Add a request interceptor to include the signature in headers
apiClient.interceptors.request.use(config => {
  const timestamp = Date.now();
  config.headers['X-Timestamp'] = timestamp;
  config.headers['X-Signature'] = generateSignature(timestamp, config.data);
  return config;
}, error => {
  return Promise.reject(error);
});

// Beneficiary Management
const addBeneficiary = async (beneficiaryData) => {
  try {
    const response = await apiClient.post('/v2/recipients', beneficiaryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const listBeneficiaries = async () => {
  try {
    const response = await apiClient.get('/v2/recipients');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Quoting and Exchange
const getExchangeRateQuote = async (quoteData) => {
  try {
    const response = await apiClient.post('/v2/quotes', quoteData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Payment Initiation
const initiatePayment = async (paymentData) => {
  try {
    const response = await apiClient.post('/v2/orders', paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Payment Tracking
const getPaymentStatus = async (paymentId) => {
  try {
    const response = await apiClient.get(`/v2/orders/${paymentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Payment Confirmation
const downloadPaymentConfirmation = async (paymentId) => {
  try {
    const response = await apiClient.get(`/v2/payments/${paymentId}/confirmation`, {
      responseType: 'arraybuffer' // To handle PDF downloads
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addBeneficiary,
  listBeneficiaries,
  getExchangeRateQuote,
  initiatePayment,
  getPaymentStatus,
  downloadPaymentConfirmation
};