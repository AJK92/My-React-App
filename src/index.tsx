import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import {Provider} from 'react-redux'
// import {createStore} from 'redux'
// import getGalleryListReducer from './Reducers/gallery-reducers'
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// const store = createStore(getGalleryListReducer)

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
