const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Book = require("./models/book.models");
const { initializeDatabase } = require("./db/db.connect");

initializeDatabase();

app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Question 1
app.post("/books", async (req, res) => {
  try {
    console.log(req.body);

    const newBook = new Book(req.body);
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Question 3

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Question 4

app.get("/books/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const book = await Book.findOne({ title: title });

    if (!book) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error fetching book:", error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Question 5

app.get("/books/author/:author", async (req, res) => {
  try {
    const authorName = req.params.author;

    const books = await Book.find({ author: authorName });

    if (books.length === 0) {
      return res.status(404).json({
        error: "No books found for this author",
      });
    }

    res.status(200).json({
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Question 6

app.get("/books/genre/business", async (req, res) => {
  try {
    const books = await Book.find({
      genre: "Business",
    });

    if (books.length === 0) {
      return res.status(404).json({
        error: "No Business books found",
      });
    }

    res.status(200).json({
      message: "Business books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Question 7

app.get("/books/year/2012", async (req, res) => {
  try {
    const books = await Book.find({
      publishedYear: 2012,
    });

    if (books.length === 0) {
      return res.status(404).json({
        error: "No books found for year 2012",
      });
    }

    res.status(200).json({
      message: "Books from 2012 fetched successfully",
      data: books,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Question 8

app.post("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        error: "Book does not exist",
      });
    }

    res.status(200).json({
      message: "Book rating updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Question 9

app.post("/books/title/:title", async (req, res) => {
  try {
    const bookTitle = req.params.title;
    const updatedData = req.body;

    const updatedBook = await Book.findOneAndUpdate(
      { title: bookTitle },
      updatedData,
      { new: true },
    );

    if (!updatedBook) {
      return res.status(404).json({
        error: "Book does not exist",
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Question 10

app.delete("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
