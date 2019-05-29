import { combineReducers } from 'redux';
import songsReducer from './songsReducer';

export default combineReducers({
  songsList: songsReducer
})
