import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore} from 'redux';
import rootReducer from './reducers/restaurantReducer';
import {Provider} from 'react-redux';

let store = createStore(rootReducer);


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    (<Provider store={store}> 
      <Router>      
       <App />      
      </Router>
    </Provider>), 
    div);
  ReactDOM.unmountComponentAtNode(div);
});
