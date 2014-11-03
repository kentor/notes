var React     = require('react');
require('react/addons');
var Appconfig = require('../appconfig');
var Link      = require('react-router').Link;

var Reflux = require('reflux');
var NoteActions = require('../actions/NoteActions');
var NoteStore = require('../stores/NoteStore');

var Note = require('./note.jsx');

function escapeRegexp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

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
    NoteActions.toggleLocalHidden(note);
  },

  toggleHidden: function(note) {
    this.firebaseRef.child(note.name).update({ hidden: !note.hidden });
  },

  delete: function(note) {
    this.firebaseRef.child(note.name).remove();
  },

  render: function() {
    var notes = this.state.notes.toSeq();

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
          <li>Notes: {this.state.notes.size}</li>
          {notes.map(function(note) {
            return (
              <Note note={note}
                    onToggleLocalHidden={this.toggleLocalHidden.bind(this, note)}
                    onToggleHidden={this.toggleHidden.bind(this, note)}
                    onDelete={this.delete.bind(this, note)} />
            );
          }, this).reverse().toArray()}
          <li>Notes: {this.state.notes.size}</li>
        </ul>
      </div>
    );
  },
});

module.exports = Index;
