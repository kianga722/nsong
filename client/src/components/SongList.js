import React, { Component } from 'react';
import SongEmbed from './SongEmbed';

class SongList extends Component {
  render() {
    // Render based on filterbox
    return (
      <section
        id='songList'
        className={this.props.layoutChange ? 'layoutChange':null}
      >
        {
          this.props.songs.map((song) => (
            this.props.channelSort[song.channel]
            && <div className='song' key={`${song.videoId}`}>
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
                      {song.channel}
                    </span>
                    <span className='song-date'>
                      {song.published}
                    </span>
                  </div>
                </div>
          ))
        }
      </section>
    )
  }
}

export default SongList;