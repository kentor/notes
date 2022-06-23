import Login from 'App/components/Login';
import NoteList from 'App/components/NoteList';
import React, {useEffect} from 'react';
import {authRequired} from 'App/api';
import {useAppSelector} from 'App/store';

function App() {
  const state = useAppSelector((state) => state);

  useEffect(() => {
    window.localStorage.setItem('state', JSON.stringify(state));
  });

  const isAuntheticated = !authRequired || state.session;

  return isAuntheticated ? <NoteList /> : <Login />;
}

export default App;
