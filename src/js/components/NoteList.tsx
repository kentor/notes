import Icon from 'App/components/Icon';
import LoadingIndicator from 'App/components/LoadingIndicator';
import Note from 'App/components/Note';
import NoteForm from 'App/components/NoteForm';
import React, {useEffect, useState} from 'react';
import {logout, subscribe} from 'App/api';
import {useAppSelector} from 'App/store';
import {useAutoAnimate} from '@formkit/auto-animate/react';

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function NoteList() {
  const [query, setQuery] = useState('');
  const [showHiddenOnly, setShowHiddenOnly] = useState(false);

  useEffect(() => subscribe(), []);

  const [list] = useAutoAnimate<HTMLDivElement>();

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
          onToggleShowHiddenOnly={() => {
            console.log(setShowHiddenOnly, !showHiddenOnly);
            setShowHiddenOnly(!showHiddenOnly);
          }}
          query={query}
          showHiddenOnly={showHiddenOnly}
        />
      </div>
      <div
        ref={list}
        style={{
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
        {notesList
          .map((note) => (
            <Note
              key={note.id}
              note={note}
              visible={
                (showHiddenOnly ? note.hidden : true) &&
                (queryRegExp ? queryRegExp.test(note.content) : true)
              }
            />
          ))
          .reverse()}
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
