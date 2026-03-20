const Book = require("./book.model");

/**
 * Create a new book entry in the database.
 * @param {Object} req - Express request object containing book data in body.
 * @param {Object} res - Express response object.
 */
const createBook = async (req, res) => {
    try {
        const newBook = new Book({ ...req.body });
        await newBook.save();
        res.status(201).send({ message: "Book created successfully", book: newBook });
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).send({ message: "Failed to create book" });
    }
};
/**
 * Retrieve all books sorted by creation date (newest first).
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send({ message: "Failed to fetch books" });
    }
};

/**
 * Retrieve a single book by its ID.
 * @param {Object} req - Express request object containing book ID in params.
 * @param {Object} res - Express response object.
 */
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        
        if (!book) {
            return res.status(404).send({ message: "Book not found!" });
        }
        res.status(200).send(book);
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        res.status(500).send({ message: "Failed to fetch book" });
    }
};
/**
 * Update an existing book's details.
 * @param {Object} req - Express request object containing book ID in params and updates in body.
 * @param {Object} res - Express response object.
 */
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedBook) {
            return res.status(404).send({ message: "Book not found!" });
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).send({ message: "Failed to update book" });
    }
};

/**
 * Delete a book from the database.
 * @param {Object} req - Express request object containing book ID in params.
 * @param {Object} res - Express response object.
 */
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        
        if (!deletedBook) {
            return res.status(404).send({ message: "Book not found!" });
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send({ message: "Failed to delete book" });
    }
};

/**
 * Add a review and rating to a specific book.
 * @param {Object} req - Express request object containing book ID and review data.
 * @param {Object} res - Express response object.
 */
const addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, comment, rating } = req.body;
        
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send({ message: "Book not found" });
        }

        // Add the new review to the reviews array
        book.reviews.push({ user, comment, rating });
        
        // Recalculate the average rating
        const totalRating = book.reviews.reduce((acc, rev) => acc + rev.rating, 0);
        book.rating = parseFloat((totalRating / book.reviews.length).toFixed(1));

        await book.save();
        res.status(200).send({ message: "Review added successfully", book });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).send({ message: "Failed to add review" });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    addReview
};