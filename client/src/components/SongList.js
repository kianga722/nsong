import React, { Component } from 'react';
import SongEmbed from './SongEmbed';
import { Flipper, Flipped } from 'react-flip-toolkit';

import { connect } from 'react-redux';
import { getSongs } from '../actions/songsActions';
import PropTypes from 'prop-types';

class SongList extends Component {
  // Check if no videos to display
  isUnselectAll = () => {
    return Object.values(this.props.channelSort).every(c => c === false)
  }

  componentDidMount() {
    this.props.getSongs();
  }

  render() {
    const songs = this.props.songs;
    // Render based on filterbox
    return (
      <section
        id='songList'
        className={this.props.layoutChange ? 'layoutChange':null}
      >
        {
          this.isUnselectAll() ? <div id='msgNoVideos'>No videos to show!</div> : null
        }
        <Flipper
          flipKey={this.props.layoutChange}
        >
        {
          songs.map((song) => (
            this.props.channelSort[song.channel]
            &&
            <Flipped
              flipId={`${song.videoId}`}
              key={`${song.videoId}`}
            >
              <div className='song'>
                  <SongEmbed
                    song={song}
                  />

                  <div className='song-title'>
                    {song.title}
                  </div>

                  <div className='song-link'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      href={`https://www.youtube.com/watch?v=${song.videoId}`}
                    >
                      Listen on Youtube
                    </a>
                  </div>

                  <div className='song-info'>
                    <span className='song-channel'>
                      <span className='channel-logo-wrapper'>
                        <div className={`channel-logo ${this.props.logos[song.channel]}`}></div>
                      </span>
                      <span>
                        {song.channel}
                      </span>
                    </span>
                    <span className='song-date'>
                      {song.published}
                    </span>
                  </div>
              </div>
            </Flipped>
          ))
        }
        </Flipper>
      </section>
    )
  }
}

SongList.propTypes = {
  getSongs: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  songs: state.songsList.songs
});

export default connect(mapStateToProps, { getSongs })(SongList);