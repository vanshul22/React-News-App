import React, { Component } from 'react';

export class Newsitem extends Component {
    render() {
        // Using props in class.
        let { title, description } = this.props;
        return (
            <>
                <div className="card" style={{ width: "18rem", margin: "10px 10px" }}>
                    <img src="/img" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text"> {description}</p>
                        <a href="/Read More" className="btn btn-primary">Read More...</a>
                    </div>
                </div>
            </>
        );
    };
};

export default Newsitem;
// https://newsapi.org/v2/top-headlines?q={cricket}&apiKey={0b0027c52e6b48db86c5d26446c5a6a3}