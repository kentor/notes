import {AllActions, StateShape} from 'App/types';

const initialState = null;

export default function noteReducer(
  state: StateShape['session'] = initialState,
  action: AllActions,
): StateShape['session'] {
  switch (action.type) {
    case 'SessionLoggedIn':
      return action.payload;
    case 'SessionLoggedOut':
      return initialState;
    default:
      return state;
  }
}
