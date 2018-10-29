import request from "superagent";
import React from "react";
import ReactDOM from "react-dom";
import Loader from 'react-loader';

import BookDetailDescription from "./book-detail-description";
import AuthorDetailDescription from "./auther-details";
import Search from "./search";
import SearchResult from "./search-result";
import NavBar from "./navbar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: {},
      currentBookDetail: null,
      currentAuthorDetail: null
    };
    this.performSearch = this.performSearch.bind(this);
    this.showBookDetail = this.showBookDetail.bind(this);
    this.returnToSearch = this.returnToSearch.bind(this);
    this.returnToBookDetail = this.returnToBookDetail.bind(this);
    this.showAuthorDetail = this.showAuthorDetail.bind(this);
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="parent-container container good-reads-search-container">
          <div id="overlay-inAbox" className="overlay">
            <div className="overlay-content">
              <Loader loaded={this.state.loaded} color="white" />
            </div>
          </div>
          {this.renderSearch()}
          {this.renderBookDetails()}
          {this.renderAuthorDetails()}
        </div>
      </React.Fragment>
    );
  }
  renderSearch() {
    let result = [];
    const searchResult = this.state.searchResult;
    if (searchResult && searchResult.results && searchResult.results.work) {
      result = searchResult.results.work;
    }
    if (this.state.currentBookDetail == null && this.state.currentAuthorDetail == null) {
      return (
        <div>
          <Search performSearch={this.performSearch} />
          <SearchResult result={result} showBookDetail={this.showBookDetail} />
        </div>
      );
    }
    return <div />;
  }
  renderBookDetails() {
    if (this.state.currentAuthorDetail == null && this.state.currentBookDetail) {
      return (
        <BookDetailDescription
          bookDetail={this.state.currentBookDetail}
          returnToSearch={this.returnToSearch}
          showAuthorDetail={this.showAuthorDetail}
        />
      );
    }
    return <div />;
  }
  renderAuthorDetails(){
    if (this.state.currentAuthorDetail) {
      return (
        <AuthorDetailDescription
          authorDetail={this.state.currentAuthorDetail}
          returnToBookDetail={this.returnToBookDetail}
        />
      );
    }
    return <div />;
  }
  showOverlay() {
    window.openOverlay("overlay-inAbox");
    this.setState({ loaded: false });
  }
  hideOverlay() {
    window.closeOverlay("overlay-inAbox");
    this.setState({ loaded: true });
  }
  performSearch(text) {
    if (text) {
      this.showOverlay();
      const args = {
        data: {
          text: text
        },
        header: {
          "Content-Type": "application/json"
        }
      };
      request.post("/", args, (err, data) => {
        this.hideOverlay();
        if (err) {
          console.error(err);
          return;
        }
        //To handle average rating issue in some result set
        _.each(data.body.results.work, function (obj) {
          if (_.isObject(obj.average_rating)) {
            obj.average_rating = obj.average_rating._;
          }
        });
        this.setState({
          searchResult: data.body
        });
      });
    } else {
      this.setState({
        searchResult: {}
      });
    }
  }

  showBookDetail(bookId) {
    this.showOverlay();
    const args = {
      header: {
        "Content-Type": "application/json"
      }
    };
    request.get(`/bookDetail/${bookId}`, args, (err, data) => {
      this.hideOverlay();
      if (err) {
        console.error(err);
        return;
      }
      this.setState({
        currentBookDetail: data.body
      });
    });
  }

  returnToSearch() {
    this.setState({
      currentBookDetail: null,
      currentAuthorDetail: null
    });
  }

  returnToBookDetail(){
    this.setState({
      currentAuthorDetail: null
    });
  }
  
  showAuthorDetail(authorId) {
    this.showOverlay();
    const args = {
      header: {
        "Content-Type": "application/json"
      }
    };
    request.get(`/authorDetail/${authorId}`, args, (err, data) => {
      this.hideOverlay();
      if (err) {
        console.error(err);
        return;
      }
      this.setState({
        currentAuthorDetail: data.body
      });
    });
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
