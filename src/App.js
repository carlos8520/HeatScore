import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>HeatScore</h1>
          <h2>Prove</h2>
        </div>
        <div>
          <LandingPage/>
        </div>
      </div>
    );
  }
}

export default App;
