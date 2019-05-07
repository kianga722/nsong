import React, { Component } from 'react';
import SongList from './components/SongList';
import ChannelBox from './components/ChannelBox';

class App extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      songs: null,
      channelSort: {
        Proximity: true,
        'Thrilling Music': true,
        'Revealed Music': true,
        WaveMusic: true,
      }
    };
  }

  toggleSort = (channel) => {
    this.setState({
      channelSort: {
        ...this.state.channelSort,
        [channel]: !this.state.channelSort[channel]
      }
    })
  }

  UnSelectAll = () => {
    let channelCopy = { ...this.state.channelSort };
    Object.keys(channelCopy).forEach(channel => {
      channelCopy[channel] = false;
    })
    this.setState({
      channelSort: {
        ...channelCopy
      }
    })
  }

  SelectAll = () => {
    let channelCopy = { ...this.state.channelSort };
    Object.keys(channelCopy).forEach(channel => {
      channelCopy[channel] = true;
    })
    this.setState({
      channelSort: {
        ...channelCopy
      }
    })
  }

  async componentDidMount() {
    const songsGet = await fetch('/api/');
    const songsGetJSON = await songsGet.json();
    this.setState({
      songs: songsGetJSON
    })
  }

  render() {
    return (
      <div>
        {
          this.state.songs
          && <div id='content'>
              <SongList
                channelSort={this.state.channelSort}
                songs={this.state.songs}
              />
              <ChannelBox
                channelSort={this.state.channelSort}
                toggleSort={this.toggleSort}
                UnSelectAll={this.UnSelectAll}
                SelectAll={this.SelectAll}
              />
             </div>  
        }
      </div>
    );
  }
}

export default App;
