import * as NoteActions from '../actions/NoteActions';
import API from '../api';
import LoadingIndicator from './LoadingIndicator';
import NewNoteForm from './NewNoteForm';
import Note from './Note';
import NotesPersister from './NotesPersister';
import React from 'react';
import { authRequired } from '../appconfig';
import { connect } from 'react-redux';

const NotesIndex = React.createClass({
  componentDidMount() {
    this.props.dispatch(NoteActions.hydrate());
    API.subscribe();
  },

  componentWillUnmount() {
    API.unsubscribe();
  },

  createNote(content) {
    API.createNote(content);
  },

  destroyNote(note) {
    API.destroyNote(note.get('id'));
  },

  logout() {
    API.logout();
  },

  toggleHidden(note) {
    API.updateNote(note.get('id'), { hidden: !note.get('hidden') });
  },

  toggleLocalHidden(note) {
    this.props.dispatch(NoteActions.toggleLocalHidden(note));
  },

  render() {
    const { loading, notes } = this.props;

    return (
      <main className="Main">
        <aside className="Sidebar">
          <NewNoteForm onSubmit={this.createNote} />
          {authRequired &&
            <a className="Logout" onClick={this.logout}>Logout</a>
          }
        </aside>

        <ul className="Notes">
          <li className="Note">
            Notes: {notes.size}
            {' '}
            {loading &&
              <LoadingIndicator />
            }
          </li>
          {notes.toSeq().reverse().map(note =>
            <Note
              key={note.get('id')}
              localHidden={this.props.localHidden.get(note.get('id'))}
              note={note}
              onDestroy={this.destroyNote}
              onToggleHidden={this.toggleHidden}
              onToggleLocalHidden={this.toggleLocalHidden}
            />
          ).toArray()}
          <li className="Note">Notes: {notes.size}</li>
        </ul>

        {!loading &&
          <NotesPersister notes={notes} />
        }
      </main>
    );
  },
});

function mapStateToProps(state) {
  return {
    loading: !state.getIn(['notes', 'loaded']),
    localHidden: state.getIn(['notes', 'localHidden']),
    notes: state.getIn(['notes', 'items']),
  };
}

export default connect(mapStateToProps)(NotesIndex);
