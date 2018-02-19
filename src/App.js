import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from './HomeContainer';
import RestaurantMenuContainer from './RestaurantMenuContainer'
require('dotenv').config();


class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path= '/' render={(props)=><HomeContainer {...props} /> } />          
          <Route exact path= '/restaurants/:id' render={(props)=><RestaurantMenuContainer {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
