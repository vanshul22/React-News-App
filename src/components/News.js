import React, { Component } from 'react';
// Importing components here
import Newsitem from './Newsitem';


export class News extends Component {
  render() {
    return (
      <>
        News component.
        <Newsitem/>
      </>
    );
  };
};

export default News;
