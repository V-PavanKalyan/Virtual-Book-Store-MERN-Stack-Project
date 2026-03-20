const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    credentials: true
}));

// Routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use('/api/books', bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

app.get('/', (req, res) => {
    res.send("Book Store Server is running!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong! " + err.message });
});

async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected successfully!");
        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

main();