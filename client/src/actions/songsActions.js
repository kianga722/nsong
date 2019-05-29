import axios from 'axios';
import { GET_SONGS, RESET_YT, SET_YT_PLAY, TOGGLE_GROUPCHANNELS, TOGGLE_SORTDATENEWEST } from './types';

export const getSongs = () => dispatch => {
  axios.get('/api/').then(res =>
    dispatch({
      type: GET_SONGS,
      payload: res.data
    })
  )
}

export const resetYT = () => {
  return {
    type: RESET_YT
  }
}

export const setYTPlay = videoId => {
  return {
    type: SET_YT_PLAY,
    payload: videoId
  }
}

export const toggleGroupChannels = () => {
  return {
    type: TOGGLE_GROUPCHANNELS
  }
}

export const toggleSortDateNewest = bool => {
  return {
    type: TOGGLE_SORTDATENEWEST,
    payload: bool
  }
}