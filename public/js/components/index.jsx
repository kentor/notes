var React     = require('react');
require('react/addons');
var Appconfig = require('../appconfig');
var Link      = require('react-router').Link;
var moment    = require('moment');

var Reflux = require('reflux');
var NoteActions = require('../actions/NoteActions');
var NoteStore = require('../stores/NoteStore');

function escapeRegexp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var Note = React.createClass({
  toggleLocalHidden: function(e) {
    if (window.getSelection().toString() || e.target.tagName.match(/^[ai]$/i)) return;
    this.props.onToggleLocalHidden();
  },

  render: function() {
    var note = this.props.note;
    var cx = React.addons.classSet;
    var noteContentClasses = cx({
      'note-content': true,
      'hidden': note.localHidden,
    });

    return (
      <li className="note" onClick={this.toggleLocalHidden} style={note.style}>
        <div className="controls">
          <time>{moment(note.createdAt).fromNow().replace(' ago', '')}</time>
          <div className="icons">
            <a href="#" onClick={this.props.onToggleHidden}>{note.hidden ? '☼' : '☀'}</a>
            &nbsp;
            <a href="#" className="delete-note" onClick={this.props.onDelete}>✖</a>
          </div>
        </div>
        <div className={noteContentClasses} dangerouslySetInnerHTML={{__html: note.content}} />
      </li>
    );
  }
});

var Index = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Reflux.ListenerMixin],

  statics: {
    willTransitionTo: function(transition) {
      if (Appconfig.authRequired && !Appconfig.user) {
        transition.redirect('login');
      }
    },
  },

  getInitialState: function() {
    return { notes: NoteStore.getAll(), newNote: '', filter: '' };
  },

  componentWillMount: function() {
    this.listenTo(NoteStore, function() {
      this.setState({ notes: NoteStore.getAll() });
    }.bind(this));

    this.firebaseRef = Appconfig.firebaseRef.child('notes');

    this.firebaseRef.on('child_added', function(snapshot) {
      NoteActions.noteAdded(snapshot);
    }.bind(this));

    this.firebaseRef.on('child_removed', function(snapshot) {
      var noteName = snapshot.name();
      NoteActions.noteRemoved(noteName);
    }.bind(this));

    this.firebaseRef.on('child_changed', function(snapshot) {
      var noteName = snapshot.name();
      var note = snapshot.val();
      NoteActions.noteChanged(noteName, note);
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.firebaseRef.off('child_added');
    this.firebaseRef.off('child_removed');
    this.firebaseRef.off('child_changed');
    NoteStore.clearAll();
  },

  updateNewNote: function() {
    this.setState({ newNote: this.refs.textarea.getDOMNode().value });
  },

  submitNewNote: function() {
    if (!this.state.newNote) {
      return;
    }

    this.firebaseRef.push({
      content: this.state.newNote,
      createdAt: (new Date()).toISOString(),
      hidden: false,
    });

    this.setState({ newNote: '' });
  },

  handleKeyDown: function(e) {
    if (e.keyCode == 13 && e.ctrlKey) {
      this.submitNewNote();
      e.preventDefault(); // prevents new line from pressing enter
    }
  },

  toggleLocalHidden: function(note) {
    note.localHidden = !note.localHidden;
    this.setState({ notes: this.state.notes });
  },

  toggleHidden: function(note) {
    this.firebaseRef.child(note.name).update({ hidden: !note.hidden });
  },

  delete: function(note) {
    this.firebaseRef.child(note.name).remove();
  },

  render: function() {
    var notes = this.state.notes;

    if (this.state.filter) {
      var filterRegexp = new RegExp(escapeRegexp(this.state.filter), 'i');
      notes = notes.filter(function(note) {
        return note.content.match(filterRegexp);
      });
    }

    var logoutLink;
    if (Appconfig.user) {
      logoutLink = <Link to="logout" className="logout-button">Logout</Link>;
    }

    return (
      <div id="wrapper">
        <aside>
          <div>
            <textarea valueLink={this.linkState('newNote')} onKeyDown={this.handleKeyDown}></textarea>
            <button onClick={this.submitNewNote}>Post</button>
          </div>

          <div>
            <input type="text" valueLink={this.linkState('filter')} />
          </div>

          {logoutLink}
        </aside>

        <ul>
          <li>Notes: {this.state.notes.length}</li>
          {notes.map(function(note) {
            return (
              <Note note={note}
                    onToggleLocalHidden={this.toggleLocalHidden.bind(this, note)}
                    onToggleHidden={this.toggleHidden.bind(this, note)}
                    onDelete={this.delete.bind(this, note)} />
            );
          }, this)}
          <li>Notes: {this.state.notes.length}</li>
        </ul>
      </div>
    );
  },
});

module.exports = Index;
