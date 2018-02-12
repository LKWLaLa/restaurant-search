import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import HomeContainer from './HomeContainer';
require('dotenv').config();
const EatStreet = require('eatstreet');

class App extends Component {

  componentDidMount () {
    let ES = new EatStreet(process.env.REACT_APP_ES_KEY);
    ES.SearchRestaurants({address:'10025'}, function(err, res){
    if(err){
        console.log(err);
    }
    res.restaurants.forEach(rest => console.log(rest.name))
    console.log(res.restaurants.length)
});
    }


  render() {
    console.log(BrowserRouter)
    return (
      <div className="App">
        <HomeContainer restaurants={[{name: "Rosa Mexicano", address: "Columbus Circle"}, {name: "Zoma", address: "112 St."}, {name: "Community Food and Juice", address: "116 St, near Columbia"}]}/>
      </div>
    );
  }
}

export default App;
