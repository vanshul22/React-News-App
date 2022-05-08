import './App.css';
import React, { Component } from 'react';
// Importing components here
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar/>
        <News/>
      </>
    );
  };
};

