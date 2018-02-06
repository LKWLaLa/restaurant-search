import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentWillMount () {
        const es = document.createElement("script");
        es.type = 'text/javascript'; 
        es.async = true;
        es.src = ('https:' === document.location.protocol ? 'https://' : 'http://developers.') + 'eatstreet.com/api-js-sdk/js/sdk-remote.js';
        document.body.appendChild(es);
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
