import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Importing Infinite Scroll which install from npm.
import InfiniteScroll from "react-infinite-scroll-component";

// Importing components here
import Newsitem from './Newsitem';
import Spinner from "./Spinner";
export class News extends Component {
  // Setting Default proptypes here
  static defaultProps = { country: "in", pageSize: 6, category: "general", totalResults: 0 };
  // Setting Proptypes Type
  static propTypes = { country: PropTypes.string, pageSize: PropTypes.number, category: PropTypes.string };

  // Constructor
  constructor(props) {
    // We always have to call super class to use constructor.
    super(props);
    this.state = { articles: [], page: 1, loading: false };
  };

  // Updating once all news from here for 1 time.
  updateNews = async () => {
    this.props.setProgress(20);
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKEY}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    // Fetching data here from news.api website.
    let rawData = await fetch(url);
    this.props.setProgress(40);
    let parcedData = await rawData.json();
    this.props.setProgress(70);
    this.setState({ articles: parcedData.articles, totalResults: parcedData.totalResults, loading: false });
    this.props.setProgress(100);
  };

  // componentDidMoun will run after render always.
  componentDidMount = async () => {
    this.updateNews();
  };

  // Fetching Infinite Date from here.
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKEY}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    // Fetching data here from news.api website.
    let rawData = await fetch(url);
    let parcedData = await rawData.json();
    this.setState({ articles: this.state.articles.concat(parcedData.articles), totalResults: parcedData.totalResults });
  };

  // To return first char as capital.
  capitalizeChars = (chars)=>{
    return chars.replace(/^\w/, char => char.toUpperCase());
  }; 


  render() {
    return (
      <>
        <h1 className='text-center mt-4'>News Monkey - {this.capitalizeChars(this.props.category)} Top Headlines</h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />} >

          <div className="container">
            <div className="row my-4">
              {this.state.articles.map((element) => {
                // Taken hese values from json. and sending to Newsitem.
                return (<div className="col-md-4" key={element.url}>
                  <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 100) : ""} imgUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>);
              })}
            </div>
          </div>

        </InfiniteScroll>

      </>
    );
  };
};

export default News;