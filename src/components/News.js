import React, { Component } from 'react';
// Importing components here
import Newsitem from './Newsitem';

export class News extends Component {

    // Constructor
    constructor() {
        // We always have to call super class to use constructor.
        super();
        this.state = { articles: [], page: 1, loading: false }
    };

    // componentDidMoun will run after render always.
    async componentDidMount() {
        let apiKey = "0b0027c52e6b48db86c5d26446c5a6a3";
        let country = "?country=in";
        let url = `https://newsapi.org/v2/top-headlines${country}&apiKey=${apiKey}&pageSize=20`;
        // Fetching data here from news.api website.
        let rawData = await fetch(url);
        let parcedData = await rawData.json();
        // Setting data here
        this.setState({ articles: parcedData.articles, totalResults: parcedData.totalResults });
    };
    // Handling previous and next page of news here.
    handlePreviousClick = async () => {
        let apiKey = "0b0027c52e6b48db86c5d26446c5a6a3";
        let country = "?country=in";
        let url = `https://newsapi.org/v2/top-headlines${country}&apiKey=${apiKey}&page=${this.state.page - 1}&pageSize=20`;
        // Fetching data here from news.api website.
        let rawData = await fetch(url);
        let parcedData = await rawData.json();
        // Setting data here
        this.setState({ articles: parcedData.articles, page: this.state.page - 1 });
    };

    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        } else {
            let apiKey = "0b0027c52e6b48db86c5d26446c5a6a3";
            let country = "?country=in";
            let url = `https://newsapi.org/v2/top-headlines${country}&apiKey=${apiKey}&page=${this.state.page + 1}&pageSize=20`;
            // Fetching data here from news.api website.
            let rawData = await fetch(url);
            let parcedData = await rawData.json();
            // Setting data here
            this.setState({ articles: parcedData.articles, page: this.state.page + 1 });
        };
    };

    render() {
        return (
            <div className='container my-3'>
                <h2>News Monkey - Top Headlines</h2>
                <div className="row my-4">
                    {this.state.articles.map((element) => {
                        // Taken hese values from json. and sending to Newsitem.
                        return (<div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 100) : ""} imgUrl={element.urlToImage} url={element.url} />
                        </div>);
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        );
    };
};

export default News;