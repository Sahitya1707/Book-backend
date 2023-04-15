const express = require("express");
require("dotenv").config();
const app = express();
const bookRoute = require("./route/book_route");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
// const json = require("json");
connectDB();

app.use(cors());
app.use(express.json());
// app.use(json());
// const mongoose = require("mongoose");
// const mongoString = process.env.DATABASE_URL;
// console.log(mongoString);
// mongoose.connect(mongoString);

const port = process.env.PORT || 8080;

app.use("/api/book", bookRoute);
app.use("/book-images", express.static(path.join(__dirname, "./upload")));
// console.log(port);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// const database = mongoose.connection;
// database.on("error", (err) => {
//   console.log(err);
// });
// database.once("connected", (err) => ss{
//   console.log(`DataBase Connected`);
// });

// app.use(express.json);
// app.use("api", routes);

app.all("*", async (req, res) => {
  return res.status(201).send({ message: "invalid routes" });
});
