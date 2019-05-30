import { TOGGLE_LAYOUT } from '../actions/types';

const initialState = {
  layoutChange: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LAYOUT:
      return {
        ...state,
        layoutChange: !state.layoutChange
      }
    default:
      return state;
  }
}