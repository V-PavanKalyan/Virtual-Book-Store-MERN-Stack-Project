const express = require('express');
const { 
    createBook, 
    getAllBooks, 
    getBookById, 
    updateBook, 
    deleteBook, 
    addReview 
} = require('./book.controller');
const { verifyAdminToken } = require('../middleware/verifyAdminToken');

const router = express.Router();

// Book creation and listing
router.post("/create-book", verifyAdminToken, createBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// Book update and deletion (Admin only)
router.put("/edit/:id", verifyAdminToken, updateBook);
router.delete("/:id", verifyAdminToken, deleteBook);

// Reviews
router.post("/:id/review", addReview);

module.exports = router;