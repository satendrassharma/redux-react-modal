const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const post = require("./routes/api/post");
const path = require("path");
const app = new express();

const db = "mongodb://localhost/react-redux-modal";
//connect to mongodb
mongoose
  .connect(
    process.env.mongoURI,
    { useNewUrlParser: true, useFindAndModify: false }
  )
  .then(res => console.log("mongodb connected"))
  .catch(err => console.log(err));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/post", post);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
