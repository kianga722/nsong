import React, { Component } from 'react';
import SongEmbed from './SongEmbed';
import { Flipper, Flipped } from 'react-flip-toolkit';

class SongList extends Component {
  render() {
    // Render based on filterbox
    return (
      <section
        id='songList'
        className={this.props.layoutChange ? 'layoutChange':null}
      >
        <Flipper
          flipKey={this.props.layoutChange}
        >
        {
          this.props.songs.map((song) => (
            this.props.channelSort[song.channel]
            &&
            <Flipped
              flipId={`${song.videoId}`}
              key={`${song.videoId}`}
            >
              <div className='song'>
                  <SongEmbed
                    song={song}
                    play={this.props.ytplay[song.videoId]}
                    videoPlay={this.props.videoPlay}
                    ytplayStateReset={this.props.ytplayStateReset}
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

export default SongList;