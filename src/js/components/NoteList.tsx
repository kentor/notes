import escapeRegExp from 'App/lib/escapeRegExp';
import Icon from 'App/components/Icon';
import LoadingIndicator from 'App/components/LoadingIndicator';
import Note from 'App/components/Note';
import NoteForm from 'App/components/NoteForm';
import React, {useEffect, useState} from 'react';
import {logout, subscribe} from 'App/api';
import {StateShape} from 'App/types';
import {useMappedState} from 'redux-react-hook';

function mapState(state: StateShape) {
  return {
    notes: state.notes.items,
    loading: !state.notes.loaded,
  };
}

function NoteList() {
  const [query, setQuery] = useState('');

  useEffect(() => subscribe(), []);

  const {notes, loading} = useMappedState(mapState);

  const trimmedQuery = query.trim();
  const queryRegExp =
    trimmedQuery && new RegExp(escapeRegExp(trimmedQuery), 'i');

  const notesList = Object.values(notes);

  return (
    <div className="grid">
      <div>
        <NoteForm
          onQueryChange={(e) => {
            setQuery(e.target.value);
          }}
          query={query}
        />
      </div>
      <div
        style={{
          alignItems: 'start',
          display: 'grid',
          gap: 16,
          gridTemplateRows: 'min-content',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '4px 4px 0 0',
            padding: 10,
          }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Notes: {notesList.length} {loading && <LoadingIndicator />}
            </span>
            <a onClick={logout} style={{cursor: 'pointer'}}>
              <Icon icon="logout" />
            </a>
          </div>
        </div>
        {notesList.map((note) => (
          <Note
            key={note.id}
            note={note}
            visible={queryRegExp ? queryRegExp.test(note.content) : true}
          />
        ))}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '0 0 4px 4px',
            padding: 10,
          }}
        >
          Notes: {notesList.length}
        </div>
      </div>
      <style jsx>
        {`
          .grid {
            display: grid;
            gap: 16px;
            margin: auto;
            max-width: 888px;
            padding: 16px;
          }

          @media only screen and (min-width: 600px) {
            .grid {
              grid-template-columns: 1fr 2.5fr;
            }
          }

          @media only screen and (max-width: 600px) {
            .grid {
              grid-template-rows: auto auto;
            }
          }
        `}
      </style>
    </div>
  );
}

export default NoteList;
