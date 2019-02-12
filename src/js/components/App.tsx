import Login from 'App/components/Login';
import NoteList from 'App/components/NoteList';
import React, {useEffect} from 'react';
import {hot} from 'react-hot-loader/root';
import {authRequired} from 'App/api';
import {StateShape} from 'App/types';
import {useMappedState} from 'redux-react-hook';

function mapState(state: StateShape) {
  return state;
}

function App() {
  const state = useMappedState(mapState);

  useEffect(() => {
    window.localStorage.setItem('state', JSON.stringify(state));
  });

  const isAuntheticated = !authRequired || state.session;

  return isAuntheticated ? <NoteList /> : <Login />;
}

export default hot(App);
