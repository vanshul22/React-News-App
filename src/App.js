import './App.css';
import React, { Component } from 'react';
// Imporing Router here
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
// Imporing react-top-loading-bar
import LoadingBar from 'react-top-loading-bar';

// Importing components here
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  // API Key
  apiKEY = process.env.REACT_APP_API_KEY;
  // State for Loading Bar.
  state= {progress:0};
  // Method for Loading Bar.
  setProgress = (progress)=>{
    this.setState({progress:progress})
  };
  render() {
    return (
      <Router>
        <Navbar />

        <LoadingBar color='#f11946' progress={this.state.progress} shadow={true} height={3} />

        <Routes>
          <Route exact path='/' element={<News setProgress={this.setProgress} apiKEY={this.apiKEY} key="general" pageSize={6} country="in" category="general" />}></Route>
          <Route exact path='/business' element={<News setProgress={this.setProgress} apiKEY={this.apiKEY} key="business" pageSize={6} country="in" category="business" />}></Route>
          <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKEY={this.apiKEY} key="entertainment" pageSize={6} country="in" category="entertainment" />}></Route>
          <Route exact path='/general' element={<News setProgress={this.setProgress} apiKEY={this.apiKEY} key="general" pageSize={6} country="in" category="general" />}></Route>
          <Route exact path='/health' element={<News setProgress={this.setProgress} apiKEY={this.apiKEY} key="health" pageSize={6} country="in" category="health" />}></Route>
          <Route exact path='/science' element={<News setProgress={this.setProgress} apiKEY={this.apiKEY} key="science" pageSize={6} country="in" category="science" />}></Route>
          <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKEY={this.apiKEY} key="sports" pageSize={6} country="in" category="sports" />}></Route>
          <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKEY={this.apiKEY} key="technology" pageSize={6} country="in" category="technology" />}></Route>
        </Routes>

      </Router>
    );
  };
};

