import React, { Component } from 'react';
// Importing components here
import Newsitem from './Newsitem';
import Spinner from "./Spinner"
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
        let url = `https://newsapi.org/v2/top-headlines${country}&apiKey=${apiKey}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        // Fetching data here from news.api website.
        let rawData = await fetch(url);
        let parcedData = await rawData.json();
        // Setting data here
        this.setState({ articles: parcedData.articles, totalResults: parcedData.totalResults, loading: false });
    };
    // Handling previous and next page of news here.
    handlePreviousClick = async () => {
        let apiKey = "0b0027c52e6b48db86c5d26446c5a6a3";
        let country = "?country=in";
        let url = `https://newsapi.org/v2/top-headlines${country}&apiKey=${apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        // Fetching data here from news.api website.
        let rawData = await fetch(url);
        let parcedData = await rawData.json();
        // Setting data here
        this.setState({ articles: parcedData.articles, page: this.state.page - 1, loading: false });
    };

    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        } else {
            let apiKey = "0b0027c52e6b48db86c5d26446c5a6a3";
            let country = "?country=in";
            let url = `https://newsapi.org/v2/top-headlines${country}&apiKey=${apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            // Fetching data here from news.api website.
            let rawData = await fetch(url);
            let parcedData = await rawData.json();
            // Setting data here
            this.setState({ articles: parcedData.articles, page: this.state.page + 1, loading: false });
        };
    };

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>News Monkey - Top Headlines</h1>
                {/* if content is loading then only spinner will show us from this below logic */}
                {this.state.loading && <Spinner />}
                <div className="row my-4">
                    {!this.state.loading && this.state.articles.map((element) => {
                        // Taken hese values from json. and sending to Newsitem.
                        return (<div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 100) : ""} imgUrl={element.urlToImage} url={element.url} />
                        </div>);
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        );
    };
};

export default News;