import Login from 'App/components/Login';
import NoteList from 'App/components/NoteList';
import React, {useEffect} from 'react';
import {hot} from 'react-hot-loader/root';
import {authRequired} from 'App/api';
import {StateShape} from 'App/types';
import {useSelector} from 'react-redux';

function App() {
  const state = useSelector((state: StateShape) => state);

  useEffect(() => {
    window.localStorage.setItem('state', JSON.stringify(state));
  });

  const isAuntheticated = !authRequired || state.session;

  return isAuntheticated ? <NoteList /> : <Login />;
}

export default hot(App);
