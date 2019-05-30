import { combineReducers } from 'redux';
import songsReducer from './songsReducer';
import layoutReducer from './layoutReducer';
import channelReducer from './channelReducer';

export default combineReducers({
  songsList: songsReducer,
  layoutChange: layoutReducer,
  channelSort: channelReducer
})