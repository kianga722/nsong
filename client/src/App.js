import React, { Component } from 'react';
import SortBar from './components/SortBar';
import SongList from './components/SongList';
import ChannelBox from './components/ChannelBox';

class App extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      songs: null,
      sortDateNewest: true,
      channelSort: {
        Proximity: true,
        'Thrilling Music': true,
        'Revealed Music': true,
        WaveMusic: true,
      },
    };
  }

  songsSet = (songsNew) => {
    this.setState({
      songs: songsNew
    })
  }

  sortDateNewestToggle = (bool) => {
    this.setState({
      sortDateNewest: bool
    })
  }

  toggleSort = (channel) => {
    this.setState({
      channelSort: {
        ...this.state.channelSort,
        [channel]: !this.state.channelSort[channel]
      }
    })
  }

  selectAll = (bool) => {
    let channelCopy = { ...this.state.channelSort };
    Object.keys(channelCopy).forEach(channel => {
      channelCopy[channel] = bool;
    })
    this.setState({
      channelSort: {
        ...channelCopy
      }
    })
  }

  dateSortNewest = (bool) => {
    let songsSorted = [...this.state.songs ];
    songsSorted.sort((a, b) => {
      const d1 = new Date(a.published);
      const d2 = new Date(b.published);
      if (bool) {
        if (d1 >= d2) {
          return -1;
        }
        if (d1 < d2) {
          return 1;
        }
      } else {
        if (d1 >= d2) {
          return 1;
        }
        if (d1 < d2) {
          return -1;
        }
      }
    })
    this.songsSet(songsSorted);
    this.sortDateNewestToggle(bool); 
  }

  async componentDidMount() {
    const songsGet = await fetch('/api/');
    const songsGetJSON = await songsGet.json();
    this.songsSet(songsGetJSON);
  }

  render() {
    return (
      <div>
        {
          this.state.songs
          && <div id='content'>
              <SortBar
                sortDateNewest={this.state.sortDateNewest}
                dateSortNewest={this.dateSortNewest}
              />
              <SongList
                channelSort={this.state.channelSort}
                songs={this.state.songs}
              />
              <ChannelBox
                channelSort={this.state.channelSort}
                toggleSort={this.toggleSort}
                selectAll={this.selectAll}
              />
             </div>  
        }
      </div>
    );
  }
}

export default App;
