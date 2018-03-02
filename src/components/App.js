import React, { Component } from 'react'
import '../App.css'
import { Switch, Route } from 'react-router-dom'
import HomeContainer from './HomeContainer'
import MenuContainer from './MenuContainer'
import 'font-awesome/css/font-awesome.min.css'
require('dotenv').config()


class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path= '/' render={(props)=><HomeContainer {...props} /> } />          
          <Route exact path= '/restaurants/:id' render={(props)=><MenuContainer {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
