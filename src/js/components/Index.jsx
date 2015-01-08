import API from '../api';
import Appconfig from '../appconfig';
import Note from './Note.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import React from 'react/addons';
import Reflux from 'reflux';
import UserStore from '../stores/UserStore';
import { Link } from 'react-router';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

function escapeRegexp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var Index = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Reflux.ListenerMixin],

  statics: {
    willTransitionTo(transition) {
      if (Appconfig.authRequired && !UserStore.user()) {
        transition.redirect('login');
      }
    },
  },

  getInitialState() {
    return { notes: NoteStore.getAll(), newNote: '', filter: '' };
  },

  componentWillMount() {
    API.start();
    this.listenTo(NoteStore, () => {
      var notes = NoteStore.getAll();
      if (this.state.notes !== notes) {
        NoteStore.persist();
        this.setState({ notes });
      }
    });
  },

  componentWillUnmount() {
    API.stop();
    NoteStore.clearAll();
  },

  submitNewNote() {
    var newNote = this.state.newNote.trim();

    this.setState({ newNote: '' });

    if (!newNote) {
      return;
    }

    NoteActions.createNote({
      content: newNote,
      createdAt: (new Date()).toISOString(),
      hidden: false,
    });
  },

  handleKeyDown(e) {
    if (e.keyCode == 13 && e.ctrlKey) {
      this.submitNewNote();
      e.preventDefault(); // prevents new line from pressing enter
    }
  },

  toggleLocalHidden(note) {
    NoteActions.toggleLocalHidden(note.get('name'));
  },

  toggleHidden(note) {
    NoteActions.updateNote(note.get('name'), { hidden: !note.get('hidden') });
  },

  delete(note) {
    NoteActions.deleteNote(note.get('name'));
  },

  render() {
    var notes = this.state.notes.toSeq();

    if (this.state.filter) {
      var filterRegexp = new RegExp(escapeRegexp(this.state.filter), 'i');
      notes = notes.filter(note => note.get('content').match(filterRegexp));
    }

    notes = notes.map((note, name) => (
      <Note note={note}
            key={name}
            onToggleLocalHidden={this.toggleLocalHidden.bind(this, note)}
            onToggleHidden={this.toggleHidden.bind(this, note)}
            onDelete={this.delete.bind(this, note)} />
    )).reverse().toArray();

    var logoutLink;
    if (UserStore.user()) {
      logoutLink = <Link to="logout" className="logout-button">Logout</Link>;
    }

    return (
      <div id="wrapper">
        <aside>
          <div>
            <textarea valueLink={this.linkState('newNote')}
                      onKeyDown={this.handleKeyDown}></textarea>
            <button onClick={this.submitNewNote}>Post</button>
          </div>

          <div>
            <input type="text" valueLink={this.linkState('filter')} />
          </div>

          {logoutLink}
        </aside>

        <ReactCSSTransitionGroup transitionName="fade" transitionEnter={false}
                                 component="ul">
          <li>Notes: {this.state.notes.size}</li>
          {notes}
          <li>Notes: {this.state.notes.size}</li>
        </ReactCSSTransitionGroup>
      </div>
    );
  },
});

export default Index;
