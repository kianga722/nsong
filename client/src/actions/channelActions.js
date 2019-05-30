import { TOGGLE_CHANNEL, TOGGLE_CHANNEL_SELECTALL } from './types';

export const toggleChannel = channel => {
  return {
    type: TOGGLE_CHANNEL,
    payload: channel
  }
}

export const selectAllChannel = bool => {
  return {
    type: TOGGLE_CHANNEL_SELECTALL,
    payload: bool
  }
}