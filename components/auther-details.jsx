import React from "react";

class AutherDetails extends React.Component {
  render() {
    const authorDetail = this.props.authorDetail;
    return (
      <div className="author-details row" id={authorDetail.id}>
        <div className="col-1">
          <button
            className="btn btn-outline-primary mt-3"
            onClick={this.props.returnToBookDetail}
          >
            Back
          </button>
        </div>
        <div className="col-3">
          <img className="book-image mt-3 ml-2" src={authorDetail.image_url} />
        </div>
        <div className="col-8 mt-3">
          <div className="author-details d-inline-block">
            <h3 className="book-title ml-4 text-dark font-weight-bold">
              {authorDetail.name}
            </h3>
              <div
              className="book-description ml-4 mt-2"
              dangerouslySetInnerHTML={{ __html: authorDetail.about }}
            />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = AutherDetails;
