import React, { useState, useEffect }  from 'react';
import { SongObj, ChannelsObj } from './utils/interfaces';
import SortBar from './components/SortBar';
import SongList from './components/SongList';
import LayoutChange from './components/LayoutChange';
import ChannelBox from './components/ChannelBox';

function App() {
  const [songs, setSongs] = useState<SongObj[] | null>(null)
  const [YTPlay, setYTPlay] = useState<ChannelsObj | null>(null)
  const [YTPlayDefault, setYTPlayDefault] = useState<ChannelsObj | null>(null)
  const [groupChannels, setGroupChannels] = useState(false)
  const [sortDateNewest, setSortDateNewest] = useState(true)
  const [layoutChange, setLayoutChange] = useState(false)
  const [channelSort, setChannelSort] = useState<ChannelsObj>({
    Proximity: true,
    'Revealed Music': true,
    'Thrilling Music': true,
    WaveMusic: true,
  })


  const YTPlayStateInit = (songs: SongObj[]) => {
    const songsStateDefault: ChannelsObj = {};
    for (let song of songs) {
      songsStateDefault[song.videoId] = false;
    }
    setYTPlay(songsStateDefault)
    setYTPlayDefault(songsStateDefault)
  }

  // Reset YT vids on sort so they do not autoplay
  const YTPlayStateReset = () => {
    setYTPlay({
      ...YTPlayDefault,

    })
  }

  const videoPlay = (videoId: string) => {
    setYTPlay({
      ...YTPlay,
      [videoId]: true
    })
  };

  const groupChannelsToggle = () => {
    setGroupChannels(!groupChannels)
  }

  const sortSong = (d1: Date | string, d2: Date | string, bool: boolean) => {
    if (d1 >= d2) {
      return bool ? -1:1;
    }
    if (d1 < d2) {
      return bool ? 1:-1;
    }
    return 0;
  }

  const groupChannelsEnable = (songs: SongObj[]) => {
    let songsGrouped = [...songs];
    songsGrouped.sort((a, b) => {
      let d1;
      let d2;
      if (groupChannels) {
        d1 = new Date(a.published);
        d2 = new Date(b.published);
        return sortSong(d1, d2, true);
      } else {
        d1 = a.channel;
        d2 = b.channel;
        return sortSong(d1, d2, false);
      }
    })
    setSongs(songsGrouped);
    groupChannelsToggle(); 
    YTPlayStateReset();
  }

  const sortDateNewestToggle = (bool: boolean) => {
    setSortDateNewest(bool)
  }

  const layoutToggle = () => {
    setLayoutChange(!layoutChange)
  }

  const toggleSort = (channel: string) => {
    setChannelSort({
      ...channelSort,
      [channel]: !channelSort[channel]
    })
  }

  const selectAll = (bool: boolean) => {
    let channelCopy = { ...channelSort };
    Object.keys(channelCopy).forEach(channel => {
      channelCopy[channel] = bool;
    })
    setChannelSort({
      ...channelCopy
    })
  }

  const dateSortNewest = (songs: SongObj[], bool: boolean,) => {
    let songsSorted = [...songs];
    songsSorted.sort((a, b) => {
      const d1 = new Date(a.published);
      const d2 = new Date(b.published);
      return sortSong(d1, d2, bool);
    })
    setSongs(songsSorted)
    sortDateNewestToggle(bool)
    YTPlayStateReset()
  }

  useEffect(() => {
    const appInit = async () => {
      // Fetch data from YT API
      const songsGet = await fetch('/api/');
      const songsGetJSON = await songsGet.json();
      setSongs(songsGetJSON);
      // Set initial state of all YT videos
      YTPlayStateInit(songsGetJSON);
    }

    appInit()
  }, [])


  return (
    <>
      {
        songs &&
        <div id='content'>
          <SortBar
            songs={songs}
            groupChannels={groupChannels}
            groupChannelsEnable={groupChannelsEnable}
            sortDateNewest={sortDateNewest}
            dateSortNewest={dateSortNewest}
          />

          <SongList
            songs={songs}
            videoPlay={videoPlay}
            YTPlay={YTPlay}
            YTPlayStateReset={YTPlayStateReset}
            channelSort={channelSort}
            layoutChange={layoutChange}
          />

          <LayoutChange
            layoutChange={layoutChange}
            layoutToggle={layoutToggle}
          />

          <ChannelBox
            channelSort={channelSort}
            toggleSort={toggleSort}
            selectAll={selectAll}
          />
        </div>
      }
    </>
  );
}

export default App;
