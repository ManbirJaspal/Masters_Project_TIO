import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import Landing  from './components/Landing';
import {loadState, saveState} from './localStorage';
import throttle from 'lodash/throttle';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <Landing />
  </Provider>,
 document.querySelector('#root')
);
