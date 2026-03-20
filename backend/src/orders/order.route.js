const express = require('express');
const { createOrder, getOrdersByEmail } = require('./order.controller');

const router = express.Router();

// Create new order
router.post('/', createOrder);

// Get orders associated with an email
router.get("/email/:email", getOrdersByEmail);

module.exports = router;