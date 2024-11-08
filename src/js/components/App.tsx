import Login from 'App/components/Login.tsx';
import NoteList from 'App/components/NoteList.tsx';
import React from 'react';
import { authRequired } from 'App/api.ts';
import { db } from 'App/db.ts';

function App() {
  const { isLoading, user, error } = db.useAuth();

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
