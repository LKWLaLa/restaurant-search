import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import RootReducer from './reducers/restaurantReducer';
import {addRestaurants} from './actions/restaurantActions';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


let store = createStore(RootReducer);

ReactDOM.render((
  <Router>
    <App />
  </Router>
  ), document.getElementById('root'));
registerServiceWorker();
