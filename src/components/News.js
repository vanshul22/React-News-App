import React, { Component } from 'react';
// Importing components here
import Newsitem from './Newsitem';

export class News extends Component {

    // Constructor
    constructor() {
        // We always have to call super class to use constructor.
        super();
        this.state = { articles: [] }
    };

    // omponentDidMoun will run after render always.
    async componentDidMount() {
        let apiKey = "0b0027c52e6b48db86c5d26446c5a6a3";
        // let typeOfNews = "?q=cricket";
        let country = "?country=in";
        let url = `https://newsapi.org/v2/top-headlines${country}&apiKey=${apiKey}`;
        // Fetching data here from news.api website.
        let rawData = await fetch(url);
        let parcedData = await rawData.json();
        // Setting data here
        this.setState({ articles: parcedData.articles });
    }


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
            </div>
        );
    };
};

export default News;
