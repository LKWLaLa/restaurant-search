import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
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
    return (
      <div className="App">
        <Switch>
          <Route exact path= '/' render={(props)=><HomeContainer {...props} restaurants={[{name: "Rosa Mexicano", address: "Columbus Circle"}, {name: "Zoma", address: "112 St."}, {name: "Community Food and Juice", address: "116 St, near Columbia"}]}/> } />          
        </Switch>
      </div>
    );
  }
}

export default App;
