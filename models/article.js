const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  url: { type: String, required: true },
  note: { type: String },
  image: String,
  date: { type: Date, default: Date.now }
});

const articles = mongoose.model("ignArticles", articleSchema);
module.exports = articles;