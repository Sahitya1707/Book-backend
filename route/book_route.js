const express = require("express");
const router = express.Router();
const Book = require("../modal/book_modal");
const multer = require("multer");
const path = require("path");
// const upload = multer({ dest: "./upload" });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// router.post("/add", (req, res) => {
//   console.log(`Route has been reached`);
//   console.log(req.body);
//   // console.log(res);
//   // const { author, bookName, publisher, published_data } = req.body;
//   // const newBook = new Book({
//   //   author,
//   //   bookName,
//   //   publisher,
//   //   published_data,
//   // });
//   // newBook
//   //   .save()
//   //   .then((success) => {
//   //     return res.status(200).json({ message: "Book Detail hs been saved" });
//   //   })
//   //   .catch((error) => {
//   //     console.log(error);
//   //   });
// });
router.post("/add", upload.single("image"), (req, res) => {
  // console.log(req.file);

  // console.log(`Route has been reached`);
  // const { author } = req.body;
  // console.log(req.body);
  const { bookName, date, publisher, author, description, isbn } = req.body;
  // console.log(req.body);
  // console.log(image.name);
  // console.log(req.body);
  // console.log(req.file);
  // console.log(bookName);
  // console.log(date, publisher, author, description, isbn);
  // console.log(image);
  //   console.log(req.url);
  //   // console.log(req.body);
  const newBook = new Book({
    bookName,
    date,
    publisher,
    author,
    description,
    isbn,
    image: req.file.filename,
    // image: req.file.fileName,
  });
  newBook
    .save()
    .then((success) => {
      return res.status(200).json({ message: "book has been saved" });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/get-books", (req, res) => {
  // res.send("Book route!");
  Book.find()
    .then((books) => {
      return res.status(200).json({ books });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/show-book/:id", (req, res) => {
  // console.log(req.params.id);
  Book.findById(req.params.id)
    .then((book) => res.status(200).json({ book }))
    .catch((err) => {
      console.log(err);
    });
});
router.delete("/delete/:id", (req, res) => {
  // const id = req.params.id;
  // console.log(req.params.id);

  Book.findByIdAndDelete(req.params.id)
    .then((salons) => {
      return res.status(200).json({ message: "Books has been deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.put("/update/:id", (req, res) => {
  // console.log(req.params.id);
  // console.log(req.body);
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

module.exports = router;
