import { GET_SONGS, RESET_YT, SET_YT_PLAY, TOGGLE_GROUPCHANNELS, TOGGLE_SORTDATENEWEST  } from '../actions/types';

const initialState = {
  songs: [],
  ytPlay: {},
  ytPlayDefault: {},
  groupChannels: false,
  sortDateNewest: true,
}

const ytPlayStateInit = (songs) => {
  const ytPlay = {};
  songs.map((song) => {
    ytPlay[song.videoId] = false;
  })
  return ytPlay;
}

const sortSong = (d1, d2, bool) => {
  if (d1 >= d2) {
    return bool ? -1:1;
  }
  if (d1 < d2) {
    return bool ? 1:-1;
  }
}

const groupChannelsEnable = (songs, groupChannels) => {
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
  return songsGrouped;
}

const dateSortNewest = (songs, bool) => {
  let songsSorted = [...songs];
  songsSorted.sort((a, b) => {
    const d1 = new Date(a.published);
    const d2 = new Date(b.published);
    return sortSong(d1, d2, bool);
  })
  return songsSorted;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SONGS:
      return {
        ...state,
        songs: action.payload,
        ytPlay: ytPlayStateInit(action.payload),
        ytPlayDefault: ytPlayStateInit(action.payload)
      }
    case RESET_YT:
      return {
        ...state,
        ytPlay: state.ytPlayDefault
      }
    case SET_YT_PLAY:
      return {
        ...state,
        ytPlay: {
          ...state.ytPlay,
          [action.payload]: true
        }
      }
    case TOGGLE_GROUPCHANNELS:
      return {
        ...state,
        songs: groupChannelsEnable(state.songs, state.groupChannels),
        ytPlay: state.ytPlayDefault,
        groupChannels: !state.groupChannels
      }
    case TOGGLE_SORTDATENEWEST:
      return {
        ...state,
        songs: dateSortNewest(state.songs, action.payload),
        ytPlay: state.ytPlayDefault,
        sortDateNewest: action.payload
      }
    default:
      return state;
  }
}