import Login from 'App/components/Login';
import NoteList from 'App/components/NoteList';
import React from 'react';
import {authRequired} from 'App/api';
import {db} from 'App/db';

function App() {
  const {isLoading, user, error} = db.useAuth();

  if (isLoading) {
    return <div />;
  }

  if (error) {
    return <div>Errored {error.message}</div>;
  }

  const isAuntheticated = !authRequired || user;

  return isAuntheticated ? <NoteList /> : <Login />;
}

export default App;
