import * as SessionActions from '../actions/SessionActions';
import { wrapReducer } from '../lib/redux-utils';

function SessionReducer(state = null, action) {
  switch (action.type) {
    case SessionActions.LOGIN_SUCCESS:
      return action.payload;

    case SessionActions.LOGOUT:
      return null;

    default:
      return state;
  }
}

export default wrapReducer(SessionReducer);
