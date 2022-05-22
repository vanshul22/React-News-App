import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Importing Infinite Scroll which install from npm.
import InfiniteScroll from "react-infinite-scroll-component";

// Importing components here
import Newsitem from './Newsitem';
import Spinner from "./Spinner";
const News = (props) => {

  // Setting useState her
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // Function to update News of first Page.
  const updateNews = async () => {
    props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKEY}&pageSize=${props.pageSize}&page=${page}`;
    // Fetching data here from news.api website.
    let rawData = await fetch(url);
    props.setProgress(40);
    let parcedData = await rawData.json();
    props.setProgress(70);
    setArticles(parcedData.articles);
    setTotalResults(parcedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  // Updating once all news from here for 1 time.
  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);

  // Fetching app pages Data from here.
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKEY}&pageSize=${props.pageSize}&page=${page + 1}`;
    setPage(page + 1);
    // Fetching data here from news.api website.
    let rawData = await fetch(url);
    let parcedData = await rawData.json();
    setArticles(articles.concat(parcedData.articles));
    setTotalResults(parcedData.totalResults);
  };

  // To return first char as capital.
  const capitalizeChars = (chars) => {
    return chars.replace(/^\w/, char => char.toUpperCase());
  };


  return (
    <>
      <h1 className='text-center mt-5 pt-5'>News Monkey - {capitalizeChars(props.category)} Top Headlines</h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />} >

        <div className="container">
          <div className="row my-4">
            {articles.map((element) => {
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

// Setting Default proptypes here
News.defaultProps = { country: "in", pageSize: 6, category: "general", totalResults: 0 };
// Setting Proptypes Type here
News.propTypes = { country: PropTypes.string, pageSize: PropTypes.number, category: PropTypes.string };

export default News;