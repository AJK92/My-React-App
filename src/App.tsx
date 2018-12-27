import * as React from 'react'
import './css/tailwind.css'
import { Home } from './features/Home'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import getGalleryListReducer from './Reducers/gallery-reducers'


const store = createStore(getGalleryListReducer)


class App extends React.Component {
  render() {
    return (
      <div className="h-full w-full bg-black">
        <Provider store={store}><Home /></Provider>
      </div>
    );
  }
}

export default App;
