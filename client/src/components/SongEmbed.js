import React, { Component } from 'react';

import { connect } from 'react-redux';
import { resetYT, setYTPlay } from '../actions/songsActions';
import PropTypes from 'prop-types';

class SongEmbed extends Component {

  renderNoPlay = () => {
    return (
      <div className='play-button'></div>
    )
  }

  renderAutoPlay = () => {
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

  componentDidMount() {
    this.props.resetYT();
  }

  render() {
    const song = this.props.song;
    return (
      <div
        className='youtube song-embed'
        data-embed={`${song.videoId}`}
        onClick={() => this.props.setYTPlay(song.videoId)}
      >
        <img 
          className='yt-lazy-image'
          src={`https://img.youtube.com/vi/${song.videoId}/mqdefault.jpg`}
          alt='song preview'
        ></img>
        {this.props.ytPlay[song.videoId] ? this.renderAutoPlay() : this.renderNoPlay()}
      </div>
    )
  }
}

SongEmbed.propTypes = {
  resetYT: PropTypes.func.isRequired,
  setYTPlay: PropTypes.func.isRequired,
  ytPlay: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  ytPlay: state.songsList.ytPlay
});

export default connect(mapStateToProps, { resetYT, setYTPlay })(SongEmbed);