import React, { Component } from 'react';

import AppMessages from './AppMessages';

import logo from './logo.svg';
import './App.css';

import AppNav from "./AppNav"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-header-logo">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Internet of Stuff</h2>
          </div>
          <AppNav/>
        </div>
        <AppMessages />
        {this.props.children}
      </div>
    );
  }
}

export default App;
