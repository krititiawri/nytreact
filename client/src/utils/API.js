import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  findArticles: function(query) {
    return axios.get("/api/books/articles/" + query);
  },
  saveArticle: function(articleData) {
    return axios.post("/api/books/articles", articleData);
  },
  updateArticle: function(articleData) {
    return axios.post("/api/books/update-article", articleData);
  },
  getSavedArticles: function() {
    return axios.get("/api/books/saved-articles");
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/books/articles/" + id);
  }
};
