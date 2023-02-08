import React from 'react';
import SongEmbed from './SongEmbed';
import { SongObj, ChannelsObj } from '../utils/interfaces';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { logos } from '../utils/constants';

interface SongListProps {
    songs: SongObj[];
    videoPlay: (videoId: string) => void;
    YTPlay: ChannelsObj | null;
    YTPlayStateReset: () => void;
    channelSort: ChannelsObj;
    layoutChange: boolean;
}

const SongList = ({
    songs,
    videoPlay,
    YTPlay,
    YTPlayStateReset,
    channelSort,
    layoutChange
} : SongListProps) => {

    // Check if no videos to display
    const isUnselectAll = () => {
        return Object.values(channelSort).every(c => c === false)
    }
    
    return (
        <section
            id='songList'
            className={layoutChange ? 'layoutChange':''}
        >
            {
                isUnselectAll() ? <div id='msgNoVideos'>No videos to show!</div> : null
            }
            <Flipper
                flipKey={layoutChange}
            >
                {
                    songs.map((song) => (
                        channelSort[song.channel]
                        &&
                        <Flipped
                            flipId={`${song.videoId}`}
                            key={`${song.videoId}`}
                        >
                            <div className='song'>
                                {
                                    YTPlay !== null &&
                                    <SongEmbed
                                        song={song}
                                        play={YTPlay[song.videoId]}
                                        videoPlay={videoPlay}
                                        YTPlayStateReset={YTPlayStateReset}
                                    />
                                }
                                
                                <div className='song-title'>{song.title}</div>

                                <div className='song-link'>
                                    <a
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        href={`https://www.youtube.com/watch?v=${song.videoId}`}
                                    >Listen on Youtube</a>
                                </div>

                                <div className='song-info'>
                                    <span className='song-channel'>
                                        <span className='channel-logo-wrapper'>
                                            <div className={`channel-logo ${logos[song.channel]}`}></div>
                                        </span>

                                        <span>
                                            {song.channel}
                                        </span>
                                    </span>

                                    <span className='song-date'>{song.published}</span>
                                </div>
                            </div>
                        </Flipped>
                    ))
                }
            </Flipper>
        </section>
    )
}

export default SongList;