import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { HashRouter as Router, } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore} from 'redux'
import rootReducer from './reducers/index'

const store = createStore(rootReducer);

ReactDOM.render((
<Provider store={store}>
  <Router>
      <App/>
  </Router>
</Provider>),
document.getElementById('root')
);
serviceWorker.unregister();
