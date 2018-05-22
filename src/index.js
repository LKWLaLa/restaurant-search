import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/restaurantReducer';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import ScrollToTop from './components/ScrollToTop'
import App from './components/App';
import registerServiceWorker, {unregister} from './registerServiceWorker';

let store = createStore(
  rootReducer, 
  compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

unregister();

ReactDOM.render((
<Provider store={store}> 
    <Router>
      <ScrollToTop>
       <App />
      </ScrollToTop> 
    </Router>
</Provider>
  ), document.getElementById('root'));
