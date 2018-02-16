import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import RootReducer from './reducers/restaurantReducer';
import {addRestaurants} from './actions/restaurantActions';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


let store = createStore(RootReducer);

ReactDOM.render((
<Provider store={store}> 
  <Router>
    <App />
  </Router>
</Provider>
  ), document.getElementById('root'));
registerServiceWorker();
