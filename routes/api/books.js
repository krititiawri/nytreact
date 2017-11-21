const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");
 
router.route("/articles/:query")
  .get(articlesController.findArticles);

  router.route("/articles/:id")
  .delete(articlesController.removeArticle);

router.route("/articles")
  .post(articlesController.saveArticle);
  
  router.route("/saved-articles")
  .get(articlesController.getSavedArticles);

  router.route("/update-article")
  .post(articlesController.update);

module.exports = router;
