import React, { Component } from 'react';
import SortBar from './components/SortBar';
import SongList from './components/SongList';
import LayoutChange from './components/LayoutChange';
import ChannelBox from './components/ChannelBox';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {  
  render() {
    return (
              <Provider store={store}>
                <SortBar />
                <SongList />
                <LayoutChange />
                <ChannelBox />
              </Provider>
    )
  }
}

export default App;