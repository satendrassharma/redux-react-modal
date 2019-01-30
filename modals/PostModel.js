const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  name: String,
  post: String
});

module.exports = mongoose.model("Post", PostSchema);
