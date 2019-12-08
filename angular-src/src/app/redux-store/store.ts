import IAttendee from './attendee';
import ITalk from './talk';
import { ADD_ATTENDEE, ADD_TALK } from './actions';

export interface IAppState {
  attendees: IAttendee[];
  talks: ITalk[];
}

export const INITIAL_STATE: IAppState = {
  attendees: [],
  talks: []
};

export function rootReducer(state, action) {
  switch (action.type) {
    case ADD_ATTENDEE:
      return action.attendee instanceof Array
        ? Object.assign({}, state, {
            ...state,
            attendees: action.attendee
          })
        : Object.assign({}, state, {
            ...state,
            attendees: [...state.attendees, action.attendee]
          });
    case ADD_TALK: {
      return action.talk instanceof Array
        ? Object.assign({}, state, {
            ...state,
            talks: action.talk
          })
        : Object.assign({}, state, {
            ...state,
            talks: [...state.talks, action.talk]
          });
    }
  }
  return state;
}
