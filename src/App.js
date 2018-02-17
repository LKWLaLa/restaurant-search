import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from './HomeContainer';
import RestaurantMenu from './RestaurantMenu'
require('dotenv').config();


class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path= '/' render={(props)=><HomeContainer {...props} restaurants={[{name: "Rosa Mexicano", address: "Columbus Circle", key: 1, id: 1}, {name: "Zoma", address: "112 St.", key: 2, id: 2}, {name: "Community Food and Juice", address: "116 St, near Columbia", key: 3, id: 3}]}/> } />          
          <Route exact path= '/restaurants/:id' render={(props)=><RestaurantMenu {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
