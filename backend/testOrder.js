require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./src/orders/order.model');

async function testOrder() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");

    const newOrder = new Order({
      name: "Test User",
      email: "test@example.com",
      address: {
        city: "Test City",
        country: "Test Country",
        state: "Test State",
        zipcode: "12345",
        street: "123 Test St"
      },
      phone: 1234567890,
      productIds: [new mongoose.Types.ObjectId()],
      totalPrice: 100.00
    });
    
    await newOrder.save();
    console.log("Order saved successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

testOrder();
