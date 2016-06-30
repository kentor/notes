import * as NoteActions from '../actions/NoteActions';
import API from '../api';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './Icon';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import LoadingIndicator from './LoadingIndicator';
import NewNoteForm from './NewNoteForm';
import Note from './Note';
import NotesPersister from './NotesPersister';
import React from 'react';
import { authRequired } from '../appconfig';
import { connect } from 'react-redux';

const NotesIndex = React.createClass({
  mixins: [
    LinkedStateMixin,
  ],

  getInitialState() {
    return {
      query: '',
    };
  },

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

  requestQueryChange(e) {
    this.setState({ query: e.target.value });
  },

  toggleHidden(note) {
    API.updateNote(note.get('id'), { hidden: !note.get('hidden') });
  },

  toggleLocalHidden(note) {
    this.props.dispatch(NoteActions.toggleLocalHidden(note));
  },

  render() {
    const { loading, notes } = this.props;
    const query = this.state.query.trim().toLowerCase();

    return (
      <main className="Main">
        <aside className="Sidebar">
          <NewNoteForm onSubmit={this.createNote} />
          <input
            className="FilterInput"
            onChange={this.requestQueryChange}
            type="text"
            value={this.state.query}
          />
        </aside>

        <CSSTransitionGroup
          className="Notes"
          component="ul"
          transitionEnter={false}
          transitionLeaveTimeout={500}
          transitionName="fade"
        >
          <li className="Note">
            <span>
              Notes: {notes.size}
              {' '}
              {loading &&
                <LoadingIndicator />
              }
            </span>
            {authRequired &&
              <a onClick={this.logout}>
                <Icon icon="logout" />
              </a>
            }
          </li>
          {notes.toSeq().reverse().map(note =>
            <Note
              hidden={query && !~note.content.toLowerCase().indexOf(query)}
              key={note.get('id')}
              localHidden={this.props.localHidden.get(note.get('id'))}
              note={note}
              onDestroy={this.destroyNote}
              onToggleHidden={this.toggleHidden}
              onToggleLocalHidden={this.toggleLocalHidden}
            />
          ).valueSeq()}
          <li className="Note">Notes: {notes.size}</li>
        </CSSTransitionGroup>

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
