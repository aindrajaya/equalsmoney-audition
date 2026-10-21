/*
 * -----------------------------------------------------------------------------
 * Payment Routes - routes/paymentRoutes.js
 * -----------------------------------------------------------------------------
 * This file defines the API routes for all payment-related actions. It maps
 * HTTP methods and endpoints to the corresponding controller functions.
 */
const express = require('express');
const router = express.Router();
const {
  handleAddBeneficiary,
  handleListBeneficiaries,
  handleGetQuote,
  handleInitiatePayment,
  handleGetPaymentStatus,
  handleDownloadConfirmation
} = require('../controllers/paymentsController');

// Beneficiary Routes
router.post('/beneficiaries', handleAddBeneficiary);
router.get('/beneficiaries', handleListBeneficiaries);

// Quote Route
router.post('/quote', handleGetQuote);

// Payment Routes
router.post('/initiate', handleInitiatePayment);
router.get('/:paymentId/status', handleGetPaymentStatus);

// Confirmation Route
router.get('/:paymentId/confirmation', handleDownloadConfirmation);

module.exports = router;
