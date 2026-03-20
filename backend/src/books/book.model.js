const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Book description is required'],
    },
    category: {
        type: String,
        required: [true, 'Book category is required'],
        index: true
    },
    trending: {
        type: Boolean,
        default: false,
    },
    coverImage: {
        type: String,
        required: [true, 'Cover image URL is required'],
    },
    oldPrice: {
        type: Number,
        required: [true, 'Old price is required'],
    },
    newPrice: {
        type: Number,
        required: [true, 'New price is required'],
    },
    stock: {
        type: Number,
        default: 10,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [
        {
            user: String,
            comment: String,
            rating: Number,
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, {
    timestamps: true,
});

// Add search index
bookSchema.index({ title: 'text', description: 'text' });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;