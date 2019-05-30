import { TOGGLE_CHANNEL, TOGGLE_CHANNEL_SELECTALL } from '../actions/types';

const initialState = {
  channelSort: {
    Proximity: true,
    'Revealed Music': true,
    'Thrilling Music': true,
    WaveMusic: true,
  },
  logos: {
    Proximity: 'proximity',
    'Revealed Music': 'revealed',
    'Thrilling Music': 'thrilling',
    WaveMusic: 'wavemusic',
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CHANNEL:
      return {
        ...state,
        channelSort: {
          ...state.channelSort,
          [action.payload]: !state.channelSort[action.payload]
        }
      }
    case TOGGLE_CHANNEL_SELECTALL:
      return {
        ...state,
        channelSort: {
          Proximity: action.payload,
          'Revealed Music': action.payload,
          'Thrilling Music': action.payload,
          WaveMusic: action.payload,
        }
      }
    default:
      return state;
  }
}