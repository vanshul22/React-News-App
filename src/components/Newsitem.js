import React, { Component } from 'react';

export class Newsitem extends Component {

  render() {
    // Using props in class.
    let { title, description, imgUrl, url, author, date, source } = this.props;
    // If Image is none then this is a default image.
    let noneImgUrl = "https://static.wixstatic.com/media/5df28b_58a1ccf868e64f97ad17ef4f61c9e455~mv2.png/v1/fit/w_597%2Ch_352%2Cal_c/file.png";

    return (
      <>
        <div className="card" style={{ width: "20rem", margin: "10px 10px" }}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "90%", zIndex: "1" }}>{source}</span>
          <img src={imgUrl ? imgUrl : noneImgUrl} className="card-img-top rounded" style={{ height: "11em" }} alt="error" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text"> {description}...</p>
            <p className="card-text"><small className='text-muted'>By {author ? author : "unknown"} on {(date.replace("T", " ").replace("Z", ""))}</small></p>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More...</a>
          </div>
        </div>
      </>
    );
  };
};

export default Newsitem;