const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
  },
  genre: [
    {
      type: String,
    },
  ],
  language: String,
  country: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  summary: String,
  coverImageUrl: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
