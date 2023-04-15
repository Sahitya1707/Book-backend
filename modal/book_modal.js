const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    publisher: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },

    isbn: {
      type: String,
    },

    // updatedDate: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);
const BookDetail = mongoose.model("book", bookSchema);
module.exports = BookDetail;
