import React, { Component } from 'react';
import SongList from './components/SongList';

class App extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      songs: null
    };
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
          && <SongList songs={this.state.songs} />
        }
      </div>
    );
  }
}

export default App;
