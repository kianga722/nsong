import React, { Component } from 'react';
import SongEmbed from './SongEmbed';

class SongList extends Component {
  // Setup Youtube Lazy Loading
  componentDidMount() {
    const youtube = document.querySelectorAll('.youtube');
    youtube.forEach(vid => {
      // create image element
      const image = document.createElement('img');
      // thumbnail image source
      image.src = `https://img.youtube.com/vi/${vid.dataset.embed}/mqdefault.jpg`;
      // append image 
      vid.appendChild(image);
    })
  }

  render() {
    // Render based on filterbox
    return (
      <section id='songList'>
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