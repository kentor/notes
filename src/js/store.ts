import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {Note, StateShapeExtractor} from './types';

type NotesState = {
  items: Record<string, Note>;
  loaded: boolean;
};

const initialNotesState: NotesState = {
  items: {},
  loaded: false,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  reducers: {
    noteListFetched(state, action: PayloadAction<Array<Note>>) {
      state.items = Object.fromEntries(
        action.payload.map((note) => [note.id, note]),
      );
      state.loaded = true;
    },
    noteRetrieved(state, action: PayloadAction<Note>) {
      state.items[action.payload.id] = action.payload;
    },
    noteDeleted(state, action: PayloadAction<Note>) {
      delete state.items[action.payload.id];
    },
  },
});

export const {noteListFetched, noteRetrieved, noteDeleted} = notesSlice.actions;

type SessionState = null | {uid: string};

const initialSessionState: SessionState = null;

const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState as SessionState,
  reducers: {
    sessionLoggedIn(_state, action: PayloadAction<{uid: string}>) {
      return action.payload;
    },
    sessionLoggedOut(_state) {
      return null;
    },
  },
});

export const {sessionLoggedIn, sessionLoggedOut} = sessionSlice.actions;

const preloadedState = (() => {
  const stateFromLocalStorage = JSON.parse(
    window.localStorage.getItem('state') || '',
  );
  const result = StateShapeExtractor.safeParse(stateFromLocalStorage);
  if (result.success) {
    const {data} = result;
    // We want to show the loading spinner after the preload.
    data.notes.loaded = false;
    return data;
  }
  console.log('Error deserializing state from localStorage', result.error);
})();

export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    session: sessionSlice.reducer,
  },
  preloadedState,
});

type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
