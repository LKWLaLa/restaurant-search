import React, { Component } from 'react';
import './App.css';
require('dotenv').config()
let EatStreet = require('eatstreet');

class App extends Component {

  componentDidMount () {
    let ES = new EatStreet(process.env.REACT_APP_ES_KEY);
    ES.SearchRestaurants({address:'10025'}, function(err, res){
    if(err){
        console.log(err);
    }
    res.restaurants.forEach(rest => console.log(rest.name))
});
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Restaurants</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
