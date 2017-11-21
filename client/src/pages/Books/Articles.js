import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

  class Articles extends Component {
  state = {
    foundArticles: [],
    savedArticles: [],
    query: "",
      startyear: "",
    endyear: "",
    note: ""
  };

  componentDidMount() {
    this.loadSavedArticles();
  }

  loadSavedArticles = () => {
    API.getSavedArticles()
    .then(res => this.setState({ savedArticles: res.data }))
    .catch(err => console.log(err));  
  };

  loadArticles = (res) => {
    this.setState({ foundArticles: res.data })
  };

  saveArticle = (index) => {
    API.saveArticle(this.state.foundArticles[index])
    .then(res => this.loadSavedArticles())
    .catch(err => console.log(err));  
  }

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  updateArticle = id => {
    API.updateArticle({id:id, note:this.state.note})
    .then(res => this.loadSavedArticles())
    .catch(err => console.log(err));  
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.query) {
      API.findArticles(this.state.query,this.state.startyear, this.state.endyear)
        .then(res => {this.loadArticles(res)})
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
              <h1>Article Search</h1>
            <form>
              <Input
                value={this.state.query}
                onChange={this.handleInputChange}
                name="query"
                placeholder="Topic (required)"
              />
              <Input value={this.state.startyear} onChange={this.handleInputChange} name="startyear" placeholder="2000" />
              <Input value={this.state.endyear} onChange={this.handleInputChange} name="endyear" placeholder="2017" />
              <FormBtn
                disabled={!(this.state.query)}
                onClick={this.handleFormSubmit}
              >
                Search Articles
              </FormBtn>
            </form>
            <h1>Resulting Articles</h1>
            {this.state.foundArticles.length ? (
              <List>
                {this.state.foundArticles.map((article, index) => (
                  <ListItem key={index}>
                    <a href={article.url}>
                      <strong>
                        {article.title}
                      </strong><br />
                      {article.body}
                    </a>
                    <SaveBtn onClick={() => this.saveArticle(index)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-12">
            <h1>Saved Articles</h1>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url}>
                    <strong>
                      {article.title}
                    </strong><br />
                    {article.body}<br />
                    {article.date}
                  </a>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    <div className="input-group">
                      <input 
                        type="text" defaultValue={article.note}
                        onChange={this.handleInputChange} 
                        name="note" className="form-control" 
                        placeholder="Enter your note..." />
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={() => this.updateArticle(article._id)}>
                          🖫
                        </button>
                      </span>
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )
          }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;