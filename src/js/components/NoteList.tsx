import escapeRegExp from 'App/lib/escapeRegExp';
import Icon from 'App/components/Icon';
import LoadingIndicator from 'App/components/LoadingIndicator';
import Note from 'App/components/Note';
import NoteForm from 'App/components/NoteForm';
import React, {useEffect, useState} from 'react';
import {logout, subscribe} from 'App/api';
import {Transition, TransitionGroup} from 'react-transition-group';
import {useAppSelector} from 'App/store';

function NoteList() {
  const [query, setQuery] = useState('');

  useEffect(() => subscribe(), []);

  const notes = useAppSelector((state) => state.notes.items);
  const loading = useAppSelector((state) => !state.notes.loaded);

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
        <TransitionGroup component={null}>
          {notesList
            .map((note) => (
              <Transition key={note.id} timeout={500}>
                {(state) => (
                  <Note
                    note={note}
                    style={{
                      opacity:
                        state === 'exiting' || state === 'exited' ? 0 : 1,
                    }}
                    visible={
                      queryRegExp ? queryRegExp.test(note.content) : true
                    }
                  />
                )}
              </Transition>
            ))
            .reverse()}
        </TransitionGroup>
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
    </div>
  );
}

export default NoteList;
