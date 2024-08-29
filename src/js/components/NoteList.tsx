import Icon from 'App/components/Icon';
import Note from 'App/components/Note';
import NoteForm from 'App/components/NoteForm';
import React, {useState} from 'react';
import {logout} from 'App/api';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {db} from 'App/db';
import {Note as NoteT} from 'App/types';

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function NoteList() {
  const {isLoading, error, data} = db.useQuery({notes: {}});

  if (isLoading) {
    return <div />;
  }

  if (error) {
    console.error(error);
    return <div>Error...</div>;
  }

  const notes = data.notes.sort((a, b) =>
    b.created_at.localeCompare(a.created_at),
  );

  return <NoteListInner notes={notes} />;
}

function NoteListInner({notes}: {notes: Array<NoteT>}) {
  const [query, setQuery] = useState('');
  const [showHiddenOnly, setShowHiddenOnly] = useState(false);

  const [list] = useAutoAnimate<HTMLDivElement>();

  const trimmedQuery = query.trim();
  const queryRegExp =
    trimmedQuery && new RegExp(escapeRegExp(trimmedQuery), 'i');

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
            <span>Notes: {notes.length}</span>
            <a onClick={logout} style={{cursor: 'pointer'}}>
              <Icon icon="logout" />
            </a>
          </div>
        </div>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            visible={
              (showHiddenOnly ? note.hidden : true) &&
              (queryRegExp ? queryRegExp.test(note.content) : true)
            }
          />
        ))}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '0 0 4px 4px',
            padding: 10,
            height: 'fit-content',
          }}
        >
          Notes: {notes.length}
        </div>
      </div>
    </div>
  );
}

export default NoteList;
