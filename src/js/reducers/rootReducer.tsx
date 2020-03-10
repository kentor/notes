import noteReducer from 'App/reducers/noteReducer';
import sessionReducer from 'App/reducers/sessionReducer';
import {AllActions, StateShape, StateShapeExtractor} from 'App/types';
import {combineReducers} from 'redux';
import {fold} from 'fp-ts/lib/Either';
import {pipe} from 'fp-ts/lib/pipeable';

const combinedReducers = combineReducers<StateShape, AllActions>({
  notes: noteReducer,
  session: sessionReducer,
});

function rootReducer(
  state: StateShape | undefined,
  action: AllActions,
): StateShape {
  if (action.type === '@@INIT') {
    let state = combinedReducers(undefined, action);
    try {
      const stateFromLocalStorage = JSON.parse(
        window.localStorage.getItem('state') || '',
      );
      pipe(
        StateShapeExtractor.decode(stateFromLocalStorage),
        fold(
          (_) => {
            // ignore hydration
          },
          (r) => {
            state = {
              ...state,
              notes: {
                ...state.notes,
                items: r.notes.items,
              },
              session: r.session,
            };
          },
        ),
      );
    } catch {
      // ignore hydration
    }
    return state;
  }

  return combinedReducers(state, action);
}

export default rootReducer;
