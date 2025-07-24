/*
 * -----------------------------------------------------------------------------
 * Payments Controller - controllers/paymentsController.js
 * -----------------------------------------------------------------------------
 * This controller handles the business logic for payment operations. It uses
 * the equalsMoneyService to interact with the API and sends responses back to
 * the client.
 */
const equalsMoneyService = require('../services/equalsMoneyService');

// Beneficiary Controllers
const handleAddBeneficiary = async (req, res, next) => {
  try {
    const beneficiary = await equalsMoneyService.addBeneficiary(req.body);
    res.status(201).json(beneficiary);
  } catch (error) {
    next(error);
  }
};

const handleListBeneficiaries = async (req, res, next) => {
  try {
    const beneficiaries = await equalsMoneyService.listBeneficiaries();
    res.status(200).json(beneficiaries);
  } catch (error) {
    next(error);
  }
};

// Quote Controller
const handleGetQuote = async (req, res, next) => {
  try {
    const quote = await equalsMoneyService.getExchangeRateQuote(req.body);
    res.status(200).json(quote);
  } catch (error) {
    next(error);
  }
};

// Payment Controllers
const handleInitiatePayment = async (req, res, next) => {
  try {
    const payment = await equalsMoneyService.initiatePayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};

const handleGetPaymentStatus = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const status = await equalsMoneyService.getPaymentStatus(paymentId);
    res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};

// Confirmation Controller
const handleDownloadConfirmation = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const confirmationPdf = await equalsMoneyService.downloadPaymentConfirmation(paymentId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=confirmation-${paymentId}.pdf`);
    res.send(confirmationPdf);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddBeneficiary,
  handleListBeneficiaries,
  handleGetQuote,
  handleInitiatePayment,
  handleGetPaymentStatus,
  handleDownloadConfirmation
};