import React, { Component } from 'react';

class SongEmbed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false
    };
  }

  // Only want to load video if user clicks on the cover image
  videoPlay = () => {
    this.setState({
      play: true
    })
  };

  renderNoPlay = () => {
    return (
      <div className='play-button'></div>
    )
  }

  renderPlay = () => {
    const song = this.props.song;
    return (
      <iframe
        title={`${song.videoId}-iframe`}
        width='160'
        height='90'
        src={`https://www.youtube.com/embed/${song.videoId}?rel=0&showinfo=0&autoplay=1`} frameBorder='0'
        allow='autoplay; encrypted-media'
        allowFullScreen
      >
      </iframe>
    )
  }

  render() {
    const song = this.props.song;
    return (
      <div
        className='youtube song-embed'
        data-embed={`${song.videoId}`}
        onClick={this.videoPlay}
      >
        {this.state.play ? this.renderPlay() : this.renderNoPlay()}
      </div>
    )
  }
}

export default SongEmbed;