const db = require("../models"),
request = require ('request');

module.exports = {
  //fetch articles from NYT based on query
  findArticles: function(req, res) {
    const articles = [];
    request.get({
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      qs: {
        'api-key': "cce740b3e1de4e50961e67a87a201958",
        'q': req.params.query
      }, 
    },(err, response, body) => {
      body = JSON.parse(body);
      body.response.docs.forEach(element => {
        articles.push({ title: element.headline.main, body: element.snippet, date: element.pub_date,
          url: element.web_url, note: "", image: element.multimedia[0] ? element.multimedia[0].url:undefined
        });
      });
      res.json(articles.length > 5 ? articles.splice(0,5):articles);
    });//axios.get
  },
  saveArticle: function(req, res) {
    db.Article
    .create(req.body)
    .then(dbModel => res.json(dbModel));
  },
    getSavedArticles: function(req, res) {
    db.Article
      .find(req.query="")
      .sort({ date: -1 })
      .then(dbModel => { res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.body.id }, {note: req.body.note})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeArticle: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
