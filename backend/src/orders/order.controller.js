const Order = require("./order.model");

/**
 * Create a new order in the database.
 * @param {Object} req - Express request object containing order data in body.
 * @param {Object} res - Express response object.
 */
const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

/**
 * Fetch all orders associated with a specific email.
 * @param {Object} req - Express request object containing user email in params.
 * @param {Object} res - Express response object.
 */
const getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this email" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by email:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = {
  createOrder,
  getOrdersByEmail
};