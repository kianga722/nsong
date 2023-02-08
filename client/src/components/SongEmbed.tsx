import React, { useEffect } from 'react';
import { SongObj } from '../utils/interfaces';

interface SongEmbedProps {
    song: SongObj;
    play: boolean;
    videoPlay: (videoId: string) => void;
    YTPlayStateReset: () => void;
}

const SongEmbed = ({
    song,
    play,
    videoPlay,
    YTPlayStateReset
} : SongEmbedProps) => {

    const renderNoPlay = () => {
        return (
            <div className='play-button'></div>
        )
    }

    const renderAutoPlay = (song: SongObj) => {
        return (
            <iframe
                title={`${song.videoId}-iframe`}
                width='160'
                height='90'
                src={`https://www.youtube.com/embed/${song.videoId}?rel=0&showinfo=0&autoplay=1`} frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
            ></iframe>
        )
    }

    useEffect(() => {
        YTPlayStateReset();
    }, [])

    return (
        <div
            className='youtube song-embed'
            data-embed={`${song.videoId}`}
            onClick={() => videoPlay(song.videoId)}
        >
            <img 
                className='yt-lazy-image'
                src={`https://img.youtube.com/vi/${song.videoId}/mqdefault.jpg`}
                alt='song preview'
            ></img>
            {play ? renderAutoPlay(song) : renderNoPlay()}
        </div>
    )
}

export default SongEmbed;